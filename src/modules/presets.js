/* ═══════════════════════════════════════════════════════════════════════════
   16. PRESETS
   ═══════════════════════════════════════════════════════════════════════════ */
function buildPresets() {
  const container = $('presetsGrid');
  container.innerHTML = '';
  // Group presets by group name
  const groups = [];
  const groupMap = {};
  PRESETS.forEach(p => {
    const g = p.group || 'Autre';
    if (!groupMap[g]) {
      groupMap[g] = [];
      groups.push(g);
    }
    groupMap[g].push(p);
  });
  // Build accordion tabs
  groups.forEach(groupName => {
    const tab = document.createElement('div');
    tab.className = 'preset-tab';
    // Head
    const head = document.createElement('div');
    head.className = 'preset-tab-head';
    head.innerHTML = '<span>' + groupName + '</span><span class="preset-tab-arrow">&#x25B6;</span>';
    head.onclick = () => {
      const wasOpen = tab.classList.contains('open');
      // Close all tabs
      container.querySelectorAll('.preset-tab').forEach(t => t.classList.remove('open'));
      if (!wasOpen) tab.classList.add('open');
    };
    tab.appendChild(head);
    // Body
    const body = document.createElement('div');
    body.className = 'preset-tab-body';
    groupMap[groupName].forEach(p => {
      const chip = document.createElement('button');
      chip.className = 'preset-chip';
      chip.textContent = p.label;
      const suffix = p.unit === 'px' ? 'px' : p.unit;
      chip.title = p.w + (p.unit === 'px' ? ' x ' : suffix + ' x ') + p.h + (p.unit !== 'px' ? suffix : 'px');
      chip.onclick = (e) => {
        e.stopPropagation();
        applyPreset(p);
        // Auto-close the tab after selection
        tab.classList.remove('open');
      };
      body.appendChild(chip);
    });
    tab.appendChild(body);
    container.appendChild(tab);
  });
}

function applyPreset(p) {
  const dpi = getDPI();
  let wpx, hpx;
  if (p.unit === 'px') {
    wpx = p.w; hpx = p.h;
  } else {
    wpx = Math.round(pxFromUnit(p.w, p.unit, dpi));
    hpx = Math.round(pxFromUnit(p.h, p.unit, dpi));
  }
  setFieldsFromPx(wpx, hpx);
  updateAllKPI();
  toast('Preset ' + p.label + ' applique (' + wpx + ' x ' + hpx + ' px)');
  scheduleAutoRefresh();
}
