/* ═══════════════════════════════════════════════════════════════════════════
   5. KPI & QUALITY UPDATES
   ═══════════════════════════════════════════════════════════════════════════ */
function updateAllKPI() {
  const { W, H } = getWH();
  const dpi = getDPI(), u = getUnite();
  const mpx = (W * H / 1e6).toFixed(1);

  $('kpiPx').textContent = W.toLocaleString() + ' x ' + H.toLocaleString();
  $('kpiMpx').textContent = mpx;
  $('kpiPhys').textContent = formatDim(W, H, dpi, u);
  $('kpiDpi').textContent = dpi;

  // Quality indicator
  updateQualityIndicator(W, H);
  updateStats();
}

function updateQualityIndicator(W, H) {
  const n = loadedImages.length || 1;
  const pxPerImg = (W * H) / n;
  const mpxPerImg = pxPerImg / 1e6;
  let pct, color, hint;

  if (mpxPerImg >= 2) {
    pct = 100; color = 'var(--green)';
    hint = 'Excellente qualite (' + mpxPerImg.toFixed(1) + ' Mpx/image)';
  } else if (mpxPerImg >= 0.5) {
    pct = 60 + (mpxPerImg / 2) * 40; color = 'var(--orange)';
    hint = 'Qualite correcte (' + mpxPerImg.toFixed(1) + ' Mpx/image)';
  } else {
    pct = Math.max(10, mpxPerImg / 0.5 * 60); color = 'var(--red)';
    hint = 'Qualite faible (' + mpxPerImg.toFixed(2) + ' Mpx/image) — augmentez les dimensions';
  }

  const fill = $('qualityFill');
  fill.style.width = Math.min(100, pct) + '%';
  fill.style.background = color;
  $('qualityHint').textContent = hint;
}

function updateStats() {
  const n = loadedImages.length;
  if (!n) return;
  const b = getBanner();
  const { W, H } = getWH();
  if (b) {
    const c = getCols(), rows = Math.ceil(n / c);
    $('sRows').textContent = rows;
    $('sCols').textContent = c;
    $('sRowsLbl').textContent = 'Rangees';
    $('sColsLbl').textContent = 'Colonnes';
  } else {
    const r = getRangees();
    $('sRows').textContent = r;
    $('sCols').textContent = Math.ceil(n / r);
    $('sRowsLbl').textContent = 'Rangees';
    $('sColsLbl').textContent = 'Par rangee';
  }
  $('sFormat').textContent = formatDim(W, H, getDPI(), getUnite());
}
