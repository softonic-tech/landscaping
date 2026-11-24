const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });

const items = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "services",
  "projects",
  "areas",
  "about",
  "contact",
];

const log = [];
for (const name of items) {
  const from = path.join(root, name);
  const to = path.join(dist, name);
  if (!fs.existsSync(from)) {
    log.push("missing source " + name);
    continue;
  }
  fs.cpSync(from, to, { recursive: true });
  log.push("copied " + name);
}

// Ensure SEO runtime assets are present even if a partial assets copy happened earlier.
for (const asset of ["seo-runtime.js", "seo-fallback.css"]) {
  const from = path.join(root, "assets", asset);
  const to = path.join(dist, "assets", asset);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  log.push("copied assets/" + asset);
}

// Keep the app bundle and CSS in sync too.
for (const asset of ["index-C-rgGRw2.js", "index-BNK93Ikg.css"]) {
  const from = path.join(root, "assets", asset);
  const to = path.join(dist, "assets", asset);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    log.push("copied assets/" + asset);
  }
}

fs.writeFileSync(path.join(root, ".tmp-copy-seo-log.txt"), log.join("\n"));
console.log(log.join("\n"));
