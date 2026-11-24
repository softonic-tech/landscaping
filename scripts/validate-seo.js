const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const site = "https://www.sunnystarlandscaping.com";
let errors = 0;

function fail(msg) {
  errors += 1;
  console.error("FAIL:", msg);
}

function ok(msg) {
  console.log("OK:", msg);
}

function mustExist(rel) {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) fail("missing " + rel);
  else ok("exists " + rel);
  return p;
}

mustExist("robots.txt");
mustExist("sitemap.xml");
mustExist("404.html");
mustExist("index.html");
mustExist("services/index.html");
mustExist("projects/index.html");
mustExist("areas/index.html");
mustExist("about/index.html");
mustExist("contact/index.html");
mustExist("assets/seo-runtime.js");
mustExist("assets/seo-fallback.css");

const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: " + site + "/sitemap.xml")) {
  fail("robots.txt missing sitemap reference");
} else ok("robots.txt sitemap reference");
if (/<!doctype html>/i.test(robots)) fail("robots.txt looks like HTML");

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
if (!sitemap.includes("<urlset")) fail("sitemap missing urlset");
if (/<!doctype html>/i.test(sitemap)) fail("sitemap looks like HTML");

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = [
  site + "/",
  site + "/services/",
  site + "/projects/",
  site + "/areas/",
  site + "/about/",
  site + "/contact/",
];
for (const url of expected) {
  if (!locs.includes(url)) fail("sitemap missing " + url);
}
for (const url of locs) {
  if (!expected.includes(url)) fail("unexpected sitemap url " + url);
  if (url.includes("#")) fail("fragment in sitemap " + url);
}
ok("sitemap urls = " + locs.length);

const pages = [
  "index.html",
  "services/index.html",
  "projects/index.html",
  "areas/index.html",
  "about/index.html",
  "contact/index.html",
];

const titles = new Set();
const descriptions = new Set();
for (const rel of pages) {
  const html = fs.readFileSync(path.join(dist, rel), "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1];
  const canonical = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1];
  const h1 = (html.match(/<h1>([^<]*)<\/h1>/) || [])[1];
  const hasOg = html.includes('property="og:title"');
  const hasTw = html.includes('name="twitter:card"');
  const hasLd = html.includes('type="application/ld+json"');
  const hasNoIndex = /name="robots" content="[^"]*noindex/i.test(html);
  if (!title) fail(rel + " missing title");
  if (!desc) fail(rel + " missing description");
  if (!canonical || !canonical.startsWith(site)) fail(rel + " bad canonical");
  if (!h1) fail(rel + " missing h1");
  if (!hasOg) fail(rel + " missing Open Graph");
  if (!hasTw) fail(rel + " missing Twitter card");
  if (!hasLd) fail(rel + " missing JSON-LD");
  if (hasNoIndex) fail(rel + " has noindex");
  if (titles.has(title)) fail("duplicate title: " + title);
  if (descriptions.has(desc)) fail("duplicate description: " + desc);
  titles.add(title);
  descriptions.add(desc);
  // Validate JSON-LD parses
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const block of blocks) {
    try {
      JSON.parse(block[1]);
    } catch (e) {
      fail(rel + " invalid JSON-LD: " + e.message);
    }
  }
  ok(rel + " => " + title);
}

const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
const rewriteSources = (vercel.rewrites || []).map((r) => r.source).join(" | ");
if (rewriteSources === "/(.*)") fail("catch-all rewrite still present");
else ok("vercel rewrites are scoped");

if (errors) {
  console.error("\nValidation failed with", errors, "error(s)");
  process.exit(1);
}
console.log("\nValidation passed");
