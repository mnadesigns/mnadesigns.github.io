// Makes the share thumbnails (Open Graph, 1200x630) in public/images/og/: og.jpg is the site default, <slug>.jpg is the one for each work page.
// Run: node scripts/og-images.mjs <default-image.png>
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const out = "public/images/og";
const W = 1200, H = 630;
await mkdir(out, { recursive: true });

const flat = (img, position = "centre") => img.flatten({ background: "#ffffff" }).resize(W, H, { fit: "cover", position }).jpeg({ quality: 90, mozjpeg: true });

// the default: the picture given on the command line
const def = process.argv[2];
if (def) await flat(sharp(def)).toFile(`${out}/og.jpg`);

// each work page: the slide of its film on the Work page, cropped to the thumbnail shape.
// work-source/og/ holds the captured slides (QuodArca, MLK Group, Zero Gaspi: scenes of the site captured at 2x; Applied Electronics: a frame of its video); the others come from their cover files.
const covers = {
  "sred-io": { src: "public/images/work/sredio/products-collage.webp" },
  quodarca: { src: "work-source/og/quodarca.png", pos: "top" }, // keeps the title at the top
  "mlk-group": { src: "work-source/og/mlk-group.png" },
  "zero-gaspi": { src: "work-source/og/zero-gaspi.png" },
  pumba: { src: "public/images/work/pumba/slides/pm-01.webp", crop: { left: 75, top: 960, width: 2200, height: 1155 } }, // the two phones of its first slide, without the title and the text beside them
  vyno: { src: "public/images/work/vyno/vyno-app-poster.webp" },
  peers: { src: "public/images/work/peers/cover-16x9.webp" },
  "applied-electronics": { src: "work-source/og/applied-electronics.png" },
  "spoonful-os": { src: "public/images/work/spoonful-os/slides/so-01.webp" },
};
for (const [slug, c] of Object.entries(covers)) {
  let img = sharp(c.src);
  if (c.crop) img = sharp(await img.extract(c.crop).toBuffer());
  await flat(img, c.pos ?? "centre").toFile(`${out}/${slug}.jpg`);
  console.log("ok", slug);
}
