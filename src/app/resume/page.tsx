import { resumePage as p } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";
import { BtnSec } from "@/components/atoms/Buttons";

export const metadata = { title: "Resume — Your Name" };

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
            <BtnSec href="#" className="res-print">Download PDF</BtnSec>
          </div>
          <div className="res-contact">
            {p.contact.map((c, i) => (
              <span key={c}>{i > 0 && <span className="sep" style={{ marginRight: 18, color: "var(--ink-25)" }}>·</span>}{c}</span>
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
                <span className="res-meta">{e.meta}</span>
              </div>
              <div className="res-role">{e.role}</div>
              <p className="res-desc">{e.desc}</p>
              <ul>{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
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

        <section className="res-section">
          <h2 className="res-section-title">Education</h2>
          {p.education.map((e) => (
            <div key={e.school}>
              <div className="res-edu-row">
                <span className="res-edu-school">{e.school}</span>
                <span className="res-edu-year">{e.year}</span>
              </div>
              <div className="res-edu-degree">{e.degree}</div>
            </div>
          ))}
        </section>
      </div>
      <Doors />
    </main>
  );
}
