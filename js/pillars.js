// ============================================================
// PILARES (categorías dinámicas)
// ============================================================
function subscribePillars() {
  dbFs.collection('pillars').orderBy('order', 'asc').onSnapshot(function(snap) {
    state.pillars = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
    renderPillarFilters();
    renderTaxonomyManager();
    renderCards();
    renderCalendar();
    if (state.currentId || state.isCreating) refreshModalChecklists();
  }, function(err) { console.error('[subscribe pillars]', err); });
}

function renderPillarFilters() {
  var wrap = document.querySelector('.pillar-filters');
  if (!wrap) return;
  var all = '<button class="pfilter all ' + (state.filterPilar==='all'?'active':'') + '" onclick="filterPilar(\'all\', this)">Todos</button>';
  var items = state.pillars.map(function(p) {
    var active = state.filterPilar === p.id;
    return '<button class="pfilter ' + (active?'active':'') + '" data-pid="' + p.id + '" style="border-color:' + p.color + ';color:' + (active?'#fff':p.color) + ';background:' + (active?p.color:'transparent') + ';" onclick="filterPilar(\'' + p.id + '\', this)">' + escapeHtml(p.label) + '</button>';
  }).join('');
  var manage = '<button class="pfilter" style="border-color:var(--ink3);color:var(--ink3);" onclick="openPillarManager()">⚙ Gestionar</button>';
  wrap.innerHTML = all + items + manage;
}

function openPillarManager() {
  document.getElementById('pillarMgrOverlay').classList.add('open');
  renderTaxonomyManager();
}
function closePillarManager() {
  document.getElementById('pillarMgrOverlay').classList.remove('open');
}

function renderTaxonomyManager() {
  // Pilares
  var pillarList = document.getElementById('pillarMgrList');
  if (pillarList) {
    pillarList.innerHTML = state.pillars.map(function(p) {
      var inUse = state.pieces.filter(function(x) { return pilarMatches(x.pilar, p.id) && !x.archived; }).length;
      return '' +
        '<div class="pmgr-item">' +
          '<span class="pmgr-dot" style="background:' + p.color + '"></span>' +
          '<span class="pmgr-label">' + escapeHtml(p.label) + '</span>' +
          '<span class="pmgr-count">' + inUse + ' pieza' + (inUse===1?'':'s') + '</span>' +
          '<button class="btn-ghost" onclick="editPillar(\'' + p.id + '\')">Editar</button>' +
          '<button class="btn-danger" onclick="deletePillar(\'' + p.id + '\')">Eliminar</button>' +
        '</div>';
    }).join('') || '<p style="font-size:12px;color:var(--ink3);">Sin pilares.</p>';
  }
  // Canales
  var chList = document.getElementById('channelMgrList');
  if (chList) {
    chList.innerHTML = (state.channels || []).map(function(c) {
      var inUse = state.pieces.filter(function(x) { return listMatches(x.channel, c.name) && !x.archived; }).length;
      return '' +
        '<div class="pmgr-item">' +
          '<span class="pmgr-label">' + escapeHtml(c.name) + '</span>' +
          '<span class="pmgr-count">' + inUse + ' pieza' + (inUse===1?'':'s') + '</span>' +
          '<button class="btn-danger" onclick="deleteChannelPrompt(\'' + c.id + '\',\'' + escapeHtml(c.name).replace(/'/g,"\\'") + '\',' + inUse + ')">Eliminar</button>' +
        '</div>';
    }).join('') || '<p style="font-size:12px;color:var(--ink3);">Sin canales.</p>';
  }
  // Formatos
  var fmtList = document.getElementById('formatMgrList');
  if (fmtList) {
    fmtList.innerHTML = (state.formats || []).map(function(f) {
      var inUse = state.pieces.filter(function(x) { return listMatches(x.format, f.name) && !x.archived; }).length;
      return '' +
        '<div class="pmgr-item">' +
          '<span class="pmgr-label">' + escapeHtml(f.name) + '</span>' +
          '<span class="pmgr-count">' + inUse + ' pieza' + (inUse===1?'':'s') + '</span>' +
          '<button class="btn-danger" onclick="deleteFormatPrompt(\'' + f.id + '\',\'' + escapeHtml(f.name).replace(/'/g,"\\'") + '\',' + inUse + ')">Eliminar</button>' +
        '</div>';
    }).join('') || '<p style="font-size:12px;color:var(--ink3);">Sin formatos.</p>';
  }
}

async function createPillar() {
  if (!state.user) { changeName(); return; }
  var label = document.getElementById('newPillarLabel').value.trim();
  var color = document.getElementById('newPillarColor').value;
  if (!label) { alert('Poné un nombre'); return; }
  var id = 'p_' + Date.now();
  await dbFs.collection('pillars').doc(id).set({
    label: label,
    color: color,
    order: state.pillars.length,
    isDefault: false,
    createdBy: state.user,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById('newPillarLabel').value = '';
}

async function editPillar(id) {
  var p = state.pillars.find(function(x) { return x.id === id; });
  if (!p) return;
  var newLabel = prompt('Nuevo nombre del pilar:', p.label);
  if (newLabel === null) return;
  var newColor = prompt('Color en hex (ej. #4A3F8A):', p.color);
  if (newColor === null) return;
  await dbFs.collection('pillars').doc(id).update({
    label: newLabel.trim() || p.label,
    color: /^#[0-9A-Fa-f]{6}$/.test(newColor) ? newColor : p.color
  });
}

async function deletePillar(id) {
  var p = state.pillars.find(function(x) { return x.id === id; });
  if (!p) return;
  var inUse = state.pieces.filter(function(x) { return pilarMatches(x.pilar, id) && !x.archived; }).length;
  if (inUse > 0) {
    alert('No podés eliminar "' + p.label + '" porque tiene ' + inUse + ' pieza(s) usándolo. Cambialas de pilar primero o archivalas.');
    return;
  }
  if (!confirm('¿Eliminar el pilar "' + p.label + '"?')) return;
  await dbFs.collection('pillars').doc(id).delete();
}

async function createChannelFromInput() {
  var name = (document.getElementById('newChannelName').value || '').trim();
  if (!name) return;
  await addChannel(name);
  document.getElementById('newChannelName').value = '';
}
async function deleteChannelPrompt(id, name, inUse) {
  if (inUse > 0) { alert('No podés eliminar "' + name + '" — tiene ' + inUse + ' pieza(s) usándolo.'); return; }
  if (!confirm('¿Eliminar el canal "' + name + '"?')) return;
  await deleteChannel(id);
}
async function createFormatFromInput() {
  var name = (document.getElementById('newFormatName').value || '').trim();
  if (!name) return;
  await addFormat(name);
  document.getElementById('newFormatName').value = '';
}
async function deleteFormatPrompt(id, name, inUse) {
  if (inUse > 0) { alert('No podés eliminar "' + name + '" — tiene ' + inUse + ' pieza(s) usándolo.'); return; }
  if (!confirm('¿Eliminar el formato "' + name + '"?')) return;
  await deleteFormat(id);
}
