// ============================================================
// DATOS Y ESTADO GLOBAL
// ============================================================
var PILLAR_CONFIG = {
  desc: { label: 'Descubrimiento', color: '#4A3F8A', bg: '#EDEAF8', stripe: '#4A3F8A' },
  com:  { label: 'Comunidad',      color: '#2E6B4F', bg: '#E4EFE9', stripe: '#2E6B4F' },
  cul:  { label: 'Cultura Baffé',  color: '#C85A2A', bg: '#F5E3D8', stripe: '#C85A2A' },
  det:  { label: 'Detrás de escena', color: '#9B3060', bg: '#F5E8EF', stripe: '#9B3060' }
};

// ============================================================
// PIEZAS DE LA CAMPAÑA — Plan Letterboxd (mayo–julio 2026)
//
// Reorientado el 2026-05-07. Plan anterior (influencer-centric) rechazado.
// Norte: Letterboxd para cafés y bares. Foco geográfico Pocitos → Cordón →
// Ciudad Vieja. Motor = reseñadores con criterio, no influencers por audiencia.
// Estrategia operativa en wiki [[baffe-marketing-q2-2026]].
// Hub de contenido en PLAN.md.
//
// month index: Mayo=4, Junio=5, Julio=6 (JS Date convention).
// ============================================================
var INITIAL_CONTENT = [

  // ============== SETUP — Mayo sem 1 (interno, no público) ==============
  {
    id: 'lb_setup_banco_visual',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'Banco visual semilla — 30+ clips de Pocitos',
    copy: `Tarea operativa (no se publica):\n\nObjetivo: tener 30+ clips raw de venues de Pocitos antes del primer batch de edición (lunes 11 may).\n\nCheck por venue:\n— Plano exterior + cartel.\n— POV entrando.\n— Mostrador / barra.\n— Detalle (café siendo servido, plato apoyado, alguien escribiendo).\n— Mesa propia con la app abierta.\n— 1 plano hablado a cámara.\n— 1 detalle único del lugar.\n\nGuardar en banco-visual/pocitos/YYYY-MM-DD_nombre-cafe/.`,
    note: 'Sin banco visual, el lunes-de-batch se queda sin material. Esta tarea es bloqueante para todo el calendario de contenido.',
    calendarSlot: { year: 2026, month: 4, week: 2, channel: 'En la app' }
  },
  {
    id: 'lb_setup_lista_venues',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'Lista priorizada de 50 venues',
    copy: `Tarea de 1 hora bloque único:\n\n— 50 venues totales: 20 Pocitos / 15 Cordón / 15 Ciudad Vieja.\n— Mes 1 prioriza Pocitos.\n— 5 columnas de tracking: contactado → respondió → demo → onboarded → primer post.\n— Tiers: 🥇 founding (1-20) gratis perpetuo / 🥈 early (21-100) 50% off perpetuo / 🥉 posteriores tarifa estándar.\n\nLanding sheet en Notion o Google Sheets. Plantilla de mensaje canónica con [VARIABLES].`,
    note: 'Speech canónico documentado en [[baffe-marketing-q2-2026]]. No improvisar copy por venue.',
    calendarSlot: { year: 2026, month: 4, week: 2, channel: 'En la app' }
  },
  {
    id: 'lb_setup_retention',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'Medir retention D7 + MAU baseline',
    copy: `Tarea de 5 min en Supabase:\n\nQueries:\n— MAU últimos 30 días.\n— Retention D7 (% usuarios de cohort día N que abrieron app día N+7).\n— Reseñas por usuario activo (north-star metric).\n\nSi retention < 20% → leaky bucket. Pausar adquisición y arreglar producto/onboarding antes de empujar marketing.`,
    note: 'Sin este dato, escalar adquisición es a ciegas. Bloqueante #1 del Q2 según wiki.',
    calendarSlot: { year: 2026, month: 4, week: 2, channel: 'En la app' }
  },
  {
    id: 'lb_setup_android_live',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'Android live en Play Store',
    copy: `Tarea operativa: 12 testers × 14 días para pasar de testing a live.\n\nMensaje a círculo cercano pidiendo testers. Setup tracking de descargas Android desde Play Console.`,
    note: 'Sin Android live se pierde la mitad del mercado MVD. Bloqueante de Mayo sem 1.',
    calendarSlot: { year: 2026, month: 4, week: 2, channel: 'En la app' }
  },

  // ============== TEMPLATES REUTILIZABLES — TikTok ==============
  {
    id: 'lb_tpl_encontre_cafe',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Template TikTok',
    title: 'Template: "Encontré este café" (15-25s)',
    copy: `Formato fijo, repetible 1+ vez por semana en lunes:\n\n[0-3s] Hook: cámara en mano entrando al lugar.\n[3-15s] Mostrador, café siendo servido, detalle único.\n[15-22s] Voiceover: ubicación + 1 dato específico ("queda a 2 cuadras de Williman, abre 8am, tienen un cold brew con tónica").\n[22-25s] Pantalla de la app mostrando el venue.\n\nFiltro identidad: NO es "10 cafés que tenés que probar". Es UN café con criterio.\nSiempre con barrio explícito en copy.`,
    note: 'La columna vertebral del pilar Descubrimiento. Mismo formato repetido = velocidad de producción + reconocimiento de marca.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_resena_30s',
    pilar: 'com',
    channel: 'TikTok',
    format: 'Template TikTok',
    title: 'Template: "Reseña en 30 segundos"',
    copy: `Estructura fija, hablada a cámara:\n\n"Fui a [lugar]. Lo bueno: [Y]. Lo discutible: [Z]. Volvería para: [W]."\n\nTermina con captura de la reseña dentro de Baffé + estrellas.\n\nFiltro identidad: la opinión personal con argumento ES el corazón Letterboxd. La honestidad sobre lo que NO convence vale más que un 5/5 vacío.`,
    note: 'Si todo es 10/10, nadie cree. "El café estaba flojo pero el ambiente compensa" — esa es la voz Baffé.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_top3_barrio',
    pilar: 'cul',
    channel: 'TikTok',
    format: 'Template TikTok/Reel',
    title: 'Template: "Top 3 de [barrio] para [momento]"',
    copy: `Formato (~30-45s):\n\n[0-3s] Hook: "Si querés [X] en [barrio], estos 3 lugares."\n[3-30s] Cuts rápidos de 3 venues, cada uno con 1 frase de por qué entra al ranking.\n[30-40s] Captura del ranking en la app.\n[40-45s] CTA: "Discrepás? Escribí tu reseña en Baffé."\n\nVariantes:\n— "Top 3 cafés de Pocitos para laburar"\n— "Top 3 bares de Cordón para primera cita"\n— "Top 3 desayunos antes de las 8 en Ciudad Vieja"\n\nMicro-rankings barriales se republican mejor que rankings país.`,
    note: 'Los rankings cuestionables son los que generan conversación. Que se sienta editorial, no listado.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_pov_app',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Template TikTok',
    title: 'Template: POV "Abrí la app"',
    copy: `Mostrar el flujo real de uso, no tutorial:\n\n[0-3s] "POV: son las 9am de un martes y necesitás un lugar para laburar 4 horas."\n[3-12s] Plano de mano abriendo Baffé. Filtro: "para laburar" + "WiFi" + "abierto ahora" + zona Pocitos.\n[12-18s] Caminando hacia el resultado.\n[18-22s] Lugar real: mesa, enchufe, café.\n[22-25s] Texto: "ya."\n\nMáximo 1 cada 2 semanas. La gente cansa rápido del screen recording.`,
    note: 'TikTok premia POV. La app aparece como solución natural, no como demo.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_behind',
    pilar: 'det',
    channel: 'TikTok',
    format: 'Template TikTok',
    title: 'Template: "Behind the scenes" (domingos)',
    copy: `Joaco grabando b-roll, hablando a cámara mientras camina:\n\n— "Estoy yendo al 5to café del día, todos van al banco visual."\n— "Hoy onboardé al primer founding partner de Cordón, mostremos cómo se ve."\n— "Salí a probar este lugar y me pasó esto..."\n\nHonesto, sin guion. Construye la narrativa "uno hace esto, no una empresa fría".`,
    note: 'Pilar Detrás. Construye confianza. Sin sobreproducir — el rough es parte del valor.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_no_es_baffe',
    pilar: 'cul',
    channel: 'TikTok',
    format: 'Template TikTok',
    title: 'Template: "Esto NO es Baffé"',
    copy: `Diferenciación por contraste, sin atacar marcas (~20s):\n\n[0-5s] Captura de Google reviews / TripAdvisor con reseñas vacías ("Todo lindo!! 5⭐").\n[5-15s] Cortar a una reseña real de Baffé con argumento.\n[15-20s] "Por eso existe esto."\n\nMáximo 1 vez por mes. Define la marca por lo que NO es.`,
    note: 'No mencionar competidores con nombre — solo mostrar capturas. Tono: irónico, no agresivo.',
    calendarSlot: null
  },

  // ============== TEMPLATES REUTILIZABLES — Carrusel IG ==============
  {
    id: 'lb_tpl_carrusel_top5',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Top 5 [categoría] de [barrio]"',
    copy: `Carrusel formato fijo (7 slides):\n\nSlide 1: portada con número + barrio + categoría.\nSlides 2-6: un venue por slide. Foto + frase corta de por qué entra.\nSlide 7: cierre con CTA "Ranking completo y reseñas en la app".\n\nEjemplos:\n— "Top 5 cafés para laburar en Pocitos"\n— "Top 5 bares para primera cita en Cordón"\n— "Top 5 desayunos para domingo lluvioso en Ciudad Vieja"\n\nPilar Cultura Baffé. Frecuencia: miércoles fijo.`,
    note: 'Carrusel guardable > like. Diseño consistente entre carruseles para reconocimiento de marca.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_resena_destacada',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Reseña destacada de la semana"',
    copy: `Carrusel semanal (5 slides):\n\nSlide 1: foto del venue.\nSlide 2: cita textual de la reseña (con permiso del autor — preguntar por DM antes).\nSlide 3-4: foto del venue + foto/avatar del autor.\nSlide 5: CTA "Leé la reseña completa en Baffé / @usuario".\n\nNO editar las palabras del usuario — si hay typos, dejar.\nMínimo 1 por semana después del lanzamiento de la serie.`,
    note: 'El reposteo sistemático es el motor de comunidad — es el incentivo más barato y efectivo para que la gente escriba.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_resenador_mes',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Reseñador del mes"',
    copy: `Carrusel mensual (6 slides):\n\nSlide 1: avatar + nombre + handle Baffé.\nSlide 2: stats — cuántas reseñas, barrios cubiertos, top venue para él/ella.\nSlide 3-5: 3 lugares que recomendó + por qué.\nSlide 6: "Seguilo en Baffé".\n\nCriterio de selección: GUSTO DEMOSTRADO en la app, NO audiencia externa.\n\nPor qué: convierte criterio en status. Es la versión Letterboxd del "influencer del mes". Recompensamos curaduría, no followers de IG.`,
    note: 'No incluir métrica de followers IG en los stats. Las stats son: reseñas escritas, barrios cubiertos, gente que lo sigue dentro de Baffé.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_mapa_barrio',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Mapa del barrio"',
    copy: `Carrusel con foco geográfico (7 slides):\n\nSlide 1: ilustración/screenshot del mapa de Baffé filtrado a un barrio.\nSlides 2-6: zoom a sub-zonas con 2-3 venues marcados de cada zona.\nSlide 7: "Abrí el mapa en la app — filtralo vos."\n\nVariantes: "Mapa de cafés de Pocitos zona 26 de Marzo", "Bares de Cordón sobre Constituyente", etc.`,
    note: 'Doble función: contenido útil + demo del producto sin que se note como demo.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_detras_ranking',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Detrás de un ranking"',
    copy: `Carrusel de transparencia editorial (6 slides):\n\nSlide 1: el ranking final (ej: top 5 cafés Pocitos para laburar).\nSlides 2-4: criterios — qué pesó (precio, ambiente, café específico, horarios, WiFi).\nSlide 5: lo que quedó afuera y por qué (ser explícito sobre exclusiones genera confianza).\nSlide 6: "Si discrepás, escribí tu reseña en la app".\n\nPilar Cultura Baffé puro. Hace transparente el criterio editorial.`,
    note: 'Honestidad editorial > pretensión de objetividad. Aclarar siempre que es CRITERIO Baffé, no verdad universal.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_antes_despues',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Template carrusel',
    title: 'Template: "Antes / Después" (mes 2-3)',
    copy: `Carrusel de progreso (4-5 slides):\n\nSlide 1: "Pocitos en mayo: 0 reseñas en este café."\nSlide 2: "Pocitos en julio: 12 reseñas, 4.3 promedio, escritas por X gente."\nSlide 3+: muestras de las reseñas reales.\nÚltimo slide: "Esto es densidad. Esto es lo que estamos construyendo en MVD."\n\nUsar a partir de junio cuando ya hay base para comparar.`,
    note: 'Cómo mostramos progreso narrado, no métrica vanity. La progresión visible es lo que hace que más gente se sume.',
    calendarSlot: null
  },

  // ============== TEMPLATES — Stories diarias + UGC ==============
  {
    id: 'lb_tpl_repost_ugc',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Template stories',
    title: 'Template: repost de aporte de usuario',
    copy: `≥3 reposts/sem en stories, ≥1/sem al feed.\n\nReglas:\n1. Toda reseña con cuerpo (>2 oraciones, opinión argumentada) es candidata.\n2. Pedir permiso por DM siempre antes de subirla.\n3. Crédito visible: avatar + handle Baffé + handle IG si lo dio.\n4. Mantener mantra: "Esto es exactamente para lo que está Baffé."\n\nNO reposteamos:\n— Reseñas de 1 línea ("muy bueno!!").\n— Fotos sin contexto.\n— Cualquier cosa de venues que no estén en la app.`,
    note: 'Cada repost es señal a otros usuarios: "lo que aportes se va a ver". Tratar a cada aportador como protagonista.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_stories_semana',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Template stories',
    title: 'Template: mix de stories semana tipo (15 min/día)',
    copy: `Sin producción nueva — todo del banco visual.\n\nLunes: clip del reel del día + encuesta.\nMartes: repost UGC con crédito.\nMiércoles: backstage del carrusel ("hoy publicamos top 5 X, contame cuál falta").\nJueves: pregunta abierta ("¿Cuál es el café de Pocitos al que más volvés?").\nViernes: "Lugar del día" — venue + foto + 1 frase.\nSábado: outreach honesto ("hoy salgo a grabar / a hablar con 3 locales").\nDomingo: countdown a la pieza Detrás.\n\nStickers que SÍ usamos: encuesta A/B, preguntas abiertas, slider, repost menciones, link al venue en app.\nStickers que NO: cuestionario "¿cuál soy?", countdowns de descuento, GIFs ruidosos.`,
    note: 'Stories es donde vive la conversación. Constancia diaria > producción.',
    calendarSlot: null
  },
  {
    id: 'lb_tpl_cta_resenar',
    pilar: 'com',
    channel: 'Instagram',
    format: 'CTA recurrente',
    title: 'CTA fijo de cierre de reel',
    copy: `Frase fija al cierre de TODOS los reels desde mes 1:\n\n"¿Conocés un lugar que falta? Sumalo y reseñalo en Baffé."\n\nVariantes según pilar:\n— Descubrimiento: "...Sumalo y reseñalo en Baffé."\n— Cultura: "Discrepás? Escribí tu reseña en Baffé."\n— Comunidad: "Tu reseña puede estar acá la próxima."\n— Detrás: "Bajate Baffé y empezá a aportar."\n\nTipografía + color + timing consistentes. Después de 30 reels, se vuelve mantra.`,
    note: 'Diferencia clave con plan rechazado: el verbo principal es RESEÑAR (escribir con criterio), no solo "sumar" (agregar). Letterboxd no premia agregar lugares vacíos.',
    calendarSlot: null
  },

  // ============== MAYO — POCITOS ==============
  {
    id: 'lb_may_lunes_lanzamiento',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Reel/TikTok',
    title: 'Mayo lunes 1 — primer "Encontré este café" en Pocitos',
    copy: `Lunes 11 may. Primera pieza pública del Q2.\n\nUsar template lb_tpl_encontre_cafe. Café elegido: el que tenga la combinación más fuerte de "diferencial visual + posibilidad de founding partner".\n\nNO tratarlo como gran lanzamiento. Tono honesto: "Empiezo por Pocitos. Vamos a un café por semana, mínimo."\n\nCopy IG: "Pocitos, primer café del Q2. [Nombre] en [calle]. Lo que vale: [X]. Bajate Baffé si querés ver dónde más vamos."\n\nSin teaser previo. Sin hard launch.`,
    note: 'El plan rechazado quería "fabricar evento". El plan Letterboxd construye despacio: 1 lugar por semana, dejar que la curaduría hable.',
    calendarSlot: { year: 2026, month: 4, week: 3, channel: 'TikTok' }
  },
  {
    id: 'lb_may_top5_pocitos_laburar',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Mayo mié — Top 5 cafés para laburar en Pocitos',
    copy: `Miércoles 13 may. Usar template lb_tpl_carrusel_top5.\n\nCriterios por venue:\n— ¿WiFi estable?\n— ¿Enchufes accesibles?\n— ¿Nivel de ruido tolerable para llamadas?\n— ¿Horarios extendidos?\n— ¿Precio del café razonable para quedarse 3hs?\n\nIncluir 1 outsider (lugar poco conocido) entre los 5. Si todos son los obvios, el ranking no aporta.\n\nCopy: "Pocitos para laburar — el ranking de Baffé. Si discrepás, escribí tu reseña."`,
    note: 'Específico > genérico. "Top 5 cafés para laburar en Pocitos" gana a "los mejores cafés de Uruguay".',
    calendarSlot: { year: 2026, month: 4, week: 3, channel: 'Instagram' }
  },
  {
    id: 'lb_may_viernes_repost_1',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Repost UGC',
    title: 'Mayo viernes — primer reposteo de reseña real',
    copy: `Viernes 15 may. Si todavía no hay reseñas con cuerpo (probable en mayo sem 1):\n\nAlternativa: pedirle a 2-3 amigos cercanos / círculo Baffé que escriban una reseña real ANTES del viernes. Genuina, con argumento. Pedir permiso para reposterla.\n\nFormato según template lb_tpl_repost_ugc.\n\nA partir de la sem 2-3 esto debería salir orgánico — gente real escribiendo, vos eligiendo la mejor.`,
    note: 'Bootstraping del UGC. El círculo cercano es la primera ola — pero TIENE que ser reseña genuina y argumentada, no "muy bueno!!".',
    calendarSlot: { year: 2026, month: 4, week: 3, channel: 'Instagram' }
  },
  {
    id: 'lb_may_domingo_voz',
    pilar: 'det',
    channel: 'TikTok',
    format: 'TikTok hablado',
    title: 'Mayo dom — voz fundador "Por qué Pocitos primero"',
    copy: `Domingo 17 may. ~30s, hablado a cámara, casero:\n\n"Estoy arrancando por Pocitos por una sola razón: densidad. 800 personas activas en Pocitos venden mejor a un café de Pocitos que 5.000 dispersos en Uruguay.\n\nEn 3 meses queremos tener Pocitos cubierto. Después Cordón. Después Ciudad Vieja.\n\nNo es 'los mejores cafés del país'. Es 'los mejores cafés de TU barrio'. La diferencia importa."\n\nCierre: clip caminando + CTA app.`,
    note: 'Pilar Detrás. Construye narrativa estratégica sin sobreproducir. Honesto sobre el por qué.',
    calendarSlot: { year: 2026, month: 4, week: 3, channel: 'TikTok' }
  },
  {
    id: 'lb_may_top5_desayuno',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Mayo mié — Top 5 desayunos en Pocitos',
    copy: `Miércoles 20 may. Variante del template carrusel top 5.\n\nCriterios:\n— ¿Abre antes de las 8?\n— ¿Tiene opción dulce + salada?\n— ¿Café decente?\n— ¿Precio para días de semana?\n— ¿Aguanta una reunión de trabajo?\n\nFoco: el desayuno como "ritual de barrio". Mostrar gente real desayunando.`,
    note: 'Categorías por momento del día generan engagement. La gente las usa como referencia.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },
  {
    id: 'lb_may_first_founding',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + reel',
    title: 'Mayo — primer founding partner onboardeado',
    copy: `Cuando se cierre el primer founding partner (idealmente sem 3-4 mayo):\n\nPost feed:\n— Foto del local + dueño/a.\n— "[Nombre del local] es nuestro founding partner #1. Eso significa: gratis perpetuo cuando lancemos cobro a locales en agosto. A cambio: feedback, testimonios, y voz editorial."\n— "La filosofía de Baffé es construir con los locales, no contra ellos."\n\nReel acompañante: 30s en el local, charla con dueño/a sobre por qué dijo que sí.`,
    note: 'Hito narrable. Cada founding partner es contenido. Pedir permiso para usar imagen y nombre antes.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },
  {
    id: 'lb_may_cierre_pocitos',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel build in public',
    title: 'Mayo — cierre del mes "Pocitos en números"',
    copy: `Sábado 30 may o domingo 31 may:\n\nCarrusel:\nSlide 1: "Pocitos en mayo — el primer mes."\nSlide 2: cafés cubiertos: [X]. Reseñas escritas: [Y]. Reseñadores activos: [Z].\nSlide 3: founding partners onboardeados: [N].\nSlide 4: top 3 reseñas más leídas (con permiso de autores).\nSlide 5: "Lo que más nos sorprendió: [insight real]."\nSlide 6: "Junio sumamos Cordón. Pocitos sigue creciendo. Si conocés un café de Pocitos que falta, sumalo."\n\nSubir incluso si los números son chicos. Transparencia construye más que silencio.`,
    note: 'Build in public es coherente con la voz de marca. Sirve como kickoff narrativo de junio.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },

  // ============== JUNIO — + CORDÓN + CUPONERA ==============
  {
    id: 'lb_jun_apertura_cordon',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + stories',
    title: 'Junio — apertura a Cordón',
    copy: `Lunes 1 jun. Post anunciando expansión:\n\n"Mayo fue Pocitos. Junio sumamos Cordón.\n\n[X] cafés/bares de Cordón ya cargados, con primeras reseñas. Si vivís o salís por la zona — bajate Baffé y mostranos qué falta."\n\nStories countdown previa: vie 29 may + sáb 30 may + dom 31 may.\n\nCarrusel acompañante: 5 venues de Cordón con los que arrancamos.`,
    note: 'Apertura escalonada por barrio = densidad por zona. Cordón se "estrena" con base mínima ya cargada, no vacío.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'lb_jun_cuponera_demo',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Reel demo',
    title: 'Junio — cuponera digital en acción',
    copy: `Cuando la cuponera MVP esté viva (target: mediados junio):\n\nReel ~30s:\n— Usuario real entrando a un founding partner.\n— Pide café, muestra QR de la app al barista.\n— Barista escanea, descuento se aplica.\n— Cara del usuario sorprendido.\n— Texto: "Cuponera Baffé. Solo en founding partners. Por ahora."\n\nNO grabar como demo de producto. Grabarlo como momento real — porque LO ES.`,
    note: 'Cuponera = primer mecanismo de monetización (cobro a locales en julio). Esta pieza es bisagra entre marketing y modelo de negocio.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'TikTok' }
  },
  {
    id: 'lb_jun_top5_bares_cordon',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Junio mié — Top 5 bares de Cordón',
    copy: `Mediados junio. Template carrusel top 5 aplicado a Cordón:\n\n"Top 5 bares de Cordón — el ranking de Baffé."\n\nCriterios bares: trago insignia, ambiente, precio promedio, hora pico, qué tipo de noche es (tranquila / animada / mixta).\n\nIncluir contraste: 1 clásico + 1 outsider + 3 del medio.`,
    note: 'Los bares aparecen recién en junio porque la base de Pocitos en mayo fue 100% café. Diversificación pilar a pilar, no nicho a nicho.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'lb_jun_resenador_del_mes',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Carrusel + feature',
    title: 'Junio — Reseñador del mes',
    copy: `Mediados junio. Template lb_tpl_resenador_mes.\n\nCriterio: usuario con ≥5 reseñas argumentadas en mayo. Si no llega, bajar el umbral a 3.\n\nPedir permiso. Coordinar repost desde su cuenta IG personal el mismo día.\n\nEn la app: banner home destacando al reseñador del mes con sus picks. Cambiar mensualmente.`,
    note: 'Esta pieza reemplaza al "Influencer del mes" del plan rechazado. Premia gusto demostrado, no audiencia externa.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'lb_jun_antes_despues_pocitos',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Junio — Pocitos antes/después (1 mes)',
    copy: `Mediados-fin junio. Template lb_tpl_antes_despues:\n\nMostrar 3-4 cafés de Pocitos comparando mayo (cero/poca actividad) vs junio (X reseñas, gente activa).\n\nUsar reseñas reales (con permiso). Mostrar avatares y cantidad.\n\n"Esto es lo que estamos construyendo, café por café. Cordón ya arrancó. Ciudad Vieja viene en julio."`,
    note: 'Cómo mostramos progreso. La densidad como producto narrativo.',
    calendarSlot: { year: 2026, month: 5, week: 4, channel: 'Instagram' }
  },
  {
    id: 'lb_jun_resena_destacada_serie',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Lanzamiento serie',
    title: 'Junio — lanzamiento "Reseña destacada" semanal',
    copy: `Lunes 1 jun. Anuncio del formato semanal:\n\n"Las mejores reseñas de Baffé empiezan a tener su lugar en el feed. Si la tuya es buena, la republicamos.\n\nCada lunes vamos a destacar UNA reseña: la del mes pasado, no por likes — por argumentación, gusto y honestidad.\n\nLa primera: [usuario] sobre [venue]."\n\nA partir de acá, salida semanal aplicando lb_tpl_resena_destacada.`,
    note: 'Saber que las buenas se republican hace que la gente las escriba mejor. Sostenible: 1 por semana hasta fin de Q2 y después.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'lb_jun_detras_top5',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Junio — "Detrás del Top 5 cafés Pocitos"',
    copy: `Última semana junio. Template lb_tpl_detras_ranking aplicado al primer ranking de mayo (Top 5 cafés para laburar Pocitos):\n\nMostrar criterios reales que usamos. Mostrar 2-3 venues que quedaron afuera y por qué (ej: "X tiene mejor café pero el WiFi es inestable").\n\nCierre: "El ranking se actualiza con tus reseñas. Si discrepás, escribí en Baffé."`,
    note: 'Transparencia editorial. Diferencial Letterboxd: el criterio es público, no algorítmico.',
    calendarSlot: { year: 2026, month: 5, week: 4, channel: 'Instagram' }
  },

  // ============== JULIO — + CIUDAD VIEJA + COBRO ==============
  {
    id: 'lb_jul_apertura_cv',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + stories',
    title: 'Julio — apertura a Ciudad Vieja',
    copy: `Lunes 1 jul. Post anunciando 3er barrio:\n\n"Mayo: Pocitos. Junio: Cordón. Julio: sumamos Ciudad Vieja.\n\nLa zona con la concentración más rara de cafés y bares de MVD — desde clásicos de los 50 a especialty 2024. Empezamos con [X] venues cargados.\n\nSi vivís, laburás o salís por Ciudad Vieja — bajate Baffé."\n\nCarrusel acompañante: 5 venues de Ciudad Vieja con primeras reseñas.`,
    note: 'Tercer y último barrio del Q2. Cierra el foco geográfico antes de pensar en escalar.',
    calendarSlot: { year: 2026, month: 6, week: 1, channel: 'Instagram' }
  },
  {
    id: 'lb_jul_top5_cv',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Julio mié — Top 5 lugares de Ciudad Vieja',
    copy: `Mediados julio. Template carrusel top 5.\n\nÁngulo distinto: Ciudad Vieja tiene mezcla — se puede ir por café diurno o por bar nocturno. Hacer "Top 5 lugares de Ciudad Vieja: 3 para el día, 2 para la noche."\n\nMostrar el contraste como parte del valor del barrio.`,
    note: 'Adaptar la categoría al carácter del barrio. No forzar el mismo molde Pocitos en cada zona.',
    calendarSlot: { year: 2026, month: 6, week: 2, channel: 'Instagram' }
  },
  {
    id: 'lb_jul_pitch_locales',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post abierto',
    title: 'Julio — "Locales de Pocitos: hablémonos"',
    copy: `Mediados julio. Post directo a venues:\n\n"En Pocitos hay [X] usuarios activos en Baffé. Escribieron [Y] reseñas en 2 meses. La cuponera está viva con [Z] founding partners.\n\nSi tenés un café o bar en Pocitos, Cordón o Ciudad Vieja: estamos arrancando a cobrar a locales nuevos. Pero hasta el local 100, hay 50% off perpetuo.\n\nDM si te interesa probar."\n\nNO es venta agresiva. Es invitación basada en datos reales.`,
    note: 'Pivote del Q2 al modelo comercial. Solo funciona si los números de la primera línea son honestos. El pitch se sostiene por densidad demostrada, no por promesa.',
    calendarSlot: { year: 2026, month: 6, week: 3, channel: 'Instagram' }
  },
  {
    id: 'lb_jul_resenador_del_mes',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Carrusel + feature',
    title: 'Julio — Reseñador del mes',
    copy: `Mediados julio. Template lb_tpl_resenador_mes.\n\nCriterio elevado: a esta altura debería haber al menos 5 candidatos con ≥10 reseñas argumentadas. Elegir al de criterio más distintivo (no necesariamente el más prolífico).`,
    note: 'Tercer mes consecutivo de la feature. Empieza a ser tradición — la gente sabe que existe y aspira.',
    calendarSlot: { year: 2026, month: 6, week: 2, channel: 'Instagram' }
  },
  {
    id: 'lb_jul_recap_q2',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel build in public',
    title: 'Julio — Recap Q2 "Build in public"',
    copy: `Domingo 26 o lunes 27 julio. Carrusel transparente:\n\nSlide 1: "3 meses, 3 barrios. Q2 Baffé en números."\nSlide 2: MAU concentrados en zona target: [X]. % de actividad en los 3 barrios: [Y]%.\nSlide 3: Reseñas escritas: [N]. Reseñas/usuario activo (north-star): [Z].\nSlide 4: Founding partners: [N]. Early adopters cobrando 50% off: [N].\nSlide 5: "Lo que sorprendió: [insight real]."\nSlide 6: "Lo que viene en agosto: [feature/expansión]."\nSlide 7: "Si llegaste hasta acá, ya sos parte. Gracias."\n\nPublicar incluso si los números no son perfectos. Transparencia construye más que silencio.`,
    note: 'Cierre formal del Q2. Sirve para abrir conversación con prensa local, posibles inversores, otros founding partners potenciales.',
    calendarSlot: { year: 2026, month: 6, week: 4, channel: 'Instagram' }
  },
  {
    id: 'lb_jul_postmortem',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'Julio — postmortem Q2 (interno)',
    copy: `Tarea interna domingo 26 jul. NO se publica.\n\nPreguntas a responder con datos:\n\n1. ¿MAU concentrados llegó a 1.500-2.000? ¿% en zona target?\n2. Retention D7: ¿>20%? ¿tendencia mes a mes?\n3. Reseñas/usuario activo: ¿subió o bajó? ¿qué pieza/formato impactó?\n4. ¿Qué tipo de contenido convirtió mejor a descarga? (TikTok vs reel vs carrusel vs stories)\n5. ¿Founding partners + early adopters: cuántos pagaron primer mes?\n6. Cuponera: ¿usos reales? ¿hay locales que pidieron sumarse después de ver casos?\n\nDecisiones para Q3 (agosto-octubre):\n— ¿Sumamos un 4to barrio o densificamos los 3?\n— Cobro masivo o seguimos en early?\n— Equipo: ¿hace falta sumar a alguien para outreach o producción?`,
    note: 'Sin postmortem cerrado con datos, no hay aprendizaje. Apartar 2 hs de domingo.',
    calendarSlot: { year: 2026, month: 6, week: 4, channel: 'En la app' }
  },

  // ============== HITOS CELEBRABLES (sin fecha fija) ==============
  {
    id: 'lb_hito_resena_100',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Story + post',
    title: 'Hito: Reseña #100',
    copy: `Cuando se publique la reseña #100 en Baffé:\n\nStory:\n— "Reseña #100: [usuario] sobre [venue]."\n— Cita textual de la reseña.\n— "Esto es exactamente para lo que está Baffé."\n\nPost feed (si la reseña vale): carrusel con el venue + cita + handle del usuario + "Ya somos 100 reseñas en MVD".\n\nPedir permiso al autor antes.`,
    note: 'Hitos chicos celebrados público > hito grande inflado. Cada 100 reseñas hasta que deje de ser noticia.',
    calendarSlot: null
  },
  {
    id: 'lb_hito_founding_5',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Hito: Founding partner #5',
    copy: `Cuando se cierre el 5to founding partner:\n\nCarrusel con los 5:\n— Slide 1: "5 founding partners. Esto recién empieza."\n— Slides 2-6: foto + nombre + barrio + 1 frase del dueño/a.\n— Slide 7: "Si tenés un café o bar y querés ser uno de los próximos 15 founding partners — DM."\n\nPost simultáneo en cada local (con su permiso).`,
    note: 'Mostrar el founding network como red, no como casos sueltos. Doble función: hito + outreach.',
    calendarSlot: null
  },
  {
    id: 'lb_hito_founding_25',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + reel',
    title: 'Hito: Founding partner #25 (cierre del tier)',
    copy: `Cuando se cierre el founding #25 (target: junio fin):\n\nPost: "Cerramos los 25 founding partners. Gracias.\n\nDe acá en adelante: tier early adopter (50% off perpetuo). Si querés entrar antes del local 100, DM."\n\nReel: rolodex de los 25 logos / fotos rápidas + voiceover.\n\nGenerar urgencia honesta sin manipulación.`,
    note: 'El cierre del tier founding es noticia comercial real. Activa el siguiente tier.',
    calendarSlot: null
  },
  {
    id: 'lb_hito_mau_500',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Story',
    title: 'Hito: MAU 500',
    copy: `Cuando MAU alcance 500:\n\nStory sobria:\n— "500 personas usando Baffé este mes en MVD."\n— "Mayoría en Pocitos. Empezando en Cordón. La densidad importa más que el bruto."\n— Sticker preguntas: "¿Qué barrio te gustaría que sumemos después?"\n\nSin globos. Sin confetti. Tono Letterboxd.`,
    note: '500 es el primer hito narrable de tracción. Si llega antes de la meta de junio, mejor — anunciarlo igual.',
    calendarSlot: null
  },
  {
    id: 'lb_hito_mau_1000',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + carrusel',
    title: 'Hito: MAU 1.000',
    copy: `Cuando MAU alcance 1.000:\n\nPost feed (no story):\n— "1.000 personas escribiendo sobre lo que comen y toman en MVD."\n— Carrusel: distribución por barrio + reseñas/usuario + top 3 lugares más reseñados + 1 cita destacada.\n\nFrase clave: "1.000 no es un número. Es el primer indicio de que esta cosa funciona."`,
    note: 'Hito principal del Q2 si llega. Tiene peso narrativo para outreach a locales y para futura conversación con prensa local.',
    calendarSlot: null
  },
  {
    id: 'lb_hito_resenador_top',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Story',
    title: 'Hito: primer reseñador con 10+ reseñas',
    copy: `Cuando alguien llegue a 10 reseñas argumentadas:\n\nStory:\n— "[Usuario] acaba de pasar las 10 reseñas en Baffé."\n— "Esto es lo que llamamos un reseñador de criterio."\n— Tag al usuario.\n— Botón "Seguilo en Baffé".\n\nEs el camino al "Reseñador del mes". Mostrar que el camino existe motiva a otros.`,
    note: 'Status público para gusto demostrado. Letterboxd-ismo en estado puro.',
    calendarSlot: null
  }

];

var MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var WEEKDAY_SHORT = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

// Mapa id → { month, day } para piezas con día específico.
// Si una pieza tiene calendarSlot.day explícito, ese gana sobre este mapa.
var CAMPAIGN_DAY_MAP = {
  // Setup mayo
  lb_setup_banco_visual:  { month: 4, day: 8 },
  lb_setup_lista_venues:  { month: 4, day: 8 },
  lb_setup_retention:     { month: 4, day: 8 },
  lb_setup_android_live:  { month: 4, day: 8 },
  // Mayo Pocitos
  lb_may_lunes_lanzamiento: { month: 4, day: 11 },
  lb_may_top5_pocitos_laburar: { month: 4, day: 13 },
  lb_may_viernes_repost_1: { month: 4, day: 15 },
  lb_may_domingo_voz: { month: 4, day: 17 },
  lb_may_top5_desayuno: { month: 4, day: 20 },
  lb_may_first_founding: { month: 4, day: 25 },
  lb_may_cierre_pocitos: { month: 4, day: 30 },
  // Junio + Cordón
  lb_jun_apertura_cordon: { month: 5, day: 1 },
  lb_jun_resena_destacada_serie: { month: 5, day: 1 },
  lb_jun_cuponera_demo: { month: 5, day: 15 },
  lb_jun_top5_bares_cordon: { month: 5, day: 17 },
  lb_jun_resenador_del_mes: { month: 5, day: 18 },
  lb_jun_antes_despues_pocitos: { month: 5, day: 27 },
  lb_jun_detras_top5: { month: 5, day: 24 },
  // Julio + Ciudad Vieja
  lb_jul_apertura_cv: { month: 6, day: 1 },
  lb_jul_top5_cv: { month: 6, day: 15 },
  lb_jul_resenador_del_mes: { month: 6, day: 16 },
  lb_jul_pitch_locales: { month: 6, day: 21 },
  lb_jul_recap_q2: { month: 6, day: 27 },
  lb_jul_postmortem: { month: 6, day: 26 }
};

var DEFAULT_PILLARS = [
  { id: 'desc', label: 'Descubrimiento',   color: '#4A3F8A' },
  { id: 'com',  label: 'Comunidad',        color: '#2E6B4F' },
  { id: 'cul',  label: 'Cultura Baffé',    color: '#C85A2A' },
  { id: 'det',  label: 'Detrás de escena', color: '#9B3060' }
];

// IDs del plan rechazado 2026-05-07 (influencer-centric).
// Se borran de Firestore en migración one-shot — ver firebase-init.js cleanupRejectedPieces().
var REJECTED_PIECE_IDS = [
  'camp_teaser_1', 'camp_teaser_2', 'camp_teaser_3',
  'camp_hardlaunch_reel', 'camp_hardlaunch_post', 'camp_hardlaunch_stories',
  'camp_30cafes_serie',
  'camp_reel_top3', 'camp_reel_cafe_escondido', 'camp_reel_probamos', 'camp_reel_mapa_rapido',
  'camp_suma_lanzamiento', 'camp_suma_app_banner', 'camp_suma_sorteo_1',
  'camp_remote_carrusel', 'camp_remote_pov_tt',
  'camp_influencer_del_mes_jun', 'camp_repost_ugc_template', 'camp_suma_sorteo_2',
  'camp_bares_top_after', 'camp_bares_reel_influencer', 'camp_checkpoint_interno',
  'camp_resena_destacada', 'camp_concurso_mostranos',
  'camp_descargas_pinned', 'camp_descargas_features_reel', 'camp_descargas_influencer_pesado',
  'camp_crawl_anuncio', 'camp_crawl_documentacion',
  'camp_recap_carrusel', 'camp_postmortem_interno', 'camp_cta_fijo_aportes'
];

// ============================================================
// ESTADO GLOBAL
// ============================================================
var state = {
  user: null,
  pieces: [],
  pillars: [],
  currentId: null,
  isCreating: false,
  filterPilar: 'all',
  filterStatus: 'all',
  showArchived: false,
  calYear: 2026,
  calMonth: 4,
  commentType: 'comment',
  unsubComments: null,
  modalSnapshot: null
};
