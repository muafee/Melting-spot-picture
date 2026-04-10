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
    $('previewWrap').classList.add('hidden');
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
  $('previewWrap').classList.add('hidden');
  $('optimalRow').classList.add('hidden');
  $('shareRow').classList.add('hidden');
  $('dropCount').classList.remove('visible');
  $('fileInput').value = '';
  toast('Visuels supprimes');
  if (isBDMode()) bd_updateThumbsVertical();
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
  if (isBDMode()) bd_updateThumbsVertical();
}

function updateImageCount() {
  const n = loadedImages.length;
  $('sNb').textContent = n;
  $('dropCount').textContent = n;
  $('dropCount').classList.toggle('visible', n > 0);
}
