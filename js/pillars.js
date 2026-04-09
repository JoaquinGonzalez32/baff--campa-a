// ============================================================
// PILARES (categorías dinámicas)
// ============================================================
function subscribePillars() {
  dbFs.collection('pillars').orderBy('order', 'asc').onSnapshot(function(snap) {
    state.pillars = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
    renderPillarFilters();
    renderPillarSelect();
    renderCards();
    renderCalendar();
    renderPillarManagerList();
  }, function(err) { console.error('[subscribe pillars]', err); });
}

function renderPillarFilters() {
  var wrap = document.querySelector('.pillar-filters');
  if (!wrap) return;
  var all = '<button class="pfilter all ' + (state.filterPilar==='all'?'active':'') + '" onclick="filterPilar(\'all\', this)">Todos</button>';
  var items = state.pillars.map(function(p) {
    var active = state.filterPilar === p.id;
    return '<button class="pfilter" data-pid="' + p.id + '" style="border-color:' + p.color + ';color:' + (active?'#fff':p.color) + ';background:' + (active?p.color:'transparent') + ';" onclick="filterPilar(\'' + p.id + '\', this)">' + escapeHtml(p.label) + '</button>';
  }).join('');
  var manage = '<button class="pfilter" style="border-color:var(--ink3);color:var(--ink3);" onclick="openPillarManager()">⚙ Gestionar</button>';
  wrap.innerHTML = all + items + manage;
}

function renderPillarSelect() {
  var sel = document.getElementById('modalPilar');
  if (!sel) return;
  var current = sel.value;
  sel.innerHTML = state.pillars.map(function(p) {
    return '<option value="' + p.id + '">' + escapeHtml(p.label) + '</option>';
  }).join('');
  if (current && state.pillars.find(function(p) { return p.id === current; })) sel.value = current;
}

function openPillarManager() {
  document.getElementById('pillarMgrOverlay').classList.add('open');
  renderPillarManagerList();
}
function closePillarManager() {
  document.getElementById('pillarMgrOverlay').classList.remove('open');
}
function renderPillarManagerList() {
  var list = document.getElementById('pillarMgrList');
  if (!list) return;
  list.innerHTML = state.pillars.map(function(p) {
    var inUse = state.pieces.filter(function(x) { return x.pilar === p.id && !x.archived; }).length;
    return '' +
      '<div class="pmgr-item">' +
        '<span class="pmgr-dot" style="background:' + p.color + '"></span>' +
        '<span class="pmgr-label">' + escapeHtml(p.label) + '</span>' +
        '<span class="pmgr-count">' + inUse + ' pieza' + (inUse===1?'':'s') + '</span>' +
        '<button class="btn-ghost" onclick="editPillar(\'' + p.id + '\')">Editar</button>' +
        '<button class="btn-danger" onclick="deletePillar(\'' + p.id + '\')">Eliminar</button>' +
      '</div>';
  }).join('');
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
  var inUse = state.pieces.filter(function(x) { return x.pilar === id && !x.archived; }).length;
  if (inUse > 0) {
    alert('No podés eliminar "' + p.label + '" porque tiene ' + inUse + ' pieza(s) usándolo. Cambialas de pilar primero o archivalas.');
    return;
  }
  if (!confirm('¿Eliminar el pilar "' + p.label + '"?')) return;
  await dbFs.collection('pillars').doc(id).delete();
}
