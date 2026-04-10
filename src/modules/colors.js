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
