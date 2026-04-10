/* ═══════════════════════════════════════════════════════════════════════════
   15. RATIO DETECTOR
   ═══════════════════════════════════════════════════════════════════════════ */
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function detectRatio(file) {
  if (!file) return;
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const w = img.naturalWidth, h = img.naturalHeight;
    const d = gcd(w, h);
    const exact = (w / d) + ':' + (h / d);
    const r = w / h;
    let best = null, bd = Infinity;
    for (const s of RATIO_STDS) {
      const diff = Math.abs(s.v - r) / r;
      if (diff < bd) { bd = diff; best = s; }
    }
    $('ratioExact').textContent = w + ' x ' + h + ' px (' + exact + ')';
    $('ratioNearest').textContent = best.l;
    const mk = RATIO_KEY_MAP[best.l];
    const ap = $('ratioApply');
    if (mk) {
      ap.innerHTML = '<button class="btn-apply-ratio" onclick="applyRatioMode(\'' + mk + '\')">Appliquer mode ' + best.l + '</button>';
    } else {
      ap.innerHTML = '<div style="font-size:.65rem;color:var(--text-muted);margin-top:.2rem">Ecart : ' + (bd * 100).toFixed(1) + '% — ratio personnalise</div>';
    }
    $('ratioResult').classList.remove('hidden');
    URL.revokeObjectURL(url);
    $('ratioFile').value = '';
    toast('Ratio detecte : ' + best.l + ' (' + (bd * 100).toFixed(1) + '% ecart)');
  };
  img.src = url;
}

function applyRatioMode(key) {
  $('bannerType').value = key;
  $('bannerType').dispatchEvent(new Event('change'));
  $('ratioResult').classList.add('hidden');
  toast('Mode ' + BANNERS[key].label + ' applique');
}

function handleRatioDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) detectRatio(file);
}
