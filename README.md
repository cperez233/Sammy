# Sammy Partyboom · landing para celular

<!-- editorial-ui · (c) 2026 Cristian Pérez · https://cristianperez.me · MIT -->

Página de Sammy Partyboom, que anima fiestas infantiles en Bucaramanga, Floridablanca, Girón y Piedecuesta (Santander, Colombia). Se hizo con la skill editorial-ui.

## 1. Para quién es

Casi todos los clientes llegan desde Instagram ([@sammypartyboom](https://www.instagram.com/sammypartyboom/)) y desde el celular. Antes de escribir quieren ver tres cosas: cómo se ve una fiesta de verdad, cuánto cuesta y qué incluye cada plan, y cómo apartar la fecha. Las reservas se hacen solo por WhatsApp (mensajes, no llamadas) al 317 062 9434.

## 2. Dirección de arte

El mundo es el de una fiesta infantil en un salón comunal o una casa de Bucaramanga: globos, confeti, rondas, papás aplaudiendo. El motivo es el estallido de cómic del logo (el "BOOM"), que aparece en el hero, en el camino del programa, en las preguntas, en el sello de precios y en el footer.

Colores (definidos en `tailwind.config.js`):

- Fondo crema `#FBF6EE`.
- Tinta berenjena `#22142B`, con buen contraste para leer en pantalla.
- Acento magenta `#E63956`, tomado del "BOOM" del logo, con amarillo `#FFC93C`, uva `#7B3FC4` y celeste `#5EC8F2` en detalles.

Letras: Bricolage Grotesque para títulos (redondeada y alegre, sin verse como fuente infantil) y Figtree para el texto, legible desde 16 px. Las dos se sirven desde `public/fonts/`.

Navegación: cabecera con logo y enlaces por sección en escritorio, y en el celular un dock abajo (Videos, Planes, Cotizar, FAQ y WhatsApp) que aparece después del hero.

El estallido hace algo distinto en cada lugar: viaja en la punta de la serpentina de progreso, aterriza con rayos cuando el indicador de la navegación o del dock cambia de sección, revienta como globo en el hero, explota en el manifiesto, recorre el programa de la fiesta y gira en las preguntas. Los botones de WhatsApp lanzan confeti al tocarlos.

## 3. Secciones

1. Hero: "Menos fiestas aburridas, más momentos que hacen BOOM." con las palabras subiendo una a una, un video real en un marco con capas, la tarjeta de precio ($200.000 por 3 horas) encima y un globo que revienta con confeti al tocarlo.
2. Dos cintas en movimiento (36 px/s): servicios en una dirección y municipios en la otra.
3. Manifiesto con scroll: "Fiestas aburridas" se tacha, la página se pone de noche y aparece "Hacemos BOOM".
4. Videos: fiestas reales en polaroids (siete en escritorio, cinco en el celular; el visor recorre las siete) y una tarjeta hacia Instagram.
5. Programa de las 3 horas en seis pasos, con un camino punteado que se dibuja al bajar.
6. Planes y precios: selector de planes, boleta con el precio, adicionales y un "¿Otra cosa? Cuéntanos".
7. Cotizador: plan, fecha, municipio, número de niños y cumpleañero, con el mensaje de WhatsApp a la vista antes de enviarlo.
8. Preguntas frecuentes y footer con "¿Hacemos BOOM en tu fiesta?".

Los videos están en `public/media/` (MP4 y WebM de respaldo, unos 7 MB en total) y cargan solo cuando se acercan a la pantalla.

## 4. Calidad y accesibilidad

- Sin scroll horizontal en ningún ancho (`overflow-x: clip` en la raíz).
- Texto de lectura a 16 px o más; etiquetas y notas a 13 px como mínimo.
- Botones y enlaces con área táctil de al menos 44 × 44 px.
- Con `prefers-reduced-motion` activo, `<MotionConfig reducedMotion="user">` quita el movimiento, el manifiesto se muestra en su cuadro final y los bucles de CSS se detienen.
- Los bucles se pausan cuando su sección sale de la pantalla (`IntersectionObserver`).
- Los efectos de hover solo se activan con mouse o trackpad (`hoverOnlyWhenSupported`), así un toque en el celular no deja estados pegados.
- Cada efecto de hover tiene su versión táctil en el celular: el barrido de luz de los botones y el de los adicionales se activan al aparecer en pantalla.

## 5. Antes de publicar

- **Dominio.** El build toma el dominio de `SITE_URL` o, en Vercel, de `VERCEL_PROJECT_PRODUCTION_URL`. Si no encuentra ninguno usa `sammypartyboom.example` y lo avisa en amarillo en la terminal.
- **Testimonios.** Van en `src/data/testimonials.ts`, copiados tal cual de mensajes reales. Solo aparecen los que tengan `approved: true`, y la sección no se muestra mientras no haya ninguno.
- **Cabeceras de seguridad.** Están en `vercel.json`. La CSP permite el script de respaldo de `index.html` por su hash; si se cambia ese script, hay que recalcular el hash.

## 6. Cómo correrlo

Requisitos: Node.js 18 o más reciente (20 o 22 recomendados) y npm 9 o más.

```bash
npm install
npm run dev
```

Abre la URL local que aparece en la terminal (normalmente `http://localhost:5173`).

Para producción:

```bash
SITE_URL=https://tu-dominio.com npm run build
```

Esto genera `dist/` con la página prerenderizada (el contenido va en el HTML para que lo lean Google y los buscadores con IA), además de `robots.txt`, `sitemap.xml`, `llms.txt` y `404.html`. Sin `SITE_URL` se usa el dominio de relleno `sammypartyboom.example`, que hay que cambiar antes de publicar; en Vercel se toma de `VERCEL_PROJECT_PRODUCTION_URL`.

Para revisar la versión compilada:

```bash
npm run preview
```

Queda en `http://localhost:4173`.
