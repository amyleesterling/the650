# 3D anatomical model — drop-in & handoff

This folder feeds the `/figure-3d` prototype. Read this first if you're picking
up the 3D work in a fresh session.

## Current status

- `/figure-3d` renders a working **data-driven** figure: every muscle in
  `src/data/muscles.ts` placed in 3-D (violet, non-biological), orbitable,
  hover-to-name. Reachable from the footer; kept out of the main nav until it
  graduates from prototype.
- The loader (`src/components/Figure3D.tsx`) already tries a scanned model and
  falls back to the capsules if none is found. **Both formats are supported, no
  conversion needed:** it loads `anatomy.glb` first, then `anatomy.fbx`
  (three.js `FBXLoader`). When one loads, the on-screen badge switches from
  “data-driven prototype” to “scanned model”.

## The model to add

Source: **Z-Anatomy** (CC-BY-SA — attribution required, see below).
`https://github.com/LluisV/Z-Anatomy/tree/PC-Version/Resources/Models/FBX`

Pick the file that is:
- the **muscular system** (not skeletal / nervous / vascular / lymphatic / etc.),
- **whole body**, in a neutral **T-pose**,
- **not** the combined “Complete”/full-atlas file (all systems — far too big).

### ⚠️ Size is the hard constraint
GitHub rejects files > **100 MB**, and anything over ~10–15 MB will be slow to
load on GitHub Pages. The raw Z-Anatomy muscular FBX is likely well above that.
Before committing, slim it in Blender:
1. Import the FBX, delete every non-muscular collection/object.
2. Add a **Decimate** modifier (ratio ~0.2–0.5) to the heavy meshes.
3. Export as FBX (or glTF `.glb`, which is smaller still).
Target well under ~10 MB.

Then save it here as **`anatomy.fbx`** (or `anatomy.glb`), commit, and reload
`/figure-3d`.

> If the file can't be slimmed below 100 MB, don't commit it — host it
> externally or via Git LFS and point the loader URLs in `Figure3D.tsx` at it.

## Next steps (for the new chat)

1. **Confirm it renders** at `/figure-3d`; check the auto-framing/scale in
   `applyModel()` looks right (it normalises to ~15 world units tall).
2. **Per-muscle highlighting.** Map the model's part/mesh names to our
   `MuscleId`s so individual muscles light up like the flat SVG map. Z-Anatomy
   parts derive from BodyParts3D and carry **FMA anatomy IDs** — the clean way
   to build the mapping. Wire it in `Figure3D.tsx` (the raycaster already picks
   meshes; extend `userData` with a resolved `MuscleId`).
3. **Attribution.** Add the Z-Anatomy / BodyParts3D CC-BY-SA credit to the
   About & Sources page (`src/views/AboutView.tsx`).
4. **Graduate it.** Once the scanned model + highlighting feel good, consider
   promoting `/figure-3d` into the main nav and linking muscle detail pages to
   the 3-D view.

## Key files

- `src/components/Figure3D.tsx` — the three.js scene, loaders, picking.
- `src/three/muscleLayout.ts` — 2-D muscle data → 3-D positions/depth (fallback).
- `src/views/Figure3DView.tsx` — the prototype page + copy.
- `src/data/muscles.ts` / `src/data/actions.ts` — the shared source of truth.
