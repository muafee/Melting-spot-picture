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
  $('previewWrap').classList.remove('hidden');
  $('btnRow').classList.remove('hidden');
  $('bdOverlay').classList.add('active');
  $('cellOverlays').innerHTML = '';

  // Activer le layout 3 colonnes
  document.querySelector('.app-shell').classList.add('bd-active');
  $('bdPanelMedia').style.display = 'flex';

  // S'assurer que previewWrap est visible dès l'init
  $('previewWrap').classList.remove('hidden');

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

  // Retirer le layout 3 colonnes
  document.querySelector('.app-shell').classList.remove('bd-active');

  // Reset double page
  _bdSpread = false;
  if ($('bdSpreadToggle')) $('bdSpreadToggle').checked = false;
  if ($('bdSpreadLabel')) $('bdSpreadLabel').textContent = 'OFF';
  if ($('bdSpreadInfo')) $('bdSpreadInfo').classList.add('hidden');
  if ($('bdSpreadGuide')) $('bdSpreadGuide').classList.remove('visible');

  // Masquer le panel média
  if ($('bdPanelMedia')) $('bdPanelMedia').style.display = 'none';

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
}

// ── Thumbs vertical (panel média BD) ──
function bd_updateThumbsVertical() {
  const container = $('bdThumbsVertical');
  if (!container) return;
  container.innerHTML = '';

  if (!loadedImages.length) {
    container.innerHTML = '<div style="font-size:.6rem;color:var(--text-muted);text-align:center;padding:.5rem">Chargez des visuels pour les glisser dans les cases</div>';
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

    // Drag vers les cases BD
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', String(idx));
      e.dataTransfer.effectAllowed = 'copy';
      item.style.opacity = '.4';
    });
    item.addEventListener('dragend', () => { item.style.opacity = ''; });

    // Click = assigner à la case sélectionnée
    item.addEventListener('click', () => {
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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
  bd_buildOverlay();
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

  renderBDCanvas(false);
  bd_buildOverlay();
  if (_bdSelection.type === 'cell') bd_selectCell(_bdSelection.id);
  toast('Gouttieres egalisees (V:' + bd_getGutterV() + 'px, H:' + bd_getGutterH() + 'px)');
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

    // Cell background (white)
    ctx.save();
    if (r > 0) { roundRect(ctx, cx, cy, cw, ch, r); ctx.clip(); }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx, cy, cw, ch);

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

      // Cover crop with focus
      const nw = imgObj.naturalWidth, nh = imgObj.naturalHeight;
      const rd = cw / ch;
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
      ctx.drawImage(imgObj, sx, sy, sw, sh, cx, cy, cw, ch);
      ctx.filter = 'none';
    }
    ctx.restore();

    // Border
    if (bw > 0) {
      ctx.save();
      ctx.strokeStyle = bc;
      ctx.lineWidth = bw;
      if (r > 0) {
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
    $('previewWrap').classList.remove('hidden');
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

    const zone = document.createElement('div');
    zone.className = 'bd-cell-zone';
    zone.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px;pointer-events:auto';
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
      sel.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px';
      overlay.appendChild(sel);

      // Duplicate button (left side)
      const dupBtn = document.createElement('div');
      dupBtn.className = 'bd-cell-move';
      dupBtn.style.cssText = 'left:' + (cx + 14) + 'px;top:' + (cy - 2) + 'px;pointer-events:auto;background:rgba(236,0,140,.8);font-size:11px;width:24px;height:24px;transform:none;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer';
      dupBtn.textContent = '\u274A';
      dupBtn.title = 'Dupliquer (ou Alt+Clic)';
      dupBtn.onclick = (e) => { e.stopPropagation(); bd_duplicateCell(cell.id); };
      overlay.appendChild(dupBtn);

      // Move handle
      const mv = document.createElement('div');
      mv.className = 'bd-cell-move';
      mv.style.left = (cx + cw / 2) + 'px';
      mv.style.top = (cy - 2) + 'px';
      mv.textContent = '\u2725';
      mv.style.pointerEvents = 'auto';
      bd_makeDraggable(mv, cell, 'move', sx, sy);
      overlay.appendChild(mv);

      // Edit crop button (if cell has image)
      if (cell.imgIdx !== null) {
        const editBtn = document.createElement('div');
        editBtn.className = 'bd-cell-move';
        editBtn.style.cssText = 'left:' + (cx + cw - 14) + 'px;top:' + (cy - 2) + 'px;pointer-events:auto;background:rgba(16,185,129,.8);font-size:11px;width:24px;height:24px;transform:none;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer';
        editBtn.textContent = '\u270F';
        editBtn.title = 'Editer le cadrage';
        editBtn.onclick = (e) => { e.stopPropagation(); bd_editCellCrop(); };
        overlay.appendChild(editBtn);
      }

      // Resize handles
      const handles = [
        { cls: 'h-tl', x: cx, y: cy }, { cls: 'h-tr', x: cx + cw, y: cy },
        { cls: 'h-bl', x: cx, y: cy + ch }, { cls: 'h-br', x: cx + cw, y: cy + ch },
        { cls: 'h-t', x: cx + cw / 2, y: cy }, { cls: 'h-b', x: cx + cw / 2, y: cy + ch },
        { cls: 'h-l', x: cx, y: cy + ch / 2 }, { cls: 'h-r', x: cx + cw, y: cy + ch / 2 },
      ];
      handles.forEach(h => {
        const el = document.createElement('div');
        el.className = 'bd-cell-handle ' + h.cls;
        el.style.cssText = 'left:' + h.x + 'px;top:' + h.y + 'px;pointer-events:auto';
        bd_makeDraggable(el, cell, h.cls, sx, sy);
        overlay.appendChild(el);
      });
    }

    // Multi-selection highlight rectangle (cyan)
    if (_bdMultiSelect.length > 1 && bd_isMultiSelected(cell.id)) {
      const msel = document.createElement('div');
      msel.className = 'bd-multi-rect';
      msel.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + cw + 'px;height:' + ch + 'px';
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
    zone.onclick = (e) => { e.stopPropagation(); bd_selectBubble(bub.id); renderBDCanvas(false); };
    overlay.appendChild(zone);

    if (_bdSelection.type === 'bubble' && _bdSelection.id === bub.id) {
      // Selection rect (blue)
      const sel = document.createElement('div');
      sel.className = 'bd-bubble-sel-rect';
      sel.style.cssText = 'left:' + bx + 'px;top:' + by + 'px;width:' + bw + 'px;height:' + bh + 'px';
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

function bd_makeDraggable(el, cell, mode, sx, sy) {
  let startX, startY, origX, origY, origW, origH;
  const canvas = $('previewCanvas');

  function onDown(e) {
    e.preventDefault(); e.stopPropagation();
    bd_saveUndo();
    const ev = e.touches ? e.touches[0] : e;
    startX = ev.clientX; startY = ev.clientY;
    origX = cell.x; origY = cell.y; origW = cell.w; origH = cell.h;
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
    let svg = '<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="140" fill="#f4f3f8" rx="3"/>';
    previewCells.forEach((c, i) => {
      svg += '<rect x="' + c.x + '" y="' + (c.y / 100 * 140) + '" width="' + c.w + '" height="' + (c.h / 100 * 140) + '" fill="' + colors[i % colors.length] + '" rx="2" opacity=".25" stroke="' + colors[i % colors.length] + '" stroke-width="1.5"/>';
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
    return defs.map(c => ({
      x: pageOffset + c.x * 0.5,
      y: c.y,
      w: c.w * 0.5,
      h: c.h
    }));
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
