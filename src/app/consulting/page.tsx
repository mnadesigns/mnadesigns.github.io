import { consultingPage as p } from "@/data/pages";
import { Problems, Testimonials } from "@/components/organisms/ConsultingParts";
import { site } from "@/data/site";

export const metadata = { title: "Consulting — Your Name" };

export default function Consulting() {
  const ticker = [...p.ticker, ...p.ticker];
  return (
    <main className="cs-page">
      <section className="cs-hero">
        <div className="cs-hero-content">
          <p className="cs-hero-eyebrow"><span className="cs-avail-dot" /><span>{p.eyebrow}</span></p>
          <h1 className="cs-poster" aria-label={`${p.poster.line1} ${p.poster.line2}`}>
            <span className="cs-poster-line"><span>{p.poster.line1}</span><span className="cs-poster-op" aria-hidden="true">{p.poster.op}</span></span>
            <span>{p.poster.line2}</span>
          </h1>
          <p className="cs-hero-desc">{p.desc}<br /><em>{p.descEm}</em></p>
          <div className="cs-ticker" aria-hidden="true">
            <div className="cs-ticker-track">
              {ticker.map((t, i) => (<span key={i} style={{ display: "contents" }}><span>{t}</span><span className="cs-ticker-dot" /></span>))}
            </div>
          </div>
        </div>
        <a href="#services" className="cs-hero-foot" aria-label="Scroll to services">
          <span>Services</span><span className="cs-hero-foot-line" />
          <span className="cs-hero-foot-arrow"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v10M4 9l4 4 4-4" /></svg></span>
        </a>
      </section>

      <Problems />

      <section className="cs-services" id="services">
        <div className="cs-services-inner">
          <header className="cs-head"><p className="cs-kicker">{p.servicesKicker}</p><h2 className="cs-heading">{p.servicesHeading}</h2></header>
          <div className="cs-services-grid">
            {p.services.map((s) => (
              <article className="cs-service" key={s.n}>
                <span className="cs-kicker">{s.n}</span>
                <h3 className="cs-service-title">{s.t}</h3>
                <p className="cs-service-line">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-process">
        <div className="cs-process-inner">
          <div className="cs-process-head"><p className="cs-kicker">{p.processKicker}</p><h2 className="cs-heading">{p.processHeading}</h2></div>
          <div className="cs-steps">
            {p.process.map((s) => (
              <div key={s.n}><span className="cs-step-num">{s.n}</span><h3 className="cs-step-title">{s.t}</h3><p className="cs-step-body">{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-testi">
        <div className="cs-testi-inner">
          <p className="cs-kicker">{p.testiKicker}</p>
          <h2 className="cs-heading">{p.testiHeading}</h2>
          <Testimonials />
        </div>
      </section>

      <section className="cs-engage">
        <div className="cs-engage-inner">
          <header className="cs-head"><p className="cs-kicker">{p.engageKicker}</p><h2 className="cs-heading">{p.engageHeading}</h2></header>
          <div className="cs-engage-grid">
            {p.engage.map((c) => (
              <article className={`cs-card${c.featured ? " cs-card--featured" : ""}`} key={c.t}>
                {c.badge && <span className="cs-badge">{c.badge}</span>}
                <div className="cs-card-head"><p className="cs-kicker">{c.tag}</p><h3 className="cs-card-title">{c.t}</h3><p className="cs-card-fit">{c.fit}</p></div>
                <div className="cs-timeline">
                  <span className="cs-timeline-label">Timeline</span>
                  <div className="cs-timeline-bar"><div className="cs-timeline-fill" style={{ width: `${c.fill}%` }} /></div>
                  <span className="cs-timeline-range">{c.range}</span>
                </div>
                <div className="cs-price"><span className="cs-price-label">From</span><span className="cs-price-val">{c.price}</span><span className="cs-price-note">{c.note}</span></div>
                <ul className="cs-included">{c.inc.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="cs-foot">
                  <div className="cs-scope"><span className="cs-scope-label">Scope</span><span className="cs-scope-val">{c.scope}</span></div>
                  <a href="#contact" className="cs-card-cta">{c.cta}<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M5 4h7v7" /></svg></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-cta" id="contact">
        <div className="cs-cta-bg" aria-hidden="true" />
        <div className="cs-cta-inner">
          <p className="cs-cta-eyebrow"><span className="cs-avail-dot" /><span>{p.cta.eyebrow}</span></p>
          <h2 className="cs-cta-poster"><span>{p.cta.l1}</span><span className="acc">{p.cta.acc}</span><span>{p.cta.l3}</span></h2>
          <p className="cs-cta-sub">{p.cta.sub}</p>
          <div className="cs-methods">
            <a href={`mailto:${site.email}`} className="cs-method"><span className="cs-method-label">Email</span><span className="cs-method-value">{site.email}</span><span className="cs-method-action">Copy</span></a>
            <a href="https://cal.com/" target="_blank" rel="noopener noreferrer" className="cs-method"><span className="cs-method-label">Book</span><span className="cs-method-value">30-minute call</span><span className="cs-method-action">Open Cal</span></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="cs-method"><span className="cs-method-label">LinkedIn</span><span className="cs-method-value">@yourname</span><span className="cs-method-action">Open LinkedIn</span></a>
            <a href="https://wa.me/923218886461" target="_blank" rel="noopener noreferrer" className="cs-method"><span className="cs-method-label">WhatsApp</span><span className="cs-method-value">+92 321 888 6461</span><span className="cs-method-action">Open WhatsApp</span></a>
          </div>
          <p className="cs-cta-footnote">{p.cta.foot}</p>
        </div>
      </section>
    </main>
  );
}
