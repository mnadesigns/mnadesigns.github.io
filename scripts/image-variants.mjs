// Makes a phone-size copy (1200px wide, "name-w1200.webp") of every large picture, and writes src/data/imageVariants.ts: which pictures have one and how wide the original is.
// 1200px is what a phone shows at 3x (a 390px screen = 1170px), so phones stay sharp on retina while downloading about a fifth of the bytes. Tablets and desktops keep using the original (see src/lib/responsive.ts).
// Run: node scripts/image-variants.mjs
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, sep } from "node:path";

const W = 1200;
const slash = (p) => p.split(sep).join("/");
const files = [];
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (!slash(p).includes("/images/og")) walk(p); }
    else if (p.endsWith(".webp") && !p.endsWith(`-w${W}.webp`)) files.push(slash(p));
  }
};
walk("public/images");

const map = {};
for (const f of files) {
  const meta = await sharp(f).metadata();
  if (!meta.width || meta.width <= 1500 || statSync(f).size <= 120000) continue;
  const out = f.replace(/\.webp$/, `-w${W}.webp`);
  if (!existsSync(out)) await sharp(f).resize({ width: W }).webp({ quality: 82, effort: 5 }).toFile(out);
  map["/" + f.replace(/^public\//, "")] = meta.width;
}
const body = Object.entries(map).sort().map(([k, v]) => `  "${k}": ${v},`).join("\n");
writeFileSync("src/data/imageVariants.ts", `// Made by scripts/image-variants.mjs: the pictures that have a ${W}px phone copy ("name-w${W}.webp"), with the width of the original.\nexport const VARIANT_WIDTH = ${W};\nexport const imageVariants: Record<string, number> = {\n${body}\n};\n`);
console.log("variants:", Object.keys(map).length);
