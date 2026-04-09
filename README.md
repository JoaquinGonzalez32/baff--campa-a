# Baffé — Hub de campaña (colaborativo)

Page única para que el equipo de Baffé planifique el contenido de la campaña: editar copys, crear nuevas ideas, comentar, asignar al calendario, subir referencias visuales. Todos los cambios se sincronizan en tiempo real vía Firebase.

## Setup (5 min)

1. **Crear proyecto Firebase**
   - Ir a https://console.firebase.google.com → "Agregar proyecto" (ej. `baffe-campana`)
   - Saltar Google Analytics (no hace falta)

2. **Habilitar Firestore**
   - En el menú: Build → Firestore Database → Crear base de datos
   - Modo: **test mode** (lectura/escritura abiertas por 30 días — suficiente para arrancar)
   - Región: la más cercana (ej. `southamerica-east1`)

3. **Habilitar Storage**
   - Build → Storage → Empezar
   - Modo test, misma región

4. **Obtener credenciales**
   - Project settings (engranaje) → General → bajar hasta "Tus apps"
   - Click en `</>` (web) → registrá la app con cualquier nombre
   - Te muestra un snippet `const firebaseConfig = { ... }` — copialo

5. **Pegar config**
   - Abrir `firebase-config.js` y reemplazar los `PEGAR_AQUI` con los valores reales

6. **Reglas (importante)**
   Mientras esté en modo test, Firestore y Storage aceptan cualquier escritura. Es OK para un equipo chico cuya URL no es pública. Para cerrarlo después:
   - Firestore Rules → permitir solo desde dominios específicos, o exigir Auth.
   - Storage Rules → idem.

7. **Abrir la page**
   - Doble click en `index.html` (o servirla con `python -m http.server` si querés URL real)
   - La primera vez te pide tu nombre
   - La primera carga siembra automáticamente las 15 piezas iniciales en Firestore

## Cómo lo usa el equipo

- **Editar**: click en "Ver y editar" en cualquier card → cambiar lo que quieras → "Guardar cambios". Aparece quién editó y cuándo.
- **Crear**: botón "+ Nueva idea" en la esquina superior derecha de la sección Ideas.
- **Comentar**: click en "Comentar" en la card → escribir comentario o sugerencia → "Publicar". Cada comentario muestra autor.
- **Calendario**: dentro del modal de cada pieza, sección "Asignar al calendario" → elegir semana + canal. La pieza aparece en la vista Calendario. También se puede asignar directo desde una celda vacía del calendario.
- **Estado**: cada pieza tiene `idea / aprobado / publicado`. Filtrable.
- **Archivar**: botón al fondo del modal. Las archivadas se ocultan del grid pero se pueden ver con el toggle.
- **Referencias visuales**: subir imágenes o videos de inspiración por pieza desde la sección "Referencias".

## Compartir con el equipo

Hosting más simple para que todos accedan desde su computadora:

- **Firebase Hosting** (mismo proyecto):
  ```
  npm install -g firebase-tools
  firebase login
  firebase init hosting   # public dir = .
  firebase deploy
  ```
- **Netlify Drop**: arrastrar la carpeta a https://app.netlify.com/drop
- **GitHub Pages**: subir a un repo y activar Pages

## Notas

- Todo el código vive en un solo `index.html` (~1500 líneas) + `firebase-config.js`. Sin build step.
- Firebase compat SDK se carga vía CDN.
- Identidad por nombre (sin contraseña) — el equipo confía entre sí.
- El listener `subscribePieces` mantiene todo sincronizado en <1s entre devices.
- Conflictos: estrategia last-write-wins. Si dos personas editan la misma pieza al mismo tiempo, gana quien guarda último (los demás verán el cambio en su próximo refresh del listener).
