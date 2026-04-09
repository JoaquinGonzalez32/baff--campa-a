// ============================================================
// IDENTIDAD
// ============================================================
function loadUser() {
  state.user = localStorage.getItem('baffe_user');
  if (!state.user) {
    document.getElementById('gateOverlay').classList.add('open');
    setTimeout(function() { document.getElementById('gateInput').focus(); }, 50);
  } else {
    paintUser();
  }
}
function saveName() {
  var v = document.getElementById('gateInput').value.trim();
  if (!v) return;
  localStorage.setItem('baffe_user', v);
  state.user = v;
  document.getElementById('gateOverlay').classList.remove('open');
  paintUser();
}
function changeName() {
  var v = prompt('Nuevo nombre:', state.user || '');
  if (v && v.trim()) {
    localStorage.setItem('baffe_user', v.trim());
    state.user = v.trim();
    paintUser();
  }
}
function paintUser() {
  document.getElementById('userName').textContent = state.user;
  document.getElementById('userAvatar').textContent = state.user.charAt(0);
}
