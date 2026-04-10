/* ═══════════════════════════════════════════════════════════════════════════
   13. GENERATION & EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */
async function genererCollage(isPreview) {
  if (isBDMode()) { renderBDCanvas(false); return; }
  if (!loadedImages.length) { toast('Chargez des visuels d\'abord'); return; }
  const b = getBanner();
  const { W, H } = getWH();
  const scale = isPreview ? Math.max(1, Math.ceil(Math.max(W, H) / 1200)) : 1;
  const Wp = Math.max(Math.round(W / scale), 200);
  const Hp = Math.max(Math.round(H / scale), 150);
  const canvas = $('previewCanvas');
  _lastRenderScale = scale;

  $('btnPreview').disabled = true;
  $('btnExport').disabled = true;
  setProgress(1, 'Demarrage...');

  const gapScaled = isPreview ? Math.round(getGap() / scale) : getGap();

  if (b) {
    await drawCollageBanniere(canvas, loadedImages, getCols(), Wp, Hp, gapScaled, _bgColor, true);
  } else {
    await drawCollageLibre(canvas, loadedImages, getRangees(), getSeed(), Wp, Hp, gapScaled, _bgColor, true);
  }

  setProgress(100, 'Termine');
  setTimeout(() => setProgress(0, ''), 800);
  $('previewWrap').classList.remove('hidden');
  $('canvasWrap').classList.add('editable');
  $('shareRow').classList.remove('hidden');

  // Restore current zoom level instead of resetting to 'fit'
  const zoomBtn = document.querySelector('.zoom-btn[onclick*="' + _currentZoom + '"]') || document.querySelector('.zoom-btn');
  setZoom(_currentZoom, zoomBtn);

  // Build drag-and-drop overlays on preview cells
  requestAnimationFrame(() => buildCellOverlays());

  const adjCount = Object.keys(_adjustments).length;
  $('infoBox').innerHTML =
    '<strong>' + formatDim(W, H, getDPI(), getUnite()) + '</strong> &middot; ' +
    W.toLocaleString() + ' x ' + H.toLocaleString() + ' px &middot; ' + getDPI() + ' DPI<br>' +
    loadedImages.length + ' visuel(s) &middot; ' +
    (b ? getCols() + ' colonnes' : getRangees() + ' rangees &middot; seed ' + getSeed()) +
    (adjCount ? ' &middot; <span style="color:var(--green)">' + adjCount + ' cadrage(s) ajuste(s)</span>' : '') +
    (isPreview ? ' <em style="color:var(--text-muted)">(apercu 1/' + scale + 'e)</em>' : '');

  $('btnPreview').disabled = false;
  $('btnExport').disabled = false;

  // Stop pulse and mark as having a preview
  _hasPreview = true;
  $('btnPreview').classList.remove('btn-pulse');
}

function genererPreview() { genererCollage(true); }

// Auto-refresh: debounced re-render on setting change (only if preview exists)
function scheduleAutoRefresh() {
  if (isBDMode() || !_hasPreview || !loadedImages.length) return;
  clearTimeout(_autoRefreshTimer);
  _autoRefreshTimer = setTimeout(() => genererPreview(), 350);
}

async function genererExport() {
  // BD Mode export
  if (isBDMode()) {
    $('btnExport').disabled = true;
    setProgress(1, 'Generation HD planche...');
    const hdCanvas = renderBDCanvas(true);
    setProgress(100, 'Export...');
    const fmt = getExportFormat();
    const ext = getExportExt();
    const q = fmt === 'image/png' ? undefined : getQualite();
    hdCanvas.toBlob(blob => {
      if (!blob) { toast('Export echoue'); $('btnExport').disabled = false; return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const spreadSuffix = _bdSpread ? '-double-page' : '';
      a.download = 'planche-bd' + spreadSuffix + '-' + _bdCells.length + 'cases' + ext;
      a.click();
      URL.revokeObjectURL(url);
      toast('Planche telecharge ! (' + (blob.size / 1048576).toFixed(1) + ' Mo)');
      setTimeout(() => setProgress(0, ''), 500);
      $('btnExport').disabled = false;
    }, fmt, q);
    return;
  }

  if (!loadedImages.length) return;
  const b = getBanner();
  const { W, H } = getWH();
  const hdCanvas = document.createElement('canvas');

  $('btnExport').disabled = true;
  setProgress(1, 'Generation HD...');

  if (b) {
    await drawCollageBanniere(hdCanvas, loadedImages, getCols(), W, H, getGap(), _bgColor, false);
  } else {
    await drawCollageLibre(hdCanvas, loadedImages, getRangees(), getSeed(), W, H, getGap(), _bgColor, false);
  }

  setProgress(100, 'Export...');

  if (!hdCanvas.width || !hdCanvas.height) {
    toast('Canvas invalide');
    $('btnExport').disabled = false;
    setProgress(0, '');
    return;
  }

  // Show in preview
  const prev = $('previewCanvas');
  prev.width = hdCanvas.width;
  prev.height = hdCanvas.height;
  prev.getContext('2d').drawImage(hdCanvas, 0, 0);
  $('previewWrap').classList.remove('hidden');
  $('shareRow').classList.remove('hidden');

  // Restore current zoom level instead of resetting to 'fit'
  const zoomBtnExp = document.querySelector('.zoom-btn[onclick*="' + _currentZoom + '"]') || document.querySelector('.zoom-btn');
  setZoom(_currentZoom, zoomBtnExp);

  $('infoBox').innerHTML =
    '<strong>' + formatDim(W, H, getDPI(), getUnite()) + '</strong> &middot; ' +
    W.toLocaleString() + ' x ' + H.toLocaleString() + ' px &middot; ' + getDPI() + ' DPI<br>' +
    loadedImages.length + ' visuel(s) &middot; ' +
    (b ? getCols() + ' colonnes' : getRangees() + ' rangees &middot; seed ' + getSeed());

  const fmt = getExportFormat();
  const ext = getExportExt();
  const q = fmt === 'image/png' ? undefined : getQualite();

  hdCanvas.toBlob(blob => {
    if (!blob) { toast('Export echoue'); $('btnExport').disabled = false; return; }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const prefix = b ? 'planche_' + b.label.replace(/\s/g, '_') + '_' + getCols() + 'col' : 'collage_' + getRangees() + 'r_seed' + getSeed();
    a.href = url;
    a.download = prefix + '_' + loadedImages.length + 'imgs' + ext;
    a.click();
    URL.revokeObjectURL(url);
    const sizeMB = (blob.size / 1048576).toFixed(1);
    toast('Telecharge ! (' + sizeMB + ' Mo)');
    setTimeout(() => setProgress(0, ''), 500);
    $('btnExport').disabled = false;
    // Restore preview at correct scale so overlays/handles are positioned properly
    setTimeout(() => genererPreview(), 200);
  }, fmt, q);
}
