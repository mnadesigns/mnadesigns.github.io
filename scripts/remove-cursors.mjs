// Removes the mouse arrow that was captured inside the screen exports, without touching any other pixel and without re-encoding lossy:
// the arrow is found as a small near-black blob of its known shape, grown a few pixels to take in its white edge and shadow, and each row of that area
// is filled by blending the pixels just left and right of it (the screens are flat bands and rows, so this leaves no trace). PNG in, PNG out.
// usage: node scripts/remove-cursors.mjs sredio
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("work-source", process.argv[2]);
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f) : f.endsWith(".png") && files.push(f); } })(root);

const GROW = 6;
for (const file of files) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info, N = W * H;
  const dark = new Uint8Array(N);
  for (let i = 0; i < N; i++) { const o = i * 3; if (data[o] < 14 && data[o + 1] < 14 && data[o + 2] < 14) dark[i] = 1; }
  const seen = new Uint8Array(N), arrows = [];
  for (let i = 0; i < N; i++) {
    if (!dark[i] || seen[i]) continue;
    const q = [i], px = []; seen[i] = 1; let x0 = W, x1 = 0, y0 = H, y1 = 0, big = false;
    while (q.length) {
      const c = q.pop(), x = c % W, y = (c / W) | 0; px.push(c);
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (px.length > 4000) { big = true; break; }
      for (const d of [1, -1, W, -W]) { const k = c + d; if (k >= 0 && k < N && dark[k] && !seen[k]) { seen[k] = 1; q.push(k); } }
    }
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
    if (!big && bw === 16 && bh === 28 && Math.abs(px.length / (bw * bh) - 0.47) < 0.04) arrows.push({ x0, y0, x1, y1, px });
  }
  if (!arrows.length) continue;
  const mask = new Uint8Array(N);
  for (const a of arrows) for (const c of a.px) { const x = c % W, y = (c / W) | 0; for (let dy = -GROW; dy <= GROW; dy++) for (let dx = -GROW; dx <= GROW; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && xx < W && yy >= 0 && yy < H) mask[yy * W + xx] = 1; } }
  const out = Buffer.from(data);
  for (let y = 0; y < H; y++) {
    let x = 0;
    while (x < W) {
      if (!mask[y * W + x]) { x++; continue; }
      let e = x; while (e < W && mask[y * W + e]) e++;
      const l = Math.max(0, x - 1), r = Math.min(W - 1, e);
      for (let k = x; k < e; k++) { const t = (k - l) / Math.max(1, r - l); for (let ch = 0; ch < 3; ch++) out[(y * W + k) * 3 + ch] = Math.round(data[(y * W + l) * 3 + ch] * (1 - t) + data[(y * W + r) * 3 + ch] * t); }
      x = e;
    }
  }
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 9 }).toFile(file + ".tmp");
  fs.renameSync(file + ".tmp", file);
  console.log(`cleaned ${arrows.length} cursor(s): ${path.relative(root, file)}`);
}
