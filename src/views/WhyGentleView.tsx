import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SourceTag from "../components/SourceTag";
import "./WhyGentleView.css";

function Beat({
  index,
  kicker,
  title,
  children,
  accent,
}: {
  index: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  accent: "lymph" | "blood" | "calm";
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`beat beat--${accent} reveal`}>
      <div className="beat__mark" aria-hidden="true">
        <span className="beat__index">{index}</span>
        <span className="beat__glyph" />
      </div>
      <div className="beat__content">
        <p className="eyebrow">{kicker}</p>
        <h2 className="beat__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Honest({ children }: { children: React.ReactNode }) {
  return (
    <p className="beat__honest">
      <span className="beat__honest-tag">Honest framing</span>
      {children}
    </p>
  );
}

export default function WhyGentleView() {
  const introRef = useReveal<HTMLDivElement>();

  return (
    <div className="why">
      <div className="why__hero container">
        <div ref={introRef} className="reveal">
          <p className="eyebrow">Why Gentle &amp; Slow</p>
          <h1 className="why__title">
            The case for slowing down, told at the strength the evidence
            supports.
          </h1>
          <p className="lead">
            Three quiet mechanisms make gentle, alignment-based stretching worth
            the time: it moves your lymph, it reshapes your blood vessels over
            weeks, and it tips your nervous system toward calm. None of it is
            magic. All of it is real — and gentleness turns out to be the active
            ingredient.
          </p>
        </div>
      </div>

      <div className="why__beats container">
        <Beat index="01" kicker="The muscle pump" title="Lymph" accent="lymph">
          <p>
            Your lymphatic system has <strong>no central pump</strong>. It moves
            fluid two ways: an <em>intrinsic pump</em> — the vessels' own
            smooth-muscle contractions — and an <em>extrinsic pump</em> —
            compression from the skeletal muscle around them, your breathing, and
            the pulse of nearby arteries.
          </p>
          <SourceTag sourceKey="lymph-pumps" />
          <p className="beat__stat">
            At rest, about <strong>one-third</strong> of the lymph transport in
            your lower limbs comes from skeletal-muscle compression; the other
            two-thirds from the vessels pumping themselves.
          </p>
          <SourceTag sourceKey="lymph-third" />
          <p>
            Across a day, your body returns roughly{" "}
            <strong>8–12 litres</strong> of fluid and protein through this
            network. When you engage muscle — even gently — you are helping drive
            that flow.
          </p>
          <SourceTag sourceKey="lymph-volume" />
          <Honest>
            Movement and muscle engagement are a genuine driver of lymph flow.
            That is not the same as "stretching detoxes you" — the mechanism is
            real; the marketing version isn&apos;t.
          </Honest>
        </Beat>

        <Beat
          index="02"
          kicker="A chronic adaptation, not an instant flush"
          title="Blood"
          accent="blood"
        >
          <p>
            Stretch <strong>regularly</strong> and your blood vessels themselves
            change. In a 12-week study, passive leg stretches five times a week
            produced more dilated arteries, increased blood flow in both legs{" "}
            <em>and</em> arms, reduced arterial stiffness, and lower blood
            pressure.
          </p>
          <SourceTag sourceKey="circulation-chronic" />
          <p>
            The effect runs deep into the small vessels: muscle stretch drives
            microvascular and endothelial adaptations, and in older adults it may
            help restore vascular function that had declined.
          </p>
          <SourceTag sourceKey="circulation-microvascular" />
          <p className="beat__nuance">
            A nuance that keeps us honest: <em>during</em> a held stretch, blood
            flow through the muscle can briefly drop as vessels are compressed —
            followed by a rebound surge afterward (reactive hyperemia). The gain
            is the adaptation over weeks, not a single flush.
          </p>
          <SourceTag sourceKey="circulation-acute" />
          <Honest>
            Stretch regularly and your blood vessels adapt. Not: stretching
            instantly flushes fresh blood through.
          </Honest>
        </Beat>

        <Beat
          index="03"
          kicker="And why gentleness is the point"
          title="Calm"
          accent="calm"
        >
          <p>
            Passive static stretching shifts your autonomic nervous system toward{" "}
            <strong>parasympathetic</strong> — "rest and digest" — dominance, and
            that state lingers for at least several minutes after you stop.
          </p>
          <SourceTag sourceKey="calm-parasympathetic" />
          <p>
            Kept up, it compounds: fifteen minutes of daily static stretching for
            28 days improved heart rate variability, a marker of parasympathetic
            tone and recovery capacity.
          </p>
          <SourceTag sourceKey="calm-hrv" />
          <p className="beat__stat">
            Here is the crucial part — the scientific heart of The 650. Intensity
            matters. Vigorous stretching can cause a{" "}
            <em>transient sympathetic spike</em>; it&apos;s{" "}
            <strong>low-intensity, brief, gentle</strong> stretching that
            reliably brings the calm.
          </p>
          <SourceTag sourceKey="calm-intensity" />
          <Honest>
            Slow, gentle, held stretching is not a weaker version of stretching —
            gentleness <em>is</em> the mechanism of the calm.
          </Honest>
        </Beat>
      </div>

      <section className="why__invite container">
        <h2>So: slow down, and feel one.</h2>
        <p className="lead">
          You don&apos;t have to feel all 650 today. Pick a single muscle, meet
          it gently, and let it settle. That is the whole practice.
        </p>
        <div className="why__invitelinks">
          <Link className="why__btn why__btn--primary" to="/practice">
            What the practice is
          </Link>
          <Link className="why__btn" to="/muscles">
            Explore a muscle
          </Link>
        </div>
      </section>
    </div>
  );
}
