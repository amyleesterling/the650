import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import "./PracticeView.css";

const STEPS = [
  {
    n: "01",
    title: "Choose one muscle",
    body: "Not a routine — a single muscle. The upper trapezius that holds your phone-neck. The soleus that has been standing all day. Naming one is enough to begin.",
  },
  {
    n: "02",
    title: "Find its alignment",
    body: "Alignment stretching means arranging the joint so the muscle can lengthen along its true line — no torquing, no forcing. You are opening a door, not pushing on a wall.",
  },
  {
    n: "03",
    title: "Go gentle, and stay a while",
    body: "Low intensity, held softly, with an easy exhale. Gentleness isn't a lesser dose — it's the ingredient that brings the calm. Let the muscle settle rather than strain.",
  },
  {
    n: "04",
    title: "Feel it — actually feel it",
    body: "Innervating a muscle means bringing your attention into it until you can sense it working or releasing. This is the quiet skill the whole practice is built on.",
  },
  {
    n: "05",
    title: "Move on, unhurried",
    body: "One muscle today. A few more tomorrow. Over time the map fills in, and movements you never noticed start to feel like yours again.",
  },
];

export default function PracticeView() {
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <div className="practice">
      <div className="practice__hero container">
        <div ref={heroRef} className="reveal">
          <p className="eyebrow">The Practice</p>
          <h1 className="practice__title">
            The 650 is a practice of feeling — and innervating — all of them.
          </h1>
          <p className="lead">
            Most stretching aims at flexibility or performance. The 650 aims at
            attention. It is the slow, deliberate work of bringing awareness into
            the ~640 muscles you never usually feel — for longevity, for ease
            from aches, for circulation and calm. Not a workout. A way of
            inhabiting the body you already have.
          </p>
        </div>
      </div>

      <section className="practice__what container">
        <div className="practice__whatgrid">
          <div>
            <h2>What &ldquo;alignment stretching&rdquo; means here</h2>
            <p>
              It is stretching organised around the natural line of a muscle and
              joint, rather than around depth or intensity. You set the posture so
              a muscle can lengthen honestly, then meet it gently and wait. The
              goal is never the deepest stretch — it is the clearest sensation and
              the calmest release.
            </p>
          </div>
          <div>
            <h2>Why gentleness, specifically</h2>
            <p>
              Because the evidence points there. Low-intensity, held stretching is
              what reliably shifts the nervous system toward calm; vigorous
              stretching can do the opposite.{" "}
              <Link to="/why">See the physiology →</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="practice__steps container">
        <p className="eyebrow">How to begin</p>
        <ol className="practice__list">
          {STEPS.map((s) => (
            <li key={s.n} className="practice__step">
              <span className="practice__stepn" aria-hidden="true">
                {s.n}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="practice__note container">
        <p>
          <strong>A note on this page.</strong> The 650 is a young practice, and
          this is its foundation rather than its final word — a fuller library of
          sequences and guided sessions will grow here over time. For now, the
          invitation is simple: pick one muscle and feel it.
        </p>
        <div className="practice__cta">
          <Link className="practice__btn practice__btn--primary" to="/muscles">
            Choose a muscle to feel
          </Link>
          <Link className="practice__btn" to="/">
            Back to the hidden effort
          </Link>
        </div>
      </aside>
    </div>
  );
}
