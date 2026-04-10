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
  if (isBDMode()) bd_updateThumbsVertical();
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
