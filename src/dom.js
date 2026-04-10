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
