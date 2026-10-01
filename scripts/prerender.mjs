// editorial-ui + seo-web · Cristian Pérez · cristianperez.me
// Writes the prerendered page plus robots.txt, sitemap.xml, llms.txt and 404.html.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// One constant for the domain (canonical, OG, schema, sitemap, robots, llms.txt).
// Set SITE_URL when building, or let Vercel provide its production domain.
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://sammypartyboom.example"
).replace(/\/$/, "");
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
