import { useReveal } from "../hooks/useReveal";
import { SOURCES, STRENGTH_LABEL } from "../data/sources";
import "./AboutView.css";

export default function AboutView() {
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <div className="about">
      <div className="about__hero container">
        <div ref={heroRef} className="reveal">
          <p className="eyebrow">About &amp; Sources</p>
          <h1 className="about__title">
            Honesty is the feature.
          </h1>
          <p className="lead">
            The 650 is built on one principle: numerical precision and source
            transparency over soft wellness claims. Where a number is a
            widely-repeated factoid rather than a measurement, this site says so.
            Where a claim is strong and mechanistic, it says that too. That
            honesty is what makes The 650 trustworthy where other wellness sites
            aren&apos;t.
          </p>
        </div>
      </div>

      <section className="about__manifesto container">
        <h2>The guardrails we hold ourselves to</h2>
        <ol className="about__principles">
          <li>
            <strong>Name what&apos;s nameable; estimate what&apos;s estimable;
            say which is which.</strong>{" "}
            Prime movers are named. Stabilizer swarms are shown as ranges with a
            note. Factoids like &ldquo;200 muscles to take a step&rdquo; and
            &ldquo;30 muscles per swallow&rdquo; are labelled as popular
            estimates.
          </li>
          <li>
            <strong>Claims stay at the strength the evidence supports.</strong>{" "}
            The lymph pump is strong and mechanistic. Circulation is a chronic
            adaptation. Calm is real and gentleness-dependent. We never inflate.
          </li>
          <li>
            <strong>No disease claims. No &ldquo;detox.&rdquo; No
            fear-mongering.</strong>{" "}
            Tech-neck facts are presented as interesting, not as doom.
          </li>
          <li>
            <strong>Sources are public and specific.</strong> This page is part
            of the promise.
          </li>
        </ol>
      </section>

      <section className="about__disclaimer container">
        <p>
          <strong>A note on care.</strong> The 650 is educational and not medical
          advice. Gentle movement is broadly safe, but if you have pain, an
          injury, or a medical condition, check with a clinician before starting
          a new practice. Nothing here claims to cure disease.
        </p>
      </section>

      <section className="about__sources container">
        <div className="about__sourceshead">
          <h2>Sources</h2>
          <div className="about__legend">
            <span className="about__key about__key--strong">Strong / mechanistic</span>
            <span className="about__key about__key--moderate">Moderate</span>
            <span className="about__key about__key--popular-estimate">
              Popular estimate
            </span>
          </div>
        </div>

        <ul className="about__srclist">
          {SOURCES.map((s) => (
            <li key={s.key} className={`about__src about__src--${s.strength}`}>
              <div className="about__srctop">
                <span className="about__srcdot" aria-hidden="true" />
                <span className="about__srcstrength">
                  {STRENGTH_LABEL[s.strength]}
                </span>
              </div>
              <p className="about__srcclaim">{s.claim}</p>
              <p className="about__srccite">{s.cite}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
