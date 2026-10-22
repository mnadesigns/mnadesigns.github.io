import type { WorkCopy as Copy } from "@/data/workDetails";
import { LineIcon } from "@/components/atoms/LineIcon";
import { WorkDidCards } from "./WorkDidCards";

// The overview block of a case study, as live text between the media: the story on the left, the facts of the project on the right.
export function WorkCopy({ copy }: { copy: Copy }) {
  return (
    <section className="wk-copy">
      {!copy.didOnly && <><div className="wk-copy-main">
        <p className="wk-copy-label">{copy.label}</p>
        <h2 className="wk-copy-lead">{copy.lead}</h2>
        <p className="wk-copy-body">{copy.body}</p>
      </div>
      <div className="wk-copy-side">
        <dl className="wk-copy-meta">
          {copy.meta.map((m, i) => (
            <div key={m.l} className={m.icon ? "has-ico" : undefined}>
              {m.icon && <LineIcon name={m.icon} delay={i * 120} />}
              <dt>{m.l}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
        {!copy.didCards && !copy.noDid && <p className="wk-copy-label">{copy.didLabel}</p>}
        {!copy.didCards && !copy.noDid && <ul className="wk-copy-did">
          {copy.did.map((t, i) => (
            <li key={t} className={copy.didIcons?.[i] ? "has-ico" : undefined}>
              {copy.didIcons?.[i] && <LineIcon name={copy.didIcons[i]} delay={i * 120} />}
              <span>{t}</span>
            </li>
          ))}
        </ul>}
      </div></>}
      {copy.didCards && !copy.noDid && <WorkDidCards label={copy.didLabel} did={copy.did} titles={copy.didTitles} />}
    </section>
  );
}
