// ============================================================
// MODAL
// ============================================================
function refreshModalChecklists() {
  // Re-render pilar/channel/format checklists keeping current selections.
  var pilarVal = readChecklistValue('modalPilarChecklist') || (state._modalDraft && state._modalDraft.pilar) || '';
  var chanVal  = readChecklistValue('modalChannelChecklist') || (state._modalDraft && state._modalDraft.channel) || '';
  var fmtVal   = readChecklistValue('modalFormatChecklist') || (state._modalDraft && state._modalDraft.format) || '';
  var ple = document.getElementById('modalPilarChecklist');
  var che = document.getElementById('modalChannelChecklist');
  var fme = document.getElementById('modalFormatChecklist');
  if (ple) ple.innerHTML = buildPilarChecklistHtml('modalPilarChecklist', pilarVal);
  if (che) che.innerHTML = buildSimpleChecklistHtml('modalChannelChecklist', getChannelNames(), chanVal);
  if (fme) fme.innerHTML = buildSimpleChecklistHtml('modalFormatChecklist', getFormatNames(), fmtVal);
}

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
    document.getElementById('modalStatus').value = item.status || 'idea';
    document.getElementById('editTextarea').value = item.copy || '';
    document.getElementById('editNoteInput').value = item.note || '';
    state._modalDraft = {
      pilar: item.pilar || '',
      channel: item.channel || '',
      format: item.format || ''
    };
    document.getElementById('modalPilarChecklist').innerHTML = buildPilarChecklistHtml('modalPilarChecklist', item.pilar || '');
    document.getElementById('modalChannelChecklist').innerHTML = buildSimpleChecklistHtml('modalChannelChecklist', getChannelNames(), item.channel || '');
    document.getElementById('modalFormatChecklist').innerHTML = buildSimpleChecklistHtml('modalFormatChecklist', getFormatNames(), item.format || '');

    var slotMonthVal = (item.calendarSlot && item.calendarSlot.month != null) ? item.calendarSlot.month : state.calMonth;
    var slotYearVal = (item.calendarSlot && item.calendarSlot.year != null) ? item.calendarSlot.year : state.calYear;
    document.getElementById('slotMonth').value = String(slotMonthVal);
    document.getElementById('slotYear').value = String(slotYearVal);
    populateSlotDayOptions(slotYearVal, slotMonthVal);
    var dayVal = item.calendarSlot ? (item.calendarSlot.day || (CAMPAIGN_DAY_MAP[item.id] && CAMPAIGN_DAY_MAP[item.id].day) || '') : '';
    document.getElementById('slotDay').value = dayVal ? String(dayVal) : '';
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
  document.getElementById('modalStatus').value = 'idea';
  document.getElementById('editTextarea').value = '';
  document.getElementById('editNoteInput').value = '';
  state._modalDraft = { pilar: '', channel: '', format: '' };
  document.getElementById('modalPilarChecklist').innerHTML = buildPilarChecklistHtml('modalPilarChecklist', '');
  document.getElementById('modalChannelChecklist').innerHTML = buildSimpleChecklistHtml('modalChannelChecklist', getChannelNames(), '');
  document.getElementById('modalFormatChecklist').innerHTML = buildSimpleChecklistHtml('modalFormatChecklist', getFormatNames(), '');
  document.getElementById('slotMonth').value = String(state.calMonth);
  document.getElementById('slotYear').value = String(state.calYear);
  populateSlotDayOptions(state.calYear, state.calMonth);
  document.getElementById('slotDay').value = '';
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

function populateSlotDayOptions(year, month) {
  var sel = document.getElementById('slotDay');
  if (!sel) return;
  var prev = sel.value;
  var n = daysInMonth(year, month);
  var html = '<option value="">— día —</option>';
  for (var d = 1; d <= n; d++) {
    var dt = new Date(year, month, d);
    var wd = WEEKDAY_SHORT[(dt.getDay() + 6) % 7];
    html += '<option value="' + d + '">' + d + ' (' + wd + ')</option>';
  }
  sel.innerHTML = html;
  if (prev && parseInt(prev, 10) <= n) sel.value = prev;
}

document.addEventListener('change', function(e) {
  if (e.target && (e.target.id === 'slotMonth' || e.target.id === 'slotYear')) {
    var y = parseInt(document.getElementById('slotYear').value, 10);
    var m = parseInt(document.getElementById('slotMonth').value, 10);
    if (!isNaN(y) && !isNaN(m)) populateSlotDayOptions(y, m);
  }
});
