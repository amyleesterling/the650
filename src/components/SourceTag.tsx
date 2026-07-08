import { sourceByKey, STRENGTH_LABEL } from "../data/sources";
import "./SourceTag.css";

/**
 * A small badge crediting the evidence behind a claim and, crucially, its
 * strength — so a hedged claim is never mistaken for a strong one.
 */
export default function SourceTag({ sourceKey }: { sourceKey?: string }) {
  if (!sourceKey) return null;
  const src = sourceByKey[sourceKey];
  if (!src) return null;
  return (
    <span className={`srctag srctag--${src.strength}`}>
      <span className="srctag__dot" aria-hidden="true" />
      <span className="srctag__strength">{STRENGTH_LABEL[src.strength]}</span>
      <span className="srctag__cite">{src.cite}</span>
    </span>
  );
}
