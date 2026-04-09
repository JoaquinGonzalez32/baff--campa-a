// ============================================================
// DICTADO POR VOZ (Web Speech API)
// ============================================================
var dictation = { rec: null, targetId: null, baseText: '' };

function toggleDictation(targetId, btn) {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Tu navegador no soporta dictado por voz. Probá Chrome o Edge.');
    return;
  }
  if (dictation.rec && dictation.targetId === targetId) {
    dictation.rec.stop();
    return;
  }
  if (dictation.rec) { try { dictation.rec.stop(); } catch(e){} }

  var ta = document.getElementById(targetId);
  var statusEl = document.getElementById('micStatus-' + targetId);
  var rec = new SR();
  rec.lang = 'es-AR';
  rec.continuous = true;
  rec.interimResults = true;

  dictation.rec = rec;
  dictation.targetId = targetId;
  dictation.baseText = ta.value ? ta.value.replace(/\s+$/, '') + ' ' : '';

  rec.onstart = function() {
    btn.classList.add('recording');
    btn.textContent = '⏹ Detener';
    if (statusEl) statusEl.textContent = 'Escuchando…';
  };
  rec.onresult = function(event) {
    var finalText = '';
    var interim = '';
    for (var i = 0; i < event.results.length; i++) {
      var r = event.results[i];
      if (r.isFinal) finalText += r[0].transcript;
      else interim += r[0].transcript;
    }
    ta.value = dictation.baseText + finalText + interim;
  };
  rec.onerror = function(e) {
    if (statusEl) statusEl.textContent = 'Error: ' + e.error;
  };
  rec.onend = function() {
    btn.classList.remove('recording');
    btn.textContent = '🎤 Dictar';
    if (statusEl) statusEl.textContent = '';
    dictation.rec = null;
    dictation.targetId = null;
  };

  try { rec.start(); }
  catch (e) { alert('No se pudo iniciar el dictado: ' + e.message); }
}
function stopDictationIfActive() {
  if (dictation.rec) { try { dictation.rec.stop(); } catch(e){} }
}
