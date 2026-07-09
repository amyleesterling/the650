# 3D anatomical model drop-in

The `/figure-3d` prototype automatically loads a scanned model from this folder
if one is present, and recolours it violet. Until then it falls back to the
data-driven capsule figure.

## To add a real model

1. Obtain a permissively-licensed muscle model (all CC-BY-SA — keep attribution):
   - **BodyParts3D / Anatomography** (DBCLS) — individual muscle meshes tagged
     with FMA anatomy IDs. https://lifesciencedb.jp/bp3d/
   - **Z-Anatomy** — complete atlas derived from BodyParts3D.
     https://www.z-anatomy.com/
2. Export/convert to **glTF binary (`.glb`)**. Decimate to keep it light — aim
   for well under ~10 MB so it stays snappy on GitHub Pages.
3. Save it here as **`anatomy.glb`** (`public/models/anatomy.glb`).
4. Reload `/figure-3d`. The badge will switch from “data-driven prototype” to
   “scanned model”.

## Per-muscle highlighting (next step)

To light individual muscles on the scanned model (as the flat map does), the
mesh/node names in the `.glb` need to map to our `MuscleId`s. BodyParts3D parts
carry FMA IDs, which gives a clean, stable mapping. Once a model is in place we
can wire that mapping in `src/components/Figure3D.tsx`.

Add the model's attribution/licence note to the About & Sources page when you
ship it.
