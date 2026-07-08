import type { Action } from "../data/types";
import "./ActionPicker.css";

export interface ActionPickerProps {
  actions: Action[];
  activeId: string;
  onPick: (id: string) => void;
}

export default function ActionPicker({
  actions,
  activeId,
  onPick,
}: ActionPickerProps) {
  return (
    <div
      className="picker"
      role="tablist"
      aria-label="Choose an everyday action"
    >
      {actions.map((a) => {
        const active = a.id === activeId;
        return (
          <button
            key={a.id}
            role="tab"
            aria-selected={active}
            className={`picker__chip ${active ? "is-active" : ""} ${
              a.composite ? "is-composite" : ""
            }`}
            onClick={() => onPick(a.id)}
          >
            {a.composite && <span className="picker__star" aria-hidden="true">✦</span>}
            {a.short ?? a.label}
          </button>
        );
      })}
    </div>
  );
}
