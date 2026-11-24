/**
 * Lightweight patches to the existing client bundle for SEO/Ads readiness.
 * Keeps the current React UI while correcting titles and honest contact flow.
 */
const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "..", "assets", "index-C-rgGRw2.js");
let js = fs.readFileSync(jsPath, "utf8");
let changes = 0;

function replaceOnce(from, to, label) {
  if (!js.includes(from)) {
    console.warn("skip missing:", label);
    return;
  }
  js = js.replace(from, to);
  changes += 1;
  console.log("patched:", label);
}

replaceOnce(
  "ih(`${j.name} | Landscaping, Maintenance & Irrigation`,`Landscape maintenance, renovation, planting and irrigation services by Sunny Star Landscaping LLC.`)",
  "ih(`Gardening & Landscaping Dubai | Sunny Star`,`Explore gardening and landscaping services in Dubai with Sunny Star. Contact our team to discuss your garden and request a quote.`)",
  "home title/description"
);

replaceOnce(
  "ih(`Our Landscaping Services | ${j.name}`,`${j.tagline}. Landscape maintenance, renovation, irrigation, planting and garden care.`)",
  "ih(`Gardening Services in Dubai | Sunny Star Landscaping`,`Browse gardening and landscaping services in Dubai from Sunny Star, including maintenance, irrigation, lawn care, planting and garden makeovers.`)",
  "services title/description"
);

replaceOnce(
  "ih(`Landscaping Projects | ${j.name}`,`Selected landscaping projects from Sunny Star Landscaping LLC.`)",
  "ih(`Landscaping Projects in Dubai | Sunny Star`,`View Sunny Star landscaping projects in Dubai, including irrigation, gravel design, artificial grass, planting and recent garden photos.`)",
  "projects title/description"
);

replaceOnce(
  "ih(`Areas We Serve in Dubai | ${j.name}`,`Landscaping design, maintenance and outdoor care across Dubai’s communities.`)",
  "ih(`Landscaping Areas We Serve in Dubai | Sunny Star`,`Sunny Star provides gardening and landscaping services across Dubai communities including Palm Jumeirah, Emirates Hills, Dubai Hills Estate and Arabian Ranches.`)",
  "areas title/description"
);

replaceOnce(
  "ih(`About Us | ${j.name}`,`${j.name} — ${j.tagline}. Quality work, reliable service and customer satisfaction.`)",
  "ih(`About Sunny Star Landscaping | Dubai Garden Care`,`Learn about Sunny Star Landscaping LLC in Dubai. Quality work, reliable service and practical garden care for outdoor spaces.`)",
  "about title/description"
);

replaceOnce(
  "ih(`Contact Us | Free Site Visit | ${j.name}`,`Book your free site visit. Call Riaz or Najeeb, WhatsApp or email ${j.email}.`)",
  "ih(`Contact Sunny Star Landscaping Dubai | Request a Quote`,`Contact Sunny Star Landscaping in Dubai by phone, WhatsApp or email to discuss gardening services and request a free site visit.`)",
  "contact title/description"
);

// Page hero images currently use empty alt text.
replaceOnce(
  "src:n,alt:``,className:`aq-hero-image`,loading:`eager`,fetchPriority:`high`",
  "src:n,alt:e,className:`aq-hero-image`,loading:`eager`,fetchPriority:`high`",
  "page hero image alt text"
);

// Honest form copy: do not claim details were sent by a backend.
replaceOnce(
  "children:e?`Details sent`:`Request a Free Visit`",
  "children:`Request a Free Visit`",
  "remove fake form success label"
);

// Improve empty service-card alt text used on services page.
replaceOnce(
  "alt:``,loading:`lazy`",
  "alt:e.title,loading:`lazy`",
  "service image alt text"
);

// Prefer a real 404 experience over silently sending unknown routes home.
replaceOnce(
  "(0,M.jsx)(Xt,{path:`*`,element:(0,M.jsx)(Jt,{to:`/`,replace:!0})})",
  "(0,M.jsx)(Xt,{path:`*`,element:(0,M.jsxs)(`main`,{className:`seo-shell`,style:{padding:`80px 20px`},children:[(0,M.jsx)(`h1`,{children:`Page not found`}),(0,M.jsx)(`p`,{children:`Sorry, that page does not exist.`}),(0,M.jsx)(A,{to:`/`,children:`Go to homepage`}),(0,M.jsx)(`span`,{children:` · `}),(0,M.jsx)(A,{to:`/contact/`,children:`Contact us`})]})})",
  "spa 404 page"
);

// Soften absolute claims that are not independently verified.
replaceOnce(
  "We already know what survives in each.",
  "We consider planting, soil care and community conditions for each setting.",
  "areas copy accuracy"
);

// Clearer H1 wording for key pages rendered by the shared page hero.
replaceOnce(
  "(0,M.jsx)(Ym,{title:`Our Landscaping Services`,subtitle:j.commitment,image:`/assets/portfolio-img-001.jpg`})",
  "(0,M.jsx)(Ym,{title:`Gardening services in Dubai`,subtitle:j.commitment,image:`/assets/portfolio-img-001.jpg`})",
  "services H1"
);

replaceOnce(
  "(0,M.jsx)(Ym,{title:`Our Projects`,subtitle:`American School Sharjah, plus recent irrigation, planting, lawn and garden work.`,image:`/assets/area-villa.webp`})",
  "(0,M.jsx)(Ym,{title:`Landscaping projects in Dubai`,subtitle:`American School Sharjah, plus recent irrigation, planting, lawn and garden work.`,image:`/assets/area-villa.webp`})",
  "projects H1"
);

replaceOnce(
  "title:`Areas We Serve`,subtitle:`Landscaping across Dubai",
  "title:`Landscaping areas we serve in Dubai`,subtitle:`Landscaping across Dubai",
  "areas H1"
);

replaceOnce(
  "(0,M.jsx)(Ym,{title:`About Us`,subtitle:j.slogan,image:`/assets/area-green.webp`})",
  "(0,M.jsx)(Ym,{title:`About Sunny Star Landscaping`,subtitle:j.slogan,image:`/assets/area-green.webp`})",
  "about H1"
);

replaceOnce(
  "{title:`Contact Us`,subtitle:`Free site visits anywhere in Dubai`,image:`/assets/lighting.webp`,showCta:!1}",
  "{title:`Contact Sunny Star Landscaping in Dubai`,subtitle:`Free site visits anywhere in Dubai`,image:`/assets/lighting.webp`,showCta:!1}",
  "contact H1"
);

// Homepage supporting copy with natural local phrase.
replaceOnce(
  "Irrigation systems, decorative gravel and artificial grass installation for beautiful, practical outdoor spaces.",
  "Gardening services in Dubai for irrigation, decorative gravel, artificial grass and practical outdoor spaces.",
  "home hero supporting copy"
);

fs.writeFileSync(jsPath, js);
console.log("total patches:", changes);
