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
window.addEventListener('resize', () => {
  if (isBDMode()) {
    renderBDCanvas(false);
    bd_buildOverlay();
  }
});

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
$('bdGutterV').addEventListener('input', function() { renderBDCanvas(false); bd_buildOverlay(); });
$('bdGutterH').addEventListener('input', function() { renderBDCanvas(false); bd_buildOverlay(); });
$('bdMargin').addEventListener('input', function() {
  $('bdMarginVal').textContent = this.value + '%';
  _bdMarginPct = parseFloat(this.value) || 0;
  renderBDCanvas(false); bd_buildOverlay();
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
$('bdBorderCustomColor').addEventListener('input', () => renderBDCanvas(false));

// Cell property inputs → sync to model + re-render
['bdCellX','bdCellY','bdCellW','bdCellH'].forEach(id => {
  $(id).addEventListener('input', () => { bd_syncCellProps(); bd_buildOverlay(); });
});
$('bdCellBorder').addEventListener('input', function() {
  $('bdCellBorderVal').textContent = this.value;
  bd_syncCellProps();
});
$('bdCellBorderColor').addEventListener('input', () => bd_syncCellProps());
$('bdCellRadius').addEventListener('input', function() {
  $('bdCellRadiusVal').textContent = this.value;
  bd_syncCellProps();
});

// Bleed
$('bdCellBleed').addEventListener('change', () => bd_syncCellProps());
// Per-cell filters
$('bdCellManga').addEventListener('change', () => bd_syncCellProps());
$('bdCellBrightness').addEventListener('input', function() {
  $('bdCellBrightnessVal').textContent = this.value + '%';
  bd_syncCellProps();
});
$('bdCellContrast').addEventListener('input', function() {
  $('bdCellContrastVal').textContent = this.value + '%';
  bd_syncCellProps();
});

// Bubble property inputs → sync to model + re-render
document.querySelectorAll('input[name="bdBubbleType"]').forEach(r => {
  r.addEventListener('change', () => bd_syncBubbleProps());
});
$('bdBubbleText').addEventListener('input', () => bd_syncBubbleProps());
$('bdBubbleFont').addEventListener('change', () => bd_syncBubbleProps());
$('bdBubbleFontSize').addEventListener('input', () => bd_syncBubbleProps());
$('bdBubbleFontColor').addEventListener('input', () => bd_syncBubbleProps());
$('bdBubbleBgColor').addEventListener('input', () => bd_syncBubbleProps());
document.querySelectorAll('input[name="bdBubbleAlign"]').forEach(r => {
  r.addEventListener('change', () => bd_syncBubbleProps());
});
$('bdBubbleFlip').addEventListener('change', () => bd_syncBubbleProps());

// BD Global Appearance
$('bdMangaFilter').addEventListener('change', () => renderBDCanvas(false));
$('bdBrightness').addEventListener('input', function() {
  $('bdBrightnessVal').textContent = this.value + '%';
  renderBDCanvas(false);
});
$('bdContrast').addEventListener('input', function() {
  $('bdContrastVal').textContent = this.value + '%';
  renderBDCanvas(false);
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
          renderBDCanvas(false); bd_buildOverlay(); bd_selectCell(cell.id);
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
