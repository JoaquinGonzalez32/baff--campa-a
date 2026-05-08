// ============================================================
// CANALES Y FORMATOS (taxonomía dinámica multi-select)
// ============================================================
function subscribeChannels() {
  dbFs.collection('channels').orderBy('order', 'asc').onSnapshot(function(snap) {
    state.channels = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
    renderTaxonomyManager();
    renderCards();
    renderCalendar();
    if (state.currentId || state.isCreating) refreshModalChecklists();
  }, function(err) { console.error('[subscribe channels]', err); });
}

function subscribeFormats() {
  dbFs.collection('formats').orderBy('order', 'asc').onSnapshot(function(snap) {
    state.formats = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
    renderTaxonomyManager();
    renderCards();
    if (state.currentId || state.isCreating) refreshModalChecklists();
  }, function(err) { console.error('[subscribe formats]', err); });
}

async function seedChannelsIfEmpty() {
  var snap = await dbFs.collection('channels').limit(1).get();
  if (!snap.empty) return;
  var batch = dbFs.batch();
  DEFAULT_CHANNELS.forEach(function(name, i) {
    var id = 'ch_' + i + '_' + Date.now();
    batch.set(dbFs.collection('channels').doc(id), {
      name: name, order: i, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}

async function seedFormatsIfEmpty() {
  var snap = await dbFs.collection('formats').limit(1).get();
  if (!snap.empty) return;
  var batch = dbFs.batch();
  DEFAULT_FORMATS.forEach(function(name, i) {
    var id = 'fmt_' + i + '_' + Date.now();
    batch.set(dbFs.collection('formats').doc(id), {
      name: name, order: i, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}

function getChannelNames() { return (state.channels || []).map(function(c) { return c.name; }); }
function getFormatNames() { return (state.formats || []).map(function(f) { return f.name; }); }

async function addChannel(name) {
  if (!name) return;
  if (getChannelNames().indexOf(name) !== -1) return;
  await dbFs.collection('channels').add({
    name: name, order: state.channels.length,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}
async function deleteChannel(id) {
  await dbFs.collection('channels').doc(id).delete();
}
async function addFormat(name) {
  if (!name) return;
  if (getFormatNames().indexOf(name) !== -1) return;
  await dbFs.collection('formats').add({
    name: name, order: state.formats.length,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}
async function deleteFormat(id) {
  await dbFs.collection('formats').doc(id).delete();
}
