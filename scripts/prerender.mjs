// editorial-ui + seo-web · Cristian Pérez · cristianperez.me
// Writes the prerendered page plus robots.txt, sitemap.xml, llms.txt and 404.html.
import { readFileSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// One constant for the domain (canonical, OG, schema, sitemap, robots, llms.txt).
// Set SITE_URL when building, or let Vercel provide its production domain.
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://sammypartyboom.example"
).replace(/\/$/, "");
if (SITE.endsWith(".example")) {
  console.warn(
    "\n\x1b[33m⚠ prerender: sin dominio real (" + SITE + "). Canonical, sitemap y datos para Google\n" +
      "  apuntan a un dominio de relleno. Usa SITE_URL=https://tu-dominio.com npm run build,\n" +
      "  o publica en Vercel, que lo pone solo.\x1b[0m\n"
  );
}
// Date of the last content change (prices, services, texts), not the build date.
const LASTMOD = "2026-10-01";

const dist = resolve("dist");
const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const appHtml = render();

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EntertainmentBusiness",
      "@id": `${SITE}/#business`,
      name: "Sammy Partyboom",
      description:
        "Animación y recreación de fiestas infantiles en Bucaramanga y su área metropolitana: animador con micrófono y parlante, juegos, pintucaritas y globoflexia.",
      url: `${SITE}/`,
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo-sammy.png`, width: 400, height: 400 },
      image: `${SITE}/og-image.jpg`,
      // WhatsApp only (no calls), so no bare telephone that search would turn into a "Call" button.
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "reservations",
        url: "https://wa.me/573170629434",
        availableLanguage: "es",
        description: "Solo WhatsApp (mensajes), +57 317 062 9434",
      },
      priceRange: "Desde $200.000 COP",
      currenciesAccepted: "COP",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bucaramanga",
        addressRegion: "Santander",
        addressCountry: "CO",
      },
      areaServed: ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"].map((name) => ({ "@type": "City", name })),
      sameAs: ["https://www.instagram.com/sammypartyboom/"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Planes de animación para fiestas infantiles",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Animación + Sonido (3 horas)",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 200000, priceCurrency: "COP" },
            itemOffered: {
              "@type": "Service",
              name: "Animación de fiesta infantil con sonido",
              description: "1 animador con micrófono, parlante bluetooth, juegos, rifas, concursos, pintucaritas y globoflexia durante 3 horas.",
            },
          },
          { "@type": "Offer", name: "Animación sin sonido", itemOffered: { "@type": "Service", name: "Animación de fiesta infantil sin sonido" } },
          { "@type": "Offer", name: "Animación + Decoración", itemOffered: { "@type": "Service", name: "Animación y decoración con globos" } },
          { "@type": "Offer", name: "Paquete FULL", itemOffered: { "@type": "Service", name: "Animación, sonido y decoración temática" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Sammy Partyboom",
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: "Animación de fiestas infantiles en Bucaramanga | Sammy Partyboom",
      inLanguage: "es-CO",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#business` },
      dateModified: `${LASTMOD}T00:00:00-05:00`,
    },
    {
      "@type": "VideoObject",
      name: "Animadora de Sammy Partyboom dirigiendo un baile con niños",
      description: "Video real de una fiesta infantil animada por Sammy Partyboom en Bucaramanga.",
      thumbnailUrl: `${SITE}/media/hero-baile.jpg`,
      contentUrl: `${SITE}/media/hero-baile.mp4`,
      uploadDate: `${LASTMOD}T00:00:00-05:00`,
      duration: "PT7S",
    },
  ],
};

const head = `
    <link rel="canonical" href="${SITE}/" />
    <meta property="og:url" content="${SITE}/" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`;

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const page = template
  .replace("<!--seo-head-->", head)
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(resolve(dist, "index.html"), page);

// 404: same shell, no prerendered app, noindex
const notFound = template
  .replace(/<title>.*<\/title>/, "<title>Página no encontrada | Sammy Partyboom</title>")
  .replace("<!--seo-head-->", '\n    <meta name="robots" content="noindex" />')
  .replace(
    '<div id="root"></div>',
    `<main style="min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px;font-family:Figtree,system-ui,sans-serif;background:#FBF6EE;color:#22142B">
      <div><p style="font:800 64px/1 'Bricolage Grotesque',system-ui">¡Ups! Esta página no hizo BOOM</p>
      <p style="margin:16px 0 28px;font-size:18px">La dirección no existe. Vuelve al inicio para ver planes y videos.</p>
      <a href="/" style="display:inline-block;padding:14px 26px;border-radius:999px;background:#E63956;color:#fff;font-weight:700;text-decoration:none;border:3px solid #22142B">Volver al inicio</a></div>
    </main>`
  )
  .replace(/<script type="module"[^>]*><\/script>/, "");
writeFileSync(resolve(dist, "404.html"), notFound);

// /privacidad: data policy (Ley 1581 de 2012, Decreto 1074 de 2015), same shell and type as the site.
// Fields in [corchetes] are the owner's to fill before launch; nothing here is invented.
const POLICY_DATE = "23 de noviembre de 2026";
const h2 = "font:800 24px/1.15 'Bricolage Grotesque',system-ui;letter-spacing:-.02em;margin:40px 0 10px";
const p = "margin:0 0 12px";
const todo = "background:#FFC93C;padding:0 4px;border-radius:4px";
const privacy = template
  .replace(/<title>.*<\/title>/, "<title>Política de tratamiento de datos | Sammy Partyboom</title>")
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Cómo Sammy Partyboom usa los datos que nos envías por WhatsApp para cotizar una fiesta, y cómo ejercer tus derechos." />')
  .replace("<!--seo-head-->", `\n    <link rel="canonical" href="${SITE}/privacidad" />`)
  .replace(
    '<div id="root"></div>',
    `<main style="min-height:100vh;background:#FBF6EE;color:#22142B;font:400 17px/1.65 Figtree,system-ui,sans-serif;padding:32px 20px 80px">
      <article style="max-width:680px;margin:0 auto">
        <a href="/" style="display:inline-flex;align-items:center;min-height:44px;color:#D42F4B;font-weight:600;text-decoration:underline;text-underline-offset:4px">← Volver a Sammy Partyboom</a>
        <h1 style="font:800 clamp(34px,7vw,52px)/1.06 'Bricolage Grotesque',system-ui;letter-spacing:-.035em;margin:24px 0 8px;text-wrap:balance">Política de tratamiento de datos personales</h1>
        <p style="${p};color:#4A3A55">Vigente desde el ${POLICY_DATE}. Versión 1.</p>

        <h2 style="${h2}">Quién es el responsable</h2>
        <p style="${p}">Sammy Partyboom, animación y recreación de fiestas infantiles en Bucaramanga y su área metropolitana. <span style="${todo}">[Nombre o razón social, C.C. o NIT]</span>. Contacto: WhatsApp +57 317 062 9434 (solo mensajes) y <span style="${todo}">[correo]</span>.</p>

        <h2 style="${h2}">Qué datos recibimos y para qué</h2>
        <p style="${p}">Este sitio no guarda datos ni los envía a ningún servidor. El cotizador solo arma un mensaje que tú decides enviar desde tu WhatsApp. Si lo envías, recibimos tu número, tu nombre si aparece en WhatsApp y lo que escribas: plan, fecha, municipio, número de niños y, si quieres, el nombre y la edad del cumpleañero.</p>
        <p style="${p}">Usamos esos datos para responder la cotización, confirmar disponibilidad y coordinar la fiesta. No los vendemos ni los usamos para publicidad sin tu permiso.</p>

        <h2 style="${h2}">Datos de niños y niñas</h2>
        <p style="${p}">El nombre y la edad del cumpleañero son opcionales y los entrega su madre, padre o acudiente. Los usamos solo para preparar la fiesta (por ejemplo, para nombrarlo en el cumpleaños). No pedimos datos sensibles; si hace falta saber de una alergia o condición de salud por la seguridad del niño, te lo preguntamos por chat privado.</p>
        <p style="${p}">Las fotos y videos de fiestas que publicamos se usan con autorización de los adultos responsables. Si apareces tú o tu hijo y quieres que lo quitemos, escríbenos y lo retiramos.</p>

        <h2 style="${h2}">Con quién se comparten</h2>
        <p style="${p}">Con nadie más que los servicios necesarios para atenderte: WhatsApp (Meta Platforms), por donde nos escribes, y el servicio que aloja este sitio. Algunos de ellos guardan información fuera de Colombia.</p>

        <h2 style="${h2}">Tus derechos</h2>
        <p style="${p}">Puedes conocer, actualizar, rectificar y pedir que borremos tus datos, revocar la autorización, pedir prueba de ella, saber cómo los usamos y presentar quejas ante la Superintendencia de Industria y Comercio (Ley 1581 de 2012, artículo 8).</p>
        <p style="${p}">Para ejercerlos escríbenos al WhatsApp +57 317 062 9434 o a <span style="${todo}">[correo]</span>. Respondemos consultas en máximo 10 días hábiles y reclamos en máximo 15 días hábiles.</p>

        <h2 style="${h2}">Cuánto tiempo los guardamos</h2>
        <p style="${p}">Mientras haga falta para cotizar, hacer la fiesta y cumplir obligaciones legales. <span style="${todo}">[Plazo, por ejemplo 12 meses después del evento]</span>.</p>

        <h2 style="${h2}">Cookies y rastreo</h2>
        <p style="${p}">Este sitio no usa cookies de rastreo, píxeles publicitarios ni herramientas de analítica.</p>

        <h2 style="${h2}">Cambios</h2>
        <p style="${p}">Si cambiamos esta política, publicamos la nueva versión en esta página con su fecha.</p>
      </article>
    </main>`
  )
  .replace(/<script type="module"[^>]*><\/script>/, "");
mkdirSync(resolve(dist, "privacidad"), { recursive: true });
writeFileSync(resolve(dist, "privacidad", "index.html"), privacy);

writeFileSync(
  resolve(dist, "robots.txt"),
  `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${LASTMOD}</lastmod></url>
  <url><loc>${SITE}/privacidad</loc><lastmod>2026-11-23</lastmod></url>
</urlset>
`
);

writeFileSync(
  resolve(dist, "llms.txt"),
  `# Sammy Partyboom

> Animación y recreación de fiestas infantiles en Bucaramanga, Floridablanca, Girón y Piedecuesta (Santander, Colombia).

- Plan más pedido: Animación + Sonido, 3 horas, desde $200.000 COP. Incluye 1 animador con micrófono, parlante bluetooth, juegos, rifas, concursos, pintucaritas y globoflexia.
- Otros planes (a cotizar): Animación sin sonido, Animación + Decoración con globos, Paquete FULL.
- No incluye: los premios y sorpresas para los concursos los pone el cliente.
- Reservas: con 1 a 2 semanas de anticipación, solo por WhatsApp (mensajes, no llamadas) al +57 317 062 9434: https://wa.me/573170629434
- Instagram: https://www.instagram.com/sammypartyboom/

## Página
- [Inicio](${SITE}/): planes y precios, videos reales, programa de la fiesta, cotizador por WhatsApp y preguntas frecuentes.
`
);

rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerender: ok (${SITE})`);
