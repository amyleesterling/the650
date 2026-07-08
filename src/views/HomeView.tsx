import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BodyFigure from "../components/BodyFigure";
import ActionPicker from "../components/ActionPicker";
import ActionReadout from "../components/ActionReadout";
import The650Meter from "../components/The650Meter";
import { actions, actionById, resolvePrimeMovers } from "../data/actions";
import { engagementFor } from "../data/engagement";
import type { MuscleId } from "../data/types";
import "./HomeView.css";

export default function HomeView() {
  const [activeId, setActiveId] = useState<string>("phone");
  const [hovered, setHovered] = useState<MuscleId | null>(null);

  const action = actionById[activeId] ?? actions[0];
  const primeMovers = useMemo(() => resolvePrimeMovers(action), [action]);
  const e = useMemo(() => engagementFor(action), [action]);

  // A shimmer roughly proportional to the stabilizer estimate (visually capped).
  const shimmerCount = Math.round((e.stabilizerLow + e.stabilizerHigh) / 3);

  return (
    <div className="home">
      {/* ---- hero ------------------------------------------------------ */}
      <section className="home__hero container">
        <div className="home__intro rise">
          <p className="eyebrow">The Hidden Effort</p>
          <h1 className="home__title">
            Nothing you do is ever
            <br />
            as still as it looks.
          </h1>
          <p className="lead">
            You have about 650 skeletal muscles. On any given day you consciously
            feel maybe a dozen. The other ~640 are working anyway — holding your
            head up, catching your balance, pumping your blood and lymph. Pick an
            everyday action and watch the hidden orchestra light up.
          </p>
        </div>
      </section>

      {/* ---- the instrument ------------------------------------------- */}
      <section className="home__stage container" aria-label="The Hidden Effort visualization">
        <ActionPicker actions={actions} activeId={activeId} onPick={setActiveId} />

        <div className="home__panel">
          <div className="home__figurewrap">
            <BodyFigure
              activeIds={primeMovers}
              shimmerCount={shimmerCount}
              focusId={hovered}
              onSelect={(id) => setHovered(id)}
            />
            <div className="home__meter">
              <The650Meter
                engagedLow={e.engagedLow}
                engagedHigh={e.engagedHigh}
              />
            </div>
          </div>

          <div className="home__readout">
            <h2 className="home__actionname">{action.label}</h2>
            <ActionReadout
              action={action}
              activeMuscle={hovered}
              onHoverMuscle={setHovered}
            />
          </div>
        </div>
      </section>

      {/* ---- scroll cue to meaning ------------------------------------ */}
      <section className="home__cue container">
        <p className="home__cuetext">
          Every action makes the same quiet point: look how much is waiting to be
          felt. That is the whole idea behind <strong>The&nbsp;650</strong> — a
          practice of gently noticing, and innervating, all of them.
        </p>
        <div className="home__links">
          <Link className="home__biglink" to="/muscles">
            <span>Explore a muscle</span>
            <em>What happens when just one goes tight?</em>
          </Link>
          <Link className="home__biglink" to="/why">
            <span>Why gentle &amp; slow</span>
            <em>The honest physiology of lymph, blood &amp; calm.</em>
          </Link>
        </div>
      </section>
    </div>
  );
}
