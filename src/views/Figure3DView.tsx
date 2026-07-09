import { Link } from "react-router-dom";
import Figure3D from "../components/Figure3D";
import "./Figure3DView.css";

export default function Figure3DView() {
  return (
    <div className="fig3dview container">
      <header className="fig3dview__head rise">
        <p className="eyebrow">Prototype · 3D figure</p>
        <h1>The hidden orchestra, in the round.</h1>
        <p className="lead">
          An early look at a fully three-dimensional body you can turn in your
          hands — every muscle in the dataset placed in space, with real
          front-and-back depth. The muscles are rendered in an abstract violet,
          deliberately non-biological, so the figure stays calm and approachable
          rather than clinical.
        </p>
      </header>

      <Figure3D />

      <section className="fig3dview__notes">
        <p className="muted">
          This is a working prototype driven by the same muscle data as the main
          visualization — the flat map and this 3D figure share one source of
          truth. The next step is to swap the placeholder forms for a scanned,
          anatomically-exact model (a permissively-licensed atlas such as
          BodyParts3D / Z-Anatomy), keyed by the same muscle IDs. When a model
          file is present it is loaded and recoloured automatically; until then,
          the data-driven figure stands in.
        </p>
        <p className="fig3dview__back">
          <Link to="/">← Back to the main visualization</Link>
        </p>
      </section>
    </div>
  );
}
