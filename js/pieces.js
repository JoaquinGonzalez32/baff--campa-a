// ============================================================
// SUBSCRIPCIÓN PRINCIPAL
// ============================================================
function subscribePieces() {
  dbFs.collection('pieces').orderBy('order', 'asc').onSnapshot(function(snap) {
    state.pieces = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
    renderCards();
    renderCalendar();
    if (state.currentId && !state.isCreating) {
      var fresh = state.pieces.find(function(p) { return p.id === state.currentId; });
      if (fresh) syncModalFromPiece(fresh, false);
    }
  }, function(err) {
    console.error('[subscribe pieces]', err);
    setConnBadge('error', false);
  });
}

// ============================================================
// SAVE / CREATE
// ============================================================
async function savePiece() {
  if (!state.user) { changeName(); return; }
  var data = {
    title: document.getElementById('modalTitleInput').value.trim() || 'Sin título',
    pilar: document.getElementById('modalPilar').value,
    channel: document.getElementById('modalChannel').value,
    format: document.getElementById('modalFormat').value.trim(),
    status: document.getElementById('modalStatus').value,
    copy: document.getElementById('editTextarea').value,
    note: document.getElementById('editNoteInput').value,
    updatedBy: state.user,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  try {
    if (state.isCreating) {
      data.archived = false;
      data.calendarSlot = null;
      data.refs = [];
      data.createdBy = state.user;
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      data.order = state.pieces.length;
      var ref = await dbFs.collection('pieces').add(data);
      state.currentId = ref.id;
      state.isCreating = false;
      subscribeComments(ref.id);
    } else {
      await dbFs.collection('pieces').doc(state.currentId).update(data);
    }
    state.modalSnapshot = getModalFormSnapshot();
    flashSaved();
  } catch (e) {
    console.error(e);
    alert('Error al guardar: ' + e.message);
  }
}
function flashSaved() {
  var msg = document.getElementById('savedMsg');
  msg.style.opacity = '1';
  setTimeout(function() { msg.style.opacity = '0'; }, 1800);
}

async function toggleArchive() {
  if (state.isCreating || !state.currentId) return;
  var item = state.pieces.find(function(p) { return p.id === state.currentId; });
  if (!item) return;
  var target = !item.archived;
  if (target && !confirm('¿Archivar esta pieza? Se puede recuperar con el toggle "ver archivadas".')) return;
  await dbFs.collection('pieces').doc(state.currentId).update({
    archived: target,
    updatedBy: state.user,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  if (target) closeModal(true);
}

// ============================================================
// CALENDAR SLOT
// ============================================================
async function saveSlot() {
  if (state.isCreating || !state.currentId) { alert('Guardá la pieza primero.'); return; }
  var week = parseInt(document.getElementById('slotWeek').value, 10);
  var channel = document.getElementById('slotChannel').value;
  var month = parseInt(document.getElementById('slotMonth').value, 10);
  var year = parseInt(document.getElementById('slotYear').value, 10);
  if (!week || !channel || isNaN(month) || isNaN(year)) { alert('Elegí mes, año, semana y canal.'); return; }
  await dbFs.collection('pieces').doc(state.currentId).update({
    calendarSlot: { year: year, month: month, week: week, channel: channel },
    updatedBy: state.user,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  flashSaved();
}
async function clearSlot() {
  if (state.isCreating || !state.currentId) return;
  await dbFs.collection('pieces').doc(state.currentId).update({
    calendarSlot: null,
    updatedBy: state.user,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById('slotWeek').value = '';
  document.getElementById('slotChannel').value = '';
  flashSaved();
}

// ============================================================
// REFS (imágenes / videos)
// ============================================================
function renderRefs(item) {
  var grid = document.getElementById('refsGrid');
  var refs = item.refs || [];
  if (refs.length === 0) { grid.innerHTML = ''; return; }
  grid.innerHTML = refs.map(function(r, i) {
    var tag = r.type === 'video'
      ? '<video src="' + r.url + '" muted onclick="window.open(\'' + r.url + '\',\'_blank\')"></video>'
      : '<img src="' + r.url + '" onclick="window.open(\'' + r.url + '\',\'_blank\')" />';
    return '<div class="ref-item">' + tag + '<button class="ref-del" onclick="deleteRef(' + i + ')">×</button></div>';
  }).join('');
}

async function handleRefUpload(ev) {
  if (state.isCreating || !state.currentId) { alert('Guardá la pieza primero.'); return; }
  var files = Array.from(ev.target.files || []);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    try {
      var path = 'refs/' + state.currentId + '/' + Date.now() + '_' + file.name;
      var snap = await storage.ref(path).put(file);
      var url = await snap.ref.getDownloadURL();
      var newRef = {
        url: url,
        path: path,
        type: file.type.startsWith('video') ? 'video' : 'image',
        name: file.name,
        uploadedBy: state.user,
        uploadedAt: new Date().toISOString()
      };
      await dbFs.collection('pieces').doc(state.currentId).update({
        refs: firebase.firestore.FieldValue.arrayUnion(newRef),
        updatedBy: state.user,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error(e);
      alert('Error al subir: ' + e.message);
    }
  }
  ev.target.value = '';
}

async function deleteRef(index) {
  var item = state.pieces.find(function(p) { return p.id === state.currentId; });
  if (!item || !item.refs || !item.refs[index]) return;
  if (!confirm('¿Eliminar esta referencia?')) return;
  var target = item.refs[index];
  var newRefs = item.refs.filter(function(_, i) { return i !== index; });
  try {
    if (target.path) await storage.ref(target.path).delete().catch(function() {});
    await dbFs.collection('pieces').doc(state.currentId).update({
      refs: newRefs,
      updatedBy: state.user,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) { console.error(e); }
}
