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
