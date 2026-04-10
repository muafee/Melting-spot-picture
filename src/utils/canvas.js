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
