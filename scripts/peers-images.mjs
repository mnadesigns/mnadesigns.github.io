// Turns the Peers case study slides (peers/1.jpg to 12.jpg, 5600 x 3600) into retina webp for the work page.
// usage: node scripts/peers-images.mjs
// Output: shots/peers-03.webp to peers-12.webp (slide 2, the overview, is not used), 3200px wide (the page shows them at about 1100px, so 2x and more); slide 1 is the cover:
// cover.webp (its own shape, 3200px wide) for the page, cover-16x9.webp (bottom cropped, 3840 x 2160) for the film scene, the stories list and the story pages.
// shots/peers-antd.webp is the Ant Design components sheet (peers/ant-design.png, 3840 x 1892, from the Ant Design GitHub README), made 16:9 with clear space above and below, no background of its own.
// The generator slides (details/gen-1 to gen-5), skill-level and manager-view are supplied files and are not made here.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("public/images/work/peers/shots");
fs.mkdirSync(out, { recursive: true });
const cover = path.resolve("public/images/work/peers");
await sharp(path.resolve("peers", "1.jpg")).resize({ width: 3200 }).webp({ quality: 86 }).toFile(path.join(cover, "cover.webp"));
await sharp(path.resolve("peers", "1.jpg")).extract({ left: 0, top: 0, width: 5600, height: 3150 }).resize({ width: 3840, height: 2160 }).webp({ quality: 86 }).toFile(path.join(cover, "cover-16x9.webp"));
for (let i = 3; i <= 12; i++) {
  await sharp(path.resolve("peers", `${i}.jpg`)).resize({ width: 3200 }).webp({ quality: 84 }).toFile(path.join(out, `peers-${String(i).padStart(2, "0")}.webp`));
}
{
  // 16:9 with nothing cropped or stretched: the sheet at its own size, with clear (not coloured) space above and below it
  const sheet = path.resolve("peers", "ant-design.png");
  const meta = await sharp(sheet).metadata();
  const h = Math.round((meta.width * 9) / 16), pad = h - meta.height, top = Math.floor(pad / 2);
  await sharp(sheet).extend({ top, bottom: pad - top, background: { r: 255, g: 255, b: 255, alpha: 0 } }).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(out, "peers-antd.webp"));
}
console.log("covers + 10 images ->", path.relative(".", out));
