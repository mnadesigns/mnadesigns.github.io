// Turns the chosen PNG screens of a case study into retina webp for the work page.
// usage: node scripts/case-study-images.mjs sredio
// Each plan entry is a carousel (or single image): key -> [folder, n] pairs. n is the number in the file name ("3-Add Staff.png", "3.png"); 0 = the only file in the folder.
// Output: public/images/work/<slug>/details/<key>-<position>.webp, native width (3126px at most), never upscaled: the flow players zoom up to 1.4x, which a 1100px stage still shows at 2x.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PLANS = {
  sredio: {
    "vault-create": [["file-vaults/Create Vault", 1], ["file-vaults/Create Vault", 2], ["file-vaults/Create Vault", 4], ["file-vaults/Create Vault", 6], ["file-vaults/Create Vault", 7], ["file-vaults/Create Vault", 8]],
    "staff-interface": [["staff-and-teams/Staff & Teams - Interface", 1]],
    "staff-bulk": [["staff-and-teams/Multiple Staff Selection - Move to", 2], ["staff-and-teams/Multiple Staff Selection - Hire date", 2], ["staff-and-teams/Multiple Staff Selection - Email reporting", 2], ["staff-and-teams/Multiple Staff Selection - Update Contractor Status", 2]],
    "timesheets": [["time-sheets/Export Time Sheet", 1]],
    "feedback": [["staff-and-teams/Feedback", 4]],
    "staff-merge": [["staff-and-teams/Merge Staff Accounts", 1], ["staff-and-teams/Merge Staff Accounts", 2], ["staff-and-teams/Merge Staff Accounts", 3], ["staff-and-teams/Merge Staff Accounts", 4]],
    "more": [["staff-and-teams/Filters", 1], ["staff-and-teams/Actions - Create New Team", 1], ["staff-and-teams/Staff & Teams Full Colmns View", 1], ["staff-and-teams/Staff Sync & Reporting", 1], ["file-vaults/External Users View", 1], ["time-sheets/Timesheets client view", 0], ["time-sheets/Update Timesheet - specific week", 9]],
    "vault-compare": [["file-vaults/Internal Users View", 0]], // the new vault screen of the before and after slide
    "timesheets-states": [["time-sheets/Export Time Sheet", 2], ["time-sheets/Time-Sheet-Sync-bar", 1], ["time-sheets/Time-Sheet-Sync-bar", 2], ["time-sheets/Time-Sheet-Sync-bar", 3]],
  },
};

const slug = process.argv[2];
const plan = PLANS[slug];
if (!plan) { console.error(`no plan for "${slug}"`); process.exit(1); }
const src = path.resolve("work-source", slug);
const out = path.resolve("public/images/work", slug, "details");
fs.mkdirSync(out, { recursive: true });

const find = (folder, n) => {
  const dir = path.join(src, folder);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
  const hit = n === 0 ? files[0] : files.find((f) => f === `${n}.png` || f.startsWith(`${n}-`));
  if (!hit) throw new Error(`missing ${folder} #${n}`);
  return path.join(dir, hit);
};

for (const [key, items] of Object.entries(plan)) {
  for (const [i, [folder, n]] of items.entries()) {
    const file = path.join(out, `${key}-${i + 1}.webp`);
    await sharp(find(folder, n)).resize({ width: 3200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(file);
  }
}
console.log(`${Object.values(plan).flat().length} images -> ${path.relative(".", out)}`);
