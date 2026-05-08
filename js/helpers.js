// ============================================================
// HELPERS GENERALES
// ============================================================
function getPillar(id) {
  var p = (state.pillars || []).find(function(x) { return x.id === id; });
  if (p) return { id: p.id, label: p.label, color: p.color, bg: p.color + '22', stripe: p.color };
  var f = PILLAR_CONFIG[id];
  if (f) return Object.assign({ id: id }, f);
  return { id: id, label: id || 'sin pilar', color: '#888', bg: '#eee', stripe: '#888' };
}

// Listas comma-separated (multi-pilar / multi-canal / multi-formato).
function parseList(val) {
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(function(s){return String(s).trim();}).filter(Boolean);
  return String(val).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
}
function listMatches(val, filter) {
  return parseList(val).indexOf(filter) !== -1;
}
function listDisplay(val) {
  return parseList(val).join(' · ');
}

// Multi-pilar
function parsePilars(val) { return parseList(val); }
function pilarMatches(val, filter) { return listMatches(val, filter); }
function pilarPrimaryColor(val) {
  var keys = parsePilars(val);
  for (var i = 0; i < keys.length; i++) {
    var p = getPillar(keys[i]);
    if (p && p.color !== '#888') return p.color;
  }
  return keys.length ? getPillar(keys[0]).color : '#888';
}
function pilarPrimaryBg(val) {
  var keys = parsePilars(val);
  if (!keys.length) return '#eee';
  return getPillar(keys[0]).bg;
}

// Una píldora por cada pilar seleccionado.
function pillarTag(pilar) {
  var keys = parsePilars(pilar);
  if (!keys.length) return '';
  return keys.map(function(k) {
    var p = getPillar(k);
    return '<span class="pilar-tag" style="background:' + p.bg + ';color:' + p.color + '" title="' + escapeHtml(p.label) + '">' + escapeHtml(p.label) + '</span>';
  }).join('');
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

// ===== Checklists para multi-select en el modal =====
function buildPilarChecklistHtml(containerId, selectedKeys) {
  var selected = {};
  parseList(selectedKeys).forEach(function(k) { selected[k] = true; });
  var pillars = state.pillars || [];
  var html = pillars.map(function(p) {
    return '<label class="check-item"><input type="checkbox" data-cl="' + containerId + '" value="' + escapeHtml(p.id) + '"' + (selected[p.id] ? ' checked' : '') + '>' +
      '<span class="check-dot" style="background:' + p.color + '"></span>' +
      '<span class="check-label">' + escapeHtml(p.label) + '</span></label>';
  }).join('');
  // huérfanos (valores guardados que ya no existen en la lista)
  var orphan = parseList(selectedKeys).filter(function(k) {
    return !pillars.find(function(p) { return p.id === k; });
  }).map(function(k) {
    return '<label class="check-item orphan"><input type="checkbox" data-cl="' + containerId + '" value="' + escapeHtml(k) + '" checked>' +
      '<span class="check-dot" style="background:#999"></span>' +
      '<span class="check-label">' + escapeHtml(k) + ' <em>(no existe)</em></span></label>';
  }).join('');
  return orphan + html;
}
function buildSimpleChecklistHtml(containerId, items, selectedList) {
  var selected = {};
  parseList(selectedList).forEach(function(k) { selected[k] = true; });
  var set = {};
  items.forEach(function(i) { set[i] = true; });
  var html = items.map(function(v) {
    return '<label class="check-item"><input type="checkbox" data-cl="' + containerId + '" value="' + escapeHtml(v) + '"' + (selected[v] ? ' checked' : '') + '>' +
      '<span class="check-label">' + escapeHtml(v) + '</span></label>';
  }).join('');
  var orphan = parseList(selectedList).filter(function(v) { return !set[v]; }).map(function(v) {
    return '<label class="check-item orphan"><input type="checkbox" data-cl="' + containerId + '" value="' + escapeHtml(v) + '" checked>' +
      '<span class="check-label">' + escapeHtml(v) + ' <em>(no existe)</em></span></label>';
  }).join('');
  return orphan + html;
}
function readChecklistValue(containerId) {
  var boxes = document.querySelectorAll('#' + containerId + ' input[type="checkbox"]:checked');
  return Array.prototype.map.call(boxes, function(b) { return b.value; }).join(',');
}

// ===== Snapshot del modal para detectar cambios sin guardar =====
function getModalFormSnapshot() {
  return JSON.stringify({
    title: document.getElementById('modalTitleInput').value,
    pilar: readChecklistValue('modalPilarChecklist'),
    channel: readChecklistValue('modalChannelChecklist'),
    format: readChecklistValue('modalFormatChecklist'),
    status: document.getElementById('modalStatus').value,
    copy: document.getElementById('editTextarea').value,
    note: document.getElementById('editNoteInput').value
  });
}
function isModalDirty() {
  return state.modalSnapshot !== null && getModalFormSnapshot() !== state.modalSnapshot;
}
