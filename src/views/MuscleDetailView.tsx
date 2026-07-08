import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import BodyFigure from "../components/BodyFigure";
import { getMuscle, muscleName, muscles } from "../data/muscles";
import { actions, resolvePrimeMovers } from "../data/actions";
import { REGION_LABEL } from "../data/types";
import "./MuscleDetailView.css";

export default function MuscleDetailView() {
  const { id = "" } = useParams();
  const muscle = getMuscle(id);

  // Actions that recruit this muscle (reverse lookup — data-driven).
  const inActions = useMemo(
    () =>
      actions.filter((a) => resolvePrimeMovers(a).includes(id)),
    [id],
  );

  // Muscles whose tightness lists this one as downstream (the "fed by" side).
  const fedBy = useMemo(
    () => muscles.filter((m) => m.affects.includes(id)),
    [id],
  );

  if (!muscle) {
    return (
      <div className="mdetail container">
        <p className="eyebrow">Not found</p>
        <h1>We don&apos;t have that muscle yet.</h1>
        <p>
          <Link to="/muscles">← Back to all muscles</Link>
        </p>
      </div>
    );
  }

  const hasChain = muscle.affects.length > 0;

  return (
    <div className="mdetail container">
      <p className="mdetail__crumb">
        <Link to="/muscles">Explore a Muscle</Link>{" "}
        <span aria-hidden="true">/</span> {REGION_LABEL[muscle.region]}
      </p>

      <div className="mdetail__grid">
        {/* ---- the figure with this muscle + its chain lit ----------- */}
        <div className="mdetail__figure">
          <BodyFigure
            focusId={muscle.id}
            chainIds={muscle.affects}
            activeIds={[]}
          />
          <div className="mdetail__legend">
            <span className="mdetail__lg mdetail__lg--warm">
              <i /> {muscle.name}
            </span>
            {hasChain && (
              <span className="mdetail__lg mdetail__lg--cool">
                <i /> muscles it drags down
              </span>
            )}
          </div>
        </div>

        {/* ---- the teaching -------------------------------------------- */}
        <div className="mdetail__body">
          <p className="eyebrow">
            {muscle.featured ? "Featured chain" : "Muscle"}
          </p>
          <h1 className="mdetail__name">{muscle.name}</h1>

          <dl className="mdetail__facts">
            <div>
              <dt>What it does</dt>
              <dd>{muscle.whatItDoes}</dd>
            </div>
            <div>
              <dt>When it&apos;s chronically tight</dt>
              <dd>{muscle.whenTight}</dd>
            </div>
            <div>
              <dt className="mdetail__gentle-dt">A gentle way to meet it</dt>
              <dd className="mdetail__gentle">{muscle.gentleStretch}</dd>
            </div>
          </dl>

          {hasChain && (
            <section className="mdetail__chain">
              <h2>The chain it drags down</h2>
              <p className="muted">
                When {muscleName(muscle.id).toLowerCase()} dominates, these
                muscles are signalled to relax, weaken, or overwork to
                compensate:
              </p>
              <ul className="mdetail__chainlist">
                {muscle.affects.map((aId) => {
                  const target = getMuscle(aId);
                  return (
                    <li key={aId}>
                      <Link to={`/muscles/${aId}`} className="mdetail__chip">
                        <span className="mdetail__chip-dot" aria-hidden="true" />
                        <span>
                          <strong>{muscleName(aId)}</strong>
                          {target && (
                            <em className="muted"> — {target.whatItDoes}</em>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {fedBy.length > 0 && (
            <section className="mdetail__fedby">
              <h2>What can drive it</h2>
              <p className="muted">
                Working backward, tightness or weakness in these upstream
                muscles can be what overloads {muscleName(muscle.id).toLowerCase()}:
              </p>
              <ul className="mdetail__inline">
                {fedBy.map((m) => (
                  <li key={m.id}>
                    <Link to={`/muscles/${m.id}`}>{m.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {inActions.length > 0 && (
            <section className="mdetail__actions">
              <h2>You use it when you…</h2>
              <ul className="mdetail__inline">
                {inActions.map((a) => (
                  <li key={a.id}>
                    <Link to="/">{a.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
