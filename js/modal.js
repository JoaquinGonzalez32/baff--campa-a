// ============================================================
// MODAL
// ============================================================
function openModal(id, focusComments) {
  var item = state.pieces.find(function(p) { return p.id === id; });
  if (!item) return;
  state.currentId = id;
  state.isCreating = false;
  syncModalFromPiece(item, true);
  state.modalSnapshot = getModalFormSnapshot();
  subscribeComments(id);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (focusComments) {
    setTimeout(function() {
      document.getElementById('commentInput').scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
}

function syncModalFromPiece(item, resetInputs) {
  if (resetInputs) {
    document.getElementById('modalTitleInput').value = item.title || '';
    document.getElementById('modalPilar').value = item.pilar || 'det';
    document.getElementById('modalChannel').value = item.channel || 'Instagram';
    document.getElementById('modalFormat').value = item.format || '';
    document.getElementById('modalStatus').value = item.status || 'idea';
    document.getElementById('editTextarea').value = item.copy || '';
    document.getElementById('editNoteInput').value = item.note || '';
    document.getElementById('slotWeek').value = item.calendarSlot ? String(item.calendarSlot.week) : '';
    document.getElementById('slotChannel').value = item.calendarSlot ? item.calendarSlot.channel : '';
    document.getElementById('slotMonth').value = (item.calendarSlot && item.calendarSlot.month != null) ? String(item.calendarSlot.month) : String(state.calMonth);
    document.getElementById('slotYear').value = (item.calendarSlot && item.calendarSlot.year != null) ? String(item.calendarSlot.year) : String(state.calYear);
  }
  document.getElementById('modalMeta').innerHTML = pillarTag(item.pilar) + statusPill(item.status || 'idea');
  document.getElementById('modalAuthorLine').textContent =
    (item.updatedBy && item.updatedBy !== 'seed')
      ? 'editado por ' + item.updatedBy + ' · ' + relTime(item.updatedAt)
      : (item.createdBy && item.createdBy !== 'seed' ? 'creado por ' + item.createdBy : '');
  renderRefs(item);
  document.getElementById('archiveBtn').textContent = item.archived ? 'Desarchivar' : 'Archivar pieza';
  document.getElementById('savedMsg').style.opacity = '0';
}

function openCreateModal() {
  if (!state.user) { changeName(); return; }
  state.currentId = null;
  state.isCreating = true;
  document.getElementById('modalTitleInput').value = '';
  document.getElementById('modalPilar').value = 'desc';
  document.getElementById('modalChannel').value = 'Instagram';
  document.getElementById('modalFormat').value = '';
  document.getElementById('modalStatus').value = 'idea';
  document.getElementById('editTextarea').value = '';
  document.getElementById('editNoteInput').value = '';
  document.getElementById('slotWeek').value = '';
  document.getElementById('slotChannel').value = '';
  document.getElementById('slotMonth').value = String(state.calMonth);
  document.getElementById('slotYear').value = String(state.calYear);
  document.getElementById('modalMeta').innerHTML = '<span style="font-size:11px;color:var(--accent);">NUEVA IDEA</span>';
  document.getElementById('modalAuthorLine').textContent = '';
  document.getElementById('refsGrid').innerHTML = '<p style="font-size:12px;color:var(--ink3);">Guardá la pieza para poder subir referencias.</p>';
  document.getElementById('archiveBtn').textContent = 'Archivar pieza';
  document.getElementById('commentsList').innerHTML = '<p style="font-size:13px;color:var(--ink3);">Guardá la pieza para poder comentar.</p>';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  state.modalSnapshot = getModalFormSnapshot();
}

async function closeModal(force) {
  if (!force && isModalDirty()) {
    var r = confirm('Tenés cambios sin guardar. ¿Querés guardarlos antes de salir?\n\nAceptar = guardar y cerrar\nCancelar = descartar cambios');
    if (r) {
      try { await savePiece(); }
      catch (e) { return; }
    }
  }
  stopDictationIfActive();
  state.modalSnapshot = null;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  state.currentId = null;
  state.isCreating = false;
  if (state.unsubComments) { state.unsubComments(); state.unsubComments = null; }
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
