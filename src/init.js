/* ═══════════════════════════════════════════════════════════════════════════
   19. INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */
(function init() {
  buildPresets();
  updateStepForUnit(getUnite());

  // Initialize internal pixels from default 60cm x 80cm @ 150dpi
  const initDpi = 150;
  _internalW = Math.round(60 / 2.54 * initDpi);
  _internalH = Math.round(80 / 2.54 * initDpi);
  updateAllKPI();
})();
</script>