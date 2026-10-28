/* eslint-disable @next/next/no-img-element */
import { hero, site } from "@/data/site";
import { BtnSec } from "@/components/atoms/Buttons";

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

// `bare`: the private portfolio shows the claim without the name band above it (its own top bar says who this is, and the band links into the personal site)
export function Hero({ bare = false }: { bare?: boolean }) {
  return (
    <header className={`hero shell${bare ? " hero--bare" : ""}`} id="hero">
      {!bare && <div className="hero-band">
        <div className="hero-id">
          <b>{site.name}</b>
          <span>{site.role.split(" · ").map((r, i) => <span key={r} style={{ whiteSpace: "nowrap" }}>{i > 0 && " · "}{r}</span>)}</span>
        </div>
        <BtnSec href="/resume/">{hero.cta}</BtnSec>
      </div>}
      {bare ? (
        <div className="hero-split">
          <img className="hero-portrait" src="/images/portrait-720.webp" alt={`Portrait of ${site.name}`} width={360} height={360} fetchPriority="high" decoding="async" />
          <div className="hero-copy">
          <h1 className="hero-claim" id="heroClaim">
            <span className="l"><Letters text={hero.line1} accent={hero.accent} start={0} /></span>
            <span className="l"><Letters text={hero.line2} start={hero.line1.replace(/ /g, "").length} /></span>
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          </div>
        </div>
      ) : (
        <>
        <h1 className="hero-claim" id="heroClaim">
          <span className="l"><Letters text={hero.line1} accent={hero.accent} start={0} /></span>
          <span className="l"><Letters text={hero.line2} start={hero.line1.replace(/ /g, "").length} /></span>
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        </>
      )}
    </header>
  );
}
