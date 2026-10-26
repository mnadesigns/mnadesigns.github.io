// Turns the Pumba case study slides (public/images/work/pumba/Pumba-NN*.png, 3840px wide) into retina webp for the work page.
// usage: node scripts/pumba-images.mjs
// Output: public/images/work/pumba/slides/pm-01.webp ... pm-19.webp, in page order (the source numbers skip 05, 07 and 10, so the files are numbered 1 to 19 here).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("public/images/work/pumba");
const out = path.join(dir, "slides");
fs.mkdirSync(out, { recursive: true });
const files = fs.readdirSync(dir).filter((f) => /^Pumba-\d+.*\.png$/.test(f)).sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
let n = 0;
for (const f of files) {
  n++;
  const to = `pm-${String(n).padStart(2, "0")}.webp`;
  await sharp(path.join(dir, f)).resize({ width: 3200, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(out, to));
  console.log(f, "->", to);
}
