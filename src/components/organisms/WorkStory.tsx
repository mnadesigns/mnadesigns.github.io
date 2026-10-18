import type { WorkStory as Story } from "@/data/workDetails";
import { LineIcon } from "@/components/atoms/LineIcon";
import { WorkStatement } from "@/components/atoms/WorkStatement";

// A chapter of the case study as live text: the title, one pulled-out line, the story, and a card (inside the panel, or on its own below it).
export function WorkStory({ story }: { story: Story }) {
  const card = (
    <>
      <p>{story.cardIntro}</p>
      <ul>
        {story.cardList.map((t, i) => (
          <li key={t} className={story.cardIcons?.[i] ? "has-ico" : undefined}>
            {story.cardIcons?.[i] && <LineIcon name={story.cardIcons[i]} delay={i * 120} />}
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </>
  );
  const lines = story.body.split("\n");
  return (
    <>
      <section className={`wk-story${story.tone ? ` wk-story--${story.tone}` : ""}`}>
        {story.statement ? (
          <div className="wk-story-open">
            <p className="wk-copy-label">{story.title}</p>
            <WorkStatement {...story.statement} />
          </div>
        ) : (
          <div className="wk-story-head">
            <h2 className="wk-story-title">{story.title}</h2>
            <blockquote className="wk-story-quote">{story.quote}</blockquote>
          </div>
        )}
        {story.bodyIcon ? (
          <ul className="wk-story-asks">
            {lines.map((t, i) => (
              <li key={t}><LineIcon name={story.bodyIcon!} delay={i * 150} /><span>{t}</span></li>
            ))}
          </ul>
        ) : (
          <p className="wk-story-body">{story.body}</p>
        )}
        {!story.cardOutside && <div className="wk-story-card">{card}</div>}
      </section>
      {story.cardOutside && <section className={`wk-role${story.cardTone === "brand" ? " wk-role--brand" : ""}`}>{card}</section>}
    </>
  );
}
