import Link from "next/link";
import { doors, site } from "@/data/site";
import { Arrow } from "@/components/atoms/Buttons";

export function Doors() {
  return (
    <section className="doors on-coal" id="contact">
      <div className="doors-grid">
        {doors.map((d) => (
          <Link key={d.title} href={d.href} className="door">
            <span className="door-kicker">{d.kicker}</span>
            <span className="door-title" dangerouslySetInnerHTML={{ __html: d.title }} />
            <p className="door-line">{d.line}</p>
            <span className="btn-text">{d.cta} <Arrow /></span>
          </Link>
        ))}
      </div>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="foot-links">
          <Link href="/resume/">Resume</Link>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.linkedin}>LinkedIn</a>
          <a href={site.behance}>Behance</a>
          <a href={site.medium}>Medium</a>
        </span>
      </footer>
    </section>
  );
}
