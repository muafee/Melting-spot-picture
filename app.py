import streamlit as st
from PIL import Image, ImageOps, ImageFile
import numpy as np
import random
import io
import zipfile
from pathlib import Path

ImageFile.LOAD_TRUNCATED_IMAGES = True
Image.MAX_IMAGE_PIXELS = None

st.set_page_config(
    page_title="PhotoCollage Studio",
    page_icon="🖼️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ── CSS ───────────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');

html, body, [class*="css"] { font-family: 'DM Sans', sans-serif; }

.stApp { background: #0f0f0f; color: #e8e4dc; }

section[data-testid="stSidebar"] {
    background: #161616;
    border-right: 1px solid #2a2a2a;
}

h1 { font-family: 'DM Serif Display', serif; font-size: 2.4rem !important;
     color: #f5f0e8 !important; letter-spacing: -0.02em; margin-bottom: 0 !important; }

.subtitle { color: #6b6560; font-size: 0.9rem; margin-bottom: 2rem; }

.stat-card {
    background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px;
    padding: 1rem 1.2rem; text-align: center;
}
.stat-card .val { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: #c8b89a; }
.stat-card .lbl { font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; }

.preview-wrap {
    background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px;
    padding: 1.5rem; margin-top: 1rem;
}
.stButton > button {
    background: #c8b89a !important; color: #0f0f0f !important;
    border: none !important; border-radius: 8px !important;
    font-weight: 500 !important; font-family: 'DM Sans', sans-serif !important;
    padding: 0.6rem 1.4rem !important; width: 100%;
}
.stButton > button:hover { background: #d4c4a8 !important; }

.stSlider > div > div { color: #c8b89a !important; }
label { color: #9a9490 !important; font-size: 0.85rem !important; }

div[data-testid="stFileUploader"] {
    border: 2px dashed #2a2a2a !important; border-radius: 12px !important;
    background: #141414 !important;
}
</style>
""", unsafe_allow_html=True)


# ── Fonctions collage ─────────────────────────────────────────────────────────

def get_ratio(img: Image.Image) -> float:
    img = ImageOps.exif_transpose(img)
    return img.width / img.height


def largest_remainder(vals_f, total):
    vi = [int(v) for v in vals_f]
    restes = sorted(enumerate(vals_f), key=lambda x: -(x[1] - int(x[1])))
    for i in range(total - sum(vi)):
        vi[restes[i][0]] += 1
    return vi


def repartir(ratios, nb_rangees, seed):
    rng = random.Random(seed)
    ordre = list(range(len(ratios)))
    rng.shuffle(ordre)
    ordre.sort(key=lambda i: ratios[i])
    rangees = [[] for _ in range(nb_rangees)]
    sommes = [0.0] * nb_rangees
    for idx in ordre:
        r = sommes.index(min(sommes))
        rangees[r].append(idx)
        sommes[r] += ratios[idx]
    for r in rangees: rng.shuffle(r)
    rng.shuffle(rangees)
    return rangees


def calculer_grille(rangees, ratios, W, H):
    hf = [W / sum(ratios[i] for i in r) for r in rangees]
    hf = [h * H / sum(hf) for h in hf]
    hauteurs = largest_remainder(hf, H)
    largeurs_g = []
    for r, h in zip(rangees, hauteurs):
        lf = [ratios[i] * h for i in r]
        lf = [w * W / sum(lf) for w in lf]
        largeurs_g.append(largest_remainder(lf, W))
    return hauteurs, largeurs_g


def coller_cover(canvas, img_pil, x, y, w, h):
    img = ImageOps.exif_transpose(img_pil.convert("RGB"))
    r_src = img.width / img.height
    r_dst = w / h
    if r_src >= r_dst:
        nw, nh = max(1, round(h * r_src)), h
    else:
        nw, nh = w, max(1, round(w / r_src))
    img = img.resize((nw, nh), Image.LANCZOS)
    cx, cy = (nw - w) // 2, (nh - h) // 2
    img = img.crop((cx, cy, cx + w, cy + h))
    canvas.paste(img, (x, y))


def generer_collage(images_pil, nb_rangees, seed, W, H):
    ratios = [get_ratio(img) for img in images_pil]
    rangees = repartir(ratios, nb_rangees, seed)
    hauteurs, largeurs_g = calculer_grille(rangees, ratios, W, H)
    canvas = Image.new("RGB", (W, H), (0, 0, 0))
    y_off = 0
    for indices, h_row, largeurs in zip(rangees, hauteurs, largeurs_g):
        x_off = 0
        for idx, w_cell in zip(indices, largeurs):
            coller_cover(canvas, images_pil[idx], x_off, y_off, w_cell, h_row)
            x_off += w_cell
        y_off += h_row
    return canvas


# ── UI ────────────────────────────────────────────────────────────────────────

st.markdown('<h1>PhotoCollage Studio</h1>', unsafe_allow_html=True)
st.markdown('<p class="subtitle">Crée des collages photo haute résolution prêts à imprimer</p>', unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("### ⚙️ Paramètres")

    st.markdown("**Format d'impression**")
    col1, col2 = st.columns(2)
    with col1:
        larg_cm = st.number_input("Largeur (cm)", min_value=10, max_value=300, value=60, step=5)
    with col2:
        haut_cm = st.number_input("Hauteur (cm)", min_value=10, max_value=300, value=80, step=5)

    dpi = st.select_slider("Résolution (DPI)", options=[72, 150, 300], value=300)

    st.markdown("**Mise en page**")
    nb_rangees = st.slider("Nombre de rangées", min_value=2, max_value=10, value=5)
    seed = st.slider("Variante (seed)", min_value=0, max_value=99, value=42,
                     help="Change la disposition des photos")

    st.markdown("**Export**")
    qualite = st.slider("Qualité JPEG", min_value=70, max_value=100, value=95)

    st.markdown("---")
    W_PX = int(larg_cm / 2.54 * dpi)
    H_PX = int(haut_cm / 2.54 * dpi)
    st.markdown(f"""
    <div class="stat-card">
        <div class="val">{W_PX:,} × {H_PX:,}</div>
        <div class="lbl">pixels en sortie</div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown(f"""
    <div class="stat-card" style="margin-top:0.5rem">
        <div class="val">{larg_cm} × {haut_cm}</div>
        <div class="lbl">centimètres · {dpi} DPI</div>
    </div>
    """, unsafe_allow_html=True)

# Zone principale
uploaded = st.file_uploader(
    "📁 Glisse tes photos ici",
    type=["jpg", "jpeg", "png", "webp"],
    accept_multiple_files=True
)

if uploaded:
    n = len(uploaded)
    c1, c2, c3 = st.columns(3)
    c1.markdown(f'<div class="stat-card"><div class="val">{n}</div><div class="lbl">photos chargées</div></div>', unsafe_allow_html=True)
    c2.markdown(f'<div class="stat-card"><div class="val">{nb_rangees}</div><div class="lbl">rangées</div></div>', unsafe_allow_html=True)
    c3.markdown(f'<div class="stat-card"><div class="val">~{n//nb_rangees}</div><div class="lbl">photos / rangée</div></div>', unsafe_allow_html=True)

    st.markdown("")

    col_prev, col_exp = st.columns([2, 1])

    with col_prev:
        if st.button("🔍 Générer la prévisualisation"):
            with st.spinner("Génération en cours..."):
                # Basse résolution pour preview (1/8ème)
                SCALE = 8
                W_prev = max(W_PX // SCALE, 400)
                H_prev = max(H_PX // SCALE, 300)

                images_pil = []
                for f in uploaded:
                    try:
                        img = Image.open(io.BytesIO(f.read()))
                        images_pil.append(img)
                        f.seek(0)
                    except Exception:
                        pass

                nb_r = min(nb_rangees, len(images_pil))
                preview = generer_collage(images_pil, nb_r, seed, W_prev, H_prev)

                st.markdown('<div class="preview-wrap">', unsafe_allow_html=True)
                st.image(preview, caption=f"Prévisualisation · {larg_cm}×{haut_cm} cm · {nb_r} rangées · seed {seed}", use_container_width=True)
                st.markdown('</div>', unsafe_allow_html=True)
                st.session_state["preview_ok"] = True
                st.session_state["images_loaded"] = True

    with col_exp:
        st.markdown("### 💾 Export haute résolution")
        st.markdown(f"Taille finale : **{W_PX:,} × {H_PX:,} px**")
        st.markdown(f"Format : **{larg_cm} × {haut_cm} cm @ {dpi} DPI**")
        st.markdown(f"Qualité JPEG : **{qualite}%**")
        st.markdown("")

        if st.button("⬇️ Générer & télécharger le collage HD"):
            with st.spinner(f"Génération HD {W_PX:,}×{H_PX:,} px... (peut prendre quelques minutes)"):
                images_pil = []
                for f in uploaded:
                    try:
                        img = Image.open(io.BytesIO(f.read()))
                        images_pil.append(img)
                        f.seek(0)
                    except Exception:
                        pass

                nb_r = min(nb_rangees, len(images_pil))
                collage_hd = generer_collage(images_pil, nb_r, seed, W_PX, H_PX)

                buf = io.BytesIO()
                collage_hd.save(buf, format="JPEG", quality=qualite, dpi=(dpi, dpi))
                buf.seek(0)

                st.download_button(
                    label="📥 Télécharger le collage",
                    data=buf,
                    file_name=f"collage_{larg_cm}x{haut_cm}cm_{nb_r}rangees_seed{seed}.jpg",
                    mime="image/jpeg"
                )
                st.success("✅ Collage prêt !")

else:
    st.markdown("""
    <div style="text-align:center; padding:4rem 2rem; color:#3a3a3a;">
        <div style="font-size:3rem">🖼️</div>
        <div style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:#2a2a2a; margin:1rem 0">
            Charge tes photos pour commencer
        </div>
        <div style="font-size:0.85rem">JPG · PNG · WEBP acceptés · Plusieurs fichiers à la fois</div>
    </div>
    """, unsafe_allow_html=True)
