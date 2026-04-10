/* ═══════════════════════════════════════════════════════════════════════════
   1. CONFIGURATION & CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */
const BANNERS = {
  ratio_1_1:    { ratio:1,        cols:4, label:'Carre 1:1',        desc:'1000x1000',    group:'ratio' },
  ratio_5_4:    { ratio:5/4,      cols:4, label:'Paysage 5:4',      desc:'1250x1000',    group:'ratio' },
  ratio_4_3:    { ratio:4/3,      cols:3, label:'Paysage 4:3',      desc:'1600x1200',    group:'ratio' },
  ratio_3_2:    { ratio:3/2,      cols:3, label:'Paysage 3:2',      desc:'1500x1000',    group:'ratio' },
  ratio_5_3:    { ratio:5/3,      cols:3, label:'Paysage 5:3',      desc:'1500x900',     group:'ratio' },
  ratio_16_10:  { ratio:16/10,    cols:3, label:'Paysage 16:10',    desc:'1920x1200',    group:'ratio' },
  ratio_16_9:   { ratio:16/9,     cols:3, label:'Paysage 16:9',     desc:'1920x1080',    group:'ratio' },
  ratio_2_1:    { ratio:2,        cols:3, label:'Paysage 2:1',      desc:'2000x1000',    group:'ratio' },
  ratio_21_9:   { ratio:21/9,     cols:2, label:'Ultrawide 21:9',   desc:'2520x1080',    group:'ratio' },
  ratio_32_9:   { ratio:32/9,     cols:2, label:'Ultrawide 32:9',   desc:'3840x1080',    group:'ratio' },
  ratio_4_5:    { ratio:4/5,      cols:4, label:'Portrait 4:5',     desc:'1080x1350',    group:'ratio' },
  ratio_3_4:    { ratio:3/4,      cols:4, label:'Portrait 3:4',     desc:'1200x1600',    group:'ratio' },
  ratio_2_3:    { ratio:2/3,      cols:4, label:'Portrait 2:3',     desc:'1000x1500',    group:'ratio' },
  ratio_9_16:   { ratio:9/16,     cols:4, label:'Portrait 9:16',    desc:'1080x1920',    group:'ratio' },
  ratio_1_2:    { ratio:1/2,      cols:5, label:'Portrait 1:2',     desc:'600x1200',     group:'ratio' },
  // BD / Manga formats
  bd_a4_portrait: { w:2480, h:3508, cols:1, label:'A4 Portrait',       desc:'2480x3508 (300DPI)', group:'bd' },
  bd_a4_paysage:  { w:3508, h:2480, cols:1, label:'A4 Paysage',        desc:'3508x2480',          group:'bd' },
  bd_a3_portrait: { w:3508, h:4961, cols:1, label:'A3 Portrait',       desc:'3508x4961',          group:'bd' },
  bd_us_portrait: { w:1988, h:3075, cols:1, label:'US Comics',         desc:'1988x3075',          group:'bd' },
  manga_tankobon: { w:1772, h:2598, cols:1, label:'Manga Tankobon B6', desc:'1772x2598',          group:'bd' },
};

const PRESETS = [
  // Print
  { label:'A4',      w:210, h:297, unit:'mm', group:'Impression' },
  { label:'A3',      w:297, h:420, unit:'mm', group:'Impression' },
  { label:'A2',      w:420, h:594, unit:'mm', group:'Impression' },
  { label:'A1',      w:594, h:841, unit:'mm', group:'Impression' },
  { label:'A0',      w:841, h:1189,unit:'mm', group:'Impression' },
  { label:'Letter',  w:8.5, h:11,  unit:'in', group:'Impression' },
  // Screen
  { label:'Full HD', w:1920,h:1080,unit:'px', group:'Ecran' },
  { label:'4K',      w:3840,h:2160,unit:'px', group:'Ecran' },
  // Instagram
  { label:'Insta Post',    w:1080,h:1080,unit:'px', group:'Instagram' },
  { label:'Insta Portrait', w:1080,h:1350,unit:'px', group:'Instagram' },
  { label:'Insta Paysage', w:1080,h:566, unit:'px', group:'Instagram' },
  { label:'Insta Story',   w:1080,h:1920,unit:'px', group:'Instagram' },
  // Facebook
  { label:'FB Post',       w:1200,h:630, unit:'px', group:'Facebook' },
  { label:'FB Cover',      w:820, h:312, unit:'px', group:'Facebook' },
  { label:'FB Story',      w:1080,h:1920,unit:'px', group:'Facebook' },
  { label:'FB Event',      w:1920,h:1080,unit:'px', group:'Facebook' },
  // TikTok
  { label:'TikTok',        w:1080,h:1920,unit:'px', group:'TikTok' },
  { label:'TikTok Paysage',w:1920,h:1080,unit:'px', group:'TikTok' },
  // X / Twitter
  { label:'X Post',        w:1600,h:900, unit:'px', group:'X / Twitter' },
  { label:'X Header',      w:1500,h:500, unit:'px', group:'X / Twitter' },
  // LinkedIn
  { label:'LinkedIn Post',  w:1200,h:627, unit:'px', group:'LinkedIn' },
  { label:'LinkedIn Cover', w:1584,h:396, unit:'px', group:'LinkedIn' },
  { label:'LinkedIn Story', w:1080,h:1920,unit:'px', group:'LinkedIn' },
  // Pinterest
  { label:'Pin Standard',  w:1000,h:1500,unit:'px', group:'Pinterest' },
  { label:'Pin Carre',     w:1000,h:1000,unit:'px', group:'Pinterest' },
  { label:'Pin Long',      w:1000,h:2100,unit:'px', group:'Pinterest' },
  // YouTube
  { label:'YT Thumbnail',  w:1280,h:720, unit:'px', group:'YouTube' },
  { label:'YT Banner',     w:2560,h:1440,unit:'px', group:'YouTube' },
];

const RATIO_STDS = [
  {l:'1:1',v:1},{l:'4:3',v:4/3},{l:'3:2',v:3/2},{l:'5:4',v:5/4},{l:'5:3',v:5/3},
  {l:'16:9',v:16/9},{l:'16:10',v:16/10},{l:'2:1',v:2},{l:'21:9',v:21/9},
  {l:'3:4',v:3/4},{l:'2:3',v:2/3},{l:'4:5',v:4/5},{l:'9:16',v:9/16},{l:'1:2',v:1/2},
];
const RATIO_KEY_MAP = {
  '1:1':'ratio_1_1','5:4':'ratio_5_4','4:3':'ratio_4_3','3:2':'ratio_3_2',
  '5:3':'ratio_5_3','16:10':'ratio_16_10','16:9':'ratio_16_9','2:1':'ratio_2_1',
  '21:9':'ratio_21_9','4:5':'ratio_4_5','3:4':'ratio_3_4','2:3':'ratio_2_3',
  '9:16':'ratio_9_16','1:2':'ratio_1_2'
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════════════════════════════ */
let loadedImages = [];
let originalOrder = [];
let _internalW = 0;
let _internalH = 0;
let _bgColor = '#ffffff';
let _currentZoom = 'fit';
let _lockedRatio = null;

// Per-image crop adjustments: Map<imgIndex, { zoom, focusX, focusY }>
let _adjustments = {};
// Cell map from last render: [{ imgIdx, x, y, w, h }]
let _cellMap = [];
let _lastRenderScale = 1;
let _lastRangees = null;       // stored rangées for swap re-render
let _forceRangees = null;      // if set, drawCollageLibre uses this instead of computing
let _hasPreview = false;       // true once first preview has been generated
let _autoRefreshTimer = null;  // debounce timer for auto-refresh

// BD / Manga state
let _bdCells = [];
let _bdBubbles = [];
let _bdSelection = { type: null, id: null };
let _bdMultiSelect = []; // array of cell IDs for multi-selection (Shift+Click)
let _bdDragState = null;
let _bdCanvasW = 0;
let _bdCanvasH = 0;
let _bdRenderScale = 1;
let _bdCellIdCounter = 0;
let _bdBubbleIdCounter = 0;
let _bdMarginPct = 4;
let _bdSnapLines = [];
let _cropForBDCell = null;
let _bdUndoStack = [];
let _bdRedoStack = [];
const BD_UNDO_MAX = 40;
let _bdSpread = false; // false = page unique, true = double page (spread)
let _bdPageNum = false; // page numbering enabled

// BD Pan/Zoom state
let _bdZoom = 1;         // Current zoom scale (display / canvas pixels)
let _bdIsPanning = false; // Currently space-bar panning
let _bdPanStartX = 0;
let _bdPanStartY = 0;
let _bdPanStartOX = 0;   // scroll positions at pan start
let _bdPanStartOY = 0;

/* ═══════════════════════════════════════════════════════════════════════════
   2b. RENDER SCHEDULER — Batches render calls via requestAnimationFrame
   ═══════════════════════════════════════════════════════════════════════════ */
let _renderRAF = 0;
let _renderQueued = false;

function scheduleRender() {
  if (_renderQueued) return;
  _renderQueued = true;
  cancelAnimationFrame(_renderRAF);
  _renderRAF = requestAnimationFrame(() => {
    _renderQueued = false;
    renderBDCanvas(false);
  });
}

function debounce(fn, ms) {
  let t;
  return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. DOM HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);

function toggleCard(id) {
  $(id).classList.toggle('collapsed');
}

function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

function setProgress(pct, label) {
  $('progressBar').style.width = pct + '%';
  $('progressLabel').textContent = label;
  $('progressWrap').classList.toggle('visible', pct > 0 && pct < 100);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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
  if (!isBDMode() && document.querySelector('.app-shell').classList.contains('bd-active')) exitBDMode();

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

/* ═══════════════════════════════════════════════════════════════════════════
   7. IMAGE MANAGEMENT
   ═══════════════════════════════════════════════════════════════════════════ */
function handleFiles(files) {
  const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
  if (!arr.length) { toast('Aucune image valide'); return; }

  // Show loading overlay for heavy loads (>5 images or >5MB total)
  const totalSize = arr.reduce((s, f) => s + f.size, 0);
  const showLoader = arr.length > 5 || totalSize > 5 * 1024 * 1024;
  if (showLoader) {
    $('loadingText').textContent = 'Chargement de ' + arr.length + ' image' + (arr.length > 1 ? 's' : '') + '...';
    $('loadingSub').textContent = (totalSize / (1024 * 1024)).toFixed(1) + ' Mo';
    $('loadingOverlay').classList.add('active');
  }

  // Append mode: keep existing images
  let loaded = 0;
  const total = arr.length;
  const grid = $('thumbsGrid');

  arr.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const entry = {
          img, name: file.name, src: e.target.result,
          ratio: img.naturalWidth / img.naturalHeight,
          w: img.naturalWidth, h: img.naturalHeight,
          size: file.size,
          _origIdx: loadedImages.length
        };
        loadedImages.push(entry);
        originalOrder.push(entry);
        appendThumb(entry, loadedImages.length - 1);
        loaded++;
        if (showLoader) $('loadingSub').textContent = loaded + ' / ' + total;
        if (loaded === total) {
          if (showLoader) $('loadingOverlay').classList.remove('active');
          onImagesReady();
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function appendThumb(entry, idx) {
  const grid = $('thumbsGrid');
  const wrap = document.createElement('div');
  wrap.className = 'thumb-wrap';
  wrap.dataset.idx = idx;
  wrap.draggable = true;

  const handle = document.createElement('span');
  handle.className = 'thumb-handle';
  handle.innerHTML = '<svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="1.6" rx=".8"/><rect x="3" y="7.2" width="10" height="1.6" rx=".8"/><rect x="3" y="11.4" width="10" height="1.6" rx=".8"/></svg>';

  const thumb = document.createElement('img');
  thumb.src = entry.src;
  thumb.className = 'thumb';
  thumb.title = entry.name + ' (' + entry.w + 'x' + entry.h + ')';

  const idxLabel = document.createElement('span');
  idxLabel.className = 'thumb-idx';
  idxLabel.textContent = idx + 1;

  // Adjusted indicator
  if (_adjustments[idx]) {
    const adj = document.createElement('span');
    adj.className = 'thumb-adjusted';
    adj.textContent = '✓';
    adj.title = 'Cadrage ajuste';
    wrap.appendChild(adj);
  }

  const del = document.createElement('button');
  del.className = 'thumb-del';
  del.textContent = 'x';
  del.onclick = e => { e.stopPropagation(); removeImage(parseInt(wrap.dataset.idx)); };

  // Drag events
  wrap.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', wrap.dataset.idx);
    e.dataTransfer.effectAllowed = 'move';
    requestAnimationFrame(() => wrap.classList.add('dragging'));
  });
  wrap.addEventListener('dragend', () => {
    wrap.classList.remove('dragging');
    document.querySelectorAll('.thumb-wrap.drag-over').forEach(el => el.classList.remove('drag-over'));
  });
  wrap.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    wrap.classList.add('drag-over');
  });
  wrap.addEventListener('dragleave', () => wrap.classList.remove('drag-over'));
  wrap.addEventListener('drop', e => {
    e.preventDefault();
    wrap.classList.remove('drag-over');
    const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
    const toIdx = parseInt(wrap.dataset.idx);
    if (!isNaN(fromIdx) && !isNaN(toIdx) && fromIdx !== toIdx) {
      if (!getBanner() && _lastRangees) {
        _forceRangees = _lastRangees.map(r => [...r]);
      }
      swapImages(fromIdx, toIdx);
      scheduleAutoRefresh();
    }
  });

  // Hover zoom tooltip
  wrap.addEventListener('mouseenter', () => {
    let tip = document.getElementById('bdZoomTooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'bdZoomTooltip';
      tip.className = 'bd-zoom-tooltip';
      const tipImg = document.createElement('img');
      tip.appendChild(tipImg);
      document.body.appendChild(tip);
    }
    tip.querySelector('img').src = entry.src;
    const rect = wrap.getBoundingClientRect();
    tip.style.left = (rect.right + 12) + 'px';
    tip.style.top = Math.max(8, rect.top) + 'px';
    tip.classList.add('visible');
  });
  wrap.addEventListener('mouseleave', () => {
    const tip = document.getElementById('bdZoomTooltip');
    if (tip) tip.classList.remove('visible');
  });

  wrap.append(handle, thumb, idxLabel, del);
  grid.appendChild(wrap);
}

function rebuildThumbs() {
  const grid = $('thumbsGrid');
  grid.innerHTML = '';
  loadedImages.forEach((entry, i) => appendThumb(entry, i));
}

function removeImage(idx) {
  const removed = loadedImages.splice(idx, 1)[0];
  const oi = originalOrder.indexOf(removed);
  if (oi > -1) originalOrder.splice(oi, 1);
  // Clean adjustments and shift indices
  delete _adjustments[idx];
  const newAdj = {};
  for (const k in _adjustments) {
    const ki = parseInt(k);
    if (ki > idx) newAdj[ki - 1] = _adjustments[k];
    else newAdj[ki] = _adjustments[k];
  }
  _adjustments = newAdj;
  _lastRangees = null;
  rebuildThumbs();
  if (!loadedImages.length) {
    $('statsRow').classList.add('hidden');
    $('thumbsWrap').classList.add('hidden');
    $('btnRow').classList.add('hidden');
    $('optimalRow').classList.add('hidden');
    $('dropCount').classList.remove('visible');
    // previewWrap toujours visible dans layout 3 colonnes
    $('shareRow').classList.add('hidden');
    _cellMap = [];
    $('cellOverlays').innerHTML = '';
  } else {
    updateImageCount();
    updateStats();
    if (getBanner()) updateBannerCanvas();
    scheduleAutoRefresh();
  }
  toast(loadedImages.length + ' visuel(s) restant(s)');
  bd_updateThumbsVertical();
}

function clearAllImages() {
  loadedImages = [];
  originalOrder = [];
  _adjustments = {};
  _cellMap = [];
  _lastRangees = null;
  _hasPreview = false;
  $('thumbsGrid').innerHTML = '';
  $('cellOverlays').innerHTML = '';
  $('statsRow').classList.add('hidden');
  $('thumbsWrap').classList.add('hidden');
  $('btnRow').classList.add('hidden');
  // previewWrap toujours visible dans layout 3 colonnes
  $('optimalRow').classList.add('hidden');
  $('shareRow').classList.add('hidden');
  $('dropCount').classList.remove('visible');
  $('fileInput').value = '';
  toast('Visuels supprimes');
  bd_updateThumbsVertical();
}

function onImagesReady() {
  const n = loadedImages.length;
  if (!n) return;
  $('statsRow').classList.remove('hidden');
  $('thumbsWrap').classList.remove('hidden');
  $('btnRow').classList.remove('hidden');
  $('optimalRow').classList.toggle('hidden', !!getBanner());
  $('optimalResult').classList.add('hidden');
  updateImageCount();
  updateStats();
  updateAllKPI();
  if (getBanner()) updateBannerCanvas();

  // Pulse the preview button on first image load to invite user to click
  if (!_hasPreview) {
    $('btnPreview').classList.add('btn-pulse');
  }

  toast(n + ' visuel(s) charges');
  bd_updateThumbsVertical();
}

function updateImageCount() {
  const n = loadedImages.length;
  $('sNb').textContent = n;
  $('dropCount').textContent = n;
  $('dropCount').classList.toggle('visible', n > 0);
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. IMAGE SORTING
   ═══════════════════════════════════════════════════════════════════════════ */
function sortImages(mode, btn) {
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (mode === 'original') {
    loadedImages = [...originalOrder];
  } else if (mode === 'name') {
    loadedImages.sort((a, b) => a.name.localeCompare(b.name));
  } else if (mode === 'ratio') {
    loadedImages.sort((a, b) => b.ratio - a.ratio);
  } else if (mode === 'size') {
    loadedImages.sort((a, b) => b.size - a.size);
  }
  _lastRangees = null; // layout invalidated
  rebuildThumbs();
  scheduleAutoRefresh();
  bd_updateThumbsVertical();
}

function swapImages(fromIdx, toIdx) {
  // Swap images
  [loadedImages[fromIdx], loadedImages[toIdx]] = [loadedImages[toIdx], loadedImages[fromIdx]];
  // Swap adjustments
  const adjA = _adjustments[fromIdx];
  const adjB = _adjustments[toIdx];
  delete _adjustments[fromIdx];
  delete _adjustments[toIdx];
  if (adjA) _adjustments[toIdx] = adjA;
  if (adjB) _adjustments[fromIdx] = adjB;
  rebuildThumbs();
  bd_updateThumbsVertical();
  toast('Images ' + (fromIdx + 1) + ' ↔ ' + (toIdx + 1) + ' echangees');
}

/* ── CELL OVERLAYS (drag handles on preview canvas) ── */
function buildCellOverlays() {
  const container = $('cellOverlays');
  container.innerHTML = '';
  if (!_cellMap.length || isBDMode()) return;

  const canvas = $('previewCanvas');
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width / canvas.width;
  const scaleY = rect.height / canvas.height;

  // Position overlay container to match canvas
  container.style.width = rect.width + 'px';
  container.style.height = rect.height + 'px';
  container.style.top = (canvas.offsetTop) + 'px';
  container.style.left = (canvas.offsetLeft) + 'px';

  _cellMap.forEach(cell => {
    const div = document.createElement('div');
    div.className = 'cell-overlay';
    div.dataset.imgIdx = cell.imgIdx;
    div.style.left = (cell.x * scaleX) + 'px';
    div.style.top = (cell.y * scaleY) + 'px';
    div.style.width = (cell.w * scaleX) + 'px';
    div.style.height = (cell.h * scaleY) + 'px';

    const handle = document.createElement('span');
    handle.className = 'cell-drag-handle';
    handle.innerHTML = '<svg viewBox="0 0 16 16"><path d="M5 3h1v1H5zm3 0h1v1H8zm3 0h1v1h-1zM5 7h1v1H5zm3 0h1v1H8zm3 0h1v1h-1zM5 11h1v1H5zm3 0h1v1H8zm3 0h1v1h-1z"/></svg>';
    handle.draggable = true;

    // Make the whole overlay draggable from the handle
    handle.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', cell.imgIdx);
      e.dataTransfer.effectAllowed = 'move';
      requestAnimationFrame(() => div.classList.add('dragging-cell'));
    });
    handle.addEventListener('dragend', () => {
      div.classList.remove('dragging-cell');
      container.querySelectorAll('.drag-over-cell').forEach(el => el.classList.remove('drag-over-cell'));
    });

    // Drop target: the whole overlay
    div.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      div.classList.add('drag-over-cell');
    });
    div.addEventListener('dragleave', () => div.classList.remove('drag-over-cell'));
    div.addEventListener('drop', e => {
      e.preventDefault();
      div.classList.remove('drag-over-cell');
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const toIdx = parseInt(div.dataset.imgIdx);
      if (!isNaN(fromIdx) && !isNaN(toIdx) && fromIdx !== toIdx) {
        // In collage libre: reuse SAME rangées — the swap in loadedImages
        // is enough to visually swap images without re-shuffling the layout
        if (!getBanner() && _lastRangees) {
          _forceRangees = _lastRangees.map(r => [...r]);
        }
        swapImages(fromIdx, toIdx);
        genererPreview();
      }
    });

    // Click (not on handle) → crop editor
    div.addEventListener('click', e => {
      if (e.target === handle || handle.contains(e.target)) return;
      openCropEditor(cell.imgIdx, cell.w / cell.h);
    });

    div.appendChild(handle);
    container.appendChild(div);
  });
}

// Rebuild overlays when canvas is resized or zoom changes
const _resizeObserver = new ResizeObserver(() => {
  if (isBDMode()) { bd_buildOverlay(); return; }
  if (_cellMap.length) buildCellOverlays();
});
_resizeObserver.observe(document.getElementById('canvasWrap'));

/* ═══════════════════════════════════════════════════════════════════════════
   9. SWATCH / COLORS
   ═══════════════════════════════════════════════════════════════════════════ */
function pickSwatch(el) {
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  _bgColor = el.dataset.color;
  scheduleAutoRefresh();
}
function pickCustomColor(input) {
  const swatch = input.parentElement;
  swatch.style.background = input.value;
  swatch.dataset.color = input.value;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  swatch.classList.add('active');
  _bgColor = input.value;
  scheduleAutoRefresh();
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. ZOOM CONTROL
   ═══════════════════════════════════════════════════════════════════════════ */
function setZoom(level, btn) {
  document.querySelectorAll('.zoom-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _currentZoom = level;
  const canvas = $('previewCanvas');

  if (isBDMode()) {
    // BD mode: CSS width sizing (no transform — overlays stay in sync)
    const wrap = $('canvasWrap');
    if (!wrap || !canvas.width) return;
    canvas.style.transform = '';

    if (level === 'fit') {
      _bdZoom = 1;
      // Fit the page to fill the container optimally
      const wrapRect = wrap.getBoundingClientRect();
      const padding = 16; // account for wrap padding
      const availW = wrapRect.width - padding;
      const availH = wrapRect.height - padding;
      const canvasAspect = canvas.width / canvas.height;
      const containerAspect = availW / availH;
      if (canvasAspect < containerAspect) {
        // Page is taller → fit by height
        canvas.style.height = availH + 'px';
        canvas.style.width = 'auto';
      } else {
        // Page is wider → fit by width
        canvas.style.width = availW + 'px';
        canvas.style.height = 'auto';
      }
      // Reset scroll to top-left
      wrap.scrollTop = 0;
      wrap.scrollLeft = 0;
    } else {
      const pct = level === '50' ? 0.5 : 1.0;
      const displayW = canvas.width * pct;
      canvas.style.width = displayW + 'px';
      canvas.style.height = 'auto';
      _bdZoom = pct;
      // Reset scroll to top-left for clean preset views
      requestAnimationFrame(() => { wrap.scrollTop = 0; wrap.scrollLeft = 0; });
    }
    bd_updateZoomIndicator();
    requestAnimationFrame(() => bd_buildOverlay());
  } else {
    // Normal mode: CSS sizing
    canvas.style.transform = '';
    if (level === 'fit') {
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
    } else if (level === '50') {
      canvas.style.width = (canvas.width * 0.5) + 'px';
      canvas.style.height = 'auto';
    } else {
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = 'auto';
    }
    requestAnimationFrame(() => { if (_cellMap.length) buildCellOverlays(); });
  }
}

// ── BD Zoom/Pan — CSS width + native scroll + Space bar ──
function bd_setZoomLevel(newZoom) {
  const canvas = $('previewCanvas');
  const wrap = $('canvasWrap');
  if (!canvas || !wrap || !canvas.width) return;
  _bdZoom = Math.max(0.1, Math.min(5, newZoom));
  const displayW = canvas.width * _bdZoom;
  canvas.style.width = displayW + 'px';
  canvas.style.height = 'auto';
  canvas.style.transform = '';
  bd_updateZoomIndicator();
  // Deselect button presets
  document.querySelectorAll('.zoom-btn').forEach(b => b.classList.remove('active'));
  requestAnimationFrame(() => bd_buildOverlay());
}

function bd_updateZoomIndicator() {
  const ind = $('bdZoomIndicator');
  if (!ind) return;
  const canvas = $('previewCanvas');
  if (!canvas || !canvas.width) return;
  // Actual display percentage = CSS width / canvas.width * 100
  const displayW = canvas.getBoundingClientRect().width;
  const pct = Math.round(displayW / canvas.width * 100);
  ind.textContent = pct + '%';
}

function bd_resetPanZoom() {
  _bdZoom = 1;
  const canvas = $('previewCanvas');
  if (canvas) {
    canvas.style.transform = '';
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
  }
  const wrap = $('canvasWrap');
  if (wrap) { wrap.scrollTop = 0; wrap.scrollLeft = 0; }
  bd_updateZoomIndicator();
}

function bd_initPanZoomEvents() {
  const wrap = $('canvasWrap');
  if (!wrap || wrap._bdPanZoomInit) return;
  wrap._bdPanZoomInit = true;

  // ── Mouse wheel zoom toward cursor position ──
  wrap.addEventListener('wheel', e => {
    if (!isBDMode()) return;
    e.preventDefault();
    const canvas = $('previewCanvas');
    if (!canvas || !canvas.width) return;

    // Get canvas display rect BEFORE resize
    const canvasRect = canvas.getBoundingClientRect();
    const oldDisplayW = canvasRect.width;
    const oldDisplayH = canvasRect.height;
    if (oldDisplayW <= 0) return;

    // Cursor position relative to canvas content (in canvas-pixel space)
    const cursorOnCanvasX = (e.clientX - canvasRect.left) / oldDisplayW;
    const cursorOnCanvasY = (e.clientY - canvasRect.top) / oldDisplayH;

    // New scale
    const oldScale = oldDisplayW / canvas.width;
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, oldScale * factor));
    const newDisplayW = canvas.width * newScale;
    const newDisplayH = canvas.height * newScale;

    // Apply new size
    canvas.style.width = newDisplayW + 'px';
    canvas.style.height = 'auto';
    _bdZoom = newScale;

    // After reflow: adjust scroll so cursor stays over the same content point
    requestAnimationFrame(() => {
      const wrapRect = wrap.getBoundingClientRect();
      // Where the cursor should point to in the new canvas display
      const targetScrollX = cursorOnCanvasX * newDisplayW - (e.clientX - wrapRect.left);
      const targetScrollY = cursorOnCanvasY * newDisplayH - (e.clientY - wrapRect.top);
      // Account for canvas offset within wrap (padding, centering)
      wrap.scrollLeft = Math.max(0, targetScrollX + canvas.offsetLeft);
      wrap.scrollTop = Math.max(0, targetScrollY + canvas.offsetTop);
      bd_updateZoomIndicator();
      bd_buildOverlay();
    });
  }, { passive: false });

  // ── Space bar = pan mode (grab + drag to scroll) ──
  let _spaceHeld = false;

  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && isBDMode() && !e.repeat) {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      e.preventDefault();
      _spaceHeld = true;
      wrap.classList.add('space-pan');
    }
  });
  document.addEventListener('keyup', e => {
    if (e.code === 'Space' && _spaceHeld) {
      _spaceHeld = false;
      wrap.classList.remove('space-pan', 'panning');
      _bdIsPanning = false;
    }
  });

  // ── Mouse pan (only when Space held or middle-click) ──
  wrap.addEventListener('mousedown', e => {
    if (!isBDMode()) return;
    const isMiddle = e.button === 1;
    if (!_spaceHeld && !isMiddle) return;
    e.preventDefault();
    _bdIsPanning = true;
    _bdPanStartX = e.clientX;
    _bdPanStartY = e.clientY;
    _bdPanStartOX = wrap.scrollLeft;
    _bdPanStartOY = wrap.scrollTop;
    wrap.classList.add('panning');
  });

  document.addEventListener('mousemove', e => {
    if (!_bdIsPanning) return;
    e.preventDefault();
    wrap.scrollLeft = _bdPanStartOX - (e.clientX - _bdPanStartX);
    wrap.scrollTop = _bdPanStartOY - (e.clientY - _bdPanStartY);
  });

  document.addEventListener('mouseup', () => {
    if (_bdIsPanning) {
      _bdIsPanning = false;
      wrap.classList.remove('panning');
    }
  });

  // ── Rebuild overlay on scroll ──
  wrap.addEventListener('scroll', () => {
    if (isBDMode()) {
      // Overlay is positioned relative to canvas offsetTop/Left which stays correct
      // No action needed since overlay is inside the scrollable wrap
    }
  });
}

function bd_zoomStep(delta) {
  if (!isBDMode()) return;
  const canvas = $('previewCanvas');
  const wrap = $('canvasWrap');
  if (!canvas || !wrap || !canvas.width) return;
  const oldDisplayW = canvas.getBoundingClientRect().width;
  const oldScale = oldDisplayW / canvas.width;
  const newScale = Math.max(0.1, Math.min(5, oldScale + delta));
  const newDisplayW = canvas.width * newScale;
  // Zoom toward center
  const centerX = wrap.scrollLeft + wrap.clientWidth / 2;
  const centerY = wrap.scrollTop + wrap.clientHeight / 2;
  const ratio = newDisplayW / oldDisplayW;
  canvas.style.width = newDisplayW + 'px';
  canvas.style.height = 'auto';
  _bdZoom = newScale;
  requestAnimationFrame(() => {
    wrap.scrollLeft = centerX * ratio - wrap.clientWidth / 2;
    wrap.scrollTop = centerY * ratio - wrap.clientHeight / 2;
    bd_updateZoomIndicator();
    bd_buildOverlay();
  });
  document.querySelectorAll('.zoom-btn').forEach(b => b.classList.remove('active'));
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. COLLAGE ALGORITHMS
   ═══════════════════════════════════════════════════════════════════════════ */
class SeededRandom {
  constructor(seed) { this.s = seed % 2147483647; if (this.s <= 0) this.s += 2147483646; }
  next() { this.s = this.s * 16807 % 2147483647; return (this.s - 1) / 2147483646; }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

function largestRemainder(vf, total) {
  const vi = vf.map(Math.floor);
  const r = vf.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]);
  let d = total - vi.reduce((a, b) => a + b, 0);
  for (let i = 0; i < d; i++) vi[r[i][1]]++;
  return vi;
}

function repartirEquilibre(ratios, nb, seed) {
  const rng = new SeededRandom(seed);
  let ordre = ratios.map((_, i) => i);
  rng.shuffle(ordre);
  ordre.sort((a, b) => ratios[a] - ratios[b]);
  const rangees = Array.from({ length: nb }, () => []);
  const sommes = new Array(nb).fill(0);
  for (const idx of ordre) {
    const r = sommes.indexOf(Math.min(...sommes));
    rangees[r].push(idx);
    sommes[r] += ratios[idx];
  }
  rangees.forEach(r => rng.shuffle(r));
  rng.shuffle(rangees);
  return rangees;
}

function calculerGrille(rangees, ratios, W, H) {
  let hf = rangees.map(r => W / Math.max(r.reduce((s, i) => s + ratios[i], 0), 0.001));
  const sh = hf.reduce((a, b) => a + b, 0);
  hf = hf.map(h => h * H / sh);
  const hauteurs = largestRemainder(hf, H);
  const lg = rangees.map((r, ri) => {
    const h = hauteurs[ri];
    let lf = r.map(i => ratios[i] * h);
    const sl = lf.reduce((a, b) => a + b, 0);
    lf = lf.map(w => w * W / Math.max(sl, 1));
    return largestRemainder(lf, W);
  });
  return { hauteurs, largeurs_g: lg };
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. CANVAS DRAWING
   ═══════════════════════════════════════════════════════════════════════════ */
function drawCover(ctx, img, x, y, w, h, radius, adj) {
  const nw = img.naturalWidth, nh = img.naturalHeight;
  const rd = w / h;

  // Base cover crop
  let baseSW, baseSH;
  if (nw / nh > rd) { baseSH = nh; baseSW = nh * rd; }
  else { baseSW = nw; baseSH = nw / rd; }

  // Apply per-image adjustment
  const zoom = (adj && adj.zoom) || 1;
  let sw = baseSW / zoom;
  let sh = baseSH / zoom;
  sw = Math.min(sw, nw);
  sh = Math.min(sh, nh);

  const fx = (adj && adj.focusX !== undefined) ? adj.focusX : 0.5;
  const fy = (adj && adj.focusY !== undefined) ? adj.focusY : 0.5;
  let sx = fx * nw - sw / 2;
  let sy = fy * nh - sh / 2;
  sx = Math.max(0, Math.min(nw - sw, sx));
  sy = Math.max(0, Math.min(nh - sh, sy));

  if (radius > 0) {
    ctx.save();
    roundRect(ctx, x, y, w, h, radius);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
}

function drawContain(ctx, img, x, y, w, h, bgColor, radius, adj) {
  const rs = img.naturalWidth / img.naturalHeight, rd = w / h;
  let dw, dh, dx, dy;
  if (rs > rd) { dw = w; dh = w / rs; dx = x; dy = y + (h - dh) / 2; }
  else { dh = h; dw = h * rs; dx = x + (w - dw) / 2; dy = y; }

  if (radius > 0) {
    ctx.save();
    roundRect(ctx, x, y, w, h, radius);
    ctx.clip();
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  } else {
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Normalize corner format: legacy (number) → {x, y}
function _cn(v) {
  if (v && typeof v === 'object') return v;
  return { x: v || 0, y: 0 };
}
function normalizeCorners(c) {
  if (!c) return { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} };
  return { tl: _cn(c.tl), tr: _cn(c.tr), bl: _cn(c.bl), br: _cn(c.br) };
}

// Quadrilateral cell path — each corner has X+Y offsets (px)
function quadCellPath(ctx, cx, cy, cw, ch, cPx) {
  ctx.beginPath();
  ctx.moveTo(cx + cPx.tl.x, cy + cPx.tl.y);             // top-left
  ctx.lineTo(cx + cw + cPx.tr.x, cy + cPx.tr.y);        // top-right
  ctx.lineTo(cx + cw + cPx.br.x, cy + ch + cPx.br.y);   // bottom-right
  ctx.lineTo(cx + cPx.bl.x, cy + ch + cPx.bl.y);        // bottom-left
  ctx.closePath();
}

// Get the 4 corners of a cell polygon (in overlay/canvas px)
function quadCellCornersPx(cx, cy, cw, ch, cPx) {
  return {
    tl: [cx + cPx.tl.x, cy + cPx.tl.y],
    tr: [cx + cw + cPx.tr.x, cy + cPx.tr.y],
    br: [cx + cw + cPx.br.x, cy + ch + cPx.br.y],
    bl: [cx + cPx.bl.x, cy + ch + cPx.bl.y]
  };
}

// Convert cell.corners (% of canvas) to pixel offsets
function cornersToPx(corners, W, H) {
  const c = normalizeCorners(corners);
  return {
    tl: { x: c.tl.x / 100 * W, y: c.tl.y / 100 * H },
    tr: { x: c.tr.x / 100 * W, y: c.tr.y / 100 * H },
    bl: { x: c.bl.x / 100 * W, y: c.bl.y / 100 * H },
    br: { x: c.br.x / 100 * W, y: c.br.y / 100 * H }
  };
}

// Check if any corner has an offset
function hasCornerOffsets(cell) {
  const c = normalizeCorners(cell.corners);
  return (c.tl.x || c.tl.y || c.tr.x || c.tr.y || c.bl.x || c.bl.y || c.br.x || c.br.y);
}

// Compute bounding box + CSS clip-path for a deformed cell overlay element
function quadOverlayInfo(qPts) {
  const xs = [qPts.tl[0], qPts.tr[0], qPts.br[0], qPts.bl[0]];
  const ys = [qPts.tl[1], qPts.tr[1], qPts.br[1], qPts.bl[1]];
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX || 1, h = maxY - minY || 1;
  const clip = 'polygon(' +
    ((qPts.tl[0] - minX) / w * 100).toFixed(2) + '% ' + ((qPts.tl[1] - minY) / h * 100).toFixed(2) + '%,' +
    ((qPts.tr[0] - minX) / w * 100).toFixed(2) + '% ' + ((qPts.tr[1] - minY) / h * 100).toFixed(2) + '%,' +
    ((qPts.br[0] - minX) / w * 100).toFixed(2) + '% ' + ((qPts.br[1] - minY) / h * 100).toFixed(2) + '%,' +
    ((qPts.bl[0] - minX) / w * 100).toFixed(2) + '% ' + ((qPts.bl[1] - minY) / h * 100).toFixed(2) + '%)';
  return { left: minX, top: minY, width: w, height: h, clipPath: clip };
}

function drawNumber(ctx, num, x, y, w, h, pos, style) {
  const r = Math.max(10, Math.min(Math.round(Math.min(w, h) * 0.015), 14));
  const fs = Math.round(r * 1.0);
  ctx.font = '600 ' + fs + 'px Inter,Arial,sans-serif';
  const txt = String(num);
  const margin = Math.round(r * 0.6);
  let cx, cy;
  if (pos === 'tl') { cx = x + margin + r; cy = y + margin + r; }
  else if (pos === 'tr') { cx = x + w - margin - r; cy = y + margin + r; }
  else if (pos === 'bl') { cx = x + margin + r; cy = y + h - margin - r; }
  else if (pos === 'br') { cx = x + w - margin - r; cy = y + h - margin - r; }
  else { cx = x + w / 2; cy = y + h / 2; }

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur = Math.round(r * 0.3);

  if (style === 'magenta') {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ec008c'; ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = '#ffffff';
  } else if (style === 'outline') {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#ec008c'; ctx.lineWidth = Math.max(1.5, r * 0.1); ctx.stroke();
    ctx.shadowBlur = 0; ctx.fillStyle = '#ec008c';
  } else {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = '#ec008c';
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(txt, cx, cy + Math.round(fs * 0.05));
  ctx.restore();
}

function drawImage(ctx, imgObj, imgIdx, x, y, w, h, bgColor, radius) {
  const adj = _adjustments[imgIdx] || null;
  const shadowBlur = getImgShadow();
  const borderW = getImgBorder();

  // Draw shadow behind the image cell
  if (shadowBlur > 0) {
    ctx.save();
    ctx.shadowColor = getImgShadowColor();
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = Math.round(shadowBlur * 0.25);
    ctx.shadowOffsetY = Math.round(shadowBlur * 0.35);
    ctx.fillStyle = bgColor || '#000000';
    if (radius > 0) {
      roundRect(ctx, x, y, w, h, radius);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }

  // Draw the image
  if (getFitMode() === 'contain') {
    drawContain(ctx, imgObj.img, x, y, w, h, bgColor, radius, adj);
  } else {
    drawCover(ctx, imgObj.img, x, y, w, h, radius, adj);
  }

  // Draw border on top
  if (borderW > 0) {
    ctx.save();
    ctx.strokeStyle = getImgBorderColor();
    ctx.lineWidth = borderW;
    if (radius > 0) {
      roundRect(ctx, x + borderW / 2, y + borderW / 2, w - borderW, h - borderW, Math.max(0, radius - borderW / 2));
      ctx.stroke();
    } else {
      ctx.strokeRect(x + borderW / 2, y + borderW / 2, w - borderW, h - borderW);
    }
    ctx.restore();
  }
}

async function drawCollageLibre(canvas, images, nbRangees, seed, W, H, gap, bgColor, trackCells) {
  const ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);
  if (trackCells) _cellMap = [];

  const Hutil = H - gap * (Math.min(nbRangees, images.length) - 1);
  const ratios = images.map(o => o.ratio);
  const nb = Math.min(nbRangees, images.length);

  // Reuse forced layout (from swap) or compute fresh
  let rangees;
  if (_forceRangees) {
    rangees = _forceRangees;
    _forceRangees = null;
  } else {
    rangees = repartirEquilibre(ratios, nb, seed);
  }
  // Store for later swap operations
  if (trackCells) _lastRangees = rangees.map(r => [...r]);

  const { hauteurs, largeurs_g } = calculerGrille(rangees, ratios, W, Hutil);
  const doNum = getNumbering(), numPos = getNumPos(), numSty = getNumStyle(), numStart = getNumStart();
  const radius = getBorderRadius();
  let yOff = 0, done = 0, total = images.length;

  for (let ri = 0; ri < rangees.length; ri++) {
    let xOff = 0;
    for (let ci = 0; ci < rangees[ri].length; ci++) {
      const idx = rangees[ri][ci];
      const wC = largeurs_g[ri][ci], hC = hauteurs[ri];
      drawImage(ctx, images[idx], idx, xOff, yOff, wC, hC, bgColor, radius);
      if (trackCells) _cellMap.push({ imgIdx: idx, x: xOff, y: yOff, w: wC, h: hC });
      if (doNum) drawNumber(ctx, done + numStart, xOff, yOff, wC, hC, numPos, numSty);
      xOff += wC + (ci < rangees[ri].length - 1 ? gap : 0);
      done++;
      setProgress(Math.round(done / total * 100), done + '/' + total);
      if (done % 8 === 0) await sleep(0);
    }
    yOff += hauteurs[ri] + gap;
  }
}

async function drawCollageBanniere(canvas, images, cols, W, H, gap, bgColor, trackCells) {
  const ctx = canvas.getContext('2d');
  const rows = Math.ceil(images.length / cols);
  canvas.width = W;
  canvas.height = H;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);
  if (trackCells) _cellMap = [];

  const cw = Math.round((W - gap * (cols - 1)) / cols);
  const ch = Math.round((H - gap * (rows - 1)) / rows);
  const doNum = getNumbering(), numPos = getNumPos(), numSty = getNumStyle(), numStart = getNumStart();
  const radius = getBorderRadius();

  for (let i = 0; i < images.length; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const x = col * (cw + gap), y = row * (ch + gap);
    drawImage(ctx, images[i], i, x, y, cw, ch, bgColor, radius);
    if (trackCells) _cellMap.push({ imgIdx: i, x, y, w: cw, h: ch });
    if (doNum) drawNumber(ctx, i + numStart, x, y, cw, ch, numPos, numSty);
    setProgress(Math.round((i + 1) / images.length * 100), (i + 1) + '/' + images.length);
    if (i % 5 === 0) await sleep(0);
  }
}

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
  // previewWrap toujours visible
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
  // previewWrap toujours visible
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

/* ═══════════════════════════════════════════════════════════════════════════
   14. OPTIMAL FORMAT
   ═══════════════════════════════════════════════════════════════════════════ */
function calculerFormatOptimal() {
  if (!loadedImages.length) { toast('Chargez des images d\'abord'); return; }
  const maxW = Math.max(...loadedImages.map(o => o.w));

  function sim(cols) {
    const cw = Math.floor(maxW / cols);
    const heights = loadedImages.map(o => Math.round(cw / o.ratio));
    const colH = new Array(cols).fill(0);
    heights.forEach(h => { const c = colH.indexOf(Math.min(...colH)); colH[c] += h; });
    const W = cw * cols, H = Math.max(...colH);
    const mean = colH.reduce((a, b) => a + b, 0) / cols;
    const std = Math.sqrt(colH.reduce((s, v) => s + (v - mean) ** 2, 0) / cols);
    return { cols, cw, W, H, balance: std / mean };
  }

  const n = loadedImages.length;
  const opts = [];
  for (let c = 1; c <= Math.min(8, n); c++) opts.push(sim(c));

  const scored = opts.map(o => {
    const ratio = o.W / o.H;
    const pen = Math.abs(Math.log(ratio / 1.4));
    return { ...o, score: o.balance + pen * 0.5 };
  }).sort((a, b) => a.score - b.score);

  const top3 = scored.slice(0, 3);
  const rd = $('optimalResult');
  let h = '<div style="font-size:.68rem;font-weight:700;color:var(--text-muted);margin-bottom:.3rem">Formats recommandes</div>';
  top3.forEach((o, i) => {
    const mpx = (o.W * o.H / 1e6).toFixed(1);
    const best = i === 0;
    h += '<div class="opt-option' + (best ? ' best' : '') + '" onclick="appliquerFormat(' + o.W + ',' + o.H + ',' + o.cols + ')">' +
      (best ? '<span style="color:var(--magenta);font-weight:700">Optimal</span>' : '<span style="color:var(--text-muted)">Option ' + (i + 1) + '</span>') +
      ' &middot; <strong>' + o.cols + ' col.</strong> &middot; ' +
      o.W.toLocaleString() + ' x ' + o.H.toLocaleString() + ' px &middot; ' + mpx + ' Mpx' +
      ' <span style="color:var(--text-muted);font-size:.62rem">(' + ((1 - o.balance) * 100).toFixed(0) + '% equilibre)</span></div>';
  });
  h += '<div style="font-size:.62rem;color:var(--text-muted);margin-top:.3rem;text-align:center">Cliquez pour appliquer</div>';
  rd.innerHTML = h;
  rd.classList.remove('hidden');
}

function appliquerFormat(W, H, cols) {
  setFieldsFromPx(W, H);
  const rows = Math.ceil(loadedImages.length / cols);
  $('rangees').value = rows;
  $('rangeesVal').textContent = rows;
  _lastRangees = null;
  updateAllKPI();
  toast(W + ' x ' + H + ' px — ' + cols + ' col. / ' + rows + ' rangees');
  $('optimalResult').classList.add('hidden');
  scheduleAutoRefresh();
}

/* ═══════════════════════════════════════════════════════════════════════════
   15. RATIO DETECTOR
   ═══════════════════════════════════════════════════════════════════════════ */
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function detectRatio(file) {
  if (!file) return;
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const w = img.naturalWidth, h = img.naturalHeight;
    const d = gcd(w, h);
    const exact = (w / d) + ':' + (h / d);
    const r = w / h;
    let best = null, bd = Infinity;
    for (const s of RATIO_STDS) {
      const diff = Math.abs(s.v - r) / r;
      if (diff < bd) { bd = diff; best = s; }
    }
    $('ratioExact').textContent = w + ' x ' + h + ' px (' + exact + ')';
    $('ratioNearest').textContent = best.l;
    const mk = RATIO_KEY_MAP[best.l];
    const ap = $('ratioApply');
    if (mk) {
      ap.innerHTML = '<button class="btn-apply-ratio" onclick="applyRatioMode(\'' + mk + '\')">Appliquer mode ' + best.l + '</button>';
    } else {
      ap.innerHTML = '<div style="font-size:.65rem;color:var(--text-muted);margin-top:.2rem">Ecart : ' + (bd * 100).toFixed(1) + '% — ratio personnalise</div>';
    }
    $('ratioResult').classList.remove('hidden');
    URL.revokeObjectURL(url);
    $('ratioFile').value = '';
    toast('Ratio detecte : ' + best.l + ' (' + (bd * 100).toFixed(1) + '% ecart)');
  };
  img.src = url;
}

function applyRatioMode(key) {
  $('bannerType').value = key;
  $('bannerType').dispatchEvent(new Event('change'));
  $('ratioResult').classList.add('hidden');
  toast('Mode ' + BANNERS[key].label + ' applique');
}

function handleRatioDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) detectRatio(file);
}

/* ═══════════════════════════════════════════════════════════════════════════
   16. PRESETS
   ═══════════════════════════════════════════════════════════════════════════ */
function buildPresets() {
  const container = $('presetsGrid');
  container.innerHTML = '';
  // Group presets by group name
  const groups = [];
  const groupMap = {};
  PRESETS.forEach(p => {
    const g = p.group || 'Autre';
    if (!groupMap[g]) {
      groupMap[g] = [];
      groups.push(g);
    }
    groupMap[g].push(p);
  });
  // Build accordion tabs
  groups.forEach(groupName => {
    const tab = document.createElement('div');
    tab.className = 'preset-tab';
    // Head
    const head = document.createElement('div');
    head.className = 'preset-tab-head';
    head.innerHTML = '<span>' + groupName + '</span><span class="preset-tab-arrow">&#x25B6;</span>';
    head.onclick = () => {
      const wasOpen = tab.classList.contains('open');
      // Close all tabs
      container.querySelectorAll('.preset-tab').forEach(t => t.classList.remove('open'));
      if (!wasOpen) tab.classList.add('open');
    };
    tab.appendChild(head);
    // Body
    const body = document.createElement('div');
    body.className = 'preset-tab-body';
    groupMap[groupName].forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'preset-chip';
      chip.textContent = p.label;
      const suffix = p.unit === 'px' ? 'px' : p.unit;
      chip.title = p.w + (p.unit === 'px' ? ' x ' : suffix + ' x ') + p.h + (p.unit !== 'px' ? suffix : 'px');
      chip.onclick = (e) => {
        e.stopPropagation();
        applyPreset(p);
        // Auto-close the tab after selection
        tab.classList.remove('open');
      };
      body.appendChild(chip);
    });
    tab.appendChild(body);
    container.appendChild(tab);
  });
}

function applyPreset(p) {
  const dpi = getDPI();
  let wpx, hpx;
  if (p.unit === 'px') {
    wpx = p.w; hpx = p.h;
  } else {
    wpx = Math.round(pxFromUnit(p.w, p.unit, dpi));
    hpx = Math.round(pxFromUnit(p.h, p.unit, dpi));
  }
  setFieldsFromPx(wpx, hpx);
  updateAllKPI();
  toast('Preset ' + p.label + ' applique (' + wpx + ' x ' + hpx + ' px)');
  scheduleAutoRefresh();
}

/* ═══════════════════════════════════════════════════════════════════════════
   16B. BD / MANGA ENGINE
   ═══════════════════════════════════════════════════════════════════════════ */

// ── BD Templates (normalized 0-100% inner area, gutters applied by bd_applyTemplate) ──
const BD_TEMPLATES = [
  { id:'classic_2x3', name:'Classique 2x3', rows:[
    [{w:50},{w:50}],
    [{w:50},{w:50}],
    [{w:50},{w:50}]
  ], rowH:[33.33,33.34,33.33]},
  { id:'big_top', name:'Grande case haut', rows:[
    [{w:100}],
    [{w:50},{w:50}],
    [{w:50},{w:50}]
  ], rowH:[50,25,25]},
  { id:'splash', name:'Splash + vignettes', rows:[
    [{w:100}],
    [{w:33.33},{w:33.34},{w:33.33}]
  ], rowH:[70,30]},
  { id:'manga_3bands', name:'Manga 3 bandes', rows:[
    [{w:100}],
    [{w:100}],
    [{w:100}]
  ], rowH:[40,30,30]},
  { id:'action', name:'Action dynamique', rows:[
    [{w:65, rSpan:2},{w:35},{w:35}],
    [{w:50},{w:50}]
  ], rowH:[60,40], custom: function(m, iW, iH, gV, gH) {
    // Row 0: big left (65%) spanning 2 sub-rows + 2 small right
    const cells = [];
    const rightW = iW * 0.35 - gV / 2;
    const leftW = iW * 0.65 - gV / 2;
    const topH = iH * 0.60 - gH / 2;
    const botH = iH * 0.40 - gH / 2;
    const rightSubH = (topH - gH) / 2;
    cells.push({x: m, y: m, w: leftW, h: topH});
    cells.push({x: m + leftW + gV, y: m, w: rightW, h: rightSubH});
    cells.push({x: m + leftW + gV, y: m + rightSubH + gH, w: rightW, h: rightSubH});
    cells.push({x: m, y: m + topH + gH, w: iW / 2 - gV / 2, h: botH});
    cells.push({x: m + iW / 2 + gV / 2, y: m + topH + gH, w: iW / 2 - gV / 2, h: botH});
    return cells;
  }},
  { id:'3cols', name:'3 colonnes', rows:[
    [{w:33.33},{w:33.34},{w:33.33}]
  ], rowH:[100]},
  { id:'focus_center', name:'Focus central', custom: function(m, iW, iH, gV, gH) {
    // 4 corners + 1 large center (overlapping style)
    const cells = [];
    const cornerW = iW * 0.30;
    const cornerH = iH * 0.30;
    const centerW = iW * 0.70;
    const centerH = iH * 0.70;
    cells.push({x: m, y: m, w: cornerW, h: cornerH});
    cells.push({x: m + iW - cornerW, y: m, w: cornerW, h: cornerH});
    cells.push({x: m + (iW - centerW) / 2, y: m + (iH - centerH) / 2, w: centerW, h: centerH});
    cells.push({x: m, y: m + iH - cornerH, w: cornerW, h: cornerH});
    cells.push({x: m + iW - cornerW, y: m + iH - cornerH, w: cornerW, h: cornerH});
    return cells;
  }},
  { id:'page_title', name:'Page titre', rows:[
    [{w:100}],
    [{w:100}],
    [{w:100}]
  ], rowH:[15,70,15]},
  { id:'4koma', name:'4-Koma', rows:[
    [{w:100}],
    [{w:100}],
    [{w:100}],
    [{w:100}]
  ], rowH:[25,25,25,25]},
  { id:'cinema_wide', name:'Cinema Widescreen', rows:[
    [{w:100}],
    [{w:100}]
  ], rowH:[50,50]},
  { id:'v_dynamic', name:'Le V Dynamique', rows:[
    [{w:50},{w:50}],
    [{w:100}],
    [{w:50},{w:50}]
  ], rowH:[25,50,25]},
  { id:'zigzag', name:'Zig-Zag Action', rows:[
    [{w:70},{w:30}],
    [{w:30},{w:70}],
    [{w:100}]
  ], rowH:[30,40,30]},
  { id:'grid3x3', name:'Grille 3x3', rows:[
    [{w:33.33},{w:33.34},{w:33.33}],
    [{w:33.33},{w:33.34},{w:33.33}],
    [{w:33.33},{w:33.34},{w:33.33}]
  ], rowH:[33.33,33.34,33.33]},
  { id:'focus_left', name:'Focus Profil Gauche', custom: function(m, iW, iH, gV, gH) {
    // Left column (30%) full height + 3 stacked right cells
    const cells = [];
    const leftW = iW * 0.30 - gV / 2;
    const rightW = iW * 0.70 - gV / 2;
    const rightH = (iH - 2 * gH) / 3;
    cells.push({x: m, y: m, w: leftW, h: iH});
    cells.push({x: m + leftW + gV, y: m, w: rightW, h: rightH});
    cells.push({x: m + leftW + gV, y: m + rightH + gH, w: rightW, h: rightH});
    cells.push({x: m + leftW + gV, y: m + 2 * (rightH + gH), w: rightW, h: rightH});
    return cells;
  }},
  { id:'quad_symmetry', name:'Symetrie 2x2', rows:[
    [{w:50},{w:50}],
    [{w:50},{w:50}]
  ], rowH:[50,50]},
  { id:'escalier', name:'L\'Escalier', custom: function(m, iW, iH, gV, gH) {
    // Diagonal staircase: 3 cells offset diagonally
    const cells = [];
    const cW = iW * 0.40;
    const stepH = (iH - 2 * gH) / 3;
    cells.push({x: m, y: m, w: cW, h: stepH});
    cells.push({x: m + (iW - cW) / 2, y: m + stepH + gH, w: cW, h: stepH});
    cells.push({x: m + iW - cW, y: m + 2 * (stepH + gH), w: cW, h: stepH});
    return cells;
  }},
  { id:'webtoon', name:'Webtoon Scroll', rows:[
    [{w:100}],
    [{w:100}],
    [{w:100}]
  ], rowH:[28.57,42.86,28.57]},
  { id:'hero_focus', name:'Hero Focus', custom: function(m, iW, iH, gV, gH) {
    // Left large panel (65%) + 3 stacked right panels
    const cells = [];
    const leftW = iW * 0.65 - gV / 2;
    const rightW = iW * 0.35 - gV / 2;
    const rightH = (iH - 2 * gH) / 3;
    cells.push({x: m, y: m, w: leftW, h: iH});
    cells.push({x: m + leftW + gV, y: m, w: rightW, h: rightH});
    cells.push({x: m + leftW + gV, y: m + rightH + gH, w: rightW, h: rightH});
    cells.push({x: m + leftW + gV, y: m + 2 * (rightH + gH), w: rightW, h: rightH});
    return cells;
  }},

  // ═══════════════════════════════════════════════════════════════════
  // 10 TEMPLATES MANGA DYNAMIQUES — diagonales propres sans chevauchement
  // Principe: bords diagonaux parallèles → gouttière constante entre cellules
  // ═══════════════════════════════════════════════════════════════════

  { id:'manga_slash', name:'⚔ Diagonal Split', custom: function(m, iW, iH, gV, gH) {
    // Ref img 1: 2 cells top (diagonal sep) + wide band + 2 cells reverse diag + 2 normal
    const cells = [];
    const d = 5;
    const halfW = (iW - gV) / 2;
    const r1H = iH * 0.24, r2H = iH * 0.28, r3H = iH * 0.24;
    const r4H = iH - r1H - r2H - r3H - 3*gH;
    // Row 1: diagonal separator leaning left ↘ (both cells same offsets = parallel edges)
    cells.push({x:m, y:m, w:halfW, h:r1H,
      corners:{tl:{x:0,y:0}, tr:{x:d,y:0}, bl:{x:0,y:0}, br:{x:-d,y:0}}});
    cells.push({x:m+halfW+gV, y:m, w:halfW, h:r1H,
      corners:{tl:{x:d,y:0}, tr:{x:0,y:0}, bl:{x:-d,y:0}, br:{x:0,y:0}}});
    // Row 2: wide band normal
    cells.push({x:m, y:m+r1H+gH, w:iW, h:r2H});
    // Row 3: diagonal separator leaning right ↗ (reverse)
    const lw3 = iW*0.55-gV/2, rw3 = iW*0.45-gV/2;
    cells.push({x:m, y:m+r1H+r2H+2*gH, w:lw3, h:r3H,
      corners:{tl:{x:0,y:0}, tr:{x:-d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+lw3+gV, y:m+r1H+r2H+2*gH, w:rw3, h:r3H,
      corners:{tl:{x:-d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    // Row 4: 2 normal rectangles
    cells.push({x:m, y:m+r1H+r2H+r3H+3*gH, w:halfW, h:r4H});
    cells.push({x:m+halfW+gV, y:m+r1H+r2H+r3H+3*gH, w:halfW, h:r4H});
    return cells;
  }},

  { id:'manga_trident', name:'⚡ Trident', custom: function(m, iW, iH, gV, gH) {
    // Ref img 2: 3 vertical panels with diagonal bottoms + wide band + 2 bottom
    const cells = [];
    const d = 4;
    const w3 = (iW - 2*gV) / 3;
    const r1H = iH * 0.32, r2H = iH * 0.35;
    const r3H = iH - r1H - r2H - 2*gH;
    // Row 1: 3 panels, each with slanted bottom edge (same direction)
    cells.push({x:m, y:m, w:w3, h:r1H,
      corners:{tl:{x:0,y:0}, tr:{x:d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+w3+gV, y:m, w:w3, h:r1H,
      corners:{tl:{x:d,y:0}, tr:{x:d,y:0}, bl:{x:d,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+2*(w3+gV), y:m, w:w3, h:r1H,
      corners:{tl:{x:d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    // Row 2: wide band with matching slanted top
    cells.push({x:m, y:m+r1H+gH, w:iW, h:r2H,
      corners:{tl:{x:0,y:d}, tr:{x:0,y:d}, bl:{x:0,y:0}, br:{x:0,y:0}}});
    // Row 3: 2 panels with diagonal separator
    const halfW = (iW - gV) / 2;
    cells.push({x:m, y:m+r1H+r2H+2*gH, w:halfW, h:r3H,
      corners:{tl:{x:0,y:0}, tr:{x:-d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+halfW+gV, y:m+r1H+r2H+2*gH, w:halfW, h:r3H,
      corners:{tl:{x:-d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    return cells;
  }},

  { id:'manga_zigzag', name:'💥 Zig-Zag', custom: function(m, iW, iH, gV, gH) {
    // 4 rows alternating diagonal direction — zig-zag reading flow
    const cells = [];
    const d = 5;
    const n = 4;
    const rH = (iH - (n-1)*gH) / n;
    for (let r = 0; r < n; r++) {
      const y = m + r * (rH + gH);
      const lw = (r % 2 === 0) ? iW*0.6-gV/2 : iW*0.4-gV/2;
      const rw = iW - lw - gV;
      const lean = (r % 2 === 0) ? d : -d;
      // Left cell
      cells.push({x:m, y:y, w:lw, h:rH,
        corners:{tl:{x:0,y:0}, tr:{x:lean,y:0}, bl:{x:0,y:0}, br:{x:-lean,y:0}}});
      // Right cell — matching parallel edge
      cells.push({x:m+lw+gV, y:y, w:rw, h:rH,
        corners:{tl:{x:lean,y:0}, tr:{x:0,y:0}, bl:{x:-lean,y:0}, br:{x:0,y:0}}});
    }
    return cells;
  }},

  { id:'manga_doublev', name:'⚡ Double V', custom: function(m, iW, iH, gV, gH) {
    // V-shape top row + inverted V bottom row — energy zigzag
    const cells = [];
    const d = 5;
    const r1H = iH*0.30, r2H = iH*0.35;
    const r3H = iH - r1H - r2H - 2*gH;
    const halfW = (iW-gV)/2;
    // Row 1: 2 cells — V separator (diagonal edges leaning inward at bottom)
    cells.push({x:m, y:m, w:halfW, h:r1H,
      corners:{tl:{x:0,y:0}, tr:{x:d,y:0}, bl:{x:0,y:0}, br:{x:-d,y:0}}});
    cells.push({x:m+halfW+gV, y:m, w:halfW, h:r1H,
      corners:{tl:{x:d,y:0}, tr:{x:0,y:0}, bl:{x:-d,y:0}, br:{x:0,y:0}}});
    // Row 2: wide impact panel
    cells.push({x:m, y:m+r1H+gH, w:iW, h:r2H});
    // Row 3: 2 cells — inverted V separator
    cells.push({x:m, y:m+r1H+r2H+2*gH, w:halfW, h:r3H,
      corners:{tl:{x:0,y:0}, tr:{x:-d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+halfW+gV, y:m+r1H+r2H+2*gH, w:halfW, h:r3H,
      corners:{tl:{x:-d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    return cells;
  }},

  { id:'manga_tornado', name:'🌀 Tornado', custom: function(m, iW, iH, gV, gH) {
    // Asymmetric dynamic — all rows with alternating diagonal separators
    const cells = [];
    const d = 4;
    const r1H = iH*0.25, r2H = iH*0.25, r3H = iH*0.25;
    const r4H = iH - r1H - r2H - r3H - 3*gH;
    // Row 1: 70/30 split, diagonal leaning right
    const w1a = iW*0.70-gV/2, w1b = iW*0.30-gV/2;
    cells.push({x:m, y:m, w:w1a, h:r1H,
      corners:{tl:{x:0,y:0}, tr:{x:-d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+w1a+gV, y:m, w:w1b, h:r1H,
      corners:{tl:{x:-d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    // Row 2: 40/60 split, diagonal leaning left
    const w2a = iW*0.40-gV/2, w2b = iW*0.60-gV/2;
    cells.push({x:m, y:m+r1H+gH, w:w2a, h:r2H,
      corners:{tl:{x:0,y:0}, tr:{x:d,y:0}, bl:{x:0,y:0}, br:{x:-d,y:0}}});
    cells.push({x:m+w2a+gV, y:m+r1H+gH, w:w2b, h:r2H,
      corners:{tl:{x:d,y:0}, tr:{x:0,y:0}, bl:{x:-d,y:0}, br:{x:0,y:0}}});
    // Row 3: 55/45 split, diagonal leaning right
    const w3a = iW*0.55-gV/2, w3b = iW*0.45-gV/2;
    cells.push({x:m, y:m+r1H+r2H+2*gH, w:w3a, h:r3H,
      corners:{tl:{x:0,y:0}, tr:{x:-d,y:0}, bl:{x:0,y:0}, br:{x:d,y:0}}});
    cells.push({x:m+w3a+gV, y:m+r1H+r2H+2*gH, w:w3b, h:r3H,
      corners:{tl:{x:-d,y:0}, tr:{x:0,y:0}, bl:{x:d,y:0}, br:{x:0,y:0}}});
    // Row 4: full width
    cells.push({x:m, y:m+r1H+r2H+r3H+3*gH, w:iW, h:r4H});
    return cells;
  }}
];

// ── Init / Exit BD mode ──
function initBDMode() {
  const b = getBanner();
  if (!b) return;
  _bdCanvasW = b.w;
  _bdCanvasH = b.h;
  _bdCells = [];
  _bdBubbles = [];
  _bdSelection = { type: null, id: null };
  _bdDragState = null;
  _bdCellIdCounter = 0;
  _bdBubbleIdCounter = 0;

  // Show/hide panels
  $('cardBD').classList.remove('hidden');
  $('cardBDAppearance').classList.remove('hidden');
  $('cardGrid').classList.add('hidden');
  $('cardNum').classList.add('hidden');
  $('cardAppearance').classList.add('hidden');
  $('cardDim').classList.add('card-disabled');
  $('sectionSeed').classList.add('hidden');

  // Set internal dimensions
  _internalW = _bdCanvasW;
  _internalH = _bdCanvasH;
  setFieldsFromPx(_bdCanvasW, _bdCanvasH);
  updateAllKPI();

  // Show preview area + overlay
  // previewWrap toujours visible
  $('btnRow').classList.remove('hidden');
  $('bdOverlay').classList.add('active');
  $('cellOverlays').innerHTML = '';

  // Marquer le mode BD actif (layout 3 colonnes est toujours actif)
  document.querySelector('.app-shell').classList.add('bd-active');

  // S'assurer que previewWrap est visible dès l'init
  // previewWrap toujours visible

  // Reset pan/zoom
  bd_resetPanZoom();

  // Reset spread
  _bdSpread = false;
  $('bdSpreadToggle').checked = false;
  $('bdSpreadLabel').textContent = 'OFF';
  $('bdSpreadInfo').classList.add('hidden');
  // bdSpreadGuide removed — guide is drawn on canvas

  // Reset page numbering
  _bdPageNum = false;
  if ($('bdPageNumToggle')) $('bdPageNumToggle').checked = false;
  if ($('bdPageNumLabel')) $('bdPageNumLabel').textContent = 'OFF';
  if ($('bdPageNumOptions')) $('bdPageNumOptions').style.display = 'none';

  bd_updateCellList();
  bd_updateBubbleList();
  bd_buildTemplateGrid();
  renderBDCanvas(false);

  // Mettre à jour les thumbnails verticaux
  bd_updateThumbsVertical();
}

function exitBDMode() {
  // Reset pan/zoom
  bd_resetPanZoom();

  // Retirer le marqueur BD (layout 3 colonnes reste actif)
  document.querySelector('.app-shell').classList.remove('bd-active');

  // Reset double page
  _bdSpread = false;
  if ($('bdSpreadToggle')) $('bdSpreadToggle').checked = false;
  if ($('bdSpreadLabel')) $('bdSpreadLabel').textContent = 'OFF';
  if ($('bdSpreadInfo')) $('bdSpreadInfo').classList.add('hidden');
  if ($('bdSpreadGuide')) $('bdSpreadGuide').classList.remove('visible');

  // Reset canvas info
  if ($('bdCanvasInfo')) $('bdCanvasInfo').textContent = '';

  // Restore panels
  $('cardBD').classList.add('hidden');
  $('cardBDAppearance').classList.add('hidden');
  $('cardGrid').classList.remove('hidden');
  $('cardNum').classList.remove('hidden');
  $('cardAppearance').classList.remove('hidden');
  $('cardDim').classList.remove('card-disabled');
  if ($('sectionSeed')) $('sectionSeed').classList.remove('hidden');
  $('bdOverlay').classList.remove('active');
  $('bdOverlay').innerHTML = '';
  $('cellOverlays').innerHTML = '';

  // Reset BD state
  _bdCells = [];
  _bdBubbles = [];
  _bdSelection = { type: null, id: null };

  // Update media panel for standard mode
  bd_updateThumbsVertical();
}

// ── Thumbs vertical (panel média BD) ──
function bd_updateThumbsVertical() {
  const container = $('bdThumbsVertical');
  if (!container) return;
  container.innerHTML = '';

  const bdMode = isBDMode();

  // Toggle sort buttons visibility
  const sortBtns = $('mediaSortBtns');
  if (sortBtns) sortBtns.classList.toggle('hidden', bdMode);

  if (!loadedImages.length) {
    container.innerHTML = '<div style="font-size:.6rem;color:var(--text-muted);text-align:center;padding:.5rem">' +
      (bdMode ? 'Chargez des visuels pour les glisser dans les cases' : 'Chargez des visuels pour créer un collage') + '</div>';
    return;
  }

  // Mettre à jour le compteur compact
  const cnt = $('bdDropCountCompact');
  if (cnt) { cnt.textContent = loadedImages.length; cnt.style.display = 'block'; }

  loadedImages.forEach((imgObj, idx) => {
    const item = document.createElement('div');
    item.className = 'bd-thumb-item';
    item.draggable = true;

    // Miniature
    const thumb = document.createElement('img');
    thumb.src = imgObj.src;
    thumb.alt = imgObj.name || ('Image ' + (idx + 1));
    item.appendChild(thumb);

    // Nom tronqué
    const name = document.createElement('span');
    name.className = 'bd-th-name';
    name.textContent = imgObj.name || ('Image ' + (idx + 1));
    item.appendChild(name);

    // Index
    const idxBadge = document.createElement('span');
    idxBadge.className = 'bd-th-idx';
    idxBadge.textContent = idx + 1;
    item.appendChild(idxBadge);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'bd-th-del';
    delBtn.innerHTML = '&times;';
    delBtn.title = 'Supprimer cette image';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isBDMode()) {
        // BD mode: update cell references
        loadedImages.splice(idx, 1);
        _bdCells.forEach(c => {
          if (c.imgIdx === idx) { c.imgIdx = null; c.cropZoom = 1; c.cropX = 0.5; c.cropY = 0.5; }
          else if (c.imgIdx !== null && c.imgIdx > idx) c.imgIdx--;
        });
        bd_updateThumbsVertical();
        renderBDCanvas(false);
      } else {
        // Standard mode: use existing removeImage
        removeImage(idx);
      }
      toast('Image supprimée');
    });
    item.appendChild(delBtn);

    // Drag
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', String(idx));
      e.dataTransfer.effectAllowed = 'copy';
      item.style.opacity = '.4';
    });
    item.addEventListener('dragend', () => { item.style.opacity = ''; });

    // Hover zoom tooltip
    item.addEventListener('mouseenter', (e) => {
      let tip = document.getElementById('bdZoomTooltip');
      if (!tip) {
        tip = document.createElement('div');
        tip.id = 'bdZoomTooltip';
        tip.className = 'bd-zoom-tooltip';
        const tipImg = document.createElement('img');
        tip.appendChild(tipImg);
        document.body.appendChild(tip);
      }
      tip.querySelector('img').src = imgObj.src;
      const rect = item.getBoundingClientRect();
      tip.style.left = Math.max(8, rect.left - 290) + 'px';
      tip.style.top = Math.max(8, rect.top) + 'px';
      tip.classList.add('visible');
    });
    item.addEventListener('mouseleave', () => {
      const tip = document.getElementById('bdZoomTooltip');
      if (tip) tip.classList.remove('visible');
    });

    // Click behavior depends on mode
    item.addEventListener('click', () => {
      if (isBDMode()) {
        // BD mode: assigner à la case sélectionnée
        if (_bdSelection.type === 'cell') {
          const cell = _bdCells.find(c => c.id === _bdSelection.id);
          if (cell) {
            bd_saveUndo();
            cell.imgIdx = idx;
            cell.cropZoom = 1; cell.cropX = 0.5; cell.cropY = 0.5;
            bd_selectCell(cell.id);
            renderBDCanvas(false);
            toast('Image ' + (idx + 1) + ' assignée à ' + cell.label);
          }
        } else {
          toast('Sélectionnez d\'abord une case, puis cliquez sur le visuel');
        }
      } else {
        // Standard mode: ouvrir le crop editor
        if (_hasPreview && typeof openCropEditor === 'function') {
          openCropEditor(idx);
        }
      }
    });

    container.appendChild(item);
  });
}

// ── Toggle double page (spread) ──
function bd_toggleSpread() {
  bd_saveUndo();
  _bdSpread = $('bdSpreadToggle').checked;
  $('bdSpreadLabel').textContent = _bdSpread ? 'ON' : 'OFF';

  const b = getBanner();
  if (!b) return;

  const baseW = b.w;
  const baseH = b.h;

  if (_bdSpread) {
    _bdCanvasW = baseW * 2;
    _bdCanvasH = baseH;
    $('bdSpreadInfo').textContent = _bdCanvasW + ' \u00d7 ' + _bdCanvasH + ' px \u2014 Double page';
    $('bdSpreadInfo').classList.remove('hidden');
    // guide drawn on canvas directly
    toast('Double page activée \u2014 ' + _bdCanvasW + ' \u00d7 ' + _bdCanvasH + ' px');
    // Flash template button to invite user to pick templates
    const tplBtn = $('bdTemplateBtn');
    if (tplBtn) { tplBtn.classList.add('bd-btn-flash'); setTimeout(() => tplBtn.classList.remove('bd-btn-flash'), 2000); }
  } else {
    _bdCanvasW = baseW;
    _bdCanvasH = baseH;
    $('bdSpreadInfo').classList.add('hidden');
    // bdSpreadGuide removed — guide is drawn on canvas
    toast('Page unique \u2014 ' + _bdCanvasW + ' \u00d7 ' + _bdCanvasH + ' px');
  }

  _internalW = _bdCanvasW;
  _internalH = _bdCanvasH;
  setFieldsFromPx(_bdCanvasW, _bdCanvasH);
  updateAllKPI();

  renderBDCanvas(false);
}

// ── Page numbering ──
function bd_updatePageNum() {
  _bdPageNum = $('bdPageNumToggle').checked;
  $('bdPageNumLabel').textContent = _bdPageNum ? 'ON' : 'OFF';
  const opts = $('bdPageNumOptions');
  if (opts) opts.style.display = _bdPageNum ? 'flex' : 'none';
  renderBDCanvas(false);
}

function bd_toRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}

function bd_formatPageNum(n) {
  const fmt = $('bdPageNumFormat')?.value || 'number';
  if (fmt === 'dash') return '\u2014 ' + n + ' \u2014';
  if (fmt === 'bracket') return '[' + n + ']';
  if (fmt === 'page') return 'Page ' + n;
  if (fmt === 'roman') return bd_toRoman(n);
  return String(n);
}

function bd_renderPageNumbers(ctx, W, H, scale, forExport) {
  if (!_bdPageNum) return;
  const startNum = parseInt($('bdPageNumStart')?.value) || 1;
  const fontSize = parseInt($('bdPageNumSize')?.value) || 14;
  const color = $('bdPageNumColor')?.value || '#333333';
  const font = $('bdPageNumFont')?.value || 'Inter';
  const pos = $('bdPageNumPos')?.value || 'bottom-center';
  const fSize = fontSize / scale;
  const marginPx = _bdMarginPct / 100;

  ctx.save();
  ctx.fillStyle = color;
  ctx.font = fSize + 'px ' + font + ',sans-serif';

  if (_bdSpread) {
    // Draw page numbers for both pages
    const midX = W / 2;
    const pageNums = [startNum, startNum + 1];
    pageNums.forEach((pn, pi) => {
      const label = bd_formatPageNum(pn);
      const pageLeft = pi === 0 ? 0 : midX;
      const pageRight = pi === 0 ? midX : W;
      const pageCenterX = (pageLeft + pageRight) / 2;
      let x, y;

      if (pos === 'bottom-center') {
        x = pageCenterX; y = H - (marginPx * H * 0.3); ctx.textAlign = 'center';
      } else if (pos === 'bottom-outside') {
        x = pi === 0 ? pageLeft + marginPx * W * 0.6 : pageRight - marginPx * W * 0.6;
        y = H - (marginPx * H * 0.3);
        ctx.textAlign = pi === 0 ? 'left' : 'right';
      } else if (pos === 'bottom-inside') {
        x = pi === 0 ? pageRight - marginPx * W * 0.6 : pageLeft + marginPx * W * 0.6;
        y = H - (marginPx * H * 0.3);
        ctx.textAlign = pi === 0 ? 'right' : 'left';
      } else if (pos === 'top-center') {
        x = pageCenterX; y = marginPx * H * 0.6 + fSize; ctx.textAlign = 'center';
      } else if (pos === 'top-outside') {
        x = pi === 0 ? pageLeft + marginPx * W * 0.6 : pageRight - marginPx * W * 0.6;
        y = marginPx * H * 0.6 + fSize;
        ctx.textAlign = pi === 0 ? 'left' : 'right';
      }
      ctx.fillText(label, x, y);
    });
  } else {
    // Single page
    const label = bd_formatPageNum(startNum);
    let x, y;
    if (pos === 'bottom-center') {
      x = W / 2; y = H - (marginPx * H * 0.3); ctx.textAlign = 'center';
    } else if (pos === 'bottom-outside' || pos === 'bottom-inside') {
      x = W / 2; y = H - (marginPx * H * 0.3); ctx.textAlign = 'center';
    } else if (pos === 'top-center' || pos === 'top-outside') {
      x = W / 2; y = marginPx * H * 0.6 + fSize; ctx.textAlign = 'center';
    }
    ctx.fillText(label, x, y);
  }
  ctx.restore();
}

// ── Multi-selection & Combine ──
function bd_toggleMultiSelect(cellId) {
  // If nothing selected yet, add current single selection first
  if (_bdMultiSelect.length === 0 && _bdSelection.type === 'cell' && _bdSelection.id) {
    _bdMultiSelect.push(_bdSelection.id);
  }
  const idx = _bdMultiSelect.indexOf(cellId);
  if (idx >= 0) {
    _bdMultiSelect.splice(idx, 1);
  } else {
    _bdMultiSelect.push(cellId);
  }
  // Keep primary selection on last added
  if (_bdMultiSelect.length > 0) {
    _bdSelection = { type: 'cell', id: _bdMultiSelect[_bdMultiSelect.length - 1] };
  } else {
    _bdSelection = { type: null, id: null };
  }
  bd_updateCellList();
  bd_buildOverlay();
  renderBDCanvas(false);
  // Show info
  if (_bdMultiSelect.length > 1) {
    $('bdCellProps').classList.add('hidden');
    toast(_bdMultiSelect.length + ' cases sélectionnées — Clic droit pour les actions');
  } else if (_bdMultiSelect.length === 1) {
    bd_selectCell(_bdMultiSelect[0]);
  }
}

function bd_isMultiSelected(cellId) {
  return _bdMultiSelect.includes(cellId);
}

function bd_getMultiSelectedCells() {
  return _bdMultiSelect.map(id => _bdCells.find(c => c.id === id)).filter(Boolean);
}

function bd_clearMultiSelect() {
  _bdMultiSelect = [];
}

// ── Combine (merge) selected cells ──
function bd_mergeCells() {
  const cells = bd_getMultiSelectedCells();
  if (cells.length < 2) { toast('Sélectionnez au moins 2 cases (Shift+Clic)'); return; }
  bd_saveUndo();

  // Calculate bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  cells.forEach(c => {
    minX = Math.min(minX, c.x);
    minY = Math.min(minY, c.y);
    maxX = Math.max(maxX, c.x + c.w);
    maxY = Math.max(maxY, c.y + c.h);
  });

  // Use properties from the first cell as base
  const first = cells[0];
  const border = bd_getBorderStyle();

  // Remove old cells (and their bubbles)
  const idsToRemove = new Set(cells.map(c => c.id));
  _bdBubbles = _bdBubbles.filter(b => !idsToRemove.has(b.cellId));
  _bdCells = _bdCells.filter(c => !idsToRemove.has(c.id));

  // Create merged cell
  const merged = bd_makeCell(minX, minY, maxX - minX, maxY - minY);
  merged.imgIdx = first.imgIdx;
  merged.cropZoom = first.cropZoom;
  merged.cropX = first.cropX;
  merged.cropY = first.cropY;
  merged.borderW = first.borderW || border.w;
  merged.borderColor = first.borderColor || border.color;
  merged.radius = first.radius;
  merged.bleed = first.bleed;
  merged.manga = first.manga;
  merged.brightness = first.brightness;
  merged.contrast = first.contrast;
  _bdCells.push(merged);

  // Select the new merged cell
  _bdMultiSelect = [];
  bd_selectCell(merged.id);
  bd_updateCellList();
  renderBDCanvas(false);
  toast(cells.length + ' cases combinées en "' + merged.label + '"');
}

// ── Group delete ──
function bd_deleteMultiSelected() {
  const cells = bd_getMultiSelectedCells();
  if (cells.length === 0) return;
  bd_saveUndo();
  const idsToRemove = new Set(cells.map(c => c.id));
  _bdBubbles = _bdBubbles.filter(b => !idsToRemove.has(b.cellId));
  _bdCells = _bdCells.filter(c => !idsToRemove.has(c.id));
  _bdMultiSelect = [];
  _bdSelection = { type: null, id: null };
  $('bdCellProps').classList.add('hidden');
  bd_updateCellList();
  bd_updateBubbleList();
  renderBDCanvas(false);
  toast(cells.length + ' cases supprimées');
}

// ── Group duplicate ──
function bd_duplicateMultiSelected() {
  const cells = bd_getMultiSelectedCells();
  if (cells.length === 0) return;
  bd_saveUndo();
  const newIds = [];
  cells.forEach(orig => {
    const cell = bd_makeCell(orig.x + 2, orig.y + 2, orig.w, orig.h);
    cell.imgIdx = orig.imgIdx;
    cell.borderW = orig.borderW;
    cell.borderColor = orig.borderColor;
    cell.radius = orig.radius;
    cell.cropZoom = orig.cropZoom;
    cell.cropX = orig.cropX;
    cell.cropY = orig.cropY;
    cell.bleed = orig.bleed;
    cell.manga = orig.manga;
    cell.brightness = orig.brightness;
    cell.contrast = orig.contrast;
    _bdCells.push(cell);
    newIds.push(cell.id);
  });
  _bdMultiSelect = newIds;
  _bdSelection = { type: 'cell', id: newIds[newIds.length - 1] };
  bd_updateCellList();
  renderBDCanvas(false);
  toast(cells.length + ' cases dupliquées');
}

// ── Group move (arrow keys) ──
function bd_moveMultiSelected(dx, dy) {
  const cells = bd_getMultiSelectedCells();
  if (cells.length === 0) return;
  cells.forEach(c => {
    c.x = Math.max(0, Math.min(100 - c.w, c.x + dx));
    c.y = Math.max(0, Math.min(100 - c.h, c.y + dy));
  });
  renderBDCanvas(false);
}

// ── Group border change ──
function bd_setMultiBorder(w, color) {
  const cells = bd_getMultiSelectedCells();
  if (cells.length === 0) return;
  bd_saveUndo();
  cells.forEach(c => {
    if (w !== undefined) c.borderW = w;
    if (color !== undefined) c.borderColor = color;
  });
  renderBDCanvas(false);
  toast('Bordure appliquée à ' + cells.length + ' cases');
}

// ── Cell management ──
function bd_makeCell(x, y, w, h) {
  _bdCellIdCounter++;
  return {
    id: 'cell_' + String(_bdCellIdCounter).padStart(3, '0'),
    x, y, w, h,
    imgIdx: null,
    cropZoom: 1, cropX: 0.5, cropY: 0.5,
    borderW: 4, borderColor: '#000000', radius: 0,
    corners: { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} },
    rotation: 0,
    brightness: null, contrast: null, manga: null,
    bleed: false,
    label: 'Case ' + _bdCellIdCounter,
    visible: true
  };
}

function bd_addCell() {
  bd_saveUndo();
  const margin = _bdMarginPct;
  const innerW = 100 - 2 * margin;
  const innerH = 100 - 2 * margin;
  // Place new cell inside margins, sized to ~40% x 30% of inner area
  const cellW = Math.min(40, innerW * 0.4);
  const cellH = Math.min(30, innerH * 0.3);
  const cell = bd_makeCell(margin, margin, cellW, cellH);
  _bdCells.push(cell);
  bd_selectCell(cell.id);
  bd_updateCellList();
  renderBDCanvas(false);
}

function bd_removeCell(id) {
  bd_saveUndo();
  _bdCells = _bdCells.filter(c => c.id !== id);
  _bdBubbles = _bdBubbles.filter(b => b.cellId !== id);
  if (_bdSelection.type === 'cell' && _bdSelection.id === id) {
    _bdSelection = { type: null, id: null };
    $('bdCellProps').classList.add('hidden');
  }
  bd_updateCellList();
  bd_updateBubbleList();
  renderBDCanvas(false);
}

function bd_makeTriangle(dir) {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell) return;
  bd_saveUndo();
  const d = dir || 'up';
  if (d === 'up') {
    // Merge TL+TR at top-center → point at top
    cell.corners = { tl:{x:cell.w/2,y:0}, tr:{x:-cell.w/2,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} };
  } else if (d === 'down') {
    // Merge BL+BR at bottom-center → point at bottom
    cell.corners = { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:cell.w/2,y:0}, br:{x:-cell.w/2,y:0} };
  } else if (d === 'left') {
    // Merge TL+BL at left-center → point at left
    cell.corners = { tl:{x:0,y:cell.h/2}, tr:{x:0,y:0}, bl:{x:0,y:-cell.h/2}, br:{x:0,y:0} };
  } else if (d === 'right') {
    // Merge TR+BR at right-center → point at right
    cell.corners = { tl:{x:0,y:0}, tr:{x:0,y:cell.h/2}, bl:{x:0,y:0}, br:{x:0,y:-cell.h/2} };
  } else if (d === 'tl') {
    // Collapse TR to TL → right-angle triangle top-left
    cell.corners = { tl:{x:0,y:0}, tr:{x:-cell.w,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} };
  } else if (d === 'tr') {
    // Collapse TL to TR → right-angle triangle top-right
    cell.corners = { tl:{x:cell.w,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} };
  } else if (d === 'bl') {
    // Collapse BR to BL → right-angle triangle bottom-left
    cell.corners = { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:-cell.w,y:0} };
  } else if (d === 'br') {
    // Collapse BL to BR → right-angle triangle bottom-right
    cell.corners = { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:cell.w,y:0}, br:{x:0,y:0} };
  }
  bd_selectCell(cell.id);
  renderBDCanvas(false);
  toast('Triangle (' + d + ') — Ctrl+Glisser les coins pour ajuster');
}

function bd_resetCorners() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell) return;
  bd_saveUndo();
  cell.corners = { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} };
  bd_selectCell(cell.id);
  renderBDCanvas(false);
  toast('Case remise droite');
}

function bd_updateCornerInputs(cell) {
  const c = normalizeCorners(cell.corners);
  $('bdCellCornerTL').value = c.tl.x.toFixed ? c.tl.x.toFixed(1) : 0;
  $('bdCellCornerTR').value = c.tr.x.toFixed ? c.tr.x.toFixed(1) : 0;
  $('bdCellCornerBL').value = c.bl.x.toFixed ? c.bl.x.toFixed(1) : 0;
  $('bdCellCornerBR').value = c.br.x.toFixed ? c.br.x.toFixed(1) : 0;
  $('bdCellCornerTLY').value = c.tl.y.toFixed ? c.tl.y.toFixed(1) : 0;
  $('bdCellCornerTRY').value = c.tr.y.toFixed ? c.tr.y.toFixed(1) : 0;
  $('bdCellCornerBLY').value = c.bl.y.toFixed ? c.bl.y.toFixed(1) : 0;
  $('bdCellCornerBRY').value = c.br.y.toFixed ? c.br.y.toFixed(1) : 0;
}

function bd_updateCornerLabel(cell) {
  const c = cell.corners || { tl:0, tr:0, bl:0, br:0 };
  const any = c.tl || c.tr || c.bl || c.br;
  const lbl = $('bdCornerStatus');
  if (lbl) lbl.textContent = any ? 'Transformé' : 'Rectangle';
  if (lbl) lbl.style.color = any ? 'var(--accent)' : 'var(--text-muted)';
}

function bd_selectCell(id) {
  _bdSelection = { type: 'cell', id };
  bd_updateCellList();
  const cell = _bdCells.find(c => c.id === id);
  if (!cell) { $('bdCellProps').classList.add('hidden'); return; }
  $('bdCellProps').classList.remove('hidden');
  $('bdBubbleProps').classList.add('hidden');
  // Fill fields (% of canvas)
  $('bdCellX').value = (cell.x).toFixed(1);
  $('bdCellY').value = (cell.y).toFixed(1);
  $('bdCellW').value = (cell.w).toFixed(1);
  $('bdCellH').value = (cell.h).toFixed(1);
  $('bdCellBorder').value = cell.borderW;
  $('bdCellBorderVal').textContent = cell.borderW;
  $('bdCellBorderColor').value = cell.borderColor;
  $('bdCellRadius').value = cell.radius;
  $('bdCellRadiusVal').textContent = cell.radius;
  // Rotation
  $('bdCellRotation').value = cell.rotation || 0;
  $('bdCellRotationVal').textContent = (cell.rotation || 0) + '\u00B0';
  // Corner offsets display
  bd_updateCornerInputs(cell);
  bd_updateCornerLabel(cell);
  // Image info
  if (cell.imgIdx !== null && loadedImages[cell.imgIdx]) {
    $('bdCellImgInfo').textContent = loadedImages[cell.imgIdx].name;
    $('bdCellImgInfo').title = loadedImages[cell.imgIdx].name;
  } else {
    $('bdCellImgInfo').textContent = 'Aucune';
    $('bdCellImgInfo').title = '';
  }
  // Bleed
  $('bdCellBleed').checked = !!cell.bleed;
  // Per-cell filters
  $('bdCellManga').checked = !!cell.manga;
  $('bdCellBrightness').value = cell.brightness !== null ? cell.brightness : 100;
  $('bdCellBrightnessVal').textContent = (cell.brightness !== null ? cell.brightness : 100) + '%';
  $('bdCellContrast').value = cell.contrast !== null ? cell.contrast : 100;
  $('bdCellContrastVal').textContent = (cell.contrast !== null ? cell.contrast : 100) + '%';
  bd_buildOverlay();
}

function bd_updateCellList() {
  const list = $('bdCellList');
  if (!_bdCells.length) {
    list.innerHTML = '<div style="font-size:.6rem;color:var(--text-muted);padding:.3rem;text-align:center">Aucune case — utilisez un template ou ajoutez manuellement</div>';
    return;
  }
  list.innerHTML = '';
  _bdCells.forEach(cell => {
    const div = document.createElement('div');
    const isSingleSel = _bdSelection.type === 'cell' && _bdSelection.id === cell.id;
    const isMultiSel = _bdMultiSelect.length > 1 && bd_isMultiSelected(cell.id);
    div.className = 'bd-cell-item' + (isSingleSel && !isMultiSel ? ' selected' : '') + (isMultiSel ? ' multi-selected' : '');
    const hasImg = cell.imgIdx !== null && loadedImages[cell.imgIdx];
    if (!cell.visible) div.style.opacity = '0.45';
    div.innerHTML =
      '<button class="bd-ci-btn bd-ci-eye" title="' + (cell.visible ? 'Masquer' : 'Afficher') + '" onclick="event.stopPropagation();bd_toggleCellVisibility(\'' + cell.id + '\')" style="' + (!cell.visible ? 'opacity:.35;text-decoration:line-through' : '') + '">&#x1F441;</button>' +
      (hasImg ? '<img class="bd-ci-thumb" src="' + loadedImages[cell.imgIdx].src + '">' : '<div class="bd-ci-empty">?</div>') +
      '<span class="bd-ci-label">' + cell.label + '</span>' +
      '<button class="bd-ci-btn" title="Dupliquer" onclick="event.stopPropagation();bd_duplicateCell(\'' + cell.id + '\')">&#x1F4CB;</button>' +
      '<button class="bd-ci-btn" title="Supprimer" onclick="event.stopPropagation();bd_removeCell(\'' + cell.id + '\')">&#x1F5D1;</button>';
    // Drag & drop for layer reordering
    div.draggable = true;
    div.dataset.cellId = cell.id;
    div.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('application/bd-layer', cell.id);
      e.dataTransfer.effectAllowed = 'move';
      this.classList.add('dragging');
    });
    div.addEventListener('dragend', function() { this.classList.remove('dragging'); });
    div.addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; this.classList.add('bd-layer-drop-target'); });
    div.addEventListener('dragleave', function() { this.classList.remove('bd-layer-drop-target'); });
    div.addEventListener('drop', function(e) {
      e.preventDefault(); this.classList.remove('bd-layer-drop-target');
      const srcId = e.dataTransfer.getData('application/bd-layer');
      if (srcId && srcId !== cell.id) bd_reorderCell(srcId, cell.id);
    });
    div.onclick = (e) => {
      if (e.shiftKey) { bd_toggleMultiSelect(cell.id); return; }
      _bdMultiSelect = [];
      bd_selectCell(cell.id); renderBDCanvas(false);
    };
    list.appendChild(div);
  });
}

function bd_toggleCellVisibility(id) {
  const cell = _bdCells.find(c => c.id === id);
  if (!cell) return;
  cell.visible = !cell.visible;
  bd_updateCellList();
  renderBDCanvas(false);
}

function bd_reorderCell(srcId, targetId) {
  bd_saveUndo();
  const srcIdx = _bdCells.findIndex(c => c.id === srcId);
  const tgtIdx = _bdCells.findIndex(c => c.id === targetId);
  if (srcIdx === -1 || tgtIdx === -1) return;
  const [cell] = _bdCells.splice(srcIdx, 1);
  _bdCells.splice(tgtIdx, 0, cell);
  bd_updateCellList();
  renderBDCanvas(false);
}

// ── Cell property sync from inputs ──
function bd_syncCellProps() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell) return;
  cell.x = parseFloat($('bdCellX').value) || 0;
  cell.y = parseFloat($('bdCellY').value) || 0;
  cell.w = parseFloat($('bdCellW').value) || 10;
  cell.h = parseFloat($('bdCellH').value) || 10;
  cell.borderW = parseInt($('bdCellBorder').value) || 0;
  cell.borderColor = $('bdCellBorderColor').value;
  cell.radius = parseInt($('bdCellRadius').value) || 0;
  cell.rotation = parseInt($('bdCellRotation').value) || 0;
  cell.corners = {
    tl: { x: parseFloat($('bdCellCornerTL').value) || 0, y: parseFloat($('bdCellCornerTLY').value) || 0 },
    tr: { x: parseFloat($('bdCellCornerTR').value) || 0, y: parseFloat($('bdCellCornerTRY').value) || 0 },
    bl: { x: parseFloat($('bdCellCornerBL').value) || 0, y: parseFloat($('bdCellCornerBLY').value) || 0 },
    br: { x: parseFloat($('bdCellCornerBR').value) || 0, y: parseFloat($('bdCellCornerBRY').value) || 0 }
  };
  cell.bleed = $('bdCellBleed').checked;
  // Per-cell filters
  const mangaCb = $('bdCellManga');
  const brightSl = $('bdCellBrightness');
  const contSl = $('bdCellContrast');
  cell.manga = mangaCb.checked ? true : null;
  cell.brightness = parseInt(brightSl.value) !== 100 ? parseInt(brightSl.value) : null;
  cell.contrast = parseInt(contSl.value) !== 100 ? parseInt(contSl.value) : null;
  renderBDCanvas(false);
}

function bd_resetCellFilters() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell) return;
  cell.manga = null; cell.brightness = null; cell.contrast = null;
  $('bdCellManga').checked = false;
  $('bdCellBrightness').value = 100; $('bdCellBrightnessVal').textContent = '100%';
  $('bdCellContrast').value = 100; $('bdCellContrastVal').textContent = '100%';
  renderBDCanvas(false);
}

function bd_editCellCrop() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell || cell.imgIdx === null) { toast('Aucune image dans cette case'); return; }
  _cropForBDCell = cell.id;
  openCropEditor(cell.imgIdx, cell.w / cell.h);
}

// ── Undo / Redo system ──
function bd_currentSnap() {
  return {
    cells: JSON.parse(JSON.stringify(_bdCells)),
    bubbles: JSON.parse(JSON.stringify(_bdBubbles))
  };
}
function bd_restoreSnap(snap) {
  _bdCells = snap.cells;
  _bdBubbles = snap.bubbles;
  const maxCellId = _bdCells.reduce((m, c) => Math.max(m, parseInt(c.id.replace('cell_', '')) || 0), _bdCellIdCounter);
  const maxBubId = _bdBubbles.reduce((m, b) => Math.max(m, parseInt(b.id.replace('bubble_', '')) || 0), _bdBubbleIdCounter);
  _bdCellIdCounter = maxCellId;
  _bdBubbleIdCounter = maxBubId;
  _bdSelection = { type: null, id: null };
  $('bdCellProps').classList.add('hidden');
  $('bdBubbleProps').classList.add('hidden');
  bd_updateCellList();
  bd_updateBubbleList();
  renderBDCanvas(false);
  bd_updateUndoRedoBtns();
}
function bd_saveUndo() {
  _bdUndoStack.push(bd_currentSnap());
  if (_bdUndoStack.length > BD_UNDO_MAX) _bdUndoStack.shift();
  _bdRedoStack = []; // new action clears redo
  bd_updateUndoRedoBtns();
}
function bd_undo() {
  if (!_bdUndoStack.length) { toast('Rien a annuler'); return; }
  _bdRedoStack.push(bd_currentSnap());
  bd_restoreSnap(_bdUndoStack.pop());
  toast('Annule !');
}
function bd_redo() {
  if (!_bdRedoStack.length) { toast('Rien a retablir'); return; }
  _bdUndoStack.push(bd_currentSnap());
  bd_restoreSnap(_bdRedoStack.pop());
  toast('Retabli !');
}
function bd_updateUndoRedoBtns() {
  const btnU = $('bdUndoBtn');
  if (btnU) {
    btnU.disabled = _bdUndoStack.length === 0;
    btnU.title = _bdUndoStack.length ? 'Annuler (' + _bdUndoStack.length + ') — Ctrl+Z' : 'Rien a annuler';
  }
  const btnR = $('bdRedoBtn');
  if (btnR) {
    btnR.disabled = _bdRedoStack.length === 0;
    btnR.title = _bdRedoStack.length ? 'Retablir (' + _bdRedoStack.length + ') — Ctrl+Y' : 'Rien a retablir';
  }
}

// ── Auto-snap gutters ──
function bd_getGutterV() { return parseInt($('bdGutterV').value) || 4; }
function bd_getGutterH() { return parseInt($('bdGutterH').value) || 8; }

function bd_autoSnapGutters() {
  if (_bdCells.length < 1) return;
  bd_saveUndo();

  if (_bdSpread) {
    // In spread mode: equalize each half-page independently
    const leftCells = _bdCells.filter(c => !c.bleed && (c.x + c.w / 2) < 50);
    const rightCells = _bdCells.filter(c => !c.bleed && (c.x + c.w / 2) >= 50);
    // Use half-canvas width for gutter calculations
    const halfW = _bdCanvasW / 2;
    const gV = bd_getGutterV() / halfW * 100; // % relative to single page (0-100 space)
    const gH = bd_getGutterH() / _bdCanvasH * 100;
    const margin = _bdMarginPct;

    if (leftCells.length) {
      // Remap left cells from 0-50% canvas to 0-100% virtual space
      leftCells.forEach(c => { c.x *= 2; c.w *= 2; });
      _bd_equalizeSubset(leftCells, gV, gH, margin);
      // Remap back to 0-50%
      leftCells.forEach(c => { c.x *= 0.5; c.w *= 0.5; });
    }
    if (rightCells.length) {
      // Remap right cells from 50-100% canvas to 0-100% virtual space
      rightCells.forEach(c => { c.x = (c.x - 50) * 2; c.w *= 2; });
      _bd_equalizeSubset(rightCells, gV, gH, margin);
      // Remap back to 50-100%
      rightCells.forEach(c => { c.x = c.x * 0.5 + 50; c.w *= 0.5; });
    }
  } else {
    // Single page: equalize everything as before
    const gV = bd_getGutterV() / _bdCanvasW * 100;
    const gH = bd_getGutterH() / _bdCanvasH * 100;
    const margin = _bdMarginPct;
    const activeCells = _bdCells.filter(c => !c.bleed);
    if (activeCells.length) _bd_equalizeSubset(activeCells, gV, gH, margin);
  }

  // Reset all corner offsets to straight rectangles
  _bdCells.forEach(c => { c.corners = { tl:{x:0,y:0}, tr:{x:0,y:0}, bl:{x:0,y:0}, br:{x:0,y:0} }; });

  renderBDCanvas(false);
  if (_bdSelection.type === 'cell') bd_selectCell(_bdSelection.id);
  toast('Gouttieres egalisees + cases remises droites');
}

// Equalize only multi-selected cells along a chosen axis
function bd_equalizeSelected(axis) {
  const cells = bd_getMultiSelectedCells();
  if (cells.length < 2) {
    toast('Selectionnez au moins 2 cases (Shift+Clic)');
    return;
  }
  bd_saveUndo();
  const margin = _bdMarginPct;
  const gV = bd_getGutterV() / _bdCanvasW * 100;
  const gH = bd_getGutterH() / _bdCanvasH * 100;

  if (axis === 'h') {
    // Distribute horizontally (vertical gutters between cells)
    const sorted = [...cells].sort((a, b) => a.x - b.x);
    // Use page edges (margin) as bounding box
    const startX = margin;
    const endX = 100 - margin;
    const totalW = endX - startX;
    const sumCellW = sorted.reduce((s, c) => s + c.w, 0);
    const gutterCount = sorted.length - 1;
    const gutter = gutterCount > 0 ? (totalW - sumCellW) / gutterCount : 0;
    let curX = startX;
    sorted.forEach(c => {
      c.x = curX;
      curX += c.w + Math.max(gutter, gV);
    });
    // If cells overflow, shrink gutter to fit
    const lastCell = sorted[sorted.length - 1];
    if (lastCell.x + lastCell.w > endX) {
      const availGutter = (totalW - sumCellW) / gutterCount;
      let x2 = startX;
      sorted.forEach(c => { c.x = x2; x2 += c.w + availGutter; });
    }
  } else {
    // Distribute vertically (horizontal gutters between cells)
    const sorted = [...cells].sort((a, b) => a.y - b.y);
    const startY = margin;
    const endY = 100 - margin;
    const totalH = endY - startY;
    const sumCellH = sorted.reduce((s, c) => s + c.h, 0);
    const gutterCount = sorted.length - 1;
    const gutter = gutterCount > 0 ? (totalH - sumCellH) / gutterCount : 0;
    let curY = startY;
    sorted.forEach(c => {
      c.y = curY;
      curY += c.h + Math.max(gutter, gH);
    });
    const lastCell = sorted[sorted.length - 1];
    if (lastCell.y + lastCell.h > endY) {
      const availGutter = (totalH - sumCellH) / gutterCount;
      let y2 = startY;
      sorted.forEach(c => { c.y = y2; y2 += c.h + availGutter; });
    }
  }

  renderBDCanvas(false);
  if (_bdSelection.type === 'cell') bd_selectCell(_bdSelection.id);
  toast('Cases egalisees (' + (axis === 'h' ? 'horizontal' : 'vertical') + ')');
}

// Internal: equalize a subset of cells within a 0-100% coordinate space
function _bd_equalizeSubset(activeCells, gV, gH, margin) {
  const innerW = 100 - 2 * margin;
  const innerH = 100 - 2 * margin;

  // 1. Group into tentative rows by Y-center proximity
  const sorted = [...activeCells].sort((a, b) => {
    const ay = a.y + a.h / 2, by = b.y + b.h / 2;
    return ay - by || a.x - b.x;
  });
  const tentativeRows = [];
  let curRow = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prevMid = curRow[0].y + curRow[0].h / 2;
    const curMid = sorted[i].y + sorted[i].h / 2;
    if (Math.abs(curMid - prevMid) < 8) {
      curRow.push(sorted[i]);
    } else {
      tentativeRows.push(curRow);
      curRow = [sorted[i]];
    }
  }
  tentativeRows.push(curRow);

  // 2. Detect true span cells
  const spanCells = [];
  const rowCellIds = new Set();

  activeCells.forEach(c => {
    if (c.h <= innerH * 0.55) { rowCellIds.add(c.id); return; }
    let coveredOtherRows = 0;
    tentativeRows.forEach(row => {
      if (row.some(r => r.id === c.id)) return;
      const rowMidY = row.reduce((s, r) => s + r.y + r.h / 2, 0) / row.length;
      if (rowMidY >= c.y - 2 && rowMidY <= c.y + c.h + 2) coveredOtherRows++;
    });
    if (coveredOtherRows >= 1) {
      spanCells.push(c);
    } else {
      rowCellIds.add(c.id);
    }
  });

  const rowCells = activeCells.filter(c => rowCellIds.has(c.id));

  // 3. Re-group row cells
  const sortedRow = [...rowCells].sort((a, b) => {
    const ay = a.y + a.h / 2, by = b.y + b.h / 2;
    return ay - by || a.x - b.x;
  });
  const rows = [];
  if (sortedRow.length) {
    let cr = [sortedRow[0]];
    for (let i = 1; i < sortedRow.length; i++) {
      const prevMid = cr[0].y + cr[0].h / 2;
      const curMid = sortedRow[i].y + sortedRow[i].h / 2;
      if (Math.abs(curMid - prevMid) < 8) {
        cr.push(sortedRow[i]);
      } else {
        rows.push(cr);
        cr = [sortedRow[i]];
      }
    }
    rows.push(cr);
  }

  // 4. Layout
  if (spanCells.length > 0 && rows.length > 0) {
    spanCells.sort((a, b) => a.x - b.x);
    const spanTotalW = spanCells.reduce((s, c) => s + c.w, 0);
    const spanOnLeft = spanCells[0].x < 50;
    const spanFraction = Math.min(0.70, spanTotalW / innerW);
    const spanW = innerW * spanFraction;
    const restW = innerW - spanW - gV;

    const spanX = spanOnLeft ? margin : margin + restW + gV;
    const spanCellH = (innerH - (spanCells.length - 1) * gH) / spanCells.length;
    spanCells.forEach((c, i) => {
      c.x = spanX;
      c.y = margin + i * (spanCellH + gH);
      c.w = spanW;
      c.h = spanCellH;
    });

    const rowX = spanOnLeft ? margin + spanW + gV : margin;
    const totalGutterH = (rows.length - 1) * gH;
    const availH = innerH - totalGutterH;
    const totalOrigH = rows.reduce((s, row) => s + Math.max(...row.map(c => c.h)), 0);

    let curY = margin;
    rows.forEach(row => {
      row.sort((a, b) => a.x - b.x);
      const origMaxH = Math.max(...row.map(c => c.h));
      const rowH = origMaxH / totalOrigH * availH;
      const nCols = row.length;
      const totalGutterV = (nCols - 1) * gV;
      const availRowW = restW - totalGutterV;
      const totalColW = row.reduce((s, c) => s + c.w, 0);

      let curX = rowX;
      row.forEach(c => {
        c.x = curX;
        c.y = curY;
        c.w = c.w / totalColW * availRowW;
        c.h = rowH;
        curX += c.w + gV;
      });
      curY += rowH + gH;
    });
  } else {
    const allRowCells = [...rowCells, ...spanCells];
    const allSorted = allRowCells.sort((a, b) => {
      const ay = a.y + a.h / 2, by = b.y + b.h / 2;
      return ay - by || a.x - b.x;
    });
    const allRows = [];
    if (allSorted.length) {
      let cr2 = [allSorted[0]];
      for (let i = 1; i < allSorted.length; i++) {
        const prevMid = cr2[0].y + cr2[0].h / 2;
        const curMid = allSorted[i].y + allSorted[i].h / 2;
        if (Math.abs(curMid - prevMid) < 8) {
          cr2.push(allSorted[i]);
        } else {
          allRows.push(cr2);
          cr2 = [allSorted[i]];
        }
      }
      allRows.push(cr2);
    }

    const nRows = allRows.length;
    if (nRows === 0) return;
    const totalGutterH = (nRows - 1) * gH;
    const availH = innerH - totalGutterH;
    const rowOrigH = allRows.map(row => Math.max(...row.map(c => c.h)));
    const totalOrigH = rowOrigH.reduce((s, h) => s + h, 0);

    let curY = margin;
    allRows.forEach((row, ri) => {
      row.sort((a, b) => a.x - b.x);
      const rowH = rowOrigH[ri] / totalOrigH * availH;
      const nCols = row.length;
      const totalGutterV = (nCols - 1) * gV;
      const availW = innerW - totalGutterV;
      const totalColW = row.reduce((s, c) => s + c.w, 0);

      let curX = margin;
      row.forEach(c => {
        c.x = curX;
        c.y = curY;
        c.w = c.w / totalColW * availW;
        c.h = rowH;
        curX += c.w + gV;
      });
      curY += rowH + gH;
    });
  }
}

// ── Image assignment ──
function bd_pickImage() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell || !loadedImages.length) { toast('Chargez des images d\'abord'); return; }
  // Simple: cycle through images or assign next unassigned
  const used = new Set(_bdCells.map(c => c.imgIdx).filter(i => i !== null));
  let idx = loadedImages.findIndex((_, i) => !used.has(i));
  if (idx === -1) idx = 0; // all used, loop
  cell.imgIdx = idx;
  bd_selectCell(cell.id);
  renderBDCanvas(false);
}

function bd_removeImage() {
  const cell = _bdCells.find(c => c.id === _bdSelection.id);
  if (!cell) return;
  cell.imgIdx = null;
  cell.cropZoom = 1; cell.cropX = 0.5; cell.cropY = 0.5;
  bd_selectCell(cell.id);
  renderBDCanvas(false);
}

// ── Bubble management ──
function bd_addBubble() {
  bd_saveUndo();
  _bdBubbleIdCounter++;
  const parentCell = _bdCells.find(c => c.id === _bdSelection.id) || _bdCells[0];
  const cx = parentCell ? parentCell.x + parentCell.w / 2 : 50;
  const cy = parentCell ? parentCell.y + 10 : 20;
  const bubble = {
    id: 'bubble_' + String(_bdBubbleIdCounter).padStart(3, '0'),
    cellId: parentCell ? parentCell.id : '',
    type: 'speech', text: 'Texte...',
    x: cx - 10, y: cy - 6, w: 20, h: 12,
    flipX: false,
    fontSize: 32, fontFamily: 'Comic Neue', fontColor: '#000000',
    bgColor: '#ffffff', borderColor: '#000000', borderW: 3,
    italic: false, bold: false, align: 'center',
    rotation: 0, opacity: 1
  };
  _bdBubbles.push(bubble);
  bd_selectBubble(bubble.id);
  bd_updateBubbleList();
  renderBDCanvas(false);
}

function bd_removeBubble(id) {
  bd_saveUndo();
  _bdBubbles = _bdBubbles.filter(b => b.id !== id);
  if (_bdSelection.type === 'bubble' && _bdSelection.id === id) {
    _bdSelection = { type: null, id: null };
    $('bdBubbleProps').classList.add('hidden');
  }
  bd_updateBubbleList();
  renderBDCanvas(false);
}

function bd_selectBubble(id) {
  _bdSelection = { type: 'bubble', id };
  bd_updateBubbleList();
  const bub = _bdBubbles.find(b => b.id === id);
  if (!bub) { $('bdBubbleProps').classList.add('hidden'); return; }
  $('bdBubbleProps').classList.remove('hidden');
  $('bdCellProps').classList.add('hidden');
  // Fill fields
  const typeRadio = document.querySelector('input[name="bdBubbleType"][value="' + bub.type + '"]');
  if (typeRadio) typeRadio.checked = true;
  $('bdBubbleText').value = bub.text;
  $('bdBubbleFont').value = bub.fontFamily;
  $('bdBubbleFontSize').value = bub.fontSize;
  $('bdBubbleFontColor').value = bub.fontColor;
  $('bdBubbleBgColor').value = bub.bgColor;
  const alignRadio = document.querySelector('input[name="bdBubbleAlign"][value="' + (bub.align || 'center') + '"]');
  if (alignRadio) alignRadio.checked = true;
  $('bdBubbleFlip').checked = !!bub.flipX;
  $('bdBubbleRotation').value = bub.rotation || 0;
  $('bdBubbleRotationVal').textContent = (bub.rotation || 0) + '\u00B0';
  bd_buildOverlay();
}

function bd_updateBubbleList() {
  const list = $('bdBubbleList');
  if (!_bdBubbles.length) {
    list.innerHTML = '<div style="font-size:.6rem;color:var(--text-muted);padding:.3rem;text-align:center">Aucune bulle</div>';
    return;
  }
  list.innerHTML = '';
  _bdBubbles.forEach(bub => {
    const div = document.createElement('div');
    div.className = 'bd-bubble-item' + (_bdSelection.type === 'bubble' && _bdSelection.id === bub.id ? ' selected' : '');
    const typeIco = bub.type === 'speech' ? '&#x1F4AC;' : bub.type === 'thought' ? '&#x1F4AD;' : bub.type === 'shout' ? '&#x1F4A5;' : bub.type === 'caption' ? '&#x1F4DD;' : '&#x1F4D6;';
    div.innerHTML = '<span>' + typeIco + '</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
      bub.text.slice(0, 25) + '</span>' +
      '<button class="bd-ci-btn" onclick="event.stopPropagation();bd_removeBubble(\'' + bub.id + '\')">&#x1F5D1;</button>';
    div.onclick = () => { bd_selectBubble(bub.id); renderBDCanvas(false); };
    list.appendChild(div);
  });
}

function bd_syncBubbleProps() {
  const bub = _bdBubbles.find(b => b.id === _bdSelection.id);
  if (!bub) return;
  bub.type = document.querySelector('input[name="bdBubbleType"]:checked')?.value || 'speech';
  bub.text = $('bdBubbleText').value;
  bub.fontFamily = $('bdBubbleFont').value;
  bub.fontSize = parseInt($('bdBubbleFontSize').value) || 32;
  bub.fontColor = $('bdBubbleFontColor').value;
  bub.bgColor = $('bdBubbleBgColor').value;
  bub.align = document.querySelector('input[name="bdBubbleAlign"]:checked')?.value || 'center';
  bub.flipX = $('bdBubbleFlip').checked;
  bub.rotation = parseInt($('bdBubbleRotation').value) || 0;
  renderBDCanvas(false);
}

// ── BD Canvas Rendering ──
function bd_getBorderStyle() {
  const style = $('bdBorderStyle').value;
  if (style === 'thick') return { w: 4, color: '#000000' };
  if (style === 'thin') return { w: 2, color: '#000000' };
  if (style === 'white') return { w: 3, color: '#ffffff' };
  return { w: 3, color: $('bdBorderCustomColor').value };
}

function renderBDCanvas(forExport) {
  const canvas = forExport ? document.createElement('canvas') : $('previewCanvas');
  const scale = forExport ? 1 : Math.max(1, Math.ceil(Math.max(_bdCanvasW, _bdCanvasH) / 1200));
  const W = forExport ? _bdCanvasW : Math.round(_bdCanvasW / scale);
  const H = forExport ? _bdCanvasH : Math.round(_bdCanvasH / scale);
  _bdRenderScale = scale;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Filters
  const manga = $('bdMangaFilter')?.checked;
  const bright = parseInt($('bdBrightness')?.value) || 100;
  const contrast = parseInt($('bdContrast')?.value) || 100;

  // 1. Background
  ctx.fillStyle = _bgColor;
  ctx.fillRect(0, 0, W, H);

  // 1b. Draw margin guides (preview only)
  if (!forExport && _bdMarginPct > 0) {
    const mx = _bdMarginPct / 100 * W;
    const my = _bdMarginPct / 100 * H;
    ctx.save();
    ctx.strokeStyle = 'rgba(236,0,140,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(mx, my, W - 2 * mx, H - 2 * my);
    ctx.setLineDash([]);
    ctx.restore();
  }

  // Guide de séparation double page (preview uniquement)
  if (!forExport && _bdSpread) {
    const midX = W / 2;
    ctx.save();
    ctx.strokeStyle = 'rgba(236,0,140,0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 5]);
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, H);
    ctx.stroke();
    ctx.setLineDash([]);
    // Label "P.1" à gauche, "P.2" à droite
    ctx.fillStyle = 'rgba(236,0,140,0.4)';
    ctx.font = 'bold ' + (14 / scale) + 'px Inter,sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('P.1', 8 / scale, 20 / scale);
    ctx.textAlign = 'right';
    ctx.fillText('P.2', W - 8 / scale, 20 / scale);
    ctx.restore();
  }

  // Gutters are positional (handled by cell positions), no render-time usage needed
  const globalBorder = bd_getBorderStyle();

  // 2. Draw cells
  _bdCells.forEach(cell => {
    if (!cell.visible) return;
    const cx = cell.x / 100 * W, cy = cell.y / 100 * H;
    const cw = cell.w / 100 * W, ch = cell.h / 100 * H;
    const bw = (cell.borderW || globalBorder.w) / scale;
    const bc = cell.borderColor || globalBorder.color;
    const r = (cell.radius || 0) / scale;

    // Corner offsets (% → px)
    const cOff = cornersToPx(cell.corners, W, H);
    const hasDeform = hasCornerOffsets(cell);

    // Cell background (white) — clip to shape
    ctx.save();
    // Apply cell rotation around center
    if (cell.rotation) {
      const rcx = cx + cw / 2, rcy = cy + ch / 2;
      ctx.translate(rcx, rcy);
      ctx.rotate(cell.rotation * Math.PI / 180);
      ctx.translate(-rcx, -rcy);
    }
    if (hasDeform) {
      quadCellPath(ctx, cx, cy, cw, ch, cOff);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    } else if (r > 0) {
      roundRect(ctx, cx, cy, cw, ch, r);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx, cy, cw, ch);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx, cy, cw, ch);
    }

    // Draw image if assigned
    if (cell.imgIdx !== null && loadedImages[cell.imgIdx]) {
      const imgObj = loadedImages[cell.imgIdx].img;
      // Apply per-cell filters (fallback to global)
      const cellManga = cell.manga !== null ? cell.manga : manga;
      const cellBright = cell.brightness !== null ? cell.brightness : bright;
      const cellContrast = cell.contrast !== null ? cell.contrast : contrast;
      let filterStr = '';
      if (cellManga) filterStr += 'grayscale(100%) contrast(130%) ';
      if (cellBright !== 100) filterStr += 'brightness(' + (cellBright / 100) + ') ';
      if (cellContrast !== 100 && !cellManga) filterStr += 'contrast(' + (cellContrast / 100) + ') ';
      if (filterStr) ctx.filter = filterStr.trim();

      // Cover crop — expand draw rect to fill deformed quadrilateral
      const allXOff = [cOff.tl.x, cOff.tr.x, cOff.bl.x, cOff.br.x];
      const allYOff = [cOff.tl.y, cOff.tr.y, cOff.bl.y, cOff.br.y];
      const minXOff = Math.min(...allXOff), maxXOff = Math.max(...allXOff);
      const minYOff = Math.min(...allYOff), maxYOff = Math.max(...allYOff);
      const drawX = hasDeform ? cx + minXOff : cx;
      const drawW = hasDeform ? cw + (maxXOff - minXOff) : cw;
      const drawY = hasDeform ? cy + minYOff : cy;
      const drawH = hasDeform ? ch + (maxYOff - minYOff) : ch;
      const nw = imgObj.naturalWidth, nh = imgObj.naturalHeight;
      const rd = drawW / drawH;
      let baseSW, baseSH;
      if (nw / nh > rd) { baseSH = nh; baseSW = nh * rd; }
      else { baseSW = nw; baseSH = nw / rd; }
      const zoom = cell.cropZoom || 1;
      let sw = baseSW / zoom, sh = baseSH / zoom;
      sw = Math.min(sw, nw); sh = Math.min(sh, nh);
      let sx = (cell.cropX || 0.5) * (nw - sw);
      let sy = (cell.cropY || 0.5) * (nh - sh);
      sx = Math.max(0, Math.min(nw - sw, sx));
      sy = Math.max(0, Math.min(nh - sh, sy));
      ctx.drawImage(imgObj, sx, sy, sw, sh, drawX, drawY, drawW, drawH);
      ctx.filter = 'none';
    }
    ctx.restore();

    // Border
    if (bw > 0) {
      ctx.save();
      if (cell.rotation) {
        const rcx = cx + cw / 2, rcy = cy + ch / 2;
        ctx.translate(rcx, rcy);
        ctx.rotate(cell.rotation * Math.PI / 180);
        ctx.translate(-rcx, -rcy);
      }
      ctx.strokeStyle = bc;
      ctx.lineWidth = bw;
      if (hasDeform) {
        // Clip to shape then stroke at 2x so only inner half is visible — perfect border alignment
        ctx.save();
        quadCellPath(ctx, cx, cy, cw, ch, cOff);
        ctx.clip();
        ctx.lineWidth = bw * 2;
        quadCellPath(ctx, cx, cy, cw, ch, cOff);
        ctx.stroke();
        ctx.restore();
      } else if (r > 0) {
        roundRect(ctx, cx + bw / 2, cy + bw / 2, cw - bw, ch - bw, Math.max(0, r - bw / 2));
        ctx.stroke();
      } else {
        ctx.strokeRect(cx + bw / 2, cy + bw / 2, cw - bw, ch - bw);
      }
      ctx.restore();
    }
  });

  // 3. Draw bubbles
  _bdBubbles.forEach(bub => {
    if (bub.opacity <= 0) return;
    const bx = bub.x / 100 * W, by = bub.y / 100 * H;
    const bw = bub.w / 100 * W, bh = bub.h / 100 * H;
    const cx0 = bx + bw / 2, cy0 = by + bh / 2;
    const rx = bw / 2, ry = bh / 2;
    const flip = bub.flipX ? -1 : 1;
    ctx.save();
    ctx.globalAlpha = bub.opacity;
    if (bub.rotation) {
      ctx.translate(cx0, cy0);
      ctx.rotate(bub.rotation * Math.PI / 180);
      ctx.translate(-cx0, -cy0);
    }

    const borderW = (bub.borderW || 3) / scale;

    if (bub.type === 'speech') {
      // Ellipse with integrated Bezier tail
      const tailBaseX = cx0 + flip * rx * 0.25;
      const tailBaseY = by + bh;
      const tailTipX = cx0 + flip * rx * 0.5;
      const tailTipY = by + bh + ry * 0.55;
      ctx.beginPath();
      // Draw ellipse arc (most of it), leaving a gap for the tail
      const gapAngle = 0.18; // radians gap for tail junction
      const tailAngle = Math.PI / 2 + flip * 0.25; // bottom area
      ctx.ellipse(cx0, cy0, rx, ry, 0, tailAngle + gapAngle, tailAngle + Math.PI * 2 - gapAngle);
      // Bezier tail from ellipse edge → tip → back to ellipse
      const eAx = cx0 + rx * Math.cos(tailAngle + Math.PI * 2 - gapAngle);
      const eAy = cy0 + ry * Math.sin(tailAngle + Math.PI * 2 - gapAngle);
      const eBx = cx0 + rx * Math.cos(tailAngle + gapAngle);
      const eBy = cy0 + ry * Math.sin(tailAngle + gapAngle);
      ctx.quadraticCurveTo(eAx + flip * 5 / scale, eAy + 8 / scale, tailTipX, tailTipY);
      ctx.quadraticCurveTo(eBx - flip * 5 / scale, eBy + 8 / scale, eBx, eBy);
      ctx.closePath();
      ctx.fillStyle = bub.bgColor; ctx.fill();
      ctx.strokeStyle = bub.borderColor; ctx.lineWidth = borderW; ctx.stroke();

    } else if (bub.type === 'thought') {
      // Cloud shape (bumpy ellipse)
      ctx.beginPath();
      const bumps = 14;
      for (let i = 0; i <= bumps; i++) {
        const a = (i / bumps) * Math.PI * 2;
        const bump = 1 + 0.1 * Math.sin(i * 4.2);
        const px = cx0 + rx * bump * Math.cos(a);
        const py = cy0 + ry * bump * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else {
          const prevA = ((i - 1) / bumps) * Math.PI * 2;
          const midA = (a + prevA) / 2;
          const cpx = cx0 + rx * 1.15 * Math.cos(midA);
          const cpy = cy0 + ry * 1.15 * Math.sin(midA);
          ctx.quadraticCurveTo(cpx, cpy, px, py);
        }
      }
      ctx.closePath();
      ctx.fillStyle = bub.bgColor; ctx.fill();
      ctx.strokeStyle = bub.borderColor; ctx.lineWidth = borderW; ctx.stroke();
      // 3 thought circles (decreasing, pointing away)
      const dirX = flip * -0.4;
      const startCx = cx0 + dirX * rx;
      const startCy = by + bh + ry * 0.15;
      for (let i = 1; i <= 3; i++) {
        const t = i / 3;
        const cr = (7 - i * 1.5) / scale;
        ctx.beginPath();
        ctx.arc(startCx + dirX * t * rx * 0.6, startCy + t * ry * 0.7, cr, 0, Math.PI * 2);
        ctx.fillStyle = bub.bgColor; ctx.fill();
        ctx.strokeStyle = bub.borderColor; ctx.lineWidth = borderW * 0.6; ctx.stroke();
      }

    } else if (bub.type === 'shout') {
      // Spiky/explosive shape
      const spikes = 12;
      const outerR = Math.max(bw, bh) / 2;
      const innerR = outerR * 0.55;
      const scaleX = bw / Math.max(bw, bh);
      const scaleY = bh / Math.max(bw, bh);
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const jitter = i % 2 === 0 ? (1 + 0.15 * Math.sin(i * 2.7)) : 1;
        const px = cx0 + r * jitter * Math.cos(a) * scaleX;
        const py = cy0 + r * jitter * Math.sin(a) * scaleY;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = bub.bgColor || '#FFE135'; ctx.fill();
      ctx.strokeStyle = bub.borderColor; ctx.lineWidth = borderW * 1.3; ctx.stroke();

    } else if (bub.type === 'caption') {
      roundRect(ctx, bx, by, bw, bh, 4 / scale);
      ctx.fillStyle = bub.bgColor; ctx.fill();
      ctx.strokeStyle = bub.borderColor; ctx.lineWidth = borderW; ctx.stroke();
    }

    // Text (clipped to bubble area)
    const fs = (bub.fontSize || 32) / scale;
    const style = (bub.bold ? 'bold ' : '') + (bub.italic ? 'italic ' : '');
    ctx.font = style + fs + 'px ' + (bub.fontFamily || 'Comic Neue') + ',Arial,sans-serif';
    ctx.fillStyle = bub.fontColor || '#000000';
    ctx.textAlign = bub.align || 'center';
    ctx.textBaseline = 'middle';
    const textMaxW = bub.type === 'caption' ? bw * 0.9 : bw * 0.75;
    const textMaxH = bub.type === 'caption' ? bh * 0.9 : bh * 0.7;
    bd_wrapText(ctx, bub.text || '', cx0, cy0, textMaxW, fs * 1.25, bub.align || 'center', textMaxH, fs);

    ctx.restore();
  });

  if (!forExport) {
    // previewWrap toujours visible
    const zoomBtn = document.querySelector('.zoom-btn[onclick*="' + _currentZoom + '"]') || document.querySelector('.zoom-btn');
    setZoom(_currentZoom, zoomBtn);
    bd_buildOverlay();
  }

  // Page numbers
  bd_renderPageNumbers(ctx, W, H, scale, forExport);

  // Mettre à jour l'info compacte dans la barre inférieure
  const infoEl = $('bdCanvasInfo');
  if (infoEl && !forExport) {
    const pageLabel = _bdSpread ? 'Double page' : 'Page unique';
    infoEl.textContent = pageLabel + ' \u00b7 ' + _bdCanvasW + ' \u00d7 ' + _bdCanvasH + ' px \u00b7 ' + _bdCells.length + ' case(s)';
  }

  return canvas;
}

function bd_wrapText(ctx, text, cx, cy, maxW, lineH, align, maxH, baseFontSize) {
  // Split by explicit \n first, then wrap each paragraph by words
  const paragraphs = text.split('\n');
  let lines = [];
  paragraphs.forEach(para => {
    if (para.trim() === '') { lines.push(''); return; }
    const words = para.split(/\s+/);
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line); line = w;
      } else { line = test; }
    }
    if (line) lines.push(line);
  });

  // Auto-shrink font if text overflows vertically
  let currentLineH = lineH;
  if (maxH && lines.length * currentLineH > maxH) {
    const ratio = maxH / (lines.length * currentLineH);
    const newSize = Math.max(8, Math.floor((baseFontSize || 32) * ratio));
    ctx.font = ctx.font.replace(/\d+px/, newSize + 'px');
    currentLineH = newSize * 1.25;
    // Re-wrap with smaller font
    lines = [];
    paragraphs.forEach(para => {
      if (para.trim() === '') { lines.push(''); return; }
      const words = para.split(/\s+/);
      let line = '';
      for (const w of words) {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line); line = w;
        } else { line = test; }
      }
      if (line) lines.push(line);
    });
  }

  const totalH = lines.length * currentLineH;
  const startY = cy - totalH / 2 + currentLineH / 2;
  const xPos = align === 'left' ? cx - maxW / 2 : align === 'right' ? cx + maxW / 2 : cx;
  lines.forEach((l, i) => ctx.fillText(l, xPos, startY + i * currentLineH));
}

// ── Overlay handles ──
function bd_buildOverlay() {
  const overlay = $('bdOverlay');
  overlay.innerHTML = '';
  if (!isBDMode()) return;

  const canvas = $('previewCanvas');
  const rect = canvas.getBoundingClientRect();
  const sx = rect.width / canvas.width;
  const sy = rect.height / canvas.height;

  overlay.style.width = rect.width + 'px';
  overlay.style.height = rect.height + 'px';
  overlay.style.top = canvas.offsetTop + 'px';
  overlay.style.left = canvas.offsetLeft + 'px';

  // Margin guide overlay
  if (_bdMarginPct > 0) {
    const mg = document.createElement('div');
    mg.className = 'bd-margin-guide';
    const ml = _bdMarginPct / 100 * rect.width;
    const mt = _bdMarginPct / 100 * rect.height;
    mg.style.cssText = 'left:' + ml + 'px;top:' + mt + 'px;width:' + (rect.width - 2 * ml) + 'px;height:' + (rect.height - 2 * mt) + 'px';
    overlay.appendChild(mg);
  }

  // Cell click zones
  _bdCells.forEach(cell => {
    if (!cell.visible) return;
    const cx = cell.x / 100 * rect.width;
    const cy = cell.y / 100 * rect.height;
    const cw = cell.w / 100 * rect.width;
    const ch = cell.h / 100 * rect.height;

    // Corner offsets for overlay (in overlay px)
    const cOvr = cornersToPx(cell.corners, rect.width, rect.height);
    const hasDeform = hasCornerOffsets(cell);
    const qPts = quadCellCornersPx(cx, cy, cw, ch, cOvr);

    const zone = document.createElement('div');
    zone.className = 'bd-cell-zone';
    if (hasDeform) {
      const qi = quadOverlayInfo(qPts);
      zone.style.cssText = 'left:' + qi.left + 'px;top:' + qi.top + 'px;width:' + qi.width + 'px;height:' + qi.height + 'px;pointer-events:auto';
      zone.style.clipPath = qi.clipPath;
    } else {
      zone.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px;pointer-events:auto';
    }
    if (cell.rotation) {
      zone.style.transform = 'rotate(' + cell.rotation + 'deg)';
      zone.style.transformOrigin = ((cx + cw / 2) - parseFloat(zone.style.left)) + 'px ' + ((cy + ch / 2) - parseFloat(zone.style.top)) + 'px';
    }
    // Visual class for multi-selected cells
    if (bd_isMultiSelected(cell.id)) zone.classList.add('multi-selected');

    zone.onclick = (e) => {
      e.stopPropagation();
      // Alt+Click = duplicate (like Photoshop)
      if (e.altKey) { bd_duplicateCell(cell.id); return; }
      // Shift+Click = toggle multi-selection
      if (e.shiftKey) {
        bd_toggleMultiSelect(cell.id);
        return;
      }
      _bdMultiSelect = [];
      bd_selectCell(cell.id); renderBDCanvas(false);
    };

    // Make cell draggable for image swap (cell → cell)
    if (cell.imgIdx !== null) {
      zone.draggable = true;
      zone.addEventListener('dragstart', e => {
        e.dataTransfer.setData('application/bd-cell', cell.id);
        e.dataTransfer.setData('text/plain', String(cell.imgIdx));
        e.dataTransfer.effectAllowed = 'move';
        requestAnimationFrame(() => zone.classList.add('dragging'));
      });
      zone.addEventListener('dragend', () => {
        zone.classList.remove('dragging');
        overlay.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      });
    }

    // Accept drops (from thumbnails or other cells)
    zone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag-over');
      const srcCellId = e.dataTransfer.getData('application/bd-cell');
      if (srcCellId) {
        // Cell-to-cell swap
        const srcCell = _bdCells.find(c => c.id === srcCellId);
        if (srcCell && srcCell.id !== cell.id) {
          const tmpImg = cell.imgIdx; const tmpZ = cell.cropZoom; const tmpX = cell.cropX; const tmpY = cell.cropY;
          cell.imgIdx = srcCell.imgIdx; cell.cropZoom = srcCell.cropZoom; cell.cropX = srcCell.cropX; cell.cropY = srcCell.cropY;
          srcCell.imgIdx = tmpImg; srcCell.cropZoom = tmpZ; srcCell.cropX = tmpX; srcCell.cropY = tmpY;
          bd_selectCell(cell.id); renderBDCanvas(false);
        }
      } else {
        // Thumbnail drop
        const imgIdx = parseInt(e.dataTransfer.getData('text/plain'));
        if (!isNaN(imgIdx) && loadedImages[imgIdx]) {
          cell.imgIdx = imgIdx; cell.cropZoom = 1; cell.cropX = 0.5; cell.cropY = 0.5;
          bd_selectCell(cell.id); renderBDCanvas(false);
        }
      }
    });
    overlay.appendChild(zone);

    // Selection handles for selected cell
    if (_bdSelection.type === 'cell' && _bdSelection.id === cell.id) {
      const sel = document.createElement('div');
      sel.className = 'bd-selection-rect';
      if (hasDeform) {
        const qi = quadOverlayInfo(qPts);
        sel.style.cssText = 'left:' + qi.left + 'px;top:' + qi.top + 'px;width:' + qi.width + 'px;height:' + qi.height + 'px';
        sel.style.clipPath = qi.clipPath;
      } else {
        sel.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px';
      }
      if (cell.rotation) {
        sel.style.transform = 'rotate(' + cell.rotation + 'deg)';
        sel.style.transformOrigin = ((cx + cw / 2) - parseFloat(sel.style.left)) + 'px ' + ((cy + ch / 2) - parseFloat(sel.style.top)) + 'px';
      }
      overlay.appendChild(sel);

      // Smart button positioning — pick the widest edge to avoid overlap on triangles
      const topW = Math.abs(qPts.tr[0] - qPts.tl[0]);
      const botW = Math.abs(qPts.br[0] - qPts.bl[0]);
      const useBottom = topW < 60 && botW > topW; // top edge too narrow → use bottom
      let btnY, btnLeftX, btnMidX, btnRightX;
      if (useBottom) {
        btnY = Math.max(qPts.bl[1], qPts.br[1]) + 4;
        btnLeftX = Math.min(qPts.bl[0], qPts.br[0]) + 14;
        btnMidX = (qPts.bl[0] + qPts.br[0]) / 2;
        btnRightX = Math.max(qPts.bl[0], qPts.br[0]) - 14;
      } else {
        btnY = Math.min(qPts.tl[1], qPts.tr[1]) - 2;
        btnLeftX = Math.min(qPts.tl[0], qPts.tr[0]) + 14;
        btnMidX = (qPts.tl[0] + qPts.tr[0]) / 2;
        btnRightX = Math.max(qPts.tl[0], qPts.tr[0]) - 14;
      }
      // Ensure minimum spacing between buttons
      if (Math.abs(btnRightX - btnLeftX) < 56) {
        btnLeftX = btnMidX - 28;
        btnRightX = btnMidX + 28;
      }

      // Duplicate button
      const dupBtn = document.createElement('div');
      dupBtn.className = 'bd-cell-move';
      dupBtn.style.cssText = 'left:' + btnLeftX + 'px;top:' + btnY + 'px;pointer-events:auto;background:rgba(196,154,108,.8);font-size:11px;width:24px;height:24px;transform:none;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer';
      dupBtn.textContent = '\u274A';
      dupBtn.title = 'Dupliquer (ou Alt+Clic)';
      dupBtn.onclick = (e) => { e.stopPropagation(); bd_duplicateCell(cell.id); };
      overlay.appendChild(dupBtn);

      // Move handle (center)
      const mv = document.createElement('div');
      mv.className = 'bd-cell-move';
      mv.style.left = btnMidX + 'px';
      mv.style.top = btnY + 'px';
      mv.textContent = '\u2725';
      mv.style.pointerEvents = 'auto';
      bd_makeDraggable(mv, cell, 'move', sx, sy);
      overlay.appendChild(mv);

      // Edit crop button (if cell has image)
      if (cell.imgIdx !== null) {
        const editBtn = document.createElement('div');
        editBtn.className = 'bd-cell-move';
        editBtn.style.cssText = 'left:' + btnRightX + 'px;top:' + btnY + 'px;pointer-events:auto;background:rgba(16,185,129,.8);font-size:11px;width:24px;height:24px;transform:none;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer';
        editBtn.textContent = '\u270F';
        editBtn.title = 'Editer le cadrage';
        editBtn.onclick = (e) => { e.stopPropagation(); bd_editCellCrop(); };
        overlay.appendChild(editBtn);
      }

      // Resize handles — follow quadrilateral corners
      const handles = [
        { cls: 'h-tl', x: qPts.tl[0], y: qPts.tl[1], corner: 'tl' },
        { cls: 'h-tr', x: qPts.tr[0], y: qPts.tr[1], corner: 'tr' },
        { cls: 'h-bl', x: qPts.bl[0], y: qPts.bl[1], corner: 'bl' },
        { cls: 'h-br', x: qPts.br[0], y: qPts.br[1], corner: 'br' },
        { cls: 'h-t', x: (qPts.tl[0] + qPts.tr[0]) / 2, y: cy },
        { cls: 'h-b', x: (qPts.bl[0] + qPts.br[0]) / 2, y: cy + ch },
        { cls: 'h-l', x: (qPts.tl[0] + qPts.bl[0]) / 2, y: cy + ch / 2 },
        { cls: 'h-r', x: (qPts.tr[0] + qPts.br[0]) / 2, y: cy + ch / 2 },
      ];
      handles.forEach(h => {
        const el = document.createElement('div');
        el.className = 'bd-cell-handle ' + h.cls;
        el.style.cssText = 'left:' + h.x + 'px;top:' + h.y + 'px;pointer-events:auto';
        // Corner handles support Ctrl+Drag for free transform
        if (h.corner) {
          el.title = 'Ctrl+Glisser = transformation libre';
          el.dataset.corner = h.corner;
          bd_makeDraggable(el, cell, h.cls, sx, sy, h.corner);
        } else {
          bd_makeDraggable(el, cell, h.cls, sx, sy);
        }
        overlay.appendChild(el);
      });
    }

    // Multi-selection highlight
    if (_bdMultiSelect.length > 1 && bd_isMultiSelected(cell.id)) {
      const msel = document.createElement('div');
      msel.className = 'bd-multi-rect';
      if (hasDeform) {
        const qi = quadOverlayInfo(qPts);
        msel.style.cssText = 'left:' + qi.left + 'px;top:' + qi.top + 'px;width:' + qi.width + 'px;height:' + qi.height + 'px';
        msel.style.clipPath = qi.clipPath;
      } else {
        msel.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px';
      }
      // Show order badge
      const idx = _bdMultiSelect.indexOf(cell.id);
      const badge = document.createElement('div');
      badge.className = 'bd-multi-badge';
      badge.textContent = idx + 1;
      msel.appendChild(badge);
      overlay.appendChild(msel);
    }
  });

  // Bubble overlay zones
  _bdBubbles.forEach(bub => {
    const bx = bub.x / 100 * rect.width;
    const by = bub.y / 100 * rect.height;
    const bw = bub.w / 100 * rect.width;
    const bh = bub.h / 100 * rect.height;

    const zone = document.createElement('div');
    zone.className = 'bd-bubble-zone';
    zone.style.cssText = 'left:' + bx + 'px;top:' + by + 'px;width:' + bw + 'px;height:' + bh + 'px;pointer-events:auto';
    if (bub.rotation) {
      zone.style.transform = 'rotate(' + bub.rotation + 'deg)';
      zone.style.transformOrigin = '50% 50%';
    }
    zone.onclick = (e) => { e.stopPropagation(); bd_selectBubble(bub.id); renderBDCanvas(false); };
    overlay.appendChild(zone);

    if (_bdSelection.type === 'bubble' && _bdSelection.id === bub.id) {
      // Selection rect (blue)
      const sel = document.createElement('div');
      sel.className = 'bd-bubble-sel-rect';
      sel.style.cssText = 'left:' + bx + 'px;top:' + by + 'px;width:' + bw + 'px;height:' + bh + 'px';
      if (bub.rotation) {
        sel.style.transform = 'rotate(' + bub.rotation + 'deg)';
        sel.style.transformOrigin = '50% 50%';
      }
      overlay.appendChild(sel);

      // Move handle
      const mv = document.createElement('div');
      mv.className = 'bd-bubble-move';
      mv.style.left = (bx + bw / 2) + 'px';
      mv.style.top = (by - 2) + 'px';
      mv.textContent = '\u2725';
      mv.style.pointerEvents = 'auto';
      bd_makeBubbleDraggable(mv, bub, 'move', sx, sy);
      overlay.appendChild(mv);

      // Resize handles (4 corners + 4 edges)
      const handles = [
        { cls: 'h-tl', x: bx, y: by }, { cls: 'h-tr', x: bx + bw, y: by },
        { cls: 'h-bl', x: bx, y: by + bh }, { cls: 'h-br', x: bx + bw, y: by + bh },
        { cls: 'h-t', x: bx + bw / 2, y: by }, { cls: 'h-b', x: bx + bw / 2, y: by + bh },
        { cls: 'h-l', x: bx, y: by + bh / 2 }, { cls: 'h-r', x: bx + bw, y: by + bh / 2 },
      ];
      handles.forEach(h => {
        const el = document.createElement('div');
        el.className = 'bd-bubble-handle ' + h.cls;
        el.style.cssText = 'left:' + h.x + 'px;top:' + h.y + 'px;pointer-events:auto;cursor:' +
          (h.cls === 'h-tl' || h.cls === 'h-br' ? 'nwse-resize' :
           h.cls === 'h-tr' || h.cls === 'h-bl' ? 'nesw-resize' :
           h.cls === 'h-t' || h.cls === 'h-b' ? 'ns-resize' : 'ew-resize');
        bd_makeBubbleDraggable(el, bub, h.cls, sx, sy);
        overlay.appendChild(el);
      });
    }
  });

  // Click on empty space → deselect + clear multi-select
  overlay.onclick = () => {
    _bdSelection = { type: null, id: null };
    _bdMultiSelect = [];
    $('bdCellProps').classList.add('hidden');
    $('bdBubbleProps').classList.add('hidden');
    bd_updateCellList();
    bd_updateBubbleList();
    bd_buildOverlay();
  };
}

// ── Snap engine (shared by cells & bubbles) ──
function bd_computeSnap(obj, cellId, skipAlt) {
  const T = 1.5; // snap threshold in %
  const m = _bdMarginPct;
  const snaps = { x: null, y: null };
  _bdSnapLines = [];

  // Edges to test: left, right, top, bottom, center
  const edges = [
    { val: obj.x, prop: 'x', axis: 'v' },
    { val: obj.x + obj.w, prop: 'xr', axis: 'v' },
    { val: obj.x + obj.w / 2, prop: 'xc', axis: 'v' },
    { val: obj.y, prop: 'y', axis: 'h' },
    { val: obj.y + obj.h, prop: 'yb', axis: 'h' },
    { val: obj.y + obj.h / 2, prop: 'yc', axis: 'h' }
  ];

  // Snap targets: margins, page edges, center, other cells
  const targets = [];
  // Page edges
  targets.push({ v: 0, axis: 'v' }, { v: 100, axis: 'v' });
  targets.push({ v: 0, axis: 'h' }, { v: 100, axis: 'h' });
  // Margins (strong snap targets) + inner area center
  if (m > 0) {
    targets.push({ v: m, axis: 'v' }, { v: 100 - m, axis: 'v' });
    targets.push({ v: m, axis: 'h' }, { v: 100 - m, axis: 'h' });
    // Inner area center
    targets.push({ v: 50, axis: 'v' }, { v: 50, axis: 'h' });
  } else {
    targets.push({ v: 50, axis: 'v' }, { v: 50, axis: 'h' });
  }
  // Other cells + gutter-offset targets
  const gVPct = bd_getGutterV() / _bdCanvasW * 100;
  const gHPct = bd_getGutterH() / _bdCanvasH * 100;
  _bdCells.forEach(c => {
    if (c.id === cellId) return;
    targets.push({ v: c.x, axis: 'v' }, { v: c.x + c.w, axis: 'v' });
    targets.push({ v: c.y, axis: 'h' }, { v: c.y + c.h, axis: 'h' });
    // Gutter-offset snap: propose positions at exactly GutterV/GutterH from cell edges
    targets.push({ v: c.x + c.w + gVPct, axis: 'v' }); // right edge + gutterV
    targets.push({ v: c.x - gVPct, axis: 'v' });         // left edge - gutterV
    targets.push({ v: c.y + c.h + gHPct, axis: 'h' });   // bottom edge + gutterH
    targets.push({ v: c.y - gHPct, axis: 'h' });          // top edge - gutterH
  });

  // Find nearest snap for each axis
  let bestDxAbs = T + 1, bestDx = 0, bestSnapV = null;
  let bestDyAbs = T + 1, bestDy = 0, bestSnapH = null;
  edges.forEach(e => {
    targets.forEach(t => {
      if (t.axis !== e.axis) return;
      const d = t.v - e.val;
      if (Math.abs(d) > T) return;
      if (e.axis === 'v' && Math.abs(d) < bestDxAbs) {
        bestDxAbs = Math.abs(d); bestDx = d; bestSnapV = t.v;
      }
      if (e.axis === 'h' && Math.abs(d) < bestDyAbs) {
        bestDyAbs = Math.abs(d); bestDy = d; bestSnapH = t.v;
      }
    });
  });

  if (bestDxAbs <= T) { snaps.x = bestDx; _bdSnapLines.push({ axis: 'v', pos: bestSnapV }); }
  if (bestDyAbs <= T) { snaps.y = bestDy; _bdSnapLines.push({ axis: 'h', pos: bestSnapH }); }
  return snaps;
}

function bd_makeDraggable(el, cell, mode, sx, sy, cornerKey) {
  let startX, startY, origX, origY, origW, origH, origCorners, freeCornerMode;
  const canvas = $('previewCanvas');

  function onDown(e) {
    e.preventDefault(); e.stopPropagation();
    bd_saveUndo();
    const ev = e.touches ? e.touches[0] : e;
    startX = ev.clientX; startY = ev.clientY;
    origX = cell.x; origY = cell.y; origW = cell.w; origH = cell.h;
    cell.corners = normalizeCorners(cell.corners);
    origCorners = JSON.parse(JSON.stringify(cell.corners));
    // Ctrl+Click on a corner handle = free transform mode
    freeCornerMode = cornerKey && (e.ctrlKey || e.metaKey);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }

  function onMove(e) {
    e.preventDefault();
    const ev = e.touches ? e.touches[0] : e;
    const altKey = e.altKey || false;
    const shiftKey = e.shiftKey || false;
    const rect2 = canvas.getBoundingClientRect();
    let dx = (ev.clientX - startX) / rect2.width * 100;
    let dy = (ev.clientY - startY) / rect2.height * 100;

    // Free corner transform mode: move one corner in X+Y
    if (freeCornerMode && cornerKey) {
      const oc = origCorners[cornerKey];
      let newX = oc.x + dx;
      let newY = oc.y + dy;
      // Magnetic snap: snap to 0 (straight) when close
      if (Math.abs(newX) < 1.2) newX = 0;
      if (Math.abs(newY) < 1.2) newY = 0;
      // Shift = constrain to one axis
      if (shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) newY = oc.y;
        else newX = oc.x;
      }
      cell.corners[cornerKey] = { x: newX, y: newY };
      // Update the UI inputs
      if (_bdSelection.id === cell.id) {
        bd_updateCornerInputs(cell);
        bd_updateCornerLabel(cell);
      }
      renderBDCanvas(false);
      return;
    }

    // Shift = constrain to dominant axis (like Photoshop)
    if (shiftKey && mode === 'move') {
      if (Math.abs(dx) > Math.abs(dy)) dy = 0;
      else dx = 0;
    }

    if (mode === 'move') {
      cell.x = Math.max(0, Math.min(100 - cell.w, origX + dx));
      cell.y = Math.max(0, Math.min(100 - cell.h, origY + dy));
    } else if (mode === 'h-br') {
      cell.w = Math.max(5, origW + dx);
      cell.h = Math.max(5, origH + dy);
    } else if (mode === 'h-bl') {
      cell.x = origX + dx; cell.w = Math.max(5, origW - dx);
      cell.h = Math.max(5, origH + dy);
    } else if (mode === 'h-tr') {
      cell.w = Math.max(5, origW + dx);
      cell.y = origY + dy; cell.h = Math.max(5, origH - dy);
    } else if (mode === 'h-tl') {
      cell.x = origX + dx; cell.w = Math.max(5, origW - dx);
      cell.y = origY + dy; cell.h = Math.max(5, origH - dy);
    } else if (mode === 'h-r') { cell.w = Math.max(5, origW + dx); }
    else if (mode === 'h-l') { cell.x = origX + dx; cell.w = Math.max(5, origW - dx); }
    else if (mode === 'h-b') { cell.h = Math.max(5, origH + dy); }
    else if (mode === 'h-t') { cell.y = origY + dy; cell.h = Math.max(5, origH - dy); }

    // Snap (Alt key bypasses for bleed effect)
    _bdSnapLines = [];
    if (!altKey) {
      const snap = bd_computeSnap(cell, cell.id);
      if (snap.x !== null) { cell.x += snap.x; }
      if (snap.y !== null) { cell.y += snap.y; }
    }

    renderBDCanvas(false);
    bd_renderSnapLines();
    if (_bdSelection.id === cell.id) {
      $('bdCellX').value = cell.x.toFixed(1);
      $('bdCellY').value = cell.y.toFixed(1);
      $('bdCellW').value = cell.w.toFixed(1);
      $('bdCellH').value = cell.h.toFixed(1);
    }
  }

  function onUp() {
    _bdSnapLines = [];
    bd_renderSnapLines();
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
    bd_buildOverlay();
  }

  el.addEventListener('mousedown', onDown);
  el.addEventListener('touchstart', e => onDown(e), { passive: false });
}

// ── Bubble draggable (same pattern, different target) ──
function bd_makeBubbleDraggable(el, bub, mode, sx, sy) {
  let startX, startY, origX, origY, origW, origH;
  const canvas = $('previewCanvas');

  function onDown(e) {
    e.preventDefault(); e.stopPropagation();
    bd_saveUndo();
    const ev = e.touches ? e.touches[0] : e;
    startX = ev.clientX; startY = ev.clientY;
    origX = bub.x; origY = bub.y; origW = bub.w; origH = bub.h;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }

  function onMove(e) {
    e.preventDefault();
    const ev = e.touches ? e.touches[0] : e;
    const shiftKey = e.shiftKey || false;
    const rect2 = canvas.getBoundingClientRect();
    let dx = (ev.clientX - startX) / rect2.width * 100;
    let dy = (ev.clientY - startY) / rect2.height * 100;

    // Shift = constrain to dominant axis
    if (shiftKey && mode === 'move') {
      if (Math.abs(dx) > Math.abs(dy)) dy = 0;
      else dx = 0;
    }

    if (mode === 'move') {
      bub.x = Math.max(0, Math.min(100 - bub.w, origX + dx));
      bub.y = Math.max(0, Math.min(100 - bub.h, origY + dy));
    } else if (mode === 'h-br') {
      bub.w = Math.max(5, origW + dx); bub.h = Math.max(3, origH + dy);
    } else if (mode === 'h-bl') {
      bub.x = origX + dx; bub.w = Math.max(5, origW - dx); bub.h = Math.max(3, origH + dy);
    } else if (mode === 'h-tr') {
      bub.w = Math.max(5, origW + dx); bub.y = origY + dy; bub.h = Math.max(3, origH - dy);
    } else if (mode === 'h-tl') {
      bub.x = origX + dx; bub.w = Math.max(5, origW - dx);
      bub.y = origY + dy; bub.h = Math.max(3, origH - dy);
    } else if (mode === 'h-r') { bub.w = Math.max(5, origW + dx); }
    else if (mode === 'h-l') { bub.x = origX + dx; bub.w = Math.max(5, origW - dx); }
    else if (mode === 'h-b') { bub.h = Math.max(3, origH + dy); }
    else if (mode === 'h-t') { bub.y = origY + dy; bub.h = Math.max(3, origH - dy); }

    renderBDCanvas(false);
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
    bd_buildOverlay();
  }

  el.addEventListener('mousedown', onDown);
  el.addEventListener('touchstart', e => onDown(e), { passive: false });
}

// ── Render snap guide lines on overlay ──
function bd_renderSnapLines() {
  document.querySelectorAll('.bd-snap-line').forEach(el => el.remove());
  const overlay = $('bdOverlay');
  if (!overlay || !_bdSnapLines.length) return;
  const rect = $('previewCanvas').getBoundingClientRect();
  _bdSnapLines.forEach(s => {
    const div = document.createElement('div');
    div.className = 'bd-snap-line ' + (s.axis === 'h' ? 'h' : 'v');
    if (s.axis === 'h') { div.style.top = (s.pos / 100 * rect.height) + 'px'; }
    else { div.style.left = (s.pos / 100 * rect.width) + 'px'; }
    overlay.appendChild(div);
  });
}

// ── Templates ──
// Generate preview cell positions from a template (for SVG thumbnails)
function bd_tplPreviewCells(tpl) {
  const m = 4; // preview margin %
  const iW = 100 - 2 * m, iH = 100 - 2 * m;
  const gV = 2, gH = 3; // small preview gutters
  if (tpl.custom) return tpl.custom(m, iW, iH, gV, gH);
  if (!tpl.rows) return [];
  const cells = [];
  const nRows = tpl.rows.length;
  const availH = iH - (nRows - 1) * gH;
  const totalRH = tpl.rowH.reduce((s, h) => s + h, 0);
  let curY = m;
  tpl.rows.forEach((row, ri) => {
    const rh = tpl.rowH[ri] / totalRH * availH;
    const nCols = row.length;
    const availW = iW - (nCols - 1) * gV;
    const totalCW = row.reduce((s, c) => s + c.w, 0);
    let curX = m;
    row.forEach(col => {
      const cw = col.w / totalCW * availW;
      cells.push({ x: curX, y: curY, w: cw, h: rh });
      curX += cw + gV;
    });
    curY += rh + gH;
  });
  return cells;
}

// ── Spread template selection state ──
let _bdSpreadTplLeft = null;
let _bdSpreadTplRight = null;

function bd_buildTemplateGrid() {
  const colors = ['#ec008c','#1e1b3a','#3b82f6','#f59e0b','#10b981','#8b5cf6','#ef4444','#06b6d4'];

  function makeTplSvg(tpl) {
    const previewCells = bd_tplPreviewCells(tpl);
    const vH = 140; // viewBox height
    let svg = '<svg viewBox="0 0 100 ' + vH + '" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="' + vH + '" fill="#f4f3f8" rx="3"/>';
    previewCells.forEach((c, i) => {
      const col = colors[i % colors.length];
      const cy = c.y / 100 * vH, ch = c.h / 100 * vH;
      if (c.corners && (c.corners.tl.x || c.corners.tl.y || c.corners.tr.x || c.corners.tr.y || c.corners.bl.x || c.corners.bl.y || c.corners.br.x || c.corners.br.y)) {
        // Polygon for deformed cells — corners are in % of canvas (100x100), scale Y to viewBox
        const tlx = c.x + c.corners.tl.x, tly = cy + c.corners.tl.y / 100 * vH;
        const trx = c.x + c.w + c.corners.tr.x, try2 = cy + c.corners.tr.y / 100 * vH;
        const brx = c.x + c.w + c.corners.br.x, bry = cy + ch + c.corners.br.y / 100 * vH;
        const blx = c.x + c.corners.bl.x, bly = cy + ch + c.corners.bl.y / 100 * vH;
        svg += '<polygon points="' + tlx + ',' + tly + ' ' + trx + ',' + try2 + ' ' + brx + ',' + bry + ' ' + blx + ',' + bly + '" fill="' + col + '" opacity=".25" stroke="' + col + '" stroke-width="1.5" stroke-linejoin="round"/>';
      } else {
        svg += '<rect x="' + c.x + '" y="' + cy + '" width="' + c.w + '" height="' + ch + '" fill="' + col + '" rx="2" opacity=".25" stroke="' + col + '" stroke-width="1.5"/>';
      }
    });
    svg += '</svg>';
    return svg;
  }

  if (_bdSpread) {
    // ── Double page mode: show left/right grids ──
    $('bdTplSingleMode').classList.add('hidden');
    $('bdTplSpreadMode').classList.remove('hidden');
    $('bdTplTitle').textContent = 'Templates — Double Page';
    $('bdTplDesc').textContent = 'Choisissez un template pour chaque page. Les images seront assignées dans l\'ordre.';

    _bdSpreadTplLeft = null;
    _bdSpreadTplRight = null;
    $('bdTplApplySpread').disabled = true;
    $('bdTplSpreadPreview').textContent = 'Sélectionnez un template pour chaque page';

    // Build left grid
    const gridL = $('bdTplGridLeft');
    gridL.innerHTML = '';
    BD_TEMPLATES.forEach(tpl => {
      const item = document.createElement('div');
      item.className = 'bd-tpl-item';
      item.innerHTML = makeTplSvg(tpl) + '<span>' + tpl.name + '</span>';
      item.onclick = () => {
        gridL.querySelectorAll('.bd-tpl-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        _bdSpreadTplLeft = tpl;
        bd_updateSpreadPreview();
      };
      gridL.appendChild(item);
    });

    // Build right grid
    const gridR = $('bdTplGridRight');
    gridR.innerHTML = '';
    BD_TEMPLATES.forEach(tpl => {
      const item = document.createElement('div');
      item.className = 'bd-tpl-item';
      item.innerHTML = makeTplSvg(tpl) + '<span>' + tpl.name + '</span>';
      item.onclick = () => {
        gridR.querySelectorAll('.bd-tpl-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        _bdSpreadTplRight = tpl;
        bd_updateSpreadPreview();
      };
      gridR.appendChild(item);
    });
  } else {
    // ── Single page mode: classic grid ──
    $('bdTplSingleMode').classList.remove('hidden');
    $('bdTplSpreadMode').classList.add('hidden');
    $('bdTplTitle').textContent = 'Templates de planche';
    $('bdTplDesc').textContent = 'Choisissez une disposition. Les images chargees seront assignees dans l\'ordre.';

    const grid = $('bdTplGrid');
    grid.innerHTML = '';
    BD_TEMPLATES.forEach(tpl => {
      const item = document.createElement('div');
      item.className = 'bd-tpl-item';
      item.innerHTML = makeTplSvg(tpl) + '<span>' + tpl.name + '</span>';
      item.onclick = () => bd_applyTemplate(tpl);
      grid.appendChild(item);
    });
  }
}

function bd_updateSpreadPreview() {
  const btnBoth = $('bdTplApplySpread');
  const btnL = $('bdTplApplyLeft');
  const btnR = $('bdTplApplyRight');
  const info = $('bdTplSpreadPreview');

  btnBoth.disabled = !(_bdSpreadTplLeft && _bdSpreadTplRight);
  btnL.disabled = !_bdSpreadTplLeft;
  btnR.disabled = !_bdSpreadTplRight;

  const parts = [];
  if (_bdSpreadTplLeft) parts.push('Gauche: "' + _bdSpreadTplLeft.name + '"');
  else parts.push('Gauche: non sélectionné');
  if (_bdSpreadTplRight) parts.push('Droite: "' + _bdSpreadTplRight.name + '"');
  else parts.push('Droite: non sélectionné');
  info.textContent = parts.join(' · ');
}

function bd_applySpreadTemplates() {
  if (!_bdSpreadTplLeft || !_bdSpreadTplRight) return;
  bd_saveUndo();
  _bd_applySpreadSide('both');
}

// side = 'both' | 'left' | 'right'
function _bd_applySpreadSide(side) {
  const border = bd_getBorderStyle();
  const margin = _bdMarginPct;
  // Gutters relative to a SINGLE page (half the canvas width)
  const halfCanvasW = _bdCanvasW / 2;
  const gV = bd_getGutterV() / halfCanvasW * 100; // % of single page
  const gH = bd_getGutterH() / _bdCanvasH * 100;

  function generatePageCells(tpl, pageOffset) {
    // Generate cells in 0-100% space (as if full single page)
    // Then remap to pageOffset..pageOffset+50% of full canvas
    const innerW = 100 - 2 * margin;
    const innerH = 100 - 2 * margin;
    let defs = [];

    if (tpl.custom) {
      defs = tpl.custom(margin, innerW, innerH, gV, gH);
    } else if (tpl.rows) {
      const nRows = tpl.rows.length;
      const totalGutterH = (nRows - 1) * gH;
      const availH = innerH - totalGutterH;
      const totalRowH = tpl.rowH.reduce((s, h) => s + h, 0);

      let curY = margin;
      tpl.rows.forEach((row, ri) => {
        const rowHeight = tpl.rowH[ri] / totalRowH * availH;
        const nCols = row.length;
        const availW = innerW - (nCols - 1) * gV;
        const totalColW = row.reduce((s, c) => s + c.w, 0);

        let curX = margin;
        row.forEach((col) => {
          const cellW = col.w / totalColW * availW;
          defs.push({ x: curX, y: curY, w: cellW, h: rowHeight });
          curX += cellW + gV;
        });
        curY += rowHeight + gH;
      });
    }

    // Remap: x and w from 0-100% single page → pageOffset..pageOffset+50% of full canvas
    // Corner X offsets must also be halved (they are in % of full canvas width)
    return defs.map(c => {
      const mapped = {
        x: pageOffset + c.x * 0.5,
        y: c.y,
        w: c.w * 0.5,
        h: c.h
      };
      if (c.corners) {
        mapped.corners = {
          tl: { x: c.corners.tl.x * 0.5, y: c.corners.tl.y },
          tr: { x: c.corners.tr.x * 0.5, y: c.corners.tr.y },
          bl: { x: c.corners.bl.x * 0.5, y: c.corners.bl.y },
          br: { x: c.corners.br.x * 0.5, y: c.corners.br.y }
        };
      }
      if (c.rotation) mapped.rotation = c.rotation;
      return mapped;
    });
  }

  if (side === 'both') {
    _bdCells = [];
    _bdCellIdCounter = 0;
  } else {
    // Keep cells from the OTHER side, remove cells from this side
    const keepLeft = side === 'right';
    _bdCells = _bdCells.filter(c => {
      const centerX = c.x + c.w / 2;
      return keepLeft ? centerX < 50 : centerX >= 50;
    });
  }

  let imgOffset = 0;
  if (side !== 'right' && _bdSpreadTplLeft) {
    const leftDefs = generatePageCells(_bdSpreadTplLeft, 0);
    leftDefs.forEach((c, i) => {
      const cell = bd_makeCell(c.x, c.y, c.w, c.h);
      cell.borderW = border.w;
      cell.borderColor = border.color;
      if (c.corners) cell.corners = c.corners;
      if (c.rotation) cell.rotation = c.rotation;
      if (loadedImages[imgOffset + i]) cell.imgIdx = imgOffset + i;
      _bdCells.push(cell);
    });
    imgOffset += leftDefs.length;
  } else {
    // Count existing left cells for image offset
    imgOffset = _bdCells.filter(c => c.x + c.w / 2 < 50).length;
  }

  if (side !== 'left' && _bdSpreadTplRight) {
    const rightDefs = generatePageCells(_bdSpreadTplRight, 50);
    rightDefs.forEach((c, i) => {
      const cell = bd_makeCell(c.x, c.y, c.w, c.h);
      cell.borderW = border.w;
      cell.borderColor = border.color;
      if (c.corners) cell.corners = c.corners;
      if (c.rotation) cell.rotation = c.rotation;
      if (loadedImages[imgOffset + i]) cell.imgIdx = imgOffset + i;
      _bdCells.push(cell);
    });
  }

  _bdSelection = { type: null, id: null };
  $('bdCellProps').classList.add('hidden');
  bd_updateCellList();
  renderBDCanvas(false);
  bd_closeTemplateModal();

  const names = [];
  if (side !== 'right' && _bdSpreadTplLeft) names.push('"' + _bdSpreadTplLeft.name + '" (gauche)');
  if (side !== 'left' && _bdSpreadTplRight) names.push('"' + _bdSpreadTplRight.name + '" (droite)');
  toast('Double page: ' + names.join(' + ') + ' — ' + _bdCells.length + ' cases');
}

function bd_applyTemplate(tpl) {
  bd_saveUndo();
  const margin = _bdMarginPct;
  const gV = bd_getGutterV() / _bdCanvasW * 100; // gutter between columns (%)
  const gH = bd_getGutterH() / _bdCanvasH * 100; // gutter between rows (%)
  const innerW = 100 - 2 * margin;
  const innerH = 100 - 2 * margin;
  const border = bd_getBorderStyle();
  _bdCells = [];
  _bdCellIdCounter = 0;

  let cellDefs = [];

  if (tpl.custom) {
    // Custom layout function returns absolute positioned cells
    cellDefs = tpl.custom(margin, innerW, innerH, gV, gH);
  } else if (tpl.rows) {
    // Row-based layout: distribute rows vertically, cells horizontally
    const nRows = tpl.rows.length;
    const totalGutterH = (nRows - 1) * gH;
    const availH = innerH - totalGutterH;
    const totalRowH = tpl.rowH.reduce((s, h) => s + h, 0);

    let curY = margin;
    tpl.rows.forEach((row, ri) => {
      const rowHeight = tpl.rowH[ri] / totalRowH * availH;
      const nCols = row.length;
      const totalGutterV = (nCols - 1) * gV;
      const availW = innerW - totalGutterV;
      const totalColW = row.reduce((s, c) => s + c.w, 0);

      let curX = margin;
      row.forEach((col, ci) => {
        const cellW = col.w / totalColW * availW;
        cellDefs.push({ x: curX, y: curY, w: cellW, h: rowHeight });
        curX += cellW + gV;
      });
      curY += rowHeight + gH;
    });
  }

  cellDefs.forEach((c, i) => {
    const cell = bd_makeCell(c.x, c.y, c.w, c.h);
    cell.borderW = border.w;
    cell.borderColor = border.color;
    if (c.corners) cell.corners = c.corners;
    if (c.rotation) cell.rotation = c.rotation;
    if (loadedImages[i]) cell.imgIdx = i;
    _bdCells.push(cell);
  });

  _bdSelection = { type: null, id: null };
  $('bdCellProps').classList.add('hidden');
  bd_updateCellList();
  renderBDCanvas(false);
  bd_closeTemplateModal();
  toast('Template "' + tpl.name + '" applique — ' + _bdCells.length + ' cases');
  if (_bdSpread) {
    toast('Template appliqué sur les 2 pages — ' + _bdCells.length + ' cases au total. Conseil : utilisez "Egaliser" pour ajuster les gouttières.');
  }
}

function bd_openTemplateModal() {
  bd_buildTemplateGrid(); // Rebuild grid to reflect current spread state
  $('bdTemplateModal').classList.remove('hidden');
}
function bd_closeTemplateModal() {
  $('bdTemplateModal').classList.add('hidden');
}

// ── Context menu ──
function bd_showContextMenu(e) {
  e.preventDefault();
  if (!isBDMode()) return;
  const menu = $('bdContextMenu');
  menu.classList.remove('hidden');
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';

  const canvas = $('previewCanvas');
  const rect = canvas.getBoundingClientRect();
  const sx = canvas.width / rect.width;
  const sy = canvas.height / rect.height;
  const mx = (e.clientX - rect.left) * sx;
  const my = (e.clientY - rect.top) * sy;

  // Find which cell was clicked
  let clickedCell = null;
  for (const cell of _bdCells) {
    const cx = cell.x / 100 * canvas.width, cy = cell.y / 100 * canvas.height;
    const cw = cell.w / 100 * canvas.width, ch = cell.h / 100 * canvas.height;
    if (mx >= cx && mx <= cx + cw && my >= cy && my <= cy + ch) { clickedCell = cell; break; }
  }

  let html = '';
  // Multi-selection context menu
  if (_bdMultiSelect.length > 1) {
    const n = _bdMultiSelect.length;
    html += '<div class="bd-ctx-item" style="font-weight:700;color:#00e5ff;pointer-events:none">' + n + ' cases sélectionnées</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" onclick="bd_mergeCells();bd_hideContextMenu()">&#x1F517; Combiner les ' + n + ' cases</div>';
    html += '<div class="bd-ctx-item" onclick="bd_duplicateMultiSelected();bd_hideContextMenu()">&#x1F4CB; Dupliquer les ' + n + ' cases</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" onclick="var w=prompt(\'Épaisseur bordure (px):\',\'3\');if(w!==null){var c=prompt(\'Couleur bordure:\',\'#000000\');if(c!==null)bd_setMultiBorder(parseFloat(w),c);}bd_hideContextMenu()">&#x1F58C; Appliquer bordure à toutes</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" style="color:var(--red)" onclick="bd_deleteMultiSelected();bd_hideContextMenu()">&#x1F5D1; Supprimer les ' + n + ' cases</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" onclick="bd_clearMultiSelect();bd_buildOverlay();bd_updateCellList();bd_hideContextMenu()">&#x274C; Annuler la sélection multiple</div>';
  } else if (clickedCell) {
    html += '<div class="bd-ctx-item" onclick="bd_selectCell(\'' + clickedCell.id + '\');bd_pickImage();bd_hideContextMenu()">&#x1F5BC; Assigner une image</div>';
    html += '<div class="bd-ctx-item" onclick="bd_duplicateCell(\'' + clickedCell.id + '\');bd_hideContextMenu()">&#x1F4CB; Dupliquer la case</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" onclick="bd_addBubbleOnCell(\'' + clickedCell.id + '\');bd_hideContextMenu()">&#x1F4AC; Ajouter une bulle ici</div>';
    html += '<div class="bd-ctx-separator"></div>';
    html += '<div class="bd-ctx-item" style="color:var(--red)" onclick="bd_removeCell(\'' + clickedCell.id + '\');bd_hideContextMenu()">&#x1F5D1; Supprimer la case</div>';
  } else {
    const pctX = mx / canvas.width * 100, pctY = my / canvas.height * 100;
    html += '<div class="bd-ctx-item" onclick="bd_addCellAt(' + pctX.toFixed(1) + ',' + pctY.toFixed(1) + ');bd_hideContextMenu()">&#x2795; Ajouter une case ici</div>';
  }
  menu.innerHTML = html;

  // Clamp to viewport
  requestAnimationFrame(() => {
    const mr = menu.getBoundingClientRect();
    if (mr.right > window.innerWidth) menu.style.left = (window.innerWidth - mr.width - 8) + 'px';
    if (mr.bottom > window.innerHeight) menu.style.top = (window.innerHeight - mr.height - 8) + 'px';
  });
}

function bd_hideContextMenu() {
  $('bdContextMenu').classList.add('hidden');
}

function bd_duplicateCell(id) {
  bd_saveUndo();
  const orig = _bdCells.find(c => c.id === id);
  if (!orig) return;
  const cell = bd_makeCell(orig.x + 3, orig.y + 3, orig.w, orig.h);
  cell.imgIdx = orig.imgIdx;
  cell.borderW = orig.borderW;
  cell.borderColor = orig.borderColor;
  cell.radius = orig.radius;
  _bdCells.push(cell);
  bd_selectCell(cell.id);
  bd_updateCellList();
  renderBDCanvas(false);
}

function bd_addCellAt(pctX, pctY) {
  const m = _bdMarginPct;
  const cell = bd_makeCell(Math.max(m, pctX - 15), Math.max(m, pctY - 10), 30, 20);
  _bdCells.push(cell);
  bd_selectCell(cell.id);
  bd_updateCellList();
  renderBDCanvas(false);
}

function bd_addBubbleOnCell(cellId) {
  const cell = _bdCells.find(c => c.id === cellId);
  if (!cell) return;
  _bdBubbleIdCounter++;
  const bubble = {
    id: 'bubble_' + String(_bdBubbleIdCounter).padStart(3, '0'),
    cellId: cellId,
    type: 'speech', text: 'Texte...',
    x: cell.x + 5, y: cell.y + 3, w: Math.min(20, cell.w * 0.6), h: Math.min(12, cell.h * 0.3),
    flipX: false,
    fontSize: 32, fontFamily: 'Comic Neue', fontColor: '#000000',
    bgColor: '#ffffff', borderColor: '#000000', borderW: 3,
    italic: false, bold: false, align: 'center',
    rotation: 0, opacity: 1
  };
  _bdBubbles.push(bubble);
  bd_selectBubble(bubble.id);
  bd_updateBubbleList();
  renderBDCanvas(false);
}

/* ═══════════════════════════════════════════════════════════════════════════
   17. PER-IMAGE CROP EDITOR
   ═══════════════════════════════════════════════════════════════════════════ */
let _cropState = {
  imgIdx: -1,
  cellRatio: 1,
  zoom: 1,
  focusX: 0.5,
  focusY: 0.5,
  dragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragInitFocusX: 0.5,
  dragInitFocusY: 0.5,
};

// Click on preview canvas to identify cell
function onCanvasClick(e) {
  if (!_cellMap.length || !loadedImages.length) return;
  const canvas = $('previewCanvas');
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const cx = (e.clientX - rect.left) * scaleX;
  const cy = (e.clientY - rect.top) * scaleY;

  for (const cell of _cellMap) {
    if (cx >= cell.x && cx <= cell.x + cell.w && cy >= cell.y && cy <= cell.y + cell.h) {
      openCropEditor(cell.imgIdx, cell.w / cell.h);
      return;
    }
  }
}

function openCropEditor(imgIdx, cellRatio) {
  if (imgIdx < 0 || imgIdx >= loadedImages.length) return;
  const entry = loadedImages[imgIdx];
  const existing = _adjustments[imgIdx];

  _cropState.imgIdx = imgIdx;
  _cropState.cellRatio = cellRatio;

  // BD cell mode: read from cell's crop values instead of _adjustments
  if (_cropForBDCell) {
    const bdCell = _bdCells.find(c => c.id === _cropForBDCell);
    if (bdCell) {
      _cropState.zoom = bdCell.cropZoom || 1;
      _cropState.focusX = bdCell.cropX || 0.5;
      _cropState.focusY = bdCell.cropY || 0.5;
    } else {
      _cropState.zoom = 1; _cropState.focusX = 0.5; _cropState.focusY = 0.5;
    }
  } else {
    _cropState.zoom = existing ? existing.zoom : 1;
    _cropState.focusX = existing ? existing.focusX : 0.5;
    _cropState.focusY = existing ? existing.focusY : 0.5;
  }

  $('cropImgName').textContent = '— ' + entry.name + ' (' + entry.w + 'x' + entry.h + ')';
  const img = $('cropImg');
  img.src = entry.src;
  img.onload = () => {
    // Set viewport aspect ratio to match the cell
    const vp = $('cropViewport');
    vp.style.aspectRatio = cellRatio;
    $('cropZoom').value = Math.round(_cropState.zoom * 100);
    $('cropZoomVal').textContent = Math.round(_cropState.zoom * 100) + '%';
    // Show modal first, then wait for layout to settle before updating preview
    $('cropModal').classList.remove('hidden');
    vp.classList.remove('touched');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => updateCropPreview());
    });
  };
}

function closeCropEditor() {
  $('cropModal').classList.add('hidden');
  _cropState.imgIdx = -1;
  _cropState.dragging = false;
  _cropForBDCell = null;
}

function updateCropPreview() {
  const img = $('cropImg');
  const vp = $('cropViewport');
  if (!img.naturalWidth || !vp.clientWidth) return;

  const vpW = vp.clientWidth;
  const vpH = vp.clientHeight;
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const imgRatio = nw / nh;
  const vpRatio = vpW / vpH;

  // Cover base size (image fills viewport)
  let baseW, baseH;
  if (imgRatio > vpRatio) {
    baseH = vpH;
    baseW = vpH * imgRatio;
  } else {
    baseW = vpW;
    baseH = vpW / imgRatio;
  }

  const z = _cropState.zoom;
  const dispW = baseW * z;
  const dispH = baseH * z;

  // Focus point determines positioning
  const focusPxX = _cropState.focusX * dispW;
  const focusPxY = _cropState.focusY * dispH;

  let left = vpW / 2 - focusPxX;
  let top = vpH / 2 - focusPxY;

  // Clamp so image always covers viewport
  left = Math.min(0, Math.max(vpW - dispW, left));
  top = Math.min(0, Math.max(vpH - dispH, top));

  img.style.width = dispW + 'px';
  img.style.height = dispH + 'px';
  img.style.left = left + 'px';
  img.style.top = top + 'px';
}

// Drag to pan
function onCropMouseDown(e) {
  e.preventDefault();
  _cropState.dragging = true;
  _cropState.dragStartX = e.clientX || e.touches?.[0]?.clientX || 0;
  _cropState.dragStartY = e.clientY || e.touches?.[0]?.clientY || 0;
  _cropState.dragInitFocusX = _cropState.focusX;
  _cropState.dragInitFocusY = _cropState.focusY;
  $('cropViewport').classList.add('grabbing');
  $('cropViewport').classList.add('touched');
}

function onCropMouseMove(e) {
  if (!_cropState.dragging) return;
  e.preventDefault();
  const cx = e.clientX || e.touches?.[0]?.clientX || 0;
  const cy = e.clientY || e.touches?.[0]?.clientY || 0;
  const dx = cx - _cropState.dragStartX;
  const dy = cy - _cropState.dragStartY;

  const img = $('cropImg');
  const dispW = parseFloat(img.style.width);
  const dispH = parseFloat(img.style.height);

  // Convert pixel drag to focus change (invert because dragging image)
  _cropState.focusX = _cropState.dragInitFocusX - dx / dispW;
  _cropState.focusY = _cropState.dragInitFocusY - dy / dispH;
  _cropState.focusX = Math.max(0, Math.min(1, _cropState.focusX));
  _cropState.focusY = Math.max(0, Math.min(1, _cropState.focusY));

  updateCropPreview();
}

function onCropMouseUp() {
  _cropState.dragging = false;
  $('cropViewport').classList.remove('grabbing');
}

// Zoom slider
function onCropZoomInput() {
  const val = parseInt($('cropZoom').value);
  _cropState.zoom = val / 100;
  $('cropZoomVal').textContent = val + '%';
  updateCropPreview();
}

// Mouse wheel zoom on viewport
function onCropWheel(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -10 : 10;
  let val = parseInt($('cropZoom').value) + delta;
  val = Math.max(100, Math.min(400, val));
  $('cropZoom').value = val;
  _cropState.zoom = val / 100;
  $('cropZoomVal').textContent = val + '%';
  updateCropPreview();
}

function resetCrop() {
  _cropState.zoom = 1;
  _cropState.focusX = 0.5;
  _cropState.focusY = 0.5;
  $('cropZoom').value = 100;
  $('cropZoomVal').textContent = '100%';
  updateCropPreview();
}

function clearSingleCrop() {
  if (_cropState.imgIdx >= 0) {
    delete _adjustments[_cropState.imgIdx];
    closeCropEditor();
    genererPreview();
    toast('Cadrage reinitialise');
  }
}

function applyCrop() {
  const idx = _cropState.imgIdx;
  if (idx < 0) return;

  // BD cell mode: save crop back to the BD cell
  if (_cropForBDCell) {
    const bdCell = _bdCells.find(c => c.id === _cropForBDCell);
    if (bdCell) {
      bdCell.cropZoom = _cropState.zoom;
      bdCell.cropX = _cropState.focusX;
      bdCell.cropY = _cropState.focusY;
    }
    closeCropEditor();
    renderBDCanvas(false);
    toast('Cadrage applique');
    return;
  }

  // Normal mode
  if (_cropState.zoom !== 1 || _cropState.focusX !== 0.5 || _cropState.focusY !== 0.5) {
    _adjustments[idx] = {
      zoom: _cropState.zoom,
      focusX: _cropState.focusX,
      focusY: _cropState.focusY
    };
  } else {
    delete _adjustments[idx];
  }

  closeCropEditor();
  genererPreview();
  toast('Cadrage applique pour l\'image ' + (idx + 1));
}

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


/* ═══════════════════════════════════════════════════════════════════════════
   19. EVENT BINDINGS
   ═══════════════════════════════════════════════════════════════════════════ */

// File input
$('fileInput').addEventListener('change', e => handleFiles(e.target.files));
const dz = $('dropzone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('dragover'); });
dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });

// BD Pan/Zoom init
bd_initPanZoomEvents();

// BD compact dropzone
$('bdFileInputCompact')?.addEventListener('change', e => handleFiles(e.target.files));
const bdDzCompact = $('bdDropzoneCompact');
if (bdDzCompact) {
  bdDzCompact.addEventListener('dragover', e => { e.preventDefault(); bdDzCompact.classList.add('dragover'); });
  bdDzCompact.addEventListener('dragleave', () => bdDzCompact.classList.remove('dragover'));
  bdDzCompact.addEventListener('drop', e => { e.preventDefault(); bdDzCompact.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
}

// Rebuild BD overlay on window resize
window.addEventListener('resize', debounce(() => {
  if (isBDMode()) {
    renderBDCanvas(false);
  }
}, 100));

// Ratio detector
$('ratioFile').addEventListener('change', e => { if (e.target.files[0]) detectRatio(e.target.files[0]); });

// Sliders — all trigger auto-refresh
$('rangees').addEventListener('input', function() {
  $('rangeesVal').textContent = this.value;
  _lastRangees = null; // layout changed
  updateAllKPI();
  scheduleAutoRefresh();
});
$('cols').addEventListener('input', function() {
  $('colsVal').textContent = this.value;
  updateAllKPI();
  if (getBanner()) updateBannerCanvas();
  scheduleAutoRefresh();
});
$('seed').addEventListener('input', function() {
  $('seedVal').textContent = this.value;
  _lastRangees = null; // layout changed
  scheduleAutoRefresh();
});
$('gap').addEventListener('input', function() {
  $('gapVal').textContent = this.value;
  if (getBanner()) updateBannerCanvas();
  scheduleAutoRefresh();
});
$('borderRadius').addEventListener('input', function() {
  $('borderRadiusVal').textContent = this.value;
  scheduleAutoRefresh();
});
$('imgBorder').addEventListener('input', function() {
  $('imgBorderVal').textContent = this.value;
  scheduleAutoRefresh();
});
$('imgShadow').addEventListener('input', function() {
  $('imgShadowVal').textContent = this.value;
  scheduleAutoRefresh();
});
$('imgShadowColor').addEventListener('input', function() {
  scheduleAutoRefresh();
});
$('imgBorderColor').addEventListener('input', function() {
  scheduleAutoRefresh();
});
$('qualite').addEventListener('input', function() {
  $('qualiteVal').textContent = this.value + '%';
});

// Dimensions — trigger auto-refresh
$('width').addEventListener('input', () => { onDimInput('width'); scheduleAutoRefresh(); });
$('height').addEventListener('input', () => { onDimInput('height'); scheduleAutoRefresh(); });

// Lock ratio
$('lockRatio').addEventListener('change', function() {
  if (this.checked && _internalW && _internalH) {
    _lockedRatio = _internalW / _internalH;
  } else {
    _lockedRatio = null;
  }
});

// Numbering toggle
document.querySelectorAll('input[name="numToggle"]').forEach(r => {
  r.addEventListener('change', () => {
    $('numOpts').classList.toggle('hidden', !getNumbering());
    scheduleAutoRefresh();
  });
});

// Numbering options
['numPos','numStyle','numStart'].forEach(id => {
  $(id)?.addEventListener('input', scheduleAutoRefresh);
  $(id)?.addEventListener('change', scheduleAutoRefresh);
});

// Fit mode
document.querySelectorAll('input[name="fitMode"]').forEach(r => {
  r.addEventListener('change', scheduleAutoRefresh);
});

// (swatch auto-refresh handled in pickSwatch/pickCustomColor)

// Canvas click → handled by cell overlays (buildCellOverlays)

// ── BD Panel bindings ──
// Format / fond
$('bdGutterV').addEventListener('input', function() { scheduleRender(); });
$('bdGutterH').addEventListener('input', function() { scheduleRender(); });
$('bdMargin').addEventListener('input', function() {
  $('bdMarginVal').textContent = this.value + '%';
  _bdMarginPct = parseFloat(this.value) || 0;
  scheduleRender();
  // Flash the Egaliser button to remind user
  const eqBtn = $('bdEqualizeBtn');
  if (eqBtn && _bdCells.length > 0) {
    eqBtn.classList.remove('bd-btn-flash');
    void eqBtn.offsetWidth; // force reflow to restart animation
    eqBtn.classList.add('bd-btn-flash');
    eqBtn.addEventListener('animationend', () => eqBtn.classList.remove('bd-btn-flash'), { once: true });
  }
});
$('bdBorderStyle').addEventListener('change', function() {
  $('bdBorderCustomColor').parentElement.style.display = this.value === 'custom' ? '' : 'none';
  renderBDCanvas(false);
});
$('bdBorderCustomColor').addEventListener('input', () => scheduleRender());

// Cell property inputs → sync to model + re-render
['bdCellX','bdCellY','bdCellW','bdCellH'].forEach(id => {
  $(id).addEventListener('input', () => { bd_syncCellProps(); });
});
const _debouncedSyncCell = debounce(() => bd_syncCellProps(), 30);
$('bdCellBorder').addEventListener('input', function() {
  $('bdCellBorderVal').textContent = this.value;
  _debouncedSyncCell();
});
$('bdCellBorderColor').addEventListener('input', _debouncedSyncCell);
$('bdCellRadius').addEventListener('input', function() {
  $('bdCellRadiusVal').textContent = this.value;
  _debouncedSyncCell();
});
$('bdCellRotation').addEventListener('input', function() {
  $('bdCellRotationVal').textContent = this.value + '\u00B0';
  _debouncedSyncCell();
});
['bdCellCornerTL','bdCellCornerTR','bdCellCornerBL','bdCellCornerBR',
 'bdCellCornerTLY','bdCellCornerTRY','bdCellCornerBLY','bdCellCornerBRY'].forEach(id => {
  $(id).addEventListener('input', _debouncedSyncCell);
});

// Bleed
$('bdCellBleed').addEventListener('change', () => bd_syncCellProps());
// Per-cell filters
$('bdCellManga').addEventListener('change', () => bd_syncCellProps());
$('bdCellBrightness').addEventListener('input', function() {
  $('bdCellBrightnessVal').textContent = this.value + '%';
  _debouncedSyncCell();
});
$('bdCellContrast').addEventListener('input', function() {
  $('bdCellContrastVal').textContent = this.value + '%';
  _debouncedSyncCell();
});

// Bubble property inputs → sync to model + re-render
const _debouncedSyncBubble = debounce(() => bd_syncBubbleProps(), 30);
document.querySelectorAll('input[name="bdBubbleType"]').forEach(r => {
  r.addEventListener('change', () => bd_syncBubbleProps());
});
$('bdBubbleText').addEventListener('input', _debouncedSyncBubble);
$('bdBubbleFont').addEventListener('change', () => bd_syncBubbleProps());
$('bdBubbleFontSize').addEventListener('input', _debouncedSyncBubble);
$('bdBubbleFontColor').addEventListener('input', _debouncedSyncBubble);
$('bdBubbleBgColor').addEventListener('input', _debouncedSyncBubble);
document.querySelectorAll('input[name="bdBubbleAlign"]').forEach(r => {
  r.addEventListener('change', () => bd_syncBubbleProps());
});
$('bdBubbleFlip').addEventListener('change', () => bd_syncBubbleProps());
$('bdBubbleRotation').addEventListener('input', function() {
  $('bdBubbleRotationVal').textContent = this.value + '\u00B0';
  _debouncedSyncBubble();
});

// BD Global Appearance
$('bdMangaFilter').addEventListener('change', () => scheduleRender());
$('bdBrightness').addEventListener('input', function() {
  $('bdBrightnessVal').textContent = this.value + '%';
  scheduleRender();
});
$('bdContrast').addEventListener('input', function() {
  $('bdContrastVal').textContent = this.value + '%';
  scheduleRender();
});

// BD Global border/radius apply
function bd_applyGlobalBorderRadius() {
  if (!_bdCells.length) return;
  bd_saveUndo();
  const bw = parseInt($('bdGlobalBorder').value) || 0;
  const bc = $('bdGlobalBorderColor').value;
  const rad = parseInt($('bdGlobalRadius').value) || 0;
  _bdCells.forEach(c => {
    c.borderW = bw;
    c.borderColor = bc;
    c.radius = rad;
  });
  if (_bdSelection.type === 'cell') bd_selectCell(_bdSelection.id);
  renderBDCanvas(false);
  toast('Bordure (' + bw + 'px) et arrondi (' + rad + ') appliques a toutes les cases');
}
$('bdGlobalBorder').addEventListener('input', function() { $('bdGlobalBorderVal').textContent = this.value; });
$('bdGlobalRadius').addEventListener('input', function() { $('bdGlobalRadiusVal').textContent = this.value; });

// BD Context menu (right-click on canvas wrap)
$('canvasWrap').addEventListener('contextmenu', bd_showContextMenu);
document.addEventListener('click', bd_hideContextMenu);

// Crop editor interactions
const _vpEl = $('cropViewport');
_vpEl.addEventListener('mousedown', onCropMouseDown);
_vpEl.addEventListener('touchstart', e => { onCropMouseDown(e.touches[0]); }, { passive: false });
document.addEventListener('mousemove', onCropMouseMove);
document.addEventListener('touchmove', e => { if (_cropState.dragging) { e.preventDefault(); onCropMouseMove(e.touches[0]); } }, { passive: false });
document.addEventListener('mouseup', onCropMouseUp);
document.addEventListener('touchend', onCropMouseUp);
_vpEl.addEventListener('wheel', onCropWheel, { passive: false });
$('cropZoom').addEventListener('input', onCropZoomInput);

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    genererExport();
  }
  if (e.key === 'Escape' && !$('cropModal').classList.contains('hidden')) {
    closeCropEditor();
  }
  // BD mode shortcuts
  if (isBDMode()) {
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      bd_undo();
      return;
    }
    if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
      e.preventDefault();
      bd_redo();
      return;
    }
    if (e.key === 'Delete') {
      e.preventDefault();
      if (_bdMultiSelect.length > 1) {
        bd_deleteMultiSelected();
      } else if (_bdSelection.id) {
        if (_bdSelection.type === 'cell') bd_removeCell(_bdSelection.id);
        else if (_bdSelection.type === 'bubble') bd_removeBubble(_bdSelection.id);
      }
    }
    if (e.key === 'Escape') {
      if (_bdMultiSelect.length > 0) {
        bd_clearMultiSelect();
        bd_buildOverlay();
        bd_updateCellList();
      }
      _bdSelection = { type: null, id: null };
      $('bdCellProps').classList.add('hidden');
      $('bdBubbleProps').classList.add('hidden');
      bd_buildOverlay();
    }
    // Arrow keys: move multi-selected or single cell
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      const step = e.shiftKey ? 0.5 : 1;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
      if (_bdMultiSelect.length > 1) {
        e.preventDefault();
        bd_moveMultiSelected(dx, dy);
      } else if (_bdSelection.type === 'cell' && _bdSelection.id) {
        e.preventDefault();
        const cell = _bdCells.find(c => c.id === _bdSelection.id);
        if (cell) {
          cell.x = Math.max(0, Math.min(100 - cell.w, cell.x + dx));
          cell.y = Math.max(0, Math.min(100 - cell.h, cell.y + dy));
          renderBDCanvas(false); bd_selectCell(cell.id);
        }
      }
    }
  }
});

// Dynamic tooltip positioning (fixed, never truncated)
document.querySelectorAll('.card-help').forEach(help => {
  help.addEventListener('mouseenter', () => {
    const tip = help.querySelector('.card-help-tip');
    if (!tip) return;
    // Reset to measure
    tip.style.left = '0';
    tip.style.top = '0';
    tip.style.display = 'block';
    const hr = help.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    const pad = 10;
    // Prefer right of the "?" icon
    let left = hr.right + 8;
    let top = hr.top + hr.height / 2 - tr.height / 2;
    // If overflows right, place to the left
    if (left + tr.width + pad > window.innerWidth) {
      left = hr.left - tr.width - 8;
    }
    // If still overflows left, center below
    if (left < pad) {
      left = Math.max(pad, hr.left - tr.width / 2 + hr.width / 2);
      top = hr.bottom + 8;
    }
    // Clamp vertically
    top = Math.max(pad, Math.min(window.innerHeight - tr.height - pad, top));
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  });
  help.addEventListener('mouseleave', () => {
    const tip = help.querySelector('.card-help-tip');
    if (tip) tip.style.display = 'none';
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   19. INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */
(function init() {
  buildPresets();
  updateStepForUnit(getUnite());

  // Initialize internal pixels from default 60cm x 80cm @ 150dpi
  const initDpi = 150;
  _internalW = Math.round(60 / 2.54 * initDpi);
  _internalH = Math.round(80 / 2.54 * initDpi);
  updateAllKPI();

  // Initialiser le panel média (layout 3 colonnes toujours actif)
  bd_updateThumbsVertical();
})();
