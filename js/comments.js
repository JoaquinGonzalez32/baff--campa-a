// ============================================================
// COMENTARIOS
// ============================================================
function subscribeComments(pieceId) {
  if (state.unsubComments) state.unsubComments();
  state.unsubComments = dbFs.collection('pieces').doc(pieceId).collection('comments')
    .orderBy('createdAt', 'asc')
    .onSnapshot(function(snap) {
      var comments = snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
      renderComments(comments);
      var p = state.pieces.find(function(x) { return x.id === pieceId; });
      if (p) p.commentCount = comments.length;
    });
}
function renderComments(comments) {
  var list = document.getElementById('commentsList');
  document.getElementById('commentsTitle').textContent = 'Comentarios y sugerencias (' + comments.length + ')';
  if (comments.length === 0) {
    list.innerHTML = '<p style="font-size:13px;color:var(--ink3);margin-bottom:12px;">Todavía no hay comentarios. Sé el primero.</p>';
    return;
  }
  list.innerHTML = comments.map(function(c) {
    return '' +
      '<div class="comment-item ' + (c.type === 'suggestion' ? 'suggestion' : '') + '">' +
        '<button class="delete-comment" onclick="deleteComment(\'' + c.id + '\')" title="Eliminar">×</button>' +
        '<div class="comment-meta">' +
          '<span class="comment-type ' + (c.type === 'suggestion' ? 'type-suggestion' : 'type-comment') + '">' + (c.type === 'suggestion' ? 'Sugerencia' : 'Comentario') + '</span>' +
          '<span class="comment-author">' + escapeHtml(c.author || 'anónimo') + '</span>' +
          '<span class="comment-date">' + relTime(c.createdAt) + '</span>' +
        '</div>' +
        '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
      '</div>';
  }).join('');
}
function setCommentType(type) {
  state.commentType = type;
  document.getElementById('btnComment').classList.toggle('active', type === 'comment');
  document.getElementById('btnSuggestion').classList.toggle('active', type === 'suggestion');
}
async function submitComment() {
  if (state.isCreating || !state.currentId) { alert('Guardá la pieza primero.'); return; }
  if (!state.user) { changeName(); return; }
  var input = document.getElementById('commentInput');
  var text = input.value.trim();
  if (!text) return;
  await dbFs.collection('pieces').doc(state.currentId).collection('comments').add({
    text: text,
    type: state.commentType,
    author: state.user,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  input.value = '';
}
async function deleteComment(commentId) {
  if (!state.currentId) return;
  if (!confirm('¿Eliminar comentario?')) return;
  await dbFs.collection('pieces').doc(state.currentId).collection('comments').doc(commentId).delete();
}
