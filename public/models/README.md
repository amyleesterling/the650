# 3D anatomical model drop-in

The `/figure-3d` prototype automatically loads a scanned model from this folder
if one is present, and recolours it violet. Until then it falls back to the
data-driven capsule figure.

The loader tries **`anatomy.glb`** first, then **`anatomy.fbx`** — either works,
no conversion needed (FBX is loaded directly with three.js's `FBXLoader`).

## To add a real model

1. Obtain a permissively-licensed muscle model (all CC-BY-SA — keep attribution):
   - **Z-Anatomy** (https://github.com/LluisV/Z-Anatomy) — complete atlas.
     Download the **FBX** and save it here as `anatomy.fbx`.
   - **BodyParts3D / Anatomography** (DBCLS, https://lifesciencedb.jp/bp3d/) —
     individual muscle meshes tagged with FMA anatomy IDs (best for per-muscle
     mapping). Exports OBJ; convert to `.glb`.
2. **Watch the size.** The full atlas (all body systems) is far too big for
   GitHub Pages (>100 MB won't even commit). Keep only the muscular layer and
   decimate — aim for well under ~10 MB. In Blender: delete other systems →
   Decimate modifier → export.
3. Save it here as `anatomy.fbx` or `anatomy.glb`.
4. Reload `/figure-3d`. The badge switches from “data-driven prototype” to
   “scanned model”.

## Per-muscle highlighting (next step)

To light individual muscles on the scanned model (as the flat map does), the
mesh/node names in the `.glb` need to map to our `MuscleId`s. BodyParts3D parts
carry FMA IDs, which gives a clean, stable mapping. Once a model is in place we
can wire that mapping in `src/components/Figure3D.tsx`.

Add the model's attribution/licence note to the About & Sources page when you
ship it.
