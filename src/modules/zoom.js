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
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
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
