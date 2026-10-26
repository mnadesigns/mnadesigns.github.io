import { imageVariants, VARIANT_WIDTH } from "@/data/imageVariants";

// src, srcSet and sizes for a picture: phones are offered the 1200px copy (sharp up to a 3x screen 400px wide), anything wider the original.
// `sizes` is how wide the picture shows: "100vw" by default; give the real layout where it is narrower, so the browser picks the right file. Pictures without a phone copy get just their src.
export function responsive(src: string, sizes = "(min-width: 1300px) 1280px, 100vw") {
  const w = imageVariants[src];
  if (!w) return { src };
  return { src, srcSet: `${src.replace(/\.webp$/, `-w${VARIANT_WIDTH}.webp`)} ${VARIANT_WIDTH}w, ${src} ${w}w`, sizes };
}
