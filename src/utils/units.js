/* ═══════════════════════════════════════════════════════════════════════════
   4. UNIT CONVERSION SYSTEM
   Strategy: internal storage in pixels.
   - Changing unit: recalculate display from stored pixels
   - Changing DPI when unit is physical: keep physical size, recalculate pixels
   - Changing DPI when unit is px: pixels stay, physical equivalent updates
   ═══════════════════════════════════════════════════════════════════════════ */
function getDPI()    { return parseInt($('dpi').value); }
function getUnite()  { return $('unite').value; }
function getRangees(){ return parseInt($('rangees').value); }
function getCols()   { return parseInt($('cols').value); }
function getGap()    { return parseInt($('gap').value); }
function getSeed()   { return parseInt($('seed').value); }
function getQualite(){ return parseInt($('qualite').value) / 100; }
function getBanner() { const v = $('bannerType').value; return v ? BANNERS[v] : null; }
function isBDMode() { const v = $('bannerType').value; return v.startsWith('bd_') || v.startsWith('manga_'); }
function getNumbering()  { return document.querySelector('input[name="numToggle"]:checked')?.value === 'on'; }
function getNumPos()     { return $('numPos')?.value || 'br'; }
function getNumStyle()   { return $('numStyle')?.value || 'white'; }
function getNumStart()   { return parseInt($('numStart')?.value) || 1; }
function getFitMode()    { return document.querySelector('input[name="fitMode"]:checked')?.value || 'cover'; }
function getBorderRadius(){ return parseInt($('borderRadius')?.value) || 0; }
function getImgBorder(){ return parseInt($('imgBorder')?.value) || 0; }
function getImgBorderColor(){ return $('imgBorderColor')?.value || '#1e1b3a'; }
function getImgShadow(){ return parseInt($('imgShadow')?.value) || 0; }
function getImgShadowColor(){ return $('imgShadowColor')?.value || '#000000'; }
function getExportFormat(){
  const v = document.querySelector('input[name="exportFmt"]:checked')?.value || 'jpeg';
  return v === 'jpeg' ? 'image/jpeg' : v === 'png' ? 'image/png' : 'image/webp';
}
function getExportExt(){
  const v = document.querySelector('input[name="exportFmt"]:checked')?.value || 'jpeg';
  return v === 'jpeg' ? '.jpg' : v === 'png' ? '.png' : '.webp';
}

function pxFromUnit(val, unit, dpi) {
  if (unit === 'px') return val;
  if (unit === 'cm') return val / 2.54 * dpi;
  if (unit === 'mm') return val / 25.4 * dpi;
  if (unit === 'in') return val * dpi;
  return val;
}
function unitFromPx(px, unit, dpi) {
  if (unit === 'px') return Math.round(px);
  if (unit === 'cm') return +(px / dpi * 2.54).toFixed(2);
  if (unit === 'mm') return +(px / dpi * 25.4).toFixed(1);
  if (unit === 'in') return +(px / dpi).toFixed(3);
  return Math.round(px);
}
function fmtVal(px, unit, dpi) {
  const v = unitFromPx(px, unit, dpi);
  const suffix = { px:'px', cm:'cm', mm:'mm', in:'"' };
  return v + (suffix[unit] || 'px');
}
function formatDim(wpx, hpx, dpi, unit) {
  return fmtVal(wpx, unit, dpi) + ' x ' + fmtVal(hpx, unit, dpi);
}

function onDimInput(source) {
  const u = getUnite(), dpi = getDPI();
  const wv = parseFloat($('width').value) || 0;
  const hv = parseFloat($('height').value) || 0;
  const newW = Math.round(pxFromUnit(wv, u, dpi));
  const newH = Math.round(pxFromUnit(hv, u, dpi));

  if ($('lockRatio').checked && _lockedRatio && source) {
    if (source === 'width') {
      _internalW = newW;
      _internalH = Math.round(newW / _lockedRatio);
      $('height').value = unitFromPx(_internalH, u, dpi);
    } else {
      _internalH = newH;
      _internalW = Math.round(newH * _lockedRatio);
      $('width').value = unitFromPx(_internalW, u, dpi);
    }
  } else {
    _internalW = newW;
    _internalH = newH;
  }
  updateAllKPI();
}

function onUniteChange() {
  if (!_internalW) { onDimInput(); return; }
  const u = getUnite(), dpi = getDPI();
  $('width').value = unitFromPx(_internalW, u, dpi);
  $('height').value = unitFromPx(_internalH, u, dpi);
  updateStepForUnit(u);
  updateAllKPI();
  scheduleAutoRefresh();
}

function onDpiChange() {
  const u = getUnite(), dpi = getDPI();
  if (u !== 'px' && _internalW) {
    const wPhys = parseFloat($('width').value) || 0;
    const hPhys = parseFloat($('height').value) || 0;
    _internalW = Math.round(pxFromUnit(wPhys, u, dpi));
    _internalH = Math.round(pxFromUnit(hPhys, u, dpi));
  }
  updateAllKPI();
  scheduleAutoRefresh();
}

function updateStepForUnit(u) {
  const step = u === 'px' ? '1' : u === 'mm' ? '1' : u === 'in' ? '0.01' : '0.1';
  $('width').step = step;
  $('height').step = step;
}

function setFieldsFromPx(wpx, hpx) {
  _internalW = wpx;
  _internalH = hpx;
  const u = getUnite(), dpi = getDPI();
  $('width').value = unitFromPx(wpx, u, dpi);
  $('height').value = unitFromPx(hpx, u, dpi);
}

function getWH() {
  if (isBDMode()) return { W: _bdCanvasW, H: _bdCanvasH };
  const b = getBanner();
  if (b) {
    const cols = getCols();
    const n = Math.max(loadedImages.length, 1);
    const rows = Math.ceil(n / cols);
    const gap = getGap();
    if (b.group === 'ratio') {
      const cellH = 400, cellW = Math.round(cellH * b.ratio);
      return { W: cellW * cols + gap * (cols - 1), H: cellH * rows + gap * (rows - 1) };
    }
    return { W: b.w * cols + gap * (cols - 1), H: b.h * rows + gap * (rows - 1) };
  }
  if (!_internalW) {
    const u = getUnite(), dpi = getDPI();
    const wv = parseFloat($('width').value) || 60;
    const hv = parseFloat($('height').value) || 80;
    _internalW = Math.round(pxFromUnit(wv, u, dpi));
    _internalH = Math.round(pxFromUnit(hv, u, dpi));
  }
  return { W: _internalW, H: _internalH };
}
