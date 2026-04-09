// ============================================================
// HELPERS GENERALES
// ============================================================
function getPillar(id) {
  var p = state.pillars.find(function(x) { return x.id === id; });
  if (p) return { id: p.id, label: p.label, color: p.color, bg: p.color + '22', stripe: p.color };
  var f = PILLAR_CONFIG[id];
  if (f) return Object.assign({ id: id }, f);
  return { id: id, label: id || 'sin pilar', color: '#888', bg: '#eee', stripe: '#888' };
}

function pillarTag(pilar) {
  var p = getPillar(pilar);
  return '<span class="pilar-tag" style="background:' + p.bg + ';color:' + p.color + '">' + escapeHtml(p.label) + '</span>';
}
function statusPill(status) {
  return '<span class="status-pill status-' + status + '">' + status + '</span>';
}
function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, function(c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}
function relTime(ts) {
  if (!ts || !ts.toDate) return '';
  var d = ts.toDate();
  var diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'hace instantes';
  if (diff < 3600) return 'hace ' + Math.floor(diff/60) + ' min';
  if (diff < 86400) return 'hace ' + Math.floor(diff/3600) + ' h';
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}

// Snapshot del form del modal para detectar cambios sin guardar
function getModalFormSnapshot() {
  return JSON.stringify({
    title: document.getElementById('modalTitleInput').value,
    pilar: document.getElementById('modalPilar').value,
    channel: document.getElementById('modalChannel').value,
    format: document.getElementById('modalFormat').value,
    status: document.getElementById('modalStatus').value,
    copy: document.getElementById('editTextarea').value,
    note: document.getElementById('editNoteInput').value
  });
}
function isModalDirty() {
  return state.modalSnapshot !== null && getModalFormSnapshot() !== state.modalSnapshot;
}
