const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "..", "assets", "index-C-rgGRw2.js");
let s = fs.readFileSync(jsPath, "utf8");
let n = 0;

function replaceOnce(from, to, label) {
  if (!s.includes(from)) {
    console.log("MISS", label);
    return;
  }
  s = s.replace(from, to);
  n += 1;
  console.log("OK", label);
}

replaceOnce(
  "src:n,alt:``,className:`aq-hero-image`,loading:`eager`,fetchPriority:`high`",
  "src:n,alt:e,className:`aq-hero-image`,loading:`eager`,fetchPriority:`high`",
  "hero alt"
);

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
  "(0,M.jsx)(Ym,{title:`About Us`,subtitle:j.slogan,image:`/assets/area-green.webp`})",
  "(0,M.jsx)(Ym,{title:`About Sunny Star Landscaping`,subtitle:j.slogan,image:`/assets/area-green.webp`})",
  "about H1"
);

replaceOnce(
  "{title:`Contact Us`,subtitle:`Free site visits anywhere in Dubai`,image:`/assets/lighting.webp`,showCta:!1}",
  "{title:`Contact Sunny Star Landscaping in Dubai`,subtitle:`Free site visits anywhere in Dubai`,image:`/assets/lighting.webp`,showCta:!1}",
  "contact H1"
);

// Areas title may use a curly apostrophe in "Dubai's"
const areasMatch = s.match(/title:`Areas We Serve`,subtitle:`Landscaping across Dubai.s communities`/);
if (areasMatch) {
  s = s.replace(
    areasMatch[0],
    "title:`Landscaping areas we serve in Dubai`,subtitle:`Landscaping across Dubai’s communities`"
  );
  n += 1;
  console.log("OK areas H1");
} else if (s.includes("title:`Areas We Serve`")) {
  s = s.replace("title:`Areas We Serve`", "title:`Landscaping areas we serve in Dubai`");
  n += 1;
  console.log("OK areas H1 fallback");
} else {
  console.log("MISS areas H1");
}

fs.writeFileSync(jsPath, s);
console.log("done", n);
