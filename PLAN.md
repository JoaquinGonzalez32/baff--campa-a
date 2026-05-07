# Plan de Marketing Baffé — 10 semanas (2 producto + 6–8 marketing)

## Context

Baffé es una app/web de descubrimiento de cafés y bares en Montevideo (React + Supabase + Mapbox), con foco en aportes de la comunidad. Hoy hay base chica en IG (100–500), descargas iniciales sin tracción, **silencio de 2 semanas en redes**, y se quiere en ~2 meses:

1. **3.000–4.000 seguidores reales** en Instagram (objetivo revisado a la baja, ver más abajo).
2. Aumentar descargas en App Store / Play Store.
3. Instalar la identidad de marca: "la guía hecha por los que salen en MVD".
4. Activar a usuarios para que aporten locales, filtros, posts y reviews.

Restricciones: solo MVD, presupuesto bajo (USD 100–500), equipo chico con capacidad de producir video, pocos contactos previos en la escena gastronómica.

## Decisión central: estrategia de curadores verificados

Reemplaza al enfoque puramente nichado. La idea: **influencers chicos/medianos de MVD entran a la app como "curadores verificados"**, postean recomendaciones desde adentro, y sus comunidades los siguen *dentro* de Baffé. Esto:

- Trae comunidad cálida ya formada (no follower frío).
- Genera interacción real en muroSocial.
- Refuerza el diferencial "comunidad/aportes" sin que la app deje de ser útil para descubrir lugares.
- Convierte a cada curador en un canal de adquisición que se autoamplifica.

Los nichos del plan original siguen vigentes pero ahora se mapean a curadores: cada curador "encarna" un nicho (café de especialidad, remote workers, bares/after office). Mismo producto, 3 puertas de entrada, vehículadas por personas con audiencia.

UGC fija (creator de la casa) **se difiere a mes 3**: tiene tensión con el diferencial de comunidad y el budget no banca algo serio. Decisión post-mes-2 con datos reales.

## Cambios de producto previos (sem 0–2)

Sin estos 3 cambios, empujar tráfico ahora pierde el efecto multiplicador de los curadores. Asumimos 1–2 semanas de trabajo de producto, y trabajo de marketing en paralelo durante esa ventana.

1. **Onboarding "seguí a estos curadores"** — al crear cuenta, mostrar 5–8 perfiles verificados con avatar + bio corta + botón seguir. Convierte cada usuario nuevo en follower automático del curador, que es el incentivo concreto que le ofrecemos al curador para sumarse.
2. **Sección "Curadores" prominente en muroSocial** — carousel en home o tab dedicado. Hoy "seguir usuarios está oculto" → el feed social muere por falta de input.
3. **Badge de verificado visible** en posts, reviews y feed. Es el incentivo de status que hace que un influencer quiera estar adentro.

Rol técnico nuevo: `verified_curator` separado de `verified_owner` en `profiles.role`.

## Trabajo en paralelo durante sem 0–2 (mientras se construye producto)

- **Reclutamiento de curadores** (cuello de botella real): identificar 8–12 candidatos, contactar, llamadas, cerrar 5–8 antes del lanzamiento. Esto solo ya consume 2 semanas. Si esto falla, el lanzamiento se posterga — no al revés.
- **Producción de contenido base**: grabar primer batch de 8–10 reels de "30 cafés en 30 días" en 1–2 días de salida. Tener stock listo para el día 1.
- **Identidad visual y plantillas**: paleta, tipografía de reels, plantillas de top 3 / mapa / curador del mes.
- **Bio, highlights, links con UTM**: todo armado para el día de lanzamiento.
- **Teaser pre-launch (sem 2)**: romper el silencio 4–5 días antes del hard launch con un post "se viene algo distinto". No revelar qué.

## Hard launch: el evento se fabrica, no se hereda

Las 2 semanas de silencio quemaron cualquier momento natural. Por eso el lanzamiento de curadores **es** el evento. Funciona a favor: el primer post post-silencio captura más atención del algoritmo si es grande, no si es un reel suelto.

Día del hard launch (inicio sem 3):
- Post fijado + reel de presentación de los curadores.
- Los 5–8 curadores postean el mismo día con hashtag común (`#BaffeMVD` o similar).
- 2 stories coordinadas a lo largo del día.
- USD 30–50 de Meta Ads ese día puntual sobre el reel principal.
- Cobertura: pedirle a 1–2 cuentas medianas no-curadoras (medios locales chicos, cuentas foodie) que mencionen.

## Posicionamiento y voz

- **Tagline operativo**: "La guía de cafés y bares de MVD hecha por los que salen."
- **Diferencial**: la comunidad construye la guía. Cada review, foto y aporte se ve y se reconoce.
- **Tono**: cercano, montevideano, humor seco. No corporativo, no influencer fake. Referencias locales (barrios, jergas).

## Funnel objetivo

```
IG content (curadores + Baffé) → bio link → landing con CTA "abrí en la app"
→ descarga → onboarding con follow → primer aporte
```

KPIs revisados:
- Followers IG: 100–500 → 1.500 (sem 5) → 3.000–4.000 (sem 10).
- Reach mensual: 200K (mes 1) → 400K (mes 2).
- Descargas: medir con UTM en bio + comparar semana a semana, baseline +X.
- Aportes/sem (locales nuevos + reviews + posts): ≥30 (sem 6) → ≥100 (sem 10).
- Curadores activos posteando ≥1 vez/sem: 5–8 sostenidos.

5K seguidores reales en este plazo y budget no es realista. Llegar a 3.500 con comunidad que aporta vale más que 5K vacíos por sorteos. Los 5K se cierran en mes 3.

## Cronograma alto nivel

### Sem 0–2: Producto + trabajo en paralelo
- Producto: implementar las 3 features (onboarding follow, sección curadores, badge).
- Marketing: reclutar curadores, producir batch de reels, identidad visual, teaser pre-launch.

### Sem 3: Hard launch + nicho café (curador #1 ancla)
- Lanzamiento coordinado de curadores.
- Arranca serie "30 cafés en 30 días" (1 reel/día).
- Highlights IG: "Cómo aportar", "Curadores", "Top cafés", "FAQ".

### Sem 4–5: Activación de comunidad + remote workers
- Campaña **"Sumá tu lugar"**: cada usuario que agregue un local entra en sorteo semanal (gift card de café, financiado por canje con un local aliado).
- Reels formato "lugares para laburar en MVD" (curador remote workers al frente).
- Meta Ads USD 5–10/día sobre reels que ya performaron orgánicamente. Nunca posts cold.
- Reposteo sistemático de reviews/fotos de usuarios en IG con crédito.

### Sem 6–7: Bares + UGC
- Curador after office al frente.
- **"Reseña destacada"**: las mejores reviews de la app se republican en IG con crédito.
- Concurso: "Mostranos tu bar/café favorito de MVD" — etiquetan a Baffé en stories.
- Subir ad spend a USD 10–15/día sobre los 2–3 reels con mejor performance.

### Sem 8–9: Empuje final + descargas
- "Semana de descargas": pinned post + bio + stories diarias con CTA explícito a la app.
- Cada feature de la app en un reel ("¿Sabías que podés filtrar por X?").
- 1 colab con un **influencer pesado** (no curador fijo, contratado para un push puntual).
- Evento físico opcional si entra el budget: "Baffé Crawl" — recorrida de 3 cafés/bares aliados un sábado, gratis para los primeros 30 que descarguen e inscriban en la app.

### Sem 10: Postmortem + decisión sobre UGC fija
- Qué nicho/curador convirtió mejor a descarga y a aporte.
- Decidir si contratar UGC fija para mes 3 o seguir con rotación de curadores.

## Curadores: criterios y oferta

**Criterios de selección** (curados, no masivos — empezar con 5–8):
- Audiencia entre 3K–30K, MVD, engagement real (no inflado).
- Vertical claro: café de especialidad, remote/coworking, bares/after office.
- Ya producen contenido relacionado con descubrir lugares.

**Qué reciben** (no plata, sino canje estructural):
- Badge verificado visible en la app.
- Aparición destacada en onboarding de cada usuario nuevo.
- Primer acceso a features.
- Co-branding en posts de Baffé.
- Stats privadas: "esta semana ganaste X seguidores en Baffé".
- Eventualmente: feature "curador del mes" con push extra.

**Qué les pedimos**:
- 1–2 posts/semana en su perfil de Baffé (reviews, recomendaciones).
- 1 mención cruzada/mes desde su IG personal hacia Baffé.
- Participación en el hard launch coordinado.

## Tácticas para activar aportes (objetivo #4)

1. Visibilidad del aporte: cada aporte (local, review, foto) se ve en feed con avatar y nombre. Si no se ve hoy, es prioridad de producto.
2. Reposteo sistemático: review larga o foto buena → repost en IG con crédito. El incentivo más barato y efectivo.
3. Gamificación liviana: highlight de IG "Top aportadores del mes". No hace falta sistema completo.
4. Sorteos atados a aportes reales, nunca a follow + tag.
5. CTA fijo al final de cada reel: "¿Conocés un lugar que falta? Sumalo en Baffé."

## Cadencia de contenido fija (sem 3 en adelante)

- **Reels**: 5–6 por semana en feed.
- **Stories**: ≥2 por día (reposts de curadores, encuestas, BTS, "lugar del día").
- **Posts estáticos**: 1–2 por semana (carruseles top 3, mapas, "lugar de la semana").
- **Reposteo de UGC**: ≥3 por semana en stories, ≥1 por semana al feed.
- **CTA fijo cierre de reel**: "¿Conocés un lugar que falta? Sumalo en Baffé."

## Resumen de gasto en ads (USD)

| Semana | Diario | Total semana |
|--------|--------|--------------|
| Sem 3 | 30–50 (solo lunes 1) | 30–50 |
| Sem 4 | 5–7 | 35–49 |
| Sem 5 | 7–10 | 49–70 |
| Sem 6 | 10–12 | 70–84 |
| Sem 7 | 12–15 | 84–105 |
| Sem 8 | 15 | 105 |
| Sem 9 | 15 | 105 |
| Sem 10 | 0 (cierre) | 0 |
| **Total** | — | **~480–570** |

Ajustar a la baja si el budget máximo es USD 500. Las primeras semanas son flexibles, sem 7–9 son las que más impacto tienen y conviene no tocar.

## Riesgos y mitigación

| Riesgo | Mitigación |
|--------|------------|
| Las 3 features de producto se atrasan más de 2 sem | Marketing en paralelo no se detiene; el lanzamiento se posterga, no se hace a medias |
| No conseguimos 5–8 curadores firmados antes del launch | Si en sem 2 hay menos de 4 cerrados, posponer launch 1 semana antes que arrancar débil |
| Curadores no postean después del launch | Contrato verbal claro de cadencia, check-in semanal, "curador del mes" como zanahoria |
| 3.000–4.000 seguidores se vuelve agresivo igual | Sem 6 checkpoint duro: si va < 1.500, redirigir todo el budget al curador/reel ganador |
| Followers vacíos por sorteos | No hacer follow+tag, solo sorteos atados a aportes reales |
| Quemar a los pocos aliados existentes | Empezar con 2–3, rotar, pedir poco (un repost), dar mucho |

## Verificación

- **Semanal**: planilla con followers, reach, link clicks, descargas (UTM), aportes nuevos (DB), curadores activos. Revisar viernes.
- **Sem 2**: ¿hay 5–8 curadores cerrados? ¿las 3 features están listas o cerca? Si no → posponer launch.
- **Sem 6 (mid-marketing)**: checkpoint duro. Si followers < 1.500 o aportes/sem < 20, pivot: cortar el nicho que peor performa, doblar en el mejor.
- **Sem 10**: postmortem. Decisión sobre UGC fija + escalar mejor nicho a mes 3.

## Archivos / próximos pasos de producto antes de marketing

Las 3 features que destraban el plan (referencia: `C:\dev\baffe\BAFFE\CLAUDE.md`):

- **Rol `verified_curator`**: agregar a `profiles.role` (hoy soporta `user`, `admin`, `verified_owner`). Migración + update de policies + UI de admin para asignar.
- **Onboarding con sugerencias de seguir**: pantalla post-signup en `src/pages/` con lista de curadores. Hook nuevo `useSuggestedCurators` que liste perfiles con `role = 'verified_curator'`.
- **Sección "Curadores" en muroSocial**: carousel/tab.
- **Badge visible**: componente reutilizable que se renderice en avatar/header de posts/reviews/perfil cuando `role = 'verified_curator'`.

Estimación de esfuerzo realista: 1.5–2 semanas si es prioridad única. Si se hace en paralelo con otras cosas, pueden ser 3.
