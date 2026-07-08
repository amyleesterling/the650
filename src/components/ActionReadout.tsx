import { Link } from "react-router-dom";
import type { Action, MuscleId } from "../data/types";
import { resolvePrimeMovers, actionById } from "../data/actions";
import { engagementFor } from "../data/engagement";
import { muscleName } from "../data/muscles";
import SourceTag from "./SourceTag";
import "./ActionReadout.css";

export interface ActionReadoutProps {
  action: Action;
  /** Highlight a hovered/selected muscle in the legend. */
  activeMuscle?: MuscleId | null;
  onHoverMuscle?: (id: MuscleId | null) => void;
}

export default function ActionReadout({
  action,
  activeMuscle,
  onHoverMuscle,
}: ActionReadoutProps) {
  const primeMovers = resolvePrimeMovers(action);
  const e = engagementFor(action);

  return (
    <div className="readout">
      <p className="readout__framing">{action.everydayFraming}</p>

      {/* -------- the honest count ------------------------------------- */}
      <div className="readout__counts">
        <div className="readout__count">
          <span className="readout__num mono">{e.named}</span>
          <span className="readout__lbl">named prime movers</span>
        </div>
        <div className="readout__plus" aria-hidden="true">
          +
        </div>
        <div className="readout__count readout__count--est">
          <span className="readout__num mono">
            {e.stabilizerLow}–{e.stabilizerHigh}
          </span>
          <span className="readout__lbl">
            stabilizers &amp; synergists <em>(estimated)</em>
          </span>
        </div>
      </div>

      <p className="readout__note">
        <span className="readout__note-mark" aria-hidden="true">
          ⓘ
        </span>
        {action.countNote}
      </p>

      {/* -------- prime mover legend (tap-through to View B) ----------- */}
      <div className="readout__legend">
        <p className="eyebrow">The named heroes</p>
        <ul className="readout__muscles">
          {primeMovers.map((id) => (
            <li key={id}>
              <Link
                to={`/muscles/${id}`}
                className={`readout__muscle ${
                  activeMuscle === id ? "is-active" : ""
                }`}
                onMouseEnter={() => onHoverMuscle?.(id)}
                onMouseLeave={() => onHoverMuscle?.(null)}
                onFocus={() => onHoverMuscle?.(id)}
                onBlur={() => onHoverMuscle?.(null)}
              >
                <span className="readout__muscle-dot" aria-hidden="true" />
                {muscleName(id)}
              </Link>
            </li>
          ))}
        </ul>
        <p className="readout__shimmerhint muted">
          …and a shimmer of {e.stabilizerLow}–{e.stabilizerHigh} more, correcting
          your balance and holding your posture behind the scenes.
        </p>
      </div>

      {/* -------- the hidden-load fact card --------------------------- */}
      <aside className="readout__hidden">
        <p className="eyebrow">The hidden load</p>
        <p className="readout__hiddentext">{action.hiddenLoad}</p>
        {action.hiddenLoadSource && (
          <SourceTag sourceKey={action.hiddenLoadSource} />
        )}
      </aside>

      {action.composite && action.sequence && (
        <aside className="readout__sequence">
          <p className="eyebrow">The sequence</p>
          <p className="muted">
            This errand stitches earlier actions together, in order:
          </p>
          <ol className="readout__seq">
            {action.sequence.map((id) => (
              <li key={id}>{actionById[id]?.label ?? id}</li>
            ))}
          </ol>
        </aside>
      )}
    </div>
  );
}
