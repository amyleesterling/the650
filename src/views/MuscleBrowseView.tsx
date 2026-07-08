import { Link } from "react-router-dom";
import { muscles } from "../data/muscles";
import { REGION_LABEL, type Region, type Muscle } from "../data/types";
import "./MuscleBrowseView.css";

const REGION_ORDER: Region[] = [
  "head_neck",
  "shoulder_arm",
  "hand",
  "trunk_core",
  "hip",
  "leg",
  "foot",
];

export default function MuscleBrowseView() {
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    items: muscles
      .filter((m) => m.region === region)
      .sort((a, b) => Number(b.featured) - Number(a.featured)),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="browse container">
      <header className="browse__head rise">
        <p className="eyebrow">Explore a Muscle</p>
        <h1>If one muscle goes tight, what does it drag down?</h1>
        <p className="lead">
          Muscles work in teams. When one is chronically tight or has quietly
          switched off, it changes the job of its neighbours — a pattern
          clinicians call reciprocal inhibition. The ten{" "}
          <span className="browse__key browse__key--featured">highlighted</span>{" "}
          muscles below carry the full tightness-chain story; tap any muscle to
          see what it does and how to gently meet it.
        </p>
        <p className="browse__caveat muted">
          The crossed-syndrome framework here is a widely used clinical model,
          not a fully validated law — individual anatomy varies. Treat it as a
          useful lens, not gospel.
        </p>
      </header>

      {byRegion.map(({ region, items }) => (
        <section key={region} className="browse__region">
          <h2 className="browse__regiontitle">{REGION_LABEL[region]}</h2>
          <ul className="browse__grid">
            {items.map((m) => (
              <MuscleCard key={m.id} muscle={m} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MuscleCard({ muscle }: { muscle: Muscle }) {
  return (
    <li>
      <Link
        to={`/muscles/${muscle.id}`}
        className={`mcard ${muscle.featured ? "is-featured" : ""}`}
      >
        <span className="mcard__name">{muscle.name}</span>
        <span className="mcard__does">{muscle.whatItDoes}</span>
        {muscle.featured && (
          <span className="mcard__badge">Full chain →</span>
        )}
      </Link>
    </li>
  );
}
