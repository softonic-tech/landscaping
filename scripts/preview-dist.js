const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.normalize(path.join(root, rel));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        const notFound = path.join(root, "404.html");
        fs.readFile(notFound, (e2, html) => {
          res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
          res.end(e2 ? "Not found" : html);
        });
        return;
      }
      res.writeHead(200, {
        "content-type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(4176, "127.0.0.1", () => {
    console.log("preview http://127.0.0.1:4176");
  });
