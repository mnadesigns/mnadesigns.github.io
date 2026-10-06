import { resumePage as p } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";

export const metadata = { title: "Resume — Muhammad Naeem" };

export default function Resume() {
  return (
    <main>
      <div className="res-page">
        <header className="res-header">
          <div className="res-header-top">
            <div>
              <h1 className="res-name">{p.name}</h1>
              <p className="res-title">{p.title}</p>
            </div>
          </div>
          <div className="res-contact">
            {p.contact.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span className="sep" style={{ marginRight: 18, color: "var(--ink-25)" }}>·</span>}
                {c.href ? <a href={c.href}>{c.label}</a> : c.label}
              </span>
            ))}
          </div>
          <p className="res-summary">{p.summary}</p>
        </header>

        <section className="res-section">
          <h2 className="res-section-title">Experience</h2>
          {p.experience.map((e) => (
            <div className="res-entry" key={e.company + e.meta}>
              <div className="res-entry-header">
                <span className="res-company">{e.company}</span>
                {e.meta && <span className="res-meta">{e.meta}</span>}
              </div>
              <div className="res-role">{e.role}</div>
              {e.desc && <p className="res-desc">{e.desc}</p>}
              {e.bullets.length > 0 && <ul>{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
            </div>
          ))}
        </section>

        <section className="res-section">
          <h2 className="res-section-title">Skills</h2>
          <div className="res-expertise-grid">
            {p.expertise.map((x) => (
              <div key={x.cat}>
                <div className="res-expertise-cat">{x.cat}</div>
                <div className="res-expertise-items">{x.items}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Doors />
    </main>
  );
}
