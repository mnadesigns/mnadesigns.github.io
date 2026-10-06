import { hero, site } from "@/data/site";
import { BtnSec } from "@/components/atoms/Buttons";
import { HeroGrid } from "@/components/organisms/HeroGrid";

// Splits text into per-letter spans (index drives the stagger). Words matching `accent` are red.
function Letters({ text, accent, start }: { text: string; accent?: string; start: number }) {
  let i = start;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, w) => (
        <span key={w}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {[...word].map((c) => (
              <span
                key={i}
                className={`ch${accent && word === accent ? " red" : ""}`}
                style={{ "--i": i++ } as React.CSSProperties}
              >
                {c}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ghost = "PLACEHOLDER · YOUR NAME · PORTFOLIO · ";
  return (
    <header className="hero shell" id="hero">
      <HeroGrid />
      <div className="hero-band">
        <div className="hero-id">
          <b>{site.name}</b>
          <span>{site.role}</span>
        </div>
        <BtnSec href="/consulting/">{hero.cta}</BtnSec>
      </div>
      <h1 className="hero-claim" id="heroClaim">
        <span className="l"><Letters text={hero.line1} accent={hero.accent} start={0} /></span>
        <span className="l"><Letters text={hero.line2} start={hero.line1.replace(/ /g, "").length} /></span>
      </h1>
      <p className="hero-sub">{hero.sub}</p>
      <div className="hero-ghost" aria-hidden="true">
        <span>{ghost}</span><span>{ghost}</span>
      </div>
    </header>
  );
}
