// ============================================================
// FIREBASE INIT
// ============================================================
var dbFs = null;
var storage = null;

function initFirebase() {
  try {
    if (!window.firebaseConfig || window.firebaseConfig.apiKey === 'PEGAR_AQUI') {
      setConnBadge('falta config', false);
      alert('Editá firebase-config.js con los datos de tu proyecto Firebase antes de usar la page.');
      return false;
    }
    firebase.initializeApp(window.firebaseConfig);
    dbFs = firebase.firestore();
    storage = firebase.storage();
    setConnBadge('en vivo', true);
    return true;
  } catch (e) {
    console.error(e);
    setConnBadge('error', false);
    return false;
  }
}
function setConnBadge(text, ok) {
  var b = document.getElementById('connBadge');
  b.textContent = text;
  b.classList.toggle('off', !ok);
}

// ============================================================
// CLEANUP — Migración one-shot 2026-05-07 (rechazo plan influencer-centric)
// Borra piezas seedeadas del plan viejo. Marca meta/migrations.letterboxd_2026_05_07.
// ============================================================
async function cleanupRejectedPieces() {
  try {
    var migDoc = await dbFs.collection('meta').doc('migrations').get();
    if (migDoc.exists && migDoc.data().letterboxd_2026_05_07) return;

    if (!Array.isArray(REJECTED_PIECE_IDS) || REJECTED_PIECE_IDS.length === 0) {
      await dbFs.collection('meta').doc('migrations').set(
        { letterboxd_2026_05_07: true, ranAt: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
      return;
    }

    console.log('[cleanup] borrando ' + REJECTED_PIECE_IDS.length + ' piezas del plan rechazado');
    var batch = dbFs.batch();
    var deleted = 0;
    for (var i = 0; i < REJECTED_PIECE_IDS.length; i++) {
      var id = REJECTED_PIECE_IDS[i];
      var ref = dbFs.collection('pieces').doc(id);
      var snap = await ref.get();
      if (!snap.exists) continue;
      // Solo borramos piezas seedeadas — no tocamos las creadas a mano por usuarios
      if (snap.data().createdBy === 'seed') {
        batch.delete(ref);
        deleted++;
      }
    }
    if (deleted > 0) await batch.commit();
    console.log('[cleanup] borradas ' + deleted + ' piezas');

    await dbFs.collection('meta').doc('migrations').set(
      { letterboxd_2026_05_07: true, ranAt: firebase.firestore.FieldValue.serverTimestamp(), deleted: deleted },
      { merge: true }
    );
  } catch (e) {
    console.error('[cleanup] error', e);
  }
}

// ============================================================
// SEED (primera vez)
// ============================================================
async function seedIfEmpty() {
  var snap = await dbFs.collection('pieces').limit(1).get();
  if (!snap.empty) {
    await seedCampaignIfMissing();
    return;
  }
  console.log('[seed] colección vacía → sembrando piezas iniciales');
  var batch = dbFs.batch();
  var now = firebase.firestore.FieldValue.serverTimestamp();
  INITIAL_CONTENT.forEach(function(p, i) {
    var ref = dbFs.collection('pieces').doc(p.id);
    batch.set(ref, {
      pilar: p.pilar,
      channel: p.channel,
      format: p.format,
      title: p.title,
      copy: p.copy,
      note: p.note || '',
      status: 'idea',
      archived: false,
      calendarSlot: p.calendarSlot || null,
      refs: [],
      order: i,
      createdBy: 'seed',
      createdAt: now,
      updatedBy: 'seed',
      updatedAt: now
    });
  });
  await batch.commit();
}

// Aditivo: si la colección ya tenía piezas (ej. seed previo con contenido viejo),
// agrega solo las piezas de la campaña que todavía no existen por id.
async function seedCampaignIfMissing() {
  var existing = await dbFs.collection('pieces').get();
  var existingIds = {};
  existing.forEach(function(doc) { existingIds[doc.id] = true; });
  var missing = INITIAL_CONTENT.filter(function(p) { return !existingIds[p.id]; });
  if (missing.length === 0) return;
  console.log('[seed] agregando ' + missing.length + ' piezas de campaña que faltaban');
  var batch = dbFs.batch();
  var now = firebase.firestore.FieldValue.serverTimestamp();
  var baseOrder = existing.size;
  missing.forEach(function(p, i) {
    var ref = dbFs.collection('pieces').doc(p.id);
    batch.set(ref, {
      pilar: p.pilar,
      channel: p.channel,
      format: p.format,
      title: p.title,
      copy: p.copy,
      note: p.note || '',
      status: 'idea',
      archived: false,
      calendarSlot: p.calendarSlot || null,
      refs: [],
      order: baseOrder + i,
      createdBy: 'seed',
      createdAt: now,
      updatedBy: 'seed',
      updatedAt: now
    });
  });
  await batch.commit();
}

async function seedPillarsIfEmpty() {
  var snap = await dbFs.collection('pillars').limit(1).get();
  if (!snap.empty) return;
  console.log('[seed] sembrando pilares default');
  var batch = dbFs.batch();
  DEFAULT_PILLARS.forEach(function(p, i) {
    batch.set(dbFs.collection('pillars').doc(p.id), {
      label: p.label,
      color: p.color,
      order: i,
      isDefault: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });
  await batch.commit();
}
