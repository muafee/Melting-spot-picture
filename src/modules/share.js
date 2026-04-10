/* ═══════════════════════════════════════════════════════════════════════════
   18. SHARE & EXPORT TO PLATFORMS
   ═══════════════════════════════════════════════════════════════════════════ */
let _lastExportBlob = null;
let _lastExportUrl = null;

function getExportBlob() {
  return new Promise(resolve => {
    const canvas = $('previewCanvas');
    if (!canvas.width || !canvas.height) { resolve(null); return; }
    canvas.toBlob(blob => resolve(blob), getExportFormat(), getQualite());
  });
}

async function shareNative() {
  const blob = await getExportBlob();
  if (!blob) { toast('Generez un apercu d\'abord'); return; }
  const file = new File([blob], 'collage' + getExportExt(), { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'Collage Studio Pro',
        text: 'Collage genere avec Collage Studio Pro — Antalis'
      });
      toast('Partage reussi !');
    } catch (err) {
      if (err.name !== 'AbortError') toast('Partage annule');
    }
  } else {
    toast('Le partage natif n\'est pas disponible sur ce navigateur. Utilisez "Copier" puis collez dans l\'app de votre choix.');
  }
}

async function copyToClipboard() {
  try {
    const canvas = $('previewCanvas');
    if (!canvas.width) { toast('Generez un apercu d\'abord'); return; }
    const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    toast('Image copiee dans le presse-papiers !');
  } catch (err) {
    toast('Copie non supportee dans ce navigateur');
  }
}

