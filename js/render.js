// ============================================================
// RENDER CARDS
// ============================================================
function renderCards() {
  var grid = document.getElementById('cardsGrid');
  var items = state.pieces.filter(function(p) { return state.showArchived || !p.archived; });
  if (state.filterPilar !== 'all') items = items.filter(function(c) { return c.pilar === state.filterPilar; });
  if (state.filterStatus !== 'all') items = items.filter(function(c) { return (c.status || 'idea') === state.filterStatus; });

  document.getElementById('cardCount').textContent = items.length + ' piezas';

  var aprobadas = state.pieces.filter(function(p) { return p.status === 'aprobado' && !p.archived; }).length;
  var enCalendario = state.pieces.filter(function(p) { return p.calendarSlot && !p.archived; }).length;
  document.getElementById('statusBar').innerHTML =
    '<div class="stat"><div class="stat-num">' + state.pieces.filter(function(p){return !p.archived;}).length + '</div><div class="stat-label">piezas activas</div></div>' +
    '<div class="stat"><div class="stat-num">' + aprobadas + '</div><div class="stat-label">aprobadas</div></div>' +
    '<div class="stat"><div class="stat-num">' + enCalendario + '</div><div class="stat-label">en calendario</div></div>' +
    '<div class="stat"><div class="stat-num">' + (state.pillars.length || Object.keys(PILLAR_CONFIG).length) + '</div><div class="stat-label">pilares</div></div>';

  if (items.length === 0) {
    grid.innerHTML = '<div class="empty-state">No hay piezas con estos filtros.</div>';
    return;
  }

  grid.innerHTML = items.map(function(item) {
    var p = getPillar(item.pilar);
    var status = item.status || 'idea';
    var updatedLine = item.updatedBy && item.updatedBy !== 'seed'
      ? '<span style="font-size:11px;color:var(--ink3);margin-left:6px;">· editado por ' + escapeHtml(item.updatedBy) + ' ' + relTime(item.updatedAt) + '</span>'
      : '';
    var refCount = (item.refs || []).length;
    return '' +
      '<div class="content-card ' + (item.archived ? 'card-archived' : '') + '" data-pilar="' + item.pilar + '">' +
        '<div class="card-stripe" style="background:' + p.stripe + '"></div>' +
        '<div class="card-body">' +
          '<div class="card-meta">' +
            pillarTag(item.pilar) +
            '<span class="channel-tag">' + escapeHtml(item.channel) + '</span>' +
            '<span class="format-tag">' + escapeHtml(item.format) + '</span>' +
            statusPill(status) +
          '</div>' +
          '<h3 class="card-title">' + escapeHtml(item.title) + updatedLine + '</h3>' +
          '<p class="copy-preview">' + escapeHtml(item.copy) + '</p>' +
        '</div>' +
        '<div class="card-actions">' +
          '<button class="btn-action" onclick="openModal(\'' + item.id + '\')">Ver y editar</button>' +
          '<button class="btn-action" onclick="openModal(\'' + item.id + '\', true)">Comentar</button>' +
          '<span class="comment-count">' +
            (refCount > 0 ? '🖼 ' + refCount : '') + ' ' +
            (item.commentCount > 0 ? '💬 ' + item.commentCount : '') +
          '</span>' +
        '</div>' +
      '</div>';
  }).join('');
}

// ============================================================
// RENDER CALENDAR
// ============================================================
function renderCalendar() {
  var table = document.getElementById('calTable');
  var titleEl = document.getElementById('calTitle');
  if (titleEl) titleEl.textContent = MONTH_NAMES[state.calMonth] + ' ' + state.calYear;
  var mp = document.getElementById('calMonthPick'); if (mp) mp.value = String(state.calMonth);
  var yp = document.getElementById('calYearPick'); if (yp) yp.value = String(state.calYear);
  var channels = ['Instagram', 'TikTok', 'En la app'];
  var headers = [''].concat(channels);
  var weeks = [1, 2, 3, 4];

  var slotIndex = {};
  state.pieces.filter(function(p) { return p.calendarSlot && !p.archived; }).forEach(function(p) {
    var s = p.calendarSlot;
    if (s.year !== state.calYear || s.month !== state.calMonth) return;
    var k = s.week + '|' + s.channel;
    if (!slotIndex[k]) slotIndex[k] = [];
    slotIndex[k].push(p);
  });

  table.innerHTML =
    '<thead><tr>' + headers.map(function(h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead>' +
    '<tbody>' +
      weeks.map(function(w) {
        return '<tr>' +
          '<td><div class="cal-week-label">S' + w + '</div></td>' +
          channels.map(function(ch) {
            var k = w + '|' + ch;
            var list = slotIndex[k] || [];
            if (list.length === 0) {
              return '<td><div class="cal-empty" onclick="quickAssign(' + w + ',\'' + ch + '\')">+ asignar</div></td>';
            }
            return '<td>' + list.map(function(p) {
              var cfg = getPillar(p.pilar);
              return '<div class="cal-cell-inner" onclick="openModal(\'' + p.id + '\')">' +
                '<span class="pilar-tag" style="background:' + cfg.bg + ';color:' + cfg.color + ';font-size:10px;">' + escapeHtml(cfg.label) + '</span><br>' +
                escapeHtml(p.title) +
              '</div>';
            }).join('') + '</td>';
          }).join('') +
        '</tr>';
      }).join('') +
    '</tbody>';
}

function quickAssign(week, channel) {
  var candidates = state.pieces.filter(function(p) {
    if (p.archived) return false;
    if (!p.calendarSlot) return true;
    var s = p.calendarSlot;
    return !(s.year === state.calYear && s.month === state.calMonth && s.week === week && s.channel === channel);
  });
  if (candidates.length === 0) { alert('No hay piezas disponibles.'); return; }
  var list = candidates.map(function(p, i) { return (i+1) + '. ' + p.title; }).join('\n');
  var choice = prompt(MONTH_NAMES[state.calMonth] + ' ' + state.calYear + ' — S' + week + ' / ' + channel + '\n\nElegí una pieza:\n\n' + list + '\n\nNúmero:');
  var idx = parseInt(choice, 10) - 1;
  if (isNaN(idx) || !candidates[idx]) return;
  dbFs.collection('pieces').doc(candidates[idx].id).update({
    calendarSlot: { year: state.calYear, month: state.calMonth, week: week, channel: channel },
    updatedBy: state.user,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function calPrev() {
  if (state.calMonth === 0) { state.calMonth = 11; state.calYear--; }
  else state.calMonth--;
  renderCalendar();
}
function calNext() {
  if (state.calMonth === 11) { state.calMonth = 0; state.calYear++; }
  else state.calMonth++;
  renderCalendar();
}
function calToday() {
  var d = new Date();
  state.calYear = d.getFullYear();
  state.calMonth = d.getMonth();
  renderCalendar();
}
function calPickMonth(val) { state.calMonth = parseInt(val, 10); renderCalendar(); }
function calPickYear(val) { state.calYear = parseInt(val, 10); renderCalendar(); }

// ============================================================
// FILTROS
// ============================================================
function filterPilar(val, btn) {
  document.querySelectorAll('.pfilter').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  state.filterPilar = val;
  renderCards();
}
function filterStatus(val, btn) {
  document.querySelectorAll('.sfilter').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  state.filterStatus = val;
  renderCards();
}

// ============================================================
// TABS
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab').forEach(function(t, i) {
    t.classList.toggle('active', ['ideas','calendar'][i] === name);
  });
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
  document.getElementById('view-' + name).classList.add('active');
}
