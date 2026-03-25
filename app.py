import streamlit as st
from PIL import Image, ImageOps, ImageFile, ImageDraw, ImageFont
import numpy as np
import random
import io
import math

ImageFile.LOAD_TRUNCATED_IMAGES = True
Image.MAX_IMAGE_PIXELS = None

# ── Config ────────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="CollageStudio — Antalis",
    page_icon="🎨",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ── CSS Poppins + design sobre ────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

html, body, [class*="css"], .stApp { font-family: 'Poppins', sans-serif !important; }

.stApp { background: #f8f7f5; }

section[data-testid="stSidebar"] {
    background: #1c1c1e;
    border-right: none;
}
section[data-testid="stSidebar"] * { color: #e5e0d8 !important; }
section[data-testid="stSidebar"] label { color: #9e9a94 !important; font-size:0.78rem !important; letter-spacing:0.05em; text-transform:uppercase; }
section[data-testid="stSidebar"] h3 { color: #fff !important; font-weight:600 !important; font-size:0.85rem !important; letter-spacing:0.08em; text-transform:uppercase; margin-top:1.4rem !important; }
section[data-testid="stSidebar"] hr { border-color: #2e2e30 !important; }

.hero { padding: 2rem 0 1rem; }
.hero h1 { font-family:'Poppins',sans-serif; font-weight:600; font-size:1.9rem; color:#1c1c1e; letter-spacing:-0.02em; margin:0; }
.hero p { color:#8a8680; font-size:0.88rem; margin:0.3rem 0 0; font-weight:300; }

.card {
    background:#fff; border:1px solid #eae8e4; border-radius:14px;
    padding:1.4rem 1.6rem; margin-bottom:1rem;
}
.card-title { font-size:0.72rem; font-weight:600; letter-spacing:0.1em;
              text-transform:uppercase; color:#b0aba4; margin-bottom:0.8rem; }

.kpi { text-align:center; background:#fff; border:1px solid #eae8e4;
       border-radius:12px; padding:1rem 0.5rem; }
.kpi .val { font-size:1.6rem; font-weight:600; color:#1c1c1e; line-height:1; }
.kpi .lbl { font-size:0.7rem; color:#b0aba4; text-transform:uppercase;
            letter-spacing:0.08em; margin-top:0.3rem; }

.badge {
    display:inline-block; background:#f0ede8; color:#6b6560;
    border-radius:20px; padding:0.2rem 0.8rem; font-size:0.75rem;
    font-weight:500; margin:0.2rem;
}
.badge-blue { background:#e8f0fe; color:#1a56db; }

.btn-primary > button {
    background: #1c1c1e !important; color: #fff !important;
    border:none !important; border-radius:10px !important;
    font-family:'Poppins',sans-serif !important; font-weight:500 !important;
    font-size:0.85rem !important; padding:0.65rem 1.5rem !important;
    width:100%; letter-spacing:0.02em;
    transition: background 0.2s !important;
}
.btn-primary > button:hover { background: #333 !important; }

.btn-secondary > button {
    background: #fff !important; color: #1c1c1e !important;
    border: 1.5px solid #d4d0ca !important; border-radius:10px !important;
    font-family:'Poppins',sans-serif !important; font-weight:500 !important;
    font-size:0.85rem !important; padding:0.65rem 1.5rem !important; width:100%;
}

.preview-container {
    background:#fff; border:1px solid #eae8e4; border-radius:14px;
    padding:1.2rem; margin-top:0.5rem;
}
.info-box {
    background:#f0ede8; border-radius:10px; padding:0.8rem 1rem;
    font-size:0.8rem; color:#6b6560; line-height:1.6;
}
.tag-banner {
    background:#fff3e0; color:#e65100; border-radius:6px;
    padding:0.15rem 0.6rem; font-size:0.75rem; font-weight:600;
    display:inline-block; margin-bottom:0.5rem;
}

div[data-testid="stFileUploader"] label { color:#1c1c1e !important; font-size:0.85rem !important; text-transform:none !important; letter-spacing:0 !important; }
div[data-testid="stFileUploader"] > div { border:2px dashed #d4d0ca !important; border-radius:12px !important; background:#fafaf9 !important; }
</style>
""", unsafe_allow_html=True)

# ── Constantes bannières ──────────────────────────────────────────────────────
BANNER_TYPES = {
    "— Collage libre —": None,
    "Endeca (1330×166px)": {
        "w": 1330, "h": 166, "cols_defaut": 2,
        "rows_defaut": 10, "desc": "Bandeau Endeca"
    },
    "Jahia E-Shop (1254×360px)": {
        "w": 1254, "h": 360, "cols_defaut": 2,
        "rows_defaut": 8, "desc": "Bannière Jahia E-Shop"
    },
    "Jahia Inspiration (1920×493px)": {
        "w": 1920, "h": 493, "cols_defaut": 1,
        "rows_defaut": 8, "desc": "Bannière Jahia Inspiration"
    },
    "Eloqua (600×250px)": {
        "w": 600, "h": 250, "cols_defaut": 3,
        "rows_defaut": 6, "desc": "Bannière Eloqua email"
    },
    "MDM (800×529px)": {
        "w": 800, "h": 529, "cols_defaut": 3,
        "rows_defaut": 5, "desc": "Bannière MDM"
    },
    "Eshop Produit (1100×1100px)": {
        "w": 1100, "h": 1100, "cols_defaut": 4,
        "rows_defaut": 5, "desc": "Visuel produit E-Shop"
    },
}

UNITES = {"cm": 1.0, "mm": 10.0, "pouces (in)": 1/2.54, "pixels (px)": None}

# ── Helpers collage photo ─────────────────────────────────────────────────────
def get_ratio(img):
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
    hf = [W / max(sum(ratios[i] for i in r), 0.001) for r in rangees]
    hf = [h * H / sum(hf) for h in hf]
    hauteurs = largest_remainder(hf, H)
    largeurs_g = []
    for r, h in zip(rangees, hauteurs):
        lf = [ratios[i] * h for i in r]
        lf = [w * W / max(sum(lf), 1) for w in lf]
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

def generer_collage_libre(images_pil, nb_rangees, seed, W, H):
    ratios = [get_ratio(img) for img in images_pil]
    rangees = repartir(ratios, nb_rangees, seed)
    hauteurs, largeurs_g = calculer_grille(rangees, ratios, W, H)
    canvas = Image.new("RGB", (W, H), (255, 255, 255))
    y_off = 0
    for indices, h_row, largeurs in zip(rangees, hauteurs, largeurs_g):
        x_off = 0
        for idx, w_cell in zip(indices, largeurs):
            coller_cover(canvas, images_pil[idx], x_off, y_off, w_cell, h_row)
            x_off += w_cell
        y_off += h_row
    return canvas

# ── Helper collage bannière ───────────────────────────────────────────────────
def generer_collage_banniere(images_pil, cols, W, H, gap=0):
    """Grille stricte cols×rows, chaque cellule = ratio fixe de la bannière."""
    n = len(images_pil)
    rows = math.ceil(n / cols)
    cell_w = (W - gap * (cols - 1)) // cols
    cell_h = (H - gap * (rows - 1)) // rows
    canvas = Image.new("RGB", (W, H), (245, 244, 242))
    for i, img_pil in enumerate(images_pil):
        col = i % cols
        row = i // cols
        x = col * (cell_w + gap)
        y = row * (cell_h + gap)
        coller_cover(canvas, img_pil, x, y, cell_w, cell_h)
    return canvas

# ── Conversion unités → pixels ────────────────────────────────────────────────
def to_pixels(valeur, unite, dpi):
    if unite == "pixels (px)":
        return int(valeur)
    elif unite == "cm":
        return int(valeur / 2.54 * dpi)
    elif unite == "mm":
        return int(valeur / 25.4 * dpi)
    elif unite == "pouces (in)":
        return int(valeur * dpi)
    return int(valeur)

def format_canvas_info(W, H, dpi, unite):
    if unite == "pixels (px)":
        return f"{W} × {H} px"
    elif unite == "cm":
        return f"{W/dpi*2.54:.1f} × {H/dpi*2.54:.1f} cm"
    elif unite == "mm":
        return f"{W/dpi*25.4:.0f} × {H/dpi*25.4:.0f} mm"
    elif unite == "pouces (in)":
        return f"{W/dpi:.2f} × {H/dpi:.2f} in"
    return f"{W} × {H} px"

# ══ UI ════════════════════════════════════════════════════════════════════════

st.markdown("""
<div class="hero">
  <h1>CollageStudio</h1>
  <p>Génération de planches visuelles haute résolution · Antalis</p>
</div>
""", unsafe_allow_html=True)

# ── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### Mode")
    banner_choice = st.selectbox("Type de contenu", list(BANNER_TYPES.keys()), label_visibility="collapsed")
    banner_cfg = BANNER_TYPES[banner_choice]
    is_banner = banner_cfg is not None

    st.markdown("### Format de sortie")
    unite = st.selectbox("Unité", list(UNITES.keys()))
    dpi = st.select_slider("Résolution", options=[72, 96, 150, 300], value=150)

    col1, col2 = st.columns(2)
    if is_banner:
        # Précalcul automatique selon le type de bannière
        cols_b = banner_cfg["cols_defaut"]
        rows_b = banner_cfg["rows_defaut"]
        bw, bh = banner_cfg["w"], banner_cfg["h"]
        W_auto = bw * cols_b
        H_auto = bh * rows_b

        def px_to_unit(px):
            if unite == "pixels (px)": return px
            elif unite == "cm": return round(px / dpi * 2.54, 1)
            elif unite == "mm": return round(px / dpi * 25.4, 0)
            elif unite == "pouces (in)": return round(px / dpi, 2)

        with col1:
            larg_val = st.number_input("Largeur", value=float(px_to_unit(W_auto)), step=1.0)
        with col2:
            haut_val = st.number_input("Hauteur", value=float(px_to_unit(H_auto)), step=1.0)
    else:
        with col1:
            larg_val = st.number_input("Largeur", value=60.0 if unite != "pixels (px)" else 7086.0, step=1.0)
        with col2:
            haut_val = st.number_input("Hauteur", value=80.0 if unite != "pixels (px)" else 9449.0, step=1.0)

    W_PX = to_pixels(larg_val, unite, dpi)
    H_PX = to_pixels(haut_val, unite, dpi)

    st.markdown("### Mise en page")
    if is_banner:
        cols_b = st.slider("Colonnes", 1, 6, banner_cfg["cols_defaut"])
        gap_px = st.slider("Espacement (px)", 0, 20, 0)
    else:
        nb_rangees = st.slider("Rangées", 1, 30, 5)
        seed = st.slider("Variante (seed)", 0, 99, 42, help="Change la disposition")

    st.markdown("### Export")
    qualite = st.slider("Qualité JPEG", 70, 100, 92)

    st.markdown("---")
    mpx = round(W_PX * H_PX / 1_000_000, 1)
    st.markdown(f"""
    <div class="kpi">
        <div class="val">{W_PX:,}×{H_PX:,}</div>
        <div class="lbl">pixels · {mpx} Mpx · {dpi} DPI</div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown(f"""
    <div class="kpi" style="margin-top:0.5rem">
        <div class="val">{format_canvas_info(W_PX, H_PX, dpi, unite)}</div>
        <div class="lbl">format final</div>
    </div>
    """, unsafe_allow_html=True)

# ── Zone principale ───────────────────────────────────────────────────────────
if is_banner:
    st.markdown(f"""
    <div class="card">
        <div class="card-title">Mode bannière actif</div>
        <span class="tag-banner">{banner_choice}</span><br>
        <span class="badge">Format source : {banner_cfg['w']}×{banner_cfg['h']}px</span>
        <span class="badge">Ratio : {banner_cfg['w']/banner_cfg['h']:.2f}</span>
        <span class="badge badge-blue">{cols_b} colonne(s)</span>
    </div>
    """, unsafe_allow_html=True)

uploaded = st.file_uploader(
    "Glisse tes visuels ici — JPG, PNG, WEBP acceptés",
    type=["jpg", "jpeg", "png", "webp"],
    accept_multiple_files=True
)

if uploaded:
    n = len(uploaded)

    if is_banner:
        rows_calc = math.ceil(n / cols_b)
        c1, c2, c3, c4 = st.columns(4)
        c1.markdown(f'<div class="kpi"><div class="val">{n}</div><div class="lbl">visuels</div></div>', unsafe_allow_html=True)
        c2.markdown(f'<div class="kpi"><div class="val">{cols_b}</div><div class="lbl">colonnes</div></div>', unsafe_allow_html=True)
        c3.markdown(f'<div class="kpi"><div class="val">{rows_calc}</div><div class="lbl">rangées auto</div></div>', unsafe_allow_html=True)
        c4.markdown(f'<div class="kpi"><div class="val">{n}</div><div class="lbl">cellules utilisées</div></div>', unsafe_allow_html=True)
    else:
        rows_calc = nb_rangees
        c1, c2, c3 = st.columns(3)
        c1.markdown(f'<div class="kpi"><div class="val">{n}</div><div class="lbl">photos</div></div>', unsafe_allow_html=True)
        c2.markdown(f'<div class="kpi"><div class="val">{nb_rangees}</div><div class="lbl">rangées</div></div>', unsafe_allow_html=True)
        c3.markdown(f'<div class="kpi"><div class="val">~{n//max(nb_rangees,1)}</div><div class="lbl">photos / rangée</div></div>', unsafe_allow_html=True)

    st.markdown("")
    col_prev, col_exp = st.columns([3, 2])

    with col_prev:
        st.markdown('<div class="card-title">Prévisualisation</div>', unsafe_allow_html=True)
        if st.button("🔍 Générer l'aperçu", key="prev"):
            with st.spinner("Génération de l'aperçu..."):
                SCALE = 6
                Wp = max(W_PX // SCALE, 300)
                Hp = max(H_PX // SCALE, 200)

                imgs = []
                for f in uploaded:
                    try:
                        imgs.append(Image.open(io.BytesIO(f.read())))
                        f.seek(0)
                    except: pass

                if is_banner:
                    preview = generer_collage_banniere(imgs, cols_b, Wp, Hp, gap_px)
                else:
                    nb_r = min(nb_rangees, len(imgs))
                    preview = generer_collage_libre(imgs, nb_r, seed, Wp, Hp)

                st.markdown('<div class="preview-container">', unsafe_allow_html=True)
                st.image(preview, use_container_width=True)
                st.markdown('</div>', unsafe_allow_html=True)

                info = format_canvas_info(W_PX, H_PX, dpi, unite)
                st.markdown(f"""
                <div class="info-box">
                    📐 Format final : <strong>{info}</strong> · {W_PX:,}×{H_PX:,} px · {dpi} DPI<br>
                    🖼 {n} visuel(s) · {"Grille "+str(cols_b)+"×"+str(rows_calc) if is_banner else str(nb_rangees)+" rangées · seed "+str(seed)}
                </div>
                """, unsafe_allow_html=True)

    with col_exp:
        st.markdown('<div class="card-title">Export haute résolution</div>', unsafe_allow_html=True)
        st.markdown(f"""
        <div class="info-box">
            Format : <strong>{format_canvas_info(W_PX, H_PX, dpi, unite)}</strong><br>
            Résolution : <strong>{dpi} DPI</strong><br>
            Pixels : <strong>{W_PX:,} × {H_PX:,}</strong><br>
            Qualité JPEG : <strong>{qualite}%</strong>
        </div>
        """, unsafe_allow_html=True)
        st.markdown("")

        if st.button("⬇️ Générer & télécharger HD", key="export"):
            with st.spinner(f"Génération HD {W_PX:,}×{H_PX:,} px…"):
                imgs = []
                for f in uploaded:
                    try:
                        imgs.append(Image.open(io.BytesIO(f.read())))
                        f.seek(0)
                    except: pass

                if is_banner:
                    collage_hd = generer_collage_banniere(imgs, cols_b, W_PX, H_PX, gap_px)
                    fname = f"planche_{banner_choice.split('(')[0].strip().replace(' ','_')}_{cols_b}col_{n}imgs.jpg"
                else:
                    nb_r = min(nb_rangees, len(imgs))
                    collage_hd = generer_collage_libre(imgs, nb_r, seed, W_PX, H_PX)
                    fname = f"collage_{nb_r}rangees_seed{seed}.jpg"

                buf = io.BytesIO()
                collage_hd.save(buf, format="JPEG", quality=qualite, dpi=(dpi, dpi))
                buf.seek(0)

                st.download_button(
                    label="📥 Télécharger",
                    data=buf,
                    file_name=fname,
                    mime="image/jpeg",
                    use_container_width=True
                )
                st.success("✅ Prêt !")

else:
    st.markdown("""
    <div style="text-align:center; padding:5rem 2rem;">
        <div style="font-size:2.5rem; margin-bottom:1rem">🎨</div>
        <div style="font-family:'Poppins',sans-serif; font-size:1.2rem; font-weight:500; color:#3a3835; margin-bottom:0.5rem">
            Choisis un type de bannière dans la sidebar
        </div>
        <div style="font-size:0.85rem; color:#b0aba4; font-weight:300">
            puis glisse tes visuels ici pour générer ta planche
        </div>
    </div>
    """, unsafe_allow_html=True)
