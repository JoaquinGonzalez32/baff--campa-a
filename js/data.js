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
// PIEZAS DE LA CAMPAÑA — 10 semanas (mayo–julio 2026)
// Mapeo de semanas del plan al calendario (mes, semana 1–4):
//   Sem 0 → Mayo S2     Sem 5 → Junio S3
//   Sem 1 → Mayo S3     Sem 6 → Junio S4
//   Sem 2 → Mayo S4     Sem 7 → Julio S1
//   Sem 3 → Junio S1    Sem 8 → Julio S2
//   Sem 4 → Junio S2    Sem 9 → Julio S3
//                       Sem 10 → Julio S4
// month index: Mayo=4, Junio=5, Julio=6
// ============================================================
var INITIAL_CONTENT = [

  // ============== SEM 2 — TEASER PRE-LAUNCH ==============
  {
    id: 'camp_teaser_1',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post + story',
    title: 'Teaser pre-launch — "se viene algo distinto"',
    copy: `Post (jueves 28 may, rompe el silencio de redes):\n\n"Estuvimos quietos. Estábamos construyendo.\n\nLa semana que viene Baffé deja de ser una app de descubrimiento más — y se vuelve la guía de cafés y bares de MVD hecha por los que salen.\n\nEl lunes lo vas a entender."\n\nStory complementaria:\n— Imagen oscura, logo Baffé centrado.\n— Texto: "Lunes 1/6. Algo nuevo." + countdown sticker hacia el lunes.`,
    note: 'No revelar curadores todavía. El misterio es parte del gancho. La cuenta lleva 2 semanas en silencio — el primer post post-silencio captura más atención algorítmica si es grande, no si es un reel suelto.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },
  {
    id: 'camp_teaser_2',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Story',
    title: 'Teaser día 2 — countdown',
    copy: `Story (viernes 29 may):\n\n— Foto en blanco y negro de un café/bar de MVD, sin nombre visible.\n— Texto: "Faltan 3 días."\n— Sticker countdown.\n— En segunda story: encuesta "¿Adivinás qué se viene?" con opciones absurdas + una pista real.`,
    note: 'Mantener el misterio pero mostrar movimiento. La encuesta sirve para que los seguidores que ya están se enganchen y comenten.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },
  {
    id: 'camp_teaser_3',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Story sneak peek',
    title: 'Teaser día 3 — sneak peek de un curador',
    copy: `Story (sábado 30 may):\n\n— Foto borrosa o silueta de un curador (uno de los firmados).\n— Texto: "El lunes te presentamos a la gente que va a recomendar dónde tomar café y dónde salir en MVD."\n— Sticker countdown 2 días.\n\nDomingo: confirmación interna con todos los curadores de coordinación para el lunes.`,
    note: 'Recién acá empieza a soltarse la idea de "curadores". El sneak peek con cara borrosa genera curiosidad sin spoiler completo.',
    calendarSlot: { year: 2026, month: 4, week: 4, channel: 'Instagram' }
  },

  // ============== SEM 3 — HARD LAUNCH ==============
  {
    id: 'camp_hardlaunch_reel',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Reel principal',
    title: 'HARD LAUNCH — reel de presentación de curadores',
    copy: `Reel (lunes 1 jun, ~45 seg):\n\nEstructura:\n— [0–3s] Hook: "MVD tiene cientos de cafés y bares. Estos 6 te van a decir cuáles importan."\n— [3–25s] Presentación rápida de cada curador: nombre, vertical (café de especialidad / remote / bares), 1 lugar que ya recomendaron en Baffé.\n— [25–40s] Voz off: "Baffé es la guía hecha por la gente que sabe. Seguilos adentro de la app."\n— [40–45s] CTA: "Link en bio. Bajate Baffé y empezá a seguirlos."\n\nMúsica: track instrumental MVD/uruguayo si entra, sino algo cálido tipo café/tarde.`,
    note: 'El reel ES el evento. USD 30–50 de Meta Ads ese día puntual sobre este video, no sobre los demás. Cada curador hace su propio post el mismo día con el hashtag #BaffeMVD.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'camp_hardlaunch_post',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post fijado',
    title: 'HARD LAUNCH — post fijado de manifiesto',
    copy: `Post fijado (lunes 1 jun):\n\n"Hoy Baffé deja de ser una app más.\n\nMontevideo no necesita otro Google Maps. Necesita una guía hecha por los que ya saben dónde se toma el mejor café, dónde se puede laburar tranquilo, y dónde se baja un after office bien.\n\nDesde hoy, 6 curadores verificados arman esa guía con nosotros, dentro de la app. Vas a poder seguirlos, ver lo que recomiendan en tiempo real, y sumar lo tuyo.\n\nBajate Baffé. Seguí a los curadores. Si conocés un lugar que falta, sumalo — los aportes se ven, con tu nombre.\n\n🔗 en bio.\n#BaffeMVD"`,
    note: 'Post fijado durante toda la sem 3. Es el "documento de identidad" de la marca para cualquiera que llegue al perfil esta semana.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'camp_hardlaunch_stories',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Stories coordinadas',
    title: 'HARD LAUNCH — stories del día',
    copy: `Stories (lunes 1 jun, espaciadas durante el día):\n\n10am — "Hoy es el día. Bajate Baffé." + link app.\n2pm — Repost del primer curador que postee desde su cuenta personal mencionando Baffé.\n4pm — Story con métricas del día ("X descargas en 6h" si aplica) o frase de uno de los curadores.\n7pm — Cierre del día: "Esto recién empieza. Mañana arrancamos con #30CafesEn30Dias."\n\nRepostear todas las menciones de los 6 curadores cuando posteen.`,
    note: 'La cadencia importa. No tirar todas las stories juntas — espaciarlas durante el día simula movimiento orgánico.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'camp_30cafes_serie',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Reel diario (serie)',
    title: '"30 cafés en 30 días" — serie de reels',
    copy: `Serie de 30 reels cortos (15–25 seg cada uno), uno por día, mismo formato fijo:\n\nEstructura única:\n— [0–2s] Hook visual: zoom al café/lugar.\n— [2–10s] Nombre + barrio + 1 línea ("¿por qué este?").\n— [10–18s] Detalle clave: tipo de café, ambiente, precio, horarios.\n— [18–22s] Captura de cómo se ve en Baffé.\n— [22–25s] CTA fijo: "¿Conocés un lugar que falta? Sumalo en Baffé."\n\nArranca martes 2 de junio. 1 por día durante 30 días — termina en sem 7.\n\nGrabar en batches de 8–10 reels por salida (sábados de grabación).`,
    note: 'Esta es la columna vertebral del contenido orgánico. Mismo formato repetido = velocidad de producción + reconocimiento de marca. NO improvisar formato cada día.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },

  // ============== REELS — FORMATOS REUTILIZABLES ==============
  {
    id: 'camp_reel_top3',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Reel template',
    title: 'Formato: "Top 3 cafés/bares para [X]"',
    copy: `Template reutilizable. Variantes:\n\n"Top 3 cafés para laburar en MVD"\n"Top 3 bares para after office en Pocitos"\n"Top 3 lugares para una primera cita"\n"Top 3 cafés escondidos en Ciudad Vieja"\n\nEstructura (~30 seg):\n— Hook: "Si querés [X], estos 3 lugares en MVD."\n— 3 cards visuales (8 seg c/u): foto + nombre + barrio + 1 razón.\n— Cierre: "Todos están en Baffé. Link en bio."\n\nMínimo 1 por semana.`,
    note: 'Top 3 es el formato más performante en IG en este nicho. Mantener visual consistente: misma plantilla, misma tipografía, mismas transiciones.',
    calendarSlot: { year: 2026, month: 5, week: 1, channel: 'Instagram' }
  },
  {
    id: 'camp_reel_cafe_escondido',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Reel template',
    title: 'Formato: "Café/bar escondido"',
    copy: `Template reutilizable. Foco en lugares poco conocidos:\n\nEstructura (~20 seg):\n— Hook: "Está a 2 cuadras de [punto conocido] y casi nadie lo conoce."\n— Plano caminando hacia el lugar (POV).\n— Entrada: "Adentro:" + planos del ambiente, café/trago, gente.\n— Cierre: nombre + barrio + horarios + "lo subimos a Baffé hoy."\n\nIdeal para curador de café de especialidad.`,
    note: 'El POV caminando funciona muy bien — genera la sensación de descubrimiento. No grabar el lugar como un comercial, grabarlo como si vos estuvieras llegando por primera vez.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_reel_probamos',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Reel template',
    title: 'Formato: "Probamos X"',
    copy: `Template reutilizable. Reseña honesta a cámara:\n\nEstructura (~30 seg):\n— "Probamos el café de [lugar]."\n— Reseña honesta: qué vale la pena, qué no.\n— Precio explícito.\n— Veredicto: "vale / no vale / depende."\n— Cierre: "Lo encontrás en Baffé."\n\nFunciona mejor en TikTok que en IG por el formato hablado.`,
    note: 'La honestidad es el formato. Si todo es 10/10, nadie te cree. Si decís "el café estaba flojo pero el ambiente compensa" — te cree. Esa es la voz Baffé.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'TikTok' }
  },
  {
    id: 'camp_reel_mapa_rapido',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Reel template',
    title: 'Formato: "Mapa rápido de [zona/vibe]"',
    copy: `Template reutilizable. Mapa visual:\n\nEstructura (~20 seg):\n— Mapa de MVD con pines animados.\n— "5 cafés en Pocitos para tomar algo solo." (o variante)\n— Cada pin se expande con foto + nombre.\n— Cierre: captura de la app Baffé con el mismo mapa.\n— "Filtralos vos en Baffé."\n\nPerfecto para mostrar el feature de mapa de la app.`,
    note: 'Este formato cumple doble función: contenido útil + demo del producto sin que se note como demo. Hacer al menos 1 por mes por zona/vibe.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },

  // ============== SEM 4 — SUMÁ TU LUGAR + REMOTE WORKERS ==============
  {
    id: 'camp_suma_lanzamiento',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Post + reel',
    title: '"Sumá tu lugar" — lanzamiento de campaña',
    copy: `Lanzamiento martes 9 jun:\n\nPost:\n"En MVD hay cafés y bares que no están en ningún lado. Los conocen 30 personas y se mantienen así.\n\nQueremos cambiar eso — pero no lo podemos hacer solos.\n\nDesde hoy: cada usuario que sume un local nuevo a Baffé entra automáticamente en el sorteo semanal de una gift card de café (cortesía de [aliado]).\n\nNo hay 'follow + tag'. Hay aportes reales. Tu nombre queda en el local que sumás."\n\nReel acompañante: tutorial de 15 seg de cómo agregar un local en la app.\n\nCTA: "Bajate Baffé. Sumá tu favorito. Esta semana, vos elegís qué se ve."`,
    note: 'La gift card es canjeada con un local aliado, no comprada. Sostenible y refuerza la red de aliados. Importante: sorteo atado a aporte real, NUNCA a follow + tag.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_suma_app_banner',
    pilar: 'com',
    channel: 'En la app',
    format: 'Banner',
    title: '"Sumá tu lugar" — banner en la app',
    copy: `Banner en home de la app durante sem 4 y 5:\n\n"¿Conocés un lugar que falta?\nSumá tu local favorito antes del viernes y entrá al sorteo semanal.\n[Botón: Sumar local] [link: Ver bases]"\n\nDespués del sorteo (lunes), cambiar copy a "Esta semana ganó [usuario]. ¿Cuál sumás vos?"`,
    note: 'El banner en la app cierra el loop entre marketing IG y producto. Sin esto, el usuario que llega de IG no ve la campaña al abrir.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'En la app' }
  },
  {
    id: 'camp_suma_sorteo_1',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Story + post',
    title: '"Sumá tu lugar" — primer sorteo (viernes 12 jun)',
    copy: `Stories (viernes 12 jun):\n\n— "Llegó el primer sorteo de #SumáTuLugar."\n— Lista visual de los locales sumados esta semana (con nombre del usuario que lo sumó).\n— "Ganó: [nombre del usuario]. Por sumar [nombre del local], que ahora está en Baffé."\n— "El próximo viernes hay otra. Esta semana se sumaron 27 locales nuevos. ¿Cuál falta?"\n\nPost en feed: foto del local ganador + "Lo sumó [usuario]. Ahora está en Baffé. Buscalo."`,
    note: 'Mostrar el número real de locales sumados refuerza el efecto comunidad. Si son 5, ponelo igual. La transparencia construye más confianza que el inflado.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_remote_carrusel',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Carrusel: "5 cafés para laburar en MVD"',
    copy: `Carrusel (sem 4):\n\nSlide 1: "5 cafés para laburar en MVD" + foto.\nSlide 2–6 (uno por café):\n— Foto del lugar.\n— Nombre + barrio.\n— ¿WiFi? ¿enchufes? ¿ruido? ¿espacio?\n— Precio del café promedio.\n— Captura de cómo se ve en Baffé.\nSlide 7: "Todos están en Baffé. Filtrá por 'para laburar' y los encontrás."\n\nCurador remote workers al frente — co-firma el carrusel.`,
    note: 'El carrusel detallado funciona porque es referencia útil real, no influencer aesthetic. La gente lo guarda. Guardado > like en IG.',
    calendarSlot: { year: 2026, month: 5, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_remote_pov_tt',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Reel POV',
    title: 'POV: "Buscás dónde laburar un martes a la mañana"',
    copy: `POV (sem 5, TikTok):\n\n"POV: son las 9am de un martes y necesitás un lugar para laburar 4 horas.\n\nNo querés Starbucks. No querés tu casa. Querés algo bueno."\n\n— Plano de mano abriendo Baffé.\n— Filtro: "para laburar" + "WiFi" + "abierto ahora" + zona Pocitos.\n— Aparecen 3 opciones.\n— Plano caminando hacia uno.\n— Entrada: lugar real, mesa, enchufe, café.\n— Texto final: "ya."\n\nMúsica: lo-fi.`,
    note: 'TikTok premia el formato POV — funciona mejor que carrusel. Mostrar el flujo real de la app sin que parezca tutorial. Que se vea simple.',
    calendarSlot: { year: 2026, month: 5, week: 3, channel: 'TikTok' }
  },

  // ============== SEM 5 — CONSOLIDACIÓN ==============
  {
    id: 'camp_curador_del_mes_jun',
    pilar: 'com',
    channel: 'En la app',
    format: 'Feature destacado',
    title: 'Feature "Curador del mes" — Junio',
    copy: `Feature destacado en home de la app durante sem 5–6:\n\n— Banner: "Curador del mes — [Nombre]"\n— Foto + bio corta del curador.\n— Sus 5 lugares más recomendados.\n— Botón "Seguir en Baffé".\n— Botón "Ver perfil".\n\nEn IG: post anunciando el feature + reel del curador caminando por sus 3 lugares favoritos.`,
    note: 'El "curador del mes" es la zanahoria que sostiene la motivación de los curadores. Rotación: empezar por el de café (sem 5–6), luego remote (sem 7–8), luego bares (sem 9–10).',
    calendarSlot: { year: 2026, month: 5, week: 3, channel: 'En la app' }
  },
  {
    id: 'camp_repost_ugc_template',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Repost UGC',
    title: 'Plantilla: repost de aporte de usuario',
    copy: `Plantilla reutilizable (~3 por semana en stories, 1 por semana al feed):\n\nFeed:\n— Foto/review del usuario en Baffé.\n— Texto: "[Usuario] sumó [local] a Baffé esta semana y dejó esta reseña. Buscalo."\n— Crédito explícito al usuario.\n\nStories:\n— Captura del aporte en la app.\n— Tag al usuario.\n— "Gracias [usuario]. Esto es exactamente para lo que está Baffé."\n\nMantener consistente la frase "Esto es exactamente para lo que está Baffé" — empieza a funcionar como mantra.`,
    note: 'El UGC reposteado es el incentivo más barato y efectivo para sostener aportes. Cada repost es señal a otros usuarios: "lo que aportes se va a ver". Tratar a cada aportador como protagonista.',
    calendarSlot: { year: 2026, month: 5, week: 3, channel: 'Instagram' }
  },
  {
    id: 'camp_suma_sorteo_2',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Story + post',
    title: '"Sumá tu lugar" — segundo sorteo (viernes 19 jun)',
    copy: `Mismo formato que el primer sorteo (camp_suma_sorteo_1) pero:\n\n— Resaltar el crecimiento: "Hace 2 semanas teníamos X locales en Baffé. Hoy tenemos Y."\n— Mostrar 2 reseñas destacadas de la semana junto con el ganador.\n— "El sorteo sigue cada viernes. La app crece con vos."`,
    note: 'A partir del 2do sorteo, mostrar el crecimiento agregado. La progresión visible es lo que hace que más gente se sume.',
    calendarSlot: { year: 2026, month: 5, week: 3, channel: 'Instagram' }
  },

  // ============== SEM 6 — CHECKPOINT + BARES ==============
  {
    id: 'camp_bares_top_after',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Carrusel: "Top bares para after office"',
    copy: `Carrusel (sem 6, lunes 22 jun):\n\nSlide 1: "Bares de MVD para after office. Sin pretensión, con buena cerveza."\nSlide 2–6: 5 bares con foto, barrio, hora pico, trago insignia, precio promedio.\nSlide 7: "Filtrá 'after office' en Baffé y aparecen estos + 20 más."\n\nCurador de bares al frente. Con su voz, no la nuestra.`,
    note: 'Marca el inicio formal del nicho bares. La voz del curador toma el centro acá — Baffé pasa a ser plataforma, no autor.',
    calendarSlot: { year: 2026, month: 5, week: 4, channel: 'Instagram' }
  },
  {
    id: 'camp_bares_reel_curador',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Reel colab',
    title: 'Reel colab — curador de bares en su lugar favorito',
    copy: `Reel colab (sem 6, ~30 seg):\n\n— Curador entra a su bar favorito de MVD.\n— Pide su trago habitual.\n— Cuenta en 20 seg por qué este bar y no otro.\n— Mientras habla: fondo del bar, plano del trago, gente.\n— Cierre: "Lo seguís en Baffé. Y a otros 5 más como él."\n\nSubir desde la cuenta de Baffé Y desde la cuenta del curador, mismo día.`,
    note: 'El co-post duplica reach sin duplicar producción. Coordinar día y hora con el curador para postear simultáneo.',
    calendarSlot: { year: 2026, month: 5, week: 4, channel: 'Instagram' }
  },
  {
    id: 'camp_checkpoint_interno',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'CHECKPOINT DURO mid-marketing — lunes 22 jun',
    copy: `Tarea interna (no se publica, es decisión de equipo):\n\nRevisar números a fin de sem 5:\n— Followers: ¿> 1.500? Si no, ALERTA.\n— Aportes/sem: ¿> 20? Si no, ALERTA.\n— Curadores activos posteando: ¿≥ 5 sostenidos?\n— Descargas/sem: tendencia.\n\nDecisiones:\n— Si followers < 1.500 → cortar nicho que peor performa, redirigir 100% del budget al mejor reel/curador.\n— Si aportes < 20 → revisar si hay fricción en el flujo de "agregar local". Subir prioridad de UI fixes.\n— Si curadores < 5 activos → check-in 1:1 con los inactivos esta semana.`,
    note: 'Esto NO se postea. Está en el hub para que el equipo lo vea y lo cierre como tarea cuando se haga la revisión.',
    calendarSlot: { year: 2026, month: 5, week: 4, channel: 'En la app' }
  },

  // ============== SEM 7 — UGC + CONCURSO ==============
  {
    id: 'camp_resena_destacada',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Repost serie',
    title: '"Reseña destacada" — lanzamiento de serie semanal',
    copy: `Lanzamiento lunes 29 jun + serie semanal de aquí en adelante:\n\nFormato:\n— 1 review larga/buena de la app por semana.\n— Republicada en IG con: foto del lugar + texto de la review + crédito al usuario + 1 línea de Baffé.\n— Tagueo del usuario.\n— Stickers "Reseña destacada — Sem [X]".\n\nLanzamiento: post anunciando que arranca + primera reseña destacada.\n\n"Las mejores reseñas de Baffé empiezan a tener su lugar en el feed. Si la tuya es buena, la republicamos."`,
    note: 'Esto incentiva calidad de review (no solo cantidad). Saber que las buenas se republican hace que la gente las escriba mejor. Sostenible: 1 por semana hasta sem 10 y después.',
    calendarSlot: { year: 2026, month: 6, week: 1, channel: 'Instagram' }
  },
  {
    id: 'camp_concurso_mostranos',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Concurso',
    title: 'Concurso: "Mostranos tu favorito de MVD"',
    copy: `Concurso de 1 semana (martes 30 jun → domingo 5 jul):\n\nMecánica:\n— Subí una story con tu café/bar favorito de MVD.\n— Etiquetá a @baffemvd y al lugar.\n— Usá #BaffeMVD.\n— Las 5 mejores van al feed con crédito + el ganador recibe canje en un local aliado.\n\nNo follow + tag. La acción real es: mostrar un lugar.\n\nPost de lanzamiento:\n"Mostranos qué lugar de MVD nadie debería pasar por alto.\nLas mejores stories de la semana van al feed de Baffé. Y un canje a quien la rompa."`,
    note: 'El concurso es UGC en escala. La condición de "mostrar el lugar" filtra automáticamente a usuarios que valoran la app. Premio simbólico, alcanza con un canje de un aliado.',
    calendarSlot: { year: 2026, month: 6, week: 1, channel: 'Instagram' }
  },

  // ============== SEM 8 — SEMANA DE DESCARGAS ==============
  {
    id: 'camp_descargas_pinned',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post fijado + bio',
    title: '"Semana de descargas" — pinned post + bio',
    copy: `Sem 8 (6–12 jul):\n\nNuevo post fijado (reemplaza al de hard launch):\n"Si seguís a Baffé y todavía no tenés la app — esta es la semana.\n\nDe lunes a domingo te vamos a mostrar todo lo que podés hacer adentro: filtrar por mood, seguir curadores, sumar lugares, ver reseñas reales.\n\nEsta es la app que estábamos construyendo. Bajala.\n\n🔗 en bio."\n\nBio actualizada: "↓ Bajate Baffé esta semana ↓" + link directo a stores.`,
    note: 'Cambio de tono: las primeras semanas fue identidad/comunidad. Esta semana es conversión pura. El usuario que llega ya conoce — solo necesita el empujón final.',
    calendarSlot: { year: 2026, month: 6, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_descargas_features_reel',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Reel feature',
    title: 'Reels feature de la app — "¿Sabías que podés...?"',
    copy: `Serie de 5 reels durante la semana de descargas (1 por día):\n\n1. "¿Sabías que podés filtrar por 'abierto ahora' + 'cerca tuyo'?"\n2. "¿Sabías que podés ver lo que recomiendan los curadores en tiempo real?"\n3. "¿Sabías que podés guardar lugares en colecciones tipo 'para una cita'?"\n4. "¿Sabías que podés sumar tu lugar favorito y aparece tu nombre?"\n5. "¿Sabías que podés filtrar por horarios nocturnos / pet-friendly / con WiFi?"\n\nFormato fijo: 15 seg, captura de pantalla animada de la app, voz off.`,
    note: 'Mostrar features concretos > hablar de la app en abstracto. Cada reel responde una pregunta que el usuario potencial ya se hizo.',
    calendarSlot: { year: 2026, month: 6, week: 2, channel: 'Instagram' }
  },
  {
    id: 'camp_descargas_influencer_pesado',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Colab paga',
    title: 'Colab con influencer pesado — push final',
    copy: `Sem 8: 1 colab con un influencer mediano/grande de MVD (gastronomía, lifestyle MVD, foodie).\n\nDeliverables esperados:\n— 1 reel principal en su cuenta + repost en stories.\n— Mención clara de Baffé como "la guía hecha por curadores en MVD".\n— Tag a @baffemvd.\n\nFee: parte de los USD 100–500 de budget total. Negociar a cambio de canje + featured como "curador invitado del mes" si encaja.\n\nCerrar contrato y brief en sem 6.`,
    note: 'Acá ya están validados los formatos que convierten — sabés qué mensaje y qué tono funciona. El influencer pesado amplifica algo probado, no experimenta.',
    calendarSlot: { year: 2026, month: 6, week: 2, channel: 'Instagram' }
  },

  // ============== SEM 9 — BAFFÉ CRAWL ==============
  {
    id: 'camp_crawl_anuncio',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Post + stories',
    title: 'Baffé Crawl — anuncio del evento',
    copy: `Anuncio (lunes 13 jul, evento sábado 18 jul):\n\nPost:\n"El sábado 18 hacemos algo distinto.\n\nBaffé Crawl: una recorrida por 3 cafés/bares aliados de MVD, gratis para los primeros 30 que descarguen Baffé y se anoten en la app.\n\nLa idea: salir a probar lugares que recomiendan los curadores. Conocer gente que también está en Baffé. Tomar algo, charlar.\n\nNo es un evento de marca. Es una salida real con 30 personas.\n\n🔗 Inscripción en bio (dentro de la app)."\n\nStories diarias hasta el sábado: countdown + caras de los curadores que van.`,
    note: 'Si el budget no banca (USD 100–150 para canjes con los 3 locales), saltar el evento. Pero si entra: genera UGC masivo para 2 semanas siguientes.',
    calendarSlot: { year: 2026, month: 6, week: 3, channel: 'Instagram' }
  },
  {
    id: 'camp_crawl_documentacion',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Reel + carrusel',
    title: 'Baffé Crawl — documentación del evento',
    copy: `Sábado 18 jul + domingo 19 jul:\n\nDurante el evento:\n— Stories en vivo desde cada parada.\n— Encuestas: "¿cuál fue tu favorito?"\n— Repost de stories de los participantes.\n\nPost-evento (lunes 20 jul):\n— Carrusel con fotos de las 3 paradas + caras + frases sueltas de participantes.\n— Reel de 30 seg con el resumen del día.\n— "Esto fue Baffé Crawl. Los 3 locales: [tags]. Las próximas también empiezan en la app — bajala si querés estar en la siguiente."`,
    note: 'El contenido del evento se reusa durante TODA la sem 10. Documentar generoso: video, fotos, audio si entra.',
    calendarSlot: { year: 2026, month: 6, week: 3, channel: 'Instagram' }
  },

  // ============== SEM 10 — CIERRE ==============
  {
    id: 'camp_recap_carrusel',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel build in public',
    title: 'Recap de campaña — build in public',
    copy: `Carrusel (sem 10, lunes 20 jul):\n\nSlide 1: "8 semanas de campaña Baffé en números."\nSlide 2: Followers: 100 → [X]. Reach total: [X]. Descargas: +[X].\nSlide 3: Curadores activos: [X]. Locales sumados por la comunidad: [X]. Reseñas: [X].\nSlide 4: "Lo que más nos sorprendió: [insight real]."\nSlide 5: "Lo que viene en mes 3: [feature/expansión]."\nSlide 6: "Si llegaste hasta acá, ya sos parte. Gracias."\n\nSubir incluso si los números son chicos. La transparencia construye más confianza que el silencio.`,
    note: 'Build in public es coherente con la voz de marca y con el diferencial de comunidad. La gente que ve esto y se siente parte → engagement orgánico para mes 3.',
    calendarSlot: { year: 2026, month: 6, week: 4, channel: 'Instagram' }
  },
  {
    id: 'camp_postmortem_interno',
    pilar: 'det',
    channel: 'En la app',
    format: 'Tarea interna',
    title: 'POSTMORTEM completo — domingo 26 jul',
    copy: `Tarea interna (no se publica):\n\nReunión de cierre. Preguntas a responder:\n\n1. Followers: ¿llegamos a 3.000–4.000? ¿Cuánto creció orgánico vs. ads?\n2. Descargas: tendencia. ¿Qué reel/colab convirtió más?\n3. Aportes: ¿qué incentivo funcionó mejor (sorteo, repost, curador del mes)?\n4. Curadores: ¿quién posteó más? ¿quién trajo más seguidores reales? ¿quién no funcionó?\n5. Nichos: ¿café, remote o bares converte mejor?\n\nDecisiones para mes 3:\n— Escalar el mejor nicho.\n— Cerrar 5K seguidores.\n— Decidir si contratar UGC fija (sí/no según datos).\n— Plan de retención: usuarios que descargaron en sem 3-4, ¿siguen activos?`,
    note: 'Cierre formal de la campaña. Si esta tarea no se cierra con datos, no aprendiste nada. Apartar 2 horas de domingo y cerrarla con el equipo.',
    calendarSlot: { year: 2026, month: 6, week: 4, channel: 'En la app' }
  },
  {
    id: 'camp_cta_fijo_aportes',
    pilar: 'com',
    channel: 'Instagram',
    format: 'CTA recurrente',
    title: 'CTA fijo de cierre de reel',
    copy: `Frase fija al final de TODOS los reels desde sem 3 en adelante:\n\n"¿Conocés un lugar que falta? Sumalo en Baffé."\n\nTipografía consistente. Color consistente. Mismo timing al cerrar el reel.\n\nDespués de 30 reels con esta frase, se vuelve mantra. La gente termina el reel pensando "¿qué lugar conozco yo?" — eso es exactamente lo que querés.`,
    note: 'No tratar como un CTA cualquiera — es la columna vertebral de la activación de aportes. Si en algún reel se cambia "para variar", se pierde el efecto acumulativo. Repetir hasta el cansancio.',
    calendarSlot: null
  }

];

var MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var DEFAULT_PILLARS = [
  { id: 'desc', label: 'Descubrimiento',   color: '#4A3F8A' },
  { id: 'com',  label: 'Comunidad',        color: '#2E6B4F' },
  { id: 'cul',  label: 'Cultura Baffé',    color: '#C85A2A' },
  { id: 'det',  label: 'Detrás de escena', color: '#9B3060' }
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
