const fs = require("fs");
const path = require("path");

const out = path.join(process.cwd(), "dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const name of ["index.html", "icons.svg", "assets"]) {
  fs.cpSync(path.join(process.cwd(), name), path.join(out, name), {
    recursive: true,
  });
}
