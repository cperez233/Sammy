# Sammy Partyboom · Landing Web Mobile-First

<!-- editorial-ui · (c) 2026 Cristian Pérez · https://cristianperez.me · MIT -->

Página web desarrollada con la skill **editorial-ui** para **Sammy Partyboom**, negocio de animación, recreación y eventos infantiles en Bucaramanga y su área metropolitana (Santander, Colombia).

---

## 1. Contexto del Proyecto

Sammy Partyboom opera principalmente en Instagram ([@sammypartyboom](https://www.instagram.com/sammypartyboom/)), donde sus clientes llegan en su inmensa mayoría desde dispositivos móviles buscando:
1. Conocer qué tipo de trabajo hacen (fotos y videos reales de eventos).
2. Ver paquetes y condiciones con claridad (sin letra pequeña ni precios ocultos).
3. Contactar y cotizar directamente por WhatsApp al número **316 8674729**.

---

## 2. Dirección de Arte y Decisiones de Diseño

Siguiendo la metodología de **editorial-ui** para evitar plantillas genéricas ("AI slop") o modas repetitivas:

* **Mundo:** Fiestas infantiles en salones comunales y casas de Bucaramanga; globos brillantes, serpentinas de papel crepé, rondas familiares, aplausos, algodón de azúcar y confeti festivo.
* **Paleta:**
  * Fondo: `#FAF7F2` (crema vainilla suave, cálido y festivo, evitando blancos hospitalarios y oscuros con neón).
  * Tinta: `#211526` (mora berenjena profundo con excelente contraste y legibilidad).
  * Acento: `#E63956` (magenta explosión "BOOM", tomado directamente de la onomatopeya del logo), acompañado de toques lavanda (`#E8DCF8`) y amarillo chispa (`#FFD166`).
* **Tipografías:**
  * Display: **Bricolage Grotesque** (peso bold/extrabold; geométrica, alegre y con trampas de tinta curvas que evocan globos y diversión sin caer en fuentes infantiles baratas).
  * Texto: **Figtree** (limpia, redondeada, con altura de x generosa y excelente legibilidad en pantallas móviles a partir de 16px).
* **Navegación:** **Bottom dock móvil** flotante tras el primer scroll (con accesos directos a Planes, Galería, Cotizador y botón primario de WhatsApp) + cabecera superior compacta con el logo y el indicador de Bucaramanga.
* **Hero:** Titular seleccionado (**Opción 1: *"Menos fiestas aburridas, más momentos que hacen BOOM."***) con revelación palabra por palabra, más el motivo interactivo del **Globo "Boom"** (**Opción A**) que reacciona al toque con física de resorte y confeti festivo (`canvas-confetti`).

---

## 3. Estructura de Secciones y Contenido (rediseño)

1. **Header:** logo circular limpio (recortado de la captura original), enlaces por sección con indicador activo en escritorio y botón directo a WhatsApp.
2. **Hero:** titular *"Menos fiestas aburridas, más momentos que hacen BOOM."* con revelación por palabra, video real de una fiesta en un marco con capas, tarjeta de precio ($200.000 · 3 horas) superpuesta y el globo "Boom" interactivo.
3. **Franja animada:** servicios en movimiento (38 px/s) con el estallido de cómic del logo como separador.
4. **Fiestas reales:** carrusel de 6 clips de video reales (silenciados, en bucle, solo se reproducen cuando están en pantalla) + foto de personajes + puerta a Instagram.
5. **Cómo son las 3 horas:** programa de la fiesta en 6 pasos con un camino punteado que se dibuja con el scroll.
6. **Planes y precios:** selector de planes + tarjeta tipo boleta con el precio; adicionales en lista y puerta abierta "¿Otra cosa? Cuéntanos".
7. **Cotizador:** formulario (plan, fecha, municipio, niños, cumpleañero) con vista previa en un celular con WhatsApp.
8. **Preguntas frecuentes** y **footer** con cierre "¿Hacemos BOOM en tu fiesta?".

Recursos: los clips están en `public/media/` (MP4 + WebM de respaldo, ~7 MB en total, carga diferida), las fuentes Bricolage Grotesque y Figtree se sirven desde `public/fonts/`.

## 4. Calidad, Accesibilidad y Rendimiento

* **Medición móvil verificada:** 0 desbordamientos horizontales (`overflow-x: clip`), largo total en móviles de 10.6 pantallas (dentro del estándar para lectura ágil).
* **Tamaños mínimos de texto:** Etiquetas y notas a partir de 13px / 13.5px; cuerpo de texto a 16px.
* **Blancos táctiles seguros:** Todos los enlaces, botones y pestañas cumplen con un área mínima táctil de 44x44px.
* **Reducción de movimiento (`prefers-reduced-motion`):** Integrado a nivel global mediante `<MotionConfig reducedMotion="user">` y reglas CSS que pausan bucles si el usuario tiene activada la preferencia de accesibilidad.
* **Optimización de bucles fuera de pantalla (Regla 16):** `IntersectionObserver` activo para pausar animaciones infinitas cuando no son visibles en el viewport.

---

## 5. Instrucciones para Correr el Proyecto

### Requisitos
* Node.js 18+ (recomendado Node 20 o 22)
* npm 9+

### Instalación
```bash
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL local indicada (usualmente `http://localhost:5173`).

### Compilar para Producción
```bash
SITE_URL=https://tu-dominio.com npm run build
```
Genera `dist/` con la página prerenderizada (el contenido va en el HTML para Google y buscadores con IA), `robots.txt`, `sitemap.xml`, `llms.txt` y `404.html`. Sin `SITE_URL` usa un dominio de relleno (`sammypartyboom.example`) que hay que cambiar antes de publicar; en Vercel se toma solo de `VERCEL_PROJECT_PRODUCTION_URL`.

### Probar la Versión de Producción
```bash
npm run preview
```
Inicia el servidor local de vista previa en `http://localhost:4173`.
# Sammy
