// ============================================================
// RENDER CARDS
// ============================================================
function renderCards() {
  var grid = document.getElementById('cardsGrid');
  if (!grid) return;
  var items = state.pieces.filter(function(p) { return state.showArchived || !p.archived; });
  if (state.filterPilar !== 'all') items = items.filter(function(c) { return pilarMatches(c.pilar, state.filterPilar); });
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
    var stripe = pilarPrimaryColor(item.pilar);
    var status = item.status || 'idea';
    var updatedLine = item.updatedBy && item.updatedBy !== 'seed'
      ? '<span style="font-size:11px;color:var(--ink3);margin-left:6px;">· editado por ' + escapeHtml(item.updatedBy) + ' ' + relTime(item.updatedAt) + '</span>'
      : '';
    var refCount = (item.refs || []).length;
    var channels = parseList(item.channel);
    var formats = parseList(item.format);
    var chHtml = channels.map(function(c) { return '<span class="channel-tag">' + escapeHtml(c) + '</span>'; }).join('');
    var fmtHtml = formats.map(function(f) { return '<span class="format-tag">' + escapeHtml(f) + '</span>'; }).join('');
    return '' +
      '<div class="content-card ' + (item.archived ? 'card-archived' : '') + '">' +
        '<div class="card-stripe" style="background:' + stripe + '"></div>' +
        '<div class="card-body">' +
          '<div class="card-meta">' +
            pillarTag(item.pilar) + chHtml + fmtHtml + statusPill(status) +
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
// RENDER CALENDAR (semanas × canales)
// ============================================================
function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

function getMonthWeeks(year, month) {
  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);
  var weeks = [];
  var ws = new Date(firstDay);
  var dow = ws.getDay(); // 0=Sun..6=Sat
  ws.setDate(ws.getDate() - ((dow + 6) % 7)); // back to Monday
  ws.setHours(0, 0, 0, 0);
  while (ws <= lastDay) {
    var we = new Date(ws);
    we.setDate(we.getDate() + 6);
    we.setHours(23, 59, 59, 999);
    weeks.push({ start: new Date(ws), end: new Date(we) });
    ws.setDate(ws.getDate() + 7);
  }
  return weeks;
}
function shortDate(d) { return d.getDate() + ' ' + MONTH_NAMES[d.getMonth()].slice(0, 3); }

// Día efectivo de una pieza (compat con CAMPAIGN_DAY_MAP).
function getPieceDay(piece) {
  var s = piece.calendarSlot;
  if (!s) return null;
  if (s.day) return s.day;
  if (CAMPAIGN_DAY_MAP[piece.id] && CAMPAIGN_DAY_MAP[piece.id].month === s.month) {
    return CAMPAIGN_DAY_MAP[piece.id].day;
  }
  if (s.week) return Math.min((s.week - 1) * 7 + 3, daysInMonth(s.year, s.month));
  return null;
}
function getPieceMonth(piece) {
  var s = piece.calendarSlot;
  if (!s) return null;
  if (CAMPAIGN_DAY_MAP[piece.id] && s.day == null) return CAMPAIGN_DAY_MAP[piece.id].month;
  return s.month;
}

function renderCalendar() {
  var table = document.getElementById('calTable');
  if (!table) return;
  var titleEl = document.getElementById('calTitle');
  if (titleEl) titleEl.textContent = MONTH_NAMES[state.calMonth] + ' ' + state.calYear;
  var mp = document.getElementById('calMonthPick'); if (mp) mp.value = String(state.calMonth);
  var yp = document.getElementById('calYearPick'); if (yp) yp.value = String(state.calYear);

  var channels = getChannelNames();
  if (!channels.length) channels = DEFAULT_CHANNELS;

  var weeks = getMonthWeeks(state.calYear, state.calMonth);

  // Construir entries: cada pieza visible se asocia a una fecha.
  var entries = [];
  state.pieces.filter(function(p) { return p.calendarSlot && !p.archived; }).forEach(function(p) {
    var s = p.calendarSlot;
    if (s.year !== state.calYear) return;
    var month = getPieceMonth(p);
    if (month !== state.calMonth) return;
    var day = getPieceDay(p);
    if (!day) return;
    var date = new Date(state.calYear, state.calMonth, day, 12, 0, 0);
    entries.push({ piece: p, date: date, day: day });
  });

  // Header
  var thead = '<thead><tr><th class="cal-week-col">Semana</th>' +
    channels.map(function(c) { return '<th>' + escapeHtml(c) + '</th>'; }).join('') +
    '</tr></thead>';

  var rows = weeks.map(function(week, wi) {
    var weekEntries = entries.filter(function(e) { return e.date >= week.start && e.date <= week.end; });
    var cells = channels.map(function(ch) {
      var inCell = weekEntries.filter(function(e) {
        var pieceChannels = parseList(e.piece.channel);
        // si la pieza no tiene canal, fallback al canal del slot
        if (!pieceChannels.length && e.piece.calendarSlot && e.piece.calendarSlot.channel) {
          pieceChannels = [e.piece.calendarSlot.channel];
        }
        return pieceChannels.indexOf(ch) !== -1;
      }).sort(function(a, b) { return a.day - b.day; });

      if (!inCell.length) return '<td class="cal-week-cell"><span class="cal-empty-cell">—</span></td>';
      var html = inCell.map(function(e) {
        var p = e.piece;
        var color = pilarPrimaryColor(p.pilar);
        var bg = pilarPrimaryBg(p.pilar);
        var tags = pillarTag(p.pilar);
        var dateStr = e.day + ' ' + MONTH_NAMES[state.calMonth].slice(0, 3);
        return '<div class="cal-item" style="background:' + bg + ';border-left-color:' + color + ';" onclick="openModal(\'' + p.id + '\')">' +
          '<div class="cal-item-head"><span class="cal-item-tags">' + tags + '</span>' +
          '<span class="cal-item-date">' + dateStr + '</span></div>' +
          '<div class="cal-item-title">' + escapeHtml(p.title) + '</div>' +
          '</div>';
      }).join('');
      return '<td class="cal-week-cell">' + html + '</td>';
    }).join('');
    return '<tr><td class="cal-week-col"><div class="cal-week-label">Semana ' + (wi + 1) + '</div>' +
      '<div class="cal-week-dates">' + shortDate(week.start) + ' – ' + shortDate(week.end) + '</div></td>' +
      cells + '</tr>';
  }).join('');

  table.innerHTML = thead + '<tbody>' + rows + '</tbody>';
  table.className = 'cal-table cal-week-table';
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
  if (btn) btn.classList.add('active');
  state.filterPilar = val;
  renderCards();
}
function filterStatus(val, btn) {
  document.querySelectorAll('.sfilter').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  state.filterStatus = val;
  renderCards();
}

// ============================================================
// TABS
// ============================================================
function switchTab(name) {
  document.querySelectorAll('.tab').forEach(function(t, i) {
    t.classList.toggle('active', ['ideas','calendar','plan'][i] === name);
  });
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
  document.getElementById('view-' + name).classList.add('active');
  document.body.classList.toggle('plan-mode', name === 'plan');
}
