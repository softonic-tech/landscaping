const fs = require("fs");
const path = require("path");

const root = process.cwd();
const out = path.join(root, "dist");

try {
  fs.rmSync(out, { recursive: true, force: true });
} catch (err) {
  console.warn("Could not fully remove dist before rebuild:", err.message);
}

fs.mkdirSync(out, { recursive: true });

const copyList = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "icons.svg",
  "assets",
  "services",
  "projects",
  "areas",
  "about",
  "contact",
];

for (const name of copyList) {
  const from = path.join(root, name);
  if (!fs.existsSync(from)) {
    console.warn("skip missing:", name);
    continue;
  }
  fs.cpSync(from, path.join(out, name), { recursive: true });
  console.log("copied", name);
}

console.log("Static site built to dist/");
