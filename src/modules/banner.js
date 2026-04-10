/* ═══════════════════════════════════════════════════════════════════════════
   6. BANNER MODE
   ═══════════════════════════════════════════════════════════════════════════ */
function updateBannerCanvas() {
  const b = getBanner();
  if (!b) return;
  const cols = getCols();
  const n = Math.max(loadedImages.length, 1);
  const rows = Math.ceil(n / cols);
  const gap = getGap();
  let Wpx, Hpx;

  if (b.group === 'ratio') {
    const cellH = 400, cellW = Math.round(cellH * b.ratio);
    Wpx = cellW * cols + gap * (cols - 1);
    Hpx = cellH * rows + gap * (rows - 1);
  } else {
    Wpx = b.w * cols + gap * (cols - 1);
    Hpx = b.h * rows + gap * (rows - 1);
  }

  setFieldsFromPx(Wpx, Hpx);
  updateAllKPI();

  const rl = b.group === 'ratio' ? b.ratio.toFixed(2) : (b.w / b.h).toFixed(2);
  $('bannerCard').innerHTML =
    '<div class="banner-info">' +
    '<span class="tag tag-magenta">' + b.label + '</span>' +
    '<span class="tag tag-navy">' + b.desc + '</span>' +
    '<span class="tag tag-navy">Ratio ' + rl + '</span>' +
    '<span class="tag tag-blue">' + cols + ' col. x ' + rows + ' rangees</span>' +
    '<span class="tag tag-green">' + Wpx + ' x ' + Hpx + ' px</span>' +
    '</div>';
  $('bannerCard').classList.remove('hidden');
}

$('bannerType').addEventListener('change', function() {
  // Exiting BD mode → cleanup
  if (!isBDMode() && _bdCells.length) exitBDMode();

  // BD mode
  if (isBDMode()) {
    $('sectionLibre').classList.add('hidden');
    $('sectionBanner').classList.add('hidden');
    $('sectionSeed').classList.add('hidden');
    $('bannerCard').classList.add('hidden');
    $('optimalRow').classList.add('hidden');
    initBDMode();
    return;
  }

  const b = getBanner();
  // Ensure BD panels are hidden in non-BD modes
  $('cardBD').classList.add('hidden');
  $('cardBDAppearance').classList.add('hidden');
  $('cardGrid').classList.remove('hidden');
  $('cardNum').classList.remove('hidden');
  $('cardAppearance').classList.remove('hidden');
  $('bdOverlay').classList.remove('active');
  $('bdOverlay').innerHTML = '';

  if (b) {
    $('sectionLibre').classList.add('hidden');
    $('sectionBanner').classList.remove('hidden');
    $('sectionSeed').classList.add('hidden');
    $('cols').value = b.cols;
    $('colsVal').textContent = b.cols;
    $('optimalRow').classList.add('hidden');
    $('cardDim').classList.add('card-disabled');
    updateBannerCanvas();
  } else {
    $('sectionLibre').classList.remove('hidden');
    $('sectionBanner').classList.add('hidden');
    $('sectionSeed').classList.remove('hidden');
    $('bannerCard').classList.add('hidden');
    $('cardDim').classList.remove('card-disabled');
    if (loadedImages.length) $('optimalRow').classList.remove('hidden');
  }
  _lastRangees = null;
  updateAllKPI();
  scheduleAutoRefresh();
});
