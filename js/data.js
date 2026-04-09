// ============================================================
// DATOS Y ESTADO GLOBAL
// ============================================================
var PILLAR_CONFIG = {
  desc: { label: 'Descubrimiento', color: '#4A3F8A', bg: '#EDEAF8', stripe: '#4A3F8A' },
  com:  { label: 'Comunidad',      color: '#2E6B4F', bg: '#E4EFE9', stripe: '#2E6B4F' },
  cul:  { label: 'Cultura Baffé',  color: '#C85A2A', bg: '#F5E3D8', stripe: '#C85A2A' },
  det:  { label: 'Detrás de escena', color: '#9B3060', bg: '#F5E8EF', stripe: '#9B3060' }
};

var INITIAL_CONTENT = [
  {
    id: 'det_launch_ig',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Post de feed',
    title: 'Lanzamiento — historia del por qué',
    copy: `Baffé está vivo.\n\nEmpezamos como todos: sentados en un bar que nos gustaba mucho y pensando "¿por qué es tan difícil encontrar lugares así?"\n\nNo el bar más instagrameable. No el más nuevo. El que tiene la luz justa, la música que no compite con la charla, el café que vale lo que cuesta.\n\nBaffé es el lugar donde vas a encontrar eso — y donde podés contarle al resto cuando lo encontrás vos.\n\nHoy está en sus primeros días. Y eso significa que lo que construyamos estos meses va a definir qué es.\n\nBajate la app. Buscá tu bar favorito. Si no está, agregalo.\n\n🔗 en bio.`,
    note: 'Nota visual: foto tuya o del equipo en un bar, no una pantalla de la app. La app viene después — primero la persona.'
  },
  {
    id: 'det_launch_tt',
    pilar: 'det',
    channel: 'TikTok',
    format: 'Video 30–45 seg',
    title: 'Lanzamiento — guión a cámara',
    copy: `Guión hablado a cámara (en un bar):\n\n"Construí una app. No porque sea desarrollador — sino porque cada vez que quería encontrar un buen bar, terminaba preguntándole a alguien de confianza.\n\nGoogle te da el más reseñado. Instagram te da el más fotografiado. Pero ninguno te dice si la música está muy alta, si podés ir a charlar, si el café es bueno de verdad.\n\nAsí que armé Baffé. Una app donde la gente que sabe de bares, recomienda bares.\n\nEstá recién saliendo. Si te importa este tema tanto como a mí, bajatela."`,
    note: 'Filmado en el bar, no en un estudio. Sin edición pesada. La autenticidad es el formato.'
  },
  {
    id: 'det_venues_ig',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Story con link',
    title: 'Atracción de locales',
    copy: `¿Tenés un bar o café?\n\nEstamos sumando los primeros locales a Baffé — una app de descubrimiento donde la gente busca lugares para cada momento.\n\nNo te pedimos nada por ahora. Solo queremos conocer tu local y darte visibilidad frente a las personas que buscan exactamente lo que ofrecés.\n\nLos primeros locales en sumarse tienen acceso gratis por tiempo indefinido a todo lo que vamos a lanzar.\n\nEscribinos por DM o dejá tu mail acá 👇`,
    note: 'El "gratis por tiempo indefinido" es el gancho real para etapa early. Nombralo explícito, no lo dejes implícito.'
  },
  {
    id: 'det_venues_tt',
    pilar: 'det',
    channel: 'TikTok',
    format: 'Video corto 20 seg',
    title: 'Atracción de locales — guión',
    copy: `Guión:\n\n"Si tenés un bar o café y querés que gente nueva te encuentre — esto es para vos.\n\nBaffé es una app donde la gente busca lugares para tomar algo, trabajar, salir. Estamos sumando los primeros locales ahora.\n\nLos que entran primero, entran gratis. Para siempre.\n\nLink en bio."`,
    note: 'Filmado caminando por un bar vacío de día, o mostrando la app buscando un tipo de local. Directo al punto.'
  },
  {
    id: 'det_recap_ig',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'Recap del primer mes — build in public',
    copy: `Slide 1: "El primer mes de Baffé en números"\n\nSlide 2:\n[X] usuarios registrados\n[X] locales guardados\n[X] reseñas escritas\n[X] locales nuevos sugeridos por la comunidad\n\nSlide 3:\n"Lo que más nos sorprendió: [insight real]"\n\nSlide 4:\n"Lo que viene: [1 feature próximo]\nSi querés influir en cómo lo hacemos, escribinos."\n\nSlide 5:\n"Gracias a los que empezaron con nosotros.\nLos que entran ahora todavía son los primeros."`,
    note: 'Aunque los números sean chicos, publicarlos genera credibilidad. Una app con 87 usuarios que muestra sus métricas transmite más confianza que una que no dice nada.'
  },
  {
    id: 'det_app_notif',
    pilar: 'det',
    channel: 'En la app',
    format: 'Notificación / banner',
    title: 'Hitos dentro de la app',
    copy: `Opción A — al llegar al usuario 100:\n"Ya somos 100 en Baffé. Gracias por estar desde el principio — esto lo construimos juntos."\n\nOpción B — al sumar el primer local confirmado:\n"Primer local oficial en Baffé: [Nombre del local]. Buscalos, guardalo, dejales una reseña."\n\nOpción C — pedido de feedback:\n"Llevás [X días] usando Baffé. ¿Qué es lo que más usás? ¿Qué te falta?\n[Botón: Contanos]"`,
    note: 'Los mensajes dentro de la app son los más poderosos para sentido de comunidad. El usuario ya está adentro — solo necesita sentir que importa.'
  },
  {
    id: 'det_feedback_ig',
    pilar: 'det',
    channel: 'Instagram',
    format: 'Story encuesta',
    title: 'Pedidos de feedback — 3 opciones',
    copy: `Opción A:\n"Estamos decidiendo qué construir primero.\n¿Qué te importa más en Baffé?\n→ Mejores filtros de búsqueda\n→ Ver qué guardaron tus amigos"\n\nOpción B:\n"¿Cómo encontrás bares nuevos hoy?\n→ Me lo recomienda alguien\n→ Instagram / TikTok\n→ Google Maps\n→ No encuentro, siempre voy a los mismos"\n\nOpción C (para locales):\n"Si tuvieras un bar, ¿qué te importaría saber de tus clientes?\n→ Cuántos me buscaron en la app\n→ Qué dijeron en las reseñas\n→ En qué momento del día me visitan"`,
    note: 'La opción C hace dos cosas: involucra a usuarios normales Y le muestra a locales que Baffé piensa en sus necesidades.'
  },
  {
    id: 'desc_workplaces',
    pilar: 'desc',
    channel: 'Instagram',
    format: 'Carrusel',
    title: '3 cafés para trabajar',
    copy: `"3 cafés para trabajar en [ciudad]"\n\nCarrusel con:\n— Foto del lugar\n— Nombre + barrio\n— Por qué funciona para trabajar (wifi, ruido, mesas)\n— Captura de cómo se ve en la app Baffé\n\nÚltimo slide: "Encontralos y muchos más en Baffé — link en bio"`,
    note: 'Siempre terminar mostrando la app. El carrusel es el gancho, la app es el destino.'
  },
  {
    id: 'desc_pov_tt',
    pilar: 'desc',
    channel: 'TikTok',
    format: 'Reel POV',
    title: 'POV: buscás bar para el viernes',
    copy: `Formato POV con pantalla del celular:\n\n"POV: son las 6pm del viernes y todavía no saben a dónde van"\n\n[Mostrar la app: abrir Baffé, filtrar por zona + vibe + horario]\n[Encontrar 3 opciones, guardar una]\n\nTexto final: "ya no hay excusa para el 'no sé a dónde ir'"`,
    note: 'Lo más importante: mostrar el flujo real de búsqueda en la app. Que se vea simple y rápido.'
  },
  {
    id: 'com_survey',
    pilar: 'com',
    channel: 'TikTok',
    format: 'Encuesta + demo',
    title: '¿Bar con música o sin?',
    copy: `"¿Bar con música o sin música de fondo?\n\n[mostrar cómo filtrar eso exactamente en Baffé]\n\nNosotros somos team sin música — ¿y vos?"\n\nTexto encuesta en TikTok:\n→ Con música\n→ Sin música`,
    note: 'El debate es el formato. La demo del filtro es el producto. Uno lleva al otro.'
  },
  {
    id: 'com_ugc',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Repost',
    title: 'Primer usuario que comparte',
    copy: `Cuando alguien comparta una reseña o recomendación de Baffé en sus redes:\n\nRepostearlo con texto:\n"Esto es exactamente para lo que construimos Baffé. Gracias [usuario] — ya está en el feed para que todos lo vean."\n\nSi nadie lo hace orgánicamente la primera semana: pedirlo directamente a alguien del equipo o círculo cercano.`,
    note: 'El primer UGC es un hito. Tratarlo como tal le manda la señal a otros usuarios de que compartir tiene visibilidad.'
  },
  {
    id: 'com_suggest',
    pilar: 'com',
    channel: 'Instagram',
    format: 'Story / post',
    title: 'Sugerí un local que falta',
    copy: `"¿Hay algún bar o café que amás y que no encontrás en Baffé?\n\nContanos cuál es — lo sumamos esta semana.\n\n(Y sí, cuando esté vas a ser el primero en saber.)"`,
    note: 'Este contenido hace dos cosas: involucra a usuarios y te da leads de locales para contactar.'
  },
  {
    id: 'cul_ranking',
    pilar: 'cul',
    channel: 'Instagram',
    format: 'Carrusel',
    title: 'El mejor café con leche de la ciudad',
    copy: `"El mejor café con leche de [ciudad] — según nosotros.\n\n[Ranking de 5 lugares con foto, nombre, barrio, descripción de una línea]\n\nDiscutible. Intencional. ¿Con cuál no estás de acuerdo?"\n\nLast slide: "Todos están en Baffé. Guardá los que te gusten."`,
    note: 'Los rankings propios posicionan a Baffé como voz de autoridad. Tienen que ser con criterio real, no neutros.'
  },
  {
    id: 'cul_trending',
    pilar: 'cul',
    channel: 'En la app',
    format: 'Lista curada',
    title: 'Los más guardados de la semana',
    copy: `Lista curada semanal dentro de la app:\n\n"Los 5 locales más guardados esta semana"\n\n— Nombre del local\n— Barrio\n— Por qué está en tendencia (si hay contexto)\n\nActualizarla cada lunes.`,
    note: 'Este es el contenido que hace que abrir la app tenga novedad constante. Es el equivalente al "trending" de cualquier plataforma.'
  }
];

var CALENDAR_DATA = [
  {
    week: 'S1',
    cells: [
      { pilar: 'desc', title: '"3 cafés para trabajar" — carrusel con capturas de la app', channel: 'Instagram' },
      { pilar: 'desc', title: 'POV: buscás bar para el viernes. Flujo de búsqueda en la app', channel: 'TikTok' },
      { pilar: 'com', title: 'Primer post en el feed: "¿Cuál es tu bar favorito? Buscalo acá"', channel: 'En la app' },
      { pilar: 'det', title: 'Stories: "Baffé está en vivo — esto es lo que podés hacer hoy"', channel: 'Instagram' }
    ]
  },
  {
    week: 'S2',
    cells: [
      { pilar: 'cul', title: '"El mejor café con leche de [ciudad] según nosotros" — ranking propio', channel: 'Instagram' },
      { pilar: 'com', title: '"¿Bar con música o sin?" — encuesta + demo del filtro en la app', channel: 'TikTok' },
      { pilar: 'com', title: 'Push: "Sé el primero en reseñar este local"', channel: 'En la app' },
      { pilar: 'det', title: '"¿Tenés un bar o café? Queremos conocerlo" — imán para locales', channel: 'Instagram' }
    ]
  },
  {
    week: 'S3',
    cells: [
      { pilar: 'com', title: 'Repost del primer usuario que comparte una reseña o recomendación', channel: 'Instagram' },
      { pilar: 'desc', title: '"Bares para cada mood" — video mostrando cómo Baffé los organiza', channel: 'TikTok' },
      { pilar: 'cul', title: 'Lista curada: "los 5 locales más guardados esta semana"', channel: 'En la app' },
      { pilar: 'com', title: 'Pedido abierto: "Sugerinos un local que todavía no está en la app"', channel: 'Instagram' }
    ]
  },
  {
    week: 'S4',
    cells: [
      { pilar: 'cul', title: '"Lo más buscado del mes en Baffé" — primer dato real de la comunidad', channel: 'Instagram' },
      { pilar: 'det', title: 'Mini recap del mes: usuarios, reseñas, locales. Build in public.', channel: 'TikTok' },
      { pilar: 'com', title: 'Notificación: "Gracias por el primer mes — esto construyeron juntos"', channel: 'En la app' },
      { pilar: 'desc', title: 'Collab o mención con alguien del nicho local para amplificar', channel: 'Instagram' }
    ]
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
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  commentType: 'comment',
  unsubComments: null,
  modalSnapshot: null
};
