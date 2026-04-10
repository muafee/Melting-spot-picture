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
