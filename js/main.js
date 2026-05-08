// ============================================================
// EVENTOS GLOBALES
// ============================================================
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'showArchived') {
    state.showArchived = e.target.checked;
    renderCards();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('gateOverlay').classList.contains('open')) {
    saveName();
  }
  if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('open')) {
    closeModal();
  }
});

// ============================================================
// BOOTSTRAP
// ============================================================
(async function() {
  loadUser();
  if (!initFirebase()) return;
  try {
    await seedPillarsIfEmpty();
    await seedChannelsIfEmpty();
    await seedFormatsIfEmpty();
    subscribePillars();
    subscribeChannels();
    subscribeFormats();
    await cleanupRejectedPieces();
    await seedIfEmpty();
    subscribePieces();
  } catch (e) {
    console.error(e);
    setConnBadge('error', false);
  }
})();
