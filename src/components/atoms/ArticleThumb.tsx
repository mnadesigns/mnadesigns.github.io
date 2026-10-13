import { Illustration } from "@/components/atoms/Illustration";
import type { Article } from "@/data/articles";

// The thumbnail of an article in the listings: its own picture when it has one (two sizes, so a retina screen gets the 1100 px file), otherwise the drawn illustration.
export function ArticleThumb({ e, sizes = "(max-width: 700px) 100vw, 640px" }: { e: Article; sizes?: string }) {
  if (!e.image) return <Illustration kind={e.kind} />;
  return (
    <img
      src={`${e.image}-640.webp`}
      srcSet={`${e.image}-640.webp 640w, ${e.image}-1100.webp 1100w`}
      sizes={sizes}
      width={1100}
      height={619}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
