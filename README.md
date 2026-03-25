# PhotoCollage Studio

Générateur de collages photo haute résolution, déployable sur Streamlit Cloud.

## Lancer en local

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Déployer sur Streamlit Cloud (gratuit)

1. Push ce dossier sur un repo GitHub public
2. Va sur https://share.streamlit.io
3. Connecte ton GitHub → sélectionne le repo → `app.py`
4. Clique **Deploy** — l'URL est prête en 2 minutes

## Fonctionnalités

- Upload multi-photos (JPG, PNG, WEBP)
- Choix du format en cm (jusqu'à 300×300 cm)
- Choix du DPI (72 / 150 / 300)
- Nombre de rangées ajustable (2–10)
- Seed pour varier la composition
- Prévisualisation instantanée (basse résolution)
- Export JPEG haute résolution avec métadonnées DPI
- Correction automatique de l'orientation EXIF
