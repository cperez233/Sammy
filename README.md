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

## 3. Estructura de Secciones y Contenido

1. **Header:** Identidad de marca, distinción de Bucaramanga y botón de contacto rápido.
2. **Hero:** Propuesta de valor clara, titular dinámico, globo interactivo, llamadas a la acción directas y tarjeta visual en capas con foto real del equipo.
3. **Paquetes y Precios:**
   - **Paquete Animación + Sonido ($200.000 COP · 3 Horas):** Paquete base de referencia en Bucaramanga con 1 animador, micrófono, parlante bluetooth, pintucaritas, globoflexia y todas las dinámicas.
   - **Condiciones honestas (Principio de qué NO incluye):** Se aclara explícitamente que el cliente debe disponer de los premios y sorpresas para las rifas.
   - **Otros paquetes:** Animación sin sonido, Animación + Decoración, y Paquete FULL.
   - **Servicios adicionales:** Animador disfrazado/temático, sorpresas personalizadas y camisetas para el evento.
   - **Oferta abierta:** Tarjeta con puerta a WhatsApp (*"¿Otra cosa? Cuéntanos"*).
4. **Galería (Trabajo Real):** Tarjetas en capas (*layered peer cards*) con capturas reales extraídas de las fotos y videos del negocio en Bucaramanga, preparadas con respaldo gráfico SVG en caso de ausencia de imágenes.
5. **Cotizador con Vista Previa de WhatsApp (Patrón 48):** Selector dinámico de plan, sector (Cabecera, Cañaveral, Girón, etc.), cantidad de niños y nombre, que renderiza en tiempo real la burbuja de chat exacta que se enviará al número `316 8674729`.
6. **Preguntas Frecuentes:** Acordeón accesible que conserva el contenido en el DOM y utiliza la estrella cómic del logo como glifo de control giratorio (*Patrón 53*).
7. **Footer:** Canales directos, datos de cobertura y firma del autor (**Cristian Pérez** · `editorial-ui`).

---

## 4. Calidad, Accesibilidad y Rendimiento

* **Medición móvil verificada:** 0 desbordamientos horizontales (`overflow-x: clip`), largo total en móviles de 9.9 pantallas (dentro del estándar para lectura ágil).
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
npm run build
```
Genera la carpeta optimizada `dist/`.

### Probar la Versión de Producción
```bash
npm run preview
```
Inicia el servidor local de vista previa en `http://localhost:4173`.
# Sammy
