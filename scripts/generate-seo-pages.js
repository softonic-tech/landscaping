/**
 * Generates SEO-ready HTML shells for each public route.
 * React still mounts into #root; the initial markup is crawlable without JS.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://www.sunnystarlandscaping.com";
const ROOT = path.join(__dirname, "..");

const business = {
  name: "Sunny Star Landscaping LLC",
  shortName: "Sunny Star",
  email: "sunnystarlandscaping@gmail.com",
  phoneDisplay: "056 662 0246",
  phoneHref: "tel:+971566620246",
  phoneSecondaryDisplay: "050 150 8148",
  phoneSecondaryHref: "tel:+971501508148",
  whatsapp: "https://wa.me/971566620246",
  city: "Dubai, UAE",
  hours: "Mon to Sat, 8:00 AM to 6:00 PM",
  logo: `${SITE}/assets/Sunny%20Star%20Landscaping%20logo.png`,
  ogImage: `${SITE}/assets/portfolio-img-001.jpg`,
  contacts: [
    { name: "Riaz", phone: "056 662 0246", href: "tel:+971566620246" },
    { name: "Najeeb", phone: "050 150 8148", href: "tel:+971501508148" },
  ],
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/areas/", label: "Areas" },
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact" },
];

const services = [
  {
    title: "Landscape Design & Installation",
    text: "Garden layouts, planting and landscape improvements shaped around your outdoor space.",
  },
  {
    title: "Garden & Villa Maintenance",
    text: "Routine care to keep gardens tidy, healthy and welcoming.",
  },
  {
    title: "Lawn Care & Grass Cutting",
    text: "Lawn upkeep and grass-area refreshes for a clean, cared-for appearance.",
  },
  {
    title: "Irrigation Systems",
    text: "Irrigation installation and related support to help care for planted areas.",
  },
  {
    title: "Planter Beds & Decorative Finishes",
    text: "Planter-bed renovation with stone detailing and decorative wood mulch.",
  },
  {
    title: "Tree & Planting Services",
    text: "Tree replacement and new planting to refresh outdoor areas.",
  },
  {
    title: "Renovation & Makeover",
    text: "Refresh existing landscape areas with practical improvements and finishing touches.",
  },
  {
    title: "Indoor Planting",
    text: "Bring natural greenery into interior spaces with considered plant placement.",
  },
  {
    title: "Artificial Grass Work",
    text: "Artificial grass installation with careful base preparation and a neat, durable finish.",
  },
  {
    title: "Gravel Design Work",
    text: "Decorative gravel, pebble pathways and clean landscape borders for modern outdoor spaces.",
  },
];

const areas = [
  "Palm Jumeirah",
  "Emirates Hills",
  "Dubai Hills Estate",
  "Arabian Ranches",
  "Jumeirah Golf Estates",
  "Al Barari",
  "The Meadows",
  "The Springs",
  "Jumeirah Islands",
  "Umm Suqeim",
  "Damac Hills",
  "Mudon",
  "Mirdif",
  "Tilal Al Ghaf",
  "JVC",
  "MBR City",
];

const pages = [
  {
    id: "home",
    file: "index.html",
    path: "/",
    title: "Gardening & Landscaping Dubai | Sunny Star",
    description:
      "Explore gardening and landscaping services in Dubai with Sunny Star. Contact our team to discuss your garden and request a quote.",
    ogImage: `${SITE}/assets/portfolio-img-001.jpg`,
    breadcrumbs: [{ name: "Home", path: "/" }],
    h1: "Gardening and landscaping services in Dubai",
    lead:
      "Sunny Star Landscaping LLC helps homeowners and property managers care for outdoor spaces across Dubai. From garden maintenance and planting to irrigation, lawn care and landscape improvements, we focus on clear communication and practical finishing.",
    sections: [
      {
        h2: "What we offer",
        html: `<p>Our gardening services in Dubai include landscape design and installation, garden and villa maintenance, lawn care, irrigation systems, tree and planting work, artificial grass, gravel design, and garden renovations.</p><ul>${services
          .slice(0, 8)
          .map((s) => `<li><strong>${escapeHtml(s.title)}:</strong> ${escapeHtml(s.text)}</li>`)
          .join("")}</ul>`,
      },
      {
        h2: "Areas we serve",
        html: `<p>We provide landscaping and garden care across Dubai communities, including Palm Jumeirah, Emirates Hills, Dubai Hills Estate, Arabian Ranches, The Meadows, The Springs and nearby neighbourhoods.</p>`,
      },
      {
        h2: "Recent project photos",
        html: `<p>See irrigation, planting, lawn and garden finishing examples on our <a href="/projects/">projects page</a>.</p><p><img src="/assets/portfolio-img-001.jpg" width="800" height="533" alt="Landscaped garden project by Sunny Star Landscaping" loading="eager" fetchpriority="high" /></p>`,
      },
      {
        h2: "Request a quote or free site visit",
        html: contactBlock(),
      },
    ],
  },
  {
    id: "services",
    file: path.join("services", "index.html"),
    path: "/services/",
    title: "Gardening Services in Dubai | Sunny Star Landscaping",
    description:
      "Browse gardening and landscaping services in Dubai from Sunny Star, including maintenance, irrigation, lawn care, planting and garden makeovers.",
    ogImage: `${SITE}/assets/portfolio-img-001.jpg`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/" },
    ],
    h1: "Gardening services in Dubai",
    lead:
      "Sunny Star Landscaping LLC provides practical gardening and landscaping services for villas, gardens and outdoor spaces across Dubai. Tell us what you need and we will help you plan the next step.",
    sections: [
      {
        h2: "Our landscaping services",
        html: `<ul>${services
          .map((s) => `<li><strong>${escapeHtml(s.title)}:</strong> ${escapeHtml(s.text)}</li>`)
          .join("")}</ul>`,
      },
      {
        h2: "How to get started",
        html: `<p>Share a few details about your garden, call our team, or message us on WhatsApp. We can discuss maintenance, improvements or a free site visit.</p>${contactBlock()}`,
      },
    ],
  },
  {
    id: "projects",
    file: path.join("projects", "index.html"),
    path: "/projects/",
    title: "Landscaping Projects in Dubai | Sunny Star",
    description:
      "View Sunny Star landscaping projects in Dubai, including irrigation, gravel design, artificial grass, planting and recent garden photos.",
    ogImage: `${SITE}/assets/american-school-sharjah-01.jpg`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
    ],
    h1: "Landscaping projects in Dubai",
    lead:
      "Selected work from Sunny Star Landscaping LLC, including irrigation system installation, gravel design and artificial grass work, plus recent project photos from gardening and outdoor finishing jobs.",
    sections: [
      {
        h2: "Featured project work",
        html: `<ul>
<li><strong>American School Sharjah:</strong> Irrigation system, gravel design and artificial grass work.</li>
<li><strong>Irrigation System Installation:</strong> Landscape irrigation and watering system work.</li>
<li><strong>Gravel Design Work:</strong> Decorative gravel paths and landscape detailing.</li>
<li><strong>Artificial Grass Installation:</strong> Artificial turf installation.</li>
<li><strong>Landscape Planting &amp; Greenery:</strong> Planting beds and greenery.</li>
<li><strong>Decorative Garden Finish:</strong> Pebbles, plants and garden finishing.</li>
</ul>
<p><img src="/assets/american-school-sharjah-01.jpg" width="800" height="533" alt="Gravel design and landscaping project photo" loading="lazy" /></p>`,
      },
      {
        h2: "Discuss a similar garden",
        html: contactBlock(),
      },
    ],
  },
  {
    id: "areas",
    file: path.join("areas", "index.html"),
    path: "/areas/",
    title: "Landscaping Areas We Serve in Dubai | Sunny Star",
    description:
      "Sunny Star provides gardening and landscaping services across Dubai communities including Palm Jumeirah, Emirates Hills, Dubai Hills Estate and Arabian Ranches.",
    ogImage: `${SITE}/assets/area-waterfront.webp`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Areas", path: "/areas/" },
    ],
    h1: "Landscaping areas we serve in Dubai",
    lead:
      "Dubai gardens vary by community. Sunny Star Landscaping LLC works across coastal villas, established estates, family neighbourhoods and new handovers with planting and care suited to each setting.",
    sections: [
      {
        h2: "Communities we serve",
        html: `<ul>${areas.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
<p>Looking for gardening services in Dubai near you? <a href="/contact/">Contact our team</a> with your community and a short description of the work.</p>`,
      },
      {
        h2: "Request a site visit",
        html: contactBlock(),
      },
    ],
  },
  {
    id: "about",
    file: path.join("about", "index.html"),
    path: "/about/",
    title: "About Sunny Star Landscaping | Dubai Garden Care",
    description:
      "Learn about Sunny Star Landscaping LLC in Dubai. Quality work, reliable service and practical garden care for outdoor spaces.",
    ogImage: `${SITE}/assets/area-green.webp`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about/" },
    ],
    h1: "About Sunny Star Landscaping",
    lead:
      "Sunny Star Landscaping LLC turns outdoor visions into green, welcoming places — from small gardens to larger villa landscapes across Dubai.",
    sections: [
      {
        h2: "What we stand for",
        html: `<p>Quality work, reliable service and customer satisfaction on every project. One accountable team for design, installation, maintenance and makeovers.</p>
<ul>
<li>Quality work on every project</li>
<li>Reliable service you can count on</li>
<li>Customer satisfaction first</li>
<li>Built for the Dubai climate</li>
</ul>`,
      },
      {
        h2: "Talk to our team",
        html: contactBlock(),
      },
    ],
  },
  {
    id: "contact",
    file: path.join("contact", "index.html"),
    path: "/contact/",
    title: "Contact Sunny Star Landscaping Dubai | Request a Quote",
    description:
      "Contact Sunny Star Landscaping in Dubai by phone, WhatsApp or email to discuss gardening services and request a free site visit.",
    ogImage: `${SITE}/assets/portfolio-img-018.jpg`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact/" },
    ],
    h1: "Contact Sunny Star Landscaping in Dubai",
    lead:
      "Tell us about your garden and the care or improvements you have in mind. Call, WhatsApp or email our Dubai team to request a quote or free site visit.",
    sections: [
      {
        h2: "How to reach us",
        html: contactBlock(true),
      },
      {
        h2: "Working hours",
        html: `<p>${escapeHtml(business.hours)}</p><p>Service area: ${escapeHtml(business.city)}</p>`,
      },
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function contactBlock(detailed = false) {
  const people = business.contacts
    .map(
      (c) =>
        `<li><a href="${c.href}" data-track="phone_click">${escapeHtml(c.name)}: ${escapeHtml(c.phone)}</a></li>`
    )
    .join("");
  return `<ul>
${people}
<li><a href="${business.whatsapp}" data-track="whatsapp_click" rel="noopener noreferrer">WhatsApp: Chat with Sunny Star</a></li>
<li><a href="mailto:${business.email}">Email: ${escapeHtml(business.email)}</a></li>
<li><a href="/contact/">Request a free site visit</a></li>
</ul>
${
  detailed
    ? `<p>Use the contact form on this page to share your details. If the form cannot send automatically, use Call or WhatsApp so your enquiry reaches the team directly.</p>`
    : ""
}`;
}

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    url: SITE + "/",
    image: business.logo,
    logo: business.logo,
    email: business.email,
    telephone: "+971566620246",
    areaServed: {
      "@type": "City",
      name: "Dubai",
      containedInPlace: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+971566620246",
        areaServed: "AE",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+971501508148",
        areaServed: "AE",
        availableLanguage: ["en"],
      },
    ],
    knowsAbout: [
      "Gardening services in Dubai",
      "Landscape maintenance",
      "Irrigation systems",
      "Lawn care",
      "Artificial grass",
      "Garden renovation",
    ],
  };
}

function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gardening and landscaping services in Dubai",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.text,
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: business.name,
          url: SITE + "/",
        },
        areaServed: {
          "@type": "City",
          name: "Dubai",
        },
      },
    })),
  };
}

function breadcrumbJsonLd(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: SITE + crumb.path,
    })),
  };
}

function renderPage(page) {
  const canonical = SITE + page.path;
  const jsonLd = [localBusinessJsonLd()];
  if (page.id === "home" || page.id === "services") jsonLd.push(serviceJsonLd());
  if (page.breadcrumbs && page.breadcrumbs.length > 1) {
    jsonLd.push(breadcrumbJsonLd(page.breadcrumbs));
  }

  const navHtml = nav
    .map((item) => {
      const current = item.href === page.path ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${current}>${escapeHtml(item.label)}</a>`;
    })
    .join("");

  const sections = page.sections
    .map(
      (section) => `<section>
  <h2>${escapeHtml(section.h2)}</h2>
  ${section.html}
</section>`
    )
    .join("\n");

  const crumbs =
    page.breadcrumbs && page.breadcrumbs.length
      ? `<nav aria-label="Breadcrumb"><ol>${page.breadcrumbs
          .map((c, i) => {
            const last = i === page.breadcrumbs.length - 1;
            return `<li>${
              last
                ? escapeHtml(c.name)
                : `<a href="${c.path}">${escapeHtml(c.name)}</a>`
            }</li>`;
          })
          .join("")}</ol></nav>`
      : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/png" href="/assets/Sunny%20Star%20Landscaping%20logo.png" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(business.name)}" />
    <meta property="og:locale" content="en_AE" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${page.ogImage}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${page.ogImage}" />

    <!--
      Search Console / tracking placeholders.
      Replace only with real IDs before enabling.
      <meta name="google-site-verification" content="REPLACE_WITH_SEARCH_CONSOLE_TOKEN" />
    -->

    <link rel="preload" as="image" href="/assets/portfolio-img-001.jpg" fetchpriority="high" />
    <link rel="stylesheet" crossorigin href="/assets/index-BNK93Ikg.css" />
    <link rel="stylesheet" href="/assets/seo-fallback.css" />
    <script defer src="/assets/seo-runtime.js"></script>
    <script type="module" crossorigin src="/assets/index-C-rgGRw2.js"></script>
    ${jsonLd
      .map(
        (block) =>
          `<script type="application/ld+json">${JSON.stringify(block)}</script>`
      )
      .join("\n    ")}
  </head>
  <body>
    <div id="root">
      <a class="seo-skip" href="#seo-main">Skip to content</a>
      <header class="seo-shell">
        <p class="seo-brand"><a href="/">${escapeHtml(business.name)}</a></p>
        <nav aria-label="Primary">${navHtml}</nav>
      </header>
      <main id="seo-main" class="seo-shell">
        ${crumbs}
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.lead)}</p>
        ${sections}
      </main>
      <footer class="seo-shell">
        <p>${escapeHtml(business.name)} · ${escapeHtml(business.city)} · ${escapeHtml(business.hours)}</p>
        <p>
          <a href="${business.phoneHref}" data-track="phone_click">${escapeHtml(business.phoneDisplay)}</a>
          ·
          <a href="${business.whatsapp}" data-track="whatsapp_click" rel="noopener noreferrer">WhatsApp</a>
          ·
          <a href="mailto:${business.email}">${escapeHtml(business.email)}</a>
        </p>
      </footer>
    </div>
  </body>
</html>
`;
}

function writeRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

function writeSitemap() {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE}${page.path}</loc>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

for (const page of pages) {
  const out = path.join(ROOT, page.file);
  ensureDir(out);
  fs.writeFileSync(out, renderPage(page));
  console.log("wrote", page.file);
}

fs.writeFileSync(path.join(ROOT, "robots.txt"), writeRobots());
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), writeSitemap());
fs.writeFileSync(
  path.join(ROOT, "404.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found | Sunny Star Landscaping</title>
    <meta name="robots" content="noindex, follow" />
    <meta name="description" content="The page you requested was not found. Return to Sunny Star Landscaping or contact our Dubai team." />
    <link rel="canonical" href="${SITE}/404.html" />
    <link rel="stylesheet" href="/assets/seo-fallback.css" />
  </head>
  <body>
    <main class="seo-shell">
      <h1>Page not found</h1>
      <p>Sorry, that page does not exist. Continue to the homepage or contact Sunny Star Landscaping in Dubai.</p>
      <p><a href="/">Go to homepage</a> · <a href="/contact/">Contact us</a></p>
    </main>
  </body>
</html>
`
);

console.log("wrote robots.txt, sitemap.xml, 404.html");
