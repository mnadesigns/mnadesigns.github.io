// The iPad mockups of the websites at MLK Group, exactly as supplied (landscape, 1846 x 1418, in public/images/work/mlk/ipads/). The same pictures play in the home film (IpadGridScene),
// in the work 3 card on the Work page (MoreWork) and in the first slide of the MLK page.
export const MLK_IPAD_W = 1846;
export const MLK_IPAD_H = 1418;
export const MLK_IPADS = {
  scp: { src: "/images/work/mlk/ipads/scp.webp", alt: "The Specialist Clinic Pharmacy website on an iPad" },
  telco: { src: "/images/work/mlk/ipads/telco.webp", alt: "The Telco ICT website on an iPad" },
  zigbis: { src: "/images/work/mlk/ipads/zigbis.webp", alt: "The Zigbis Hair & Beauty website on an iPad" },
  amcp: { src: "/images/work/mlk/ipads/amcp.webp", alt: "The Andreden McCarthy Partners website on an iPad" },
  ae: { src: "/images/work/mlk/ipads/ae.webp", alt: "The Applied Electronics website on an iPad" },
  keys: { src: "/images/work/mlk/ipads/keys.webp", alt: "The Keysborough Veterinary Practice website on an iPad" },
  kombi: { src: "/images/work/mlk/ipads/kombi.webp", alt: "The Kombi Love website on an iPad" },
  cytosite: { src: "/images/work/mlk/ipads/cytosite.webp", alt: "The CytoSite Bio website on an iPad" },
} as const;
export type MlkIpad = keyof typeof MLK_IPADS;
// all of them in one run, no two neighbours alike in colour
export const MLK_IPAD_RUN: MlkIpad[] = ["scp", "telco", "zigbis", "cytosite", "amcp", "keys", "kombi"];
// the same run with its picture size, for the strips of the Work page card and the MLK page
export const MLK_TABLETS = MLK_IPAD_RUN.map((k) => ({ ...MLK_IPADS[k], w: MLK_IPAD_W, h: MLK_IPAD_H }));

// The logos of the MLK clients, trimmed and enlarged (public/images/work/mlk/logos/). They run under the iPads in the band on the Work page and the MLK page.
// `k` scales the logo's height so a long wordmark and a round badge look about the same size in the row.
export const MLK_LOGOS = [
  { name: "Kombi Love", src: "kombi-love", w: 283, h: 240, k: 1.2 },
  { name: "Zigbis Hair & Beauty", src: "zigbis", w: 752, h: 240, k: 0.85 },
  { name: "Mary's Skin Care", src: "marys-skin-care", w: 362, h: 240, k: 1.15 },
  { name: "Keysborough Veterinary Practice", src: "keysborough-vet", w: 794, h: 240, k: 0.85 },
  { name: "Telco ICT Group", src: "telco-ict", w: 1263, h: 240, k: 0.5 },
  { name: "Wonder Pies", src: "wonder-pies", w: 360, h: 360, k: 1.1 },
  { name: "The Tonic Acupuncture Clinic", src: "the-tonic", w: 1339, h: 300, k: 0.55 },
  { name: "LS Finance Broking", src: "ls-finance-broking", w: 988, h: 396, k: 1 },
  { name: "Martor Australia", src: "martor", w: 637, h: 240, k: 0.85 },
];
