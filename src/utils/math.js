/* ═══════════════════════════════════════════════════════════════════════════
   11. COLLAGE ALGORITHMS
   ═══════════════════════════════════════════════════════════════════════════ */
class SeededRandom {
  constructor(seed) { this.s = seed % 2147483647; if (this.s <= 0) this.s += 2147483646; }
  next() { this.s = this.s * 16807 % 2147483647; return (this.s - 1) / 2147483646; }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

function largestRemainder(vf, total) {
  const vi = vf.map(Math.floor);
  const r = vf.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]);
  let d = total - vi.reduce((a, b) => a + b, 0);
  for (let i = 0; i < d; i++) vi[r[i][1]]++;
  return vi;
}

function repartirEquilibre(ratios, nb, seed) {
  const rng = new SeededRandom(seed);
  let ordre = ratios.map((_, i) => i);
  rng.shuffle(ordre);
  ordre.sort((a, b) => ratios[a] - ratios[b]);
  const rangees = Array.from({ length: nb }, () => []);
  const sommes = new Array(nb).fill(0);
  for (const idx of ordre) {
    const r = sommes.indexOf(Math.min(...sommes));
    rangees[r].push(idx);
    sommes[r] += ratios[idx];
  }
  rangees.forEach(r => rng.shuffle(r));
  rng.shuffle(rangees);
  return rangees;
}

function calculerGrille(rangees, ratios, W, H) {
  let hf = rangees.map(r => W / Math.max(r.reduce((s, i) => s + ratios[i], 0), 0.001));
  const sh = hf.reduce((a, b) => a + b, 0);
  hf = hf.map(h => h * H / sh);
  const hauteurs = largestRemainder(hf, H);
  const lg = rangees.map((r, ri) => {
    const h = hauteurs[ri];
    let lf = r.map(i => ratios[i] * h);
    const sl = lf.reduce((a, b) => a + b, 0);
    lf = lf.map(w => w * W / Math.max(sl, 1));
    return largestRemainder(lf, W);
  });
  return { hauteurs, largeurs_g: lg };
}
