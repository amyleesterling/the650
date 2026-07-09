import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { placedMuscles } from "../three/muscleLayout";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Figure3D.css";

/* Abstract, non-biological palette — violet muscles on a cool ground. */
const MUSCLE = new THREE.Color("#8b5cf6");
const MUSCLE_EMISSIVE = new THREE.Color("#4c1d95");
const MUSCLE_HOT = new THREE.Color("#d6c6ff");
const CORE = new THREE.Color("#26303b");

/** Optional scanned model; if present it is used instead of the capsules. */
const MODEL_URL = `${import.meta.env.BASE_URL}models/anatomy.glb`;

export default function Figure3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const [mode, setMode] = useState<"data" | "model">("data");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    camera.position.set(0, 1.5, 34);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ---- lighting: cool key + fill so the violet reads without looking flat
    scene.add(new THREE.AmbientLight(0x8ea6c0, 0.6));
    const key = new THREE.DirectionalLight(0xbfe3ff, 1.1);
    key.position.set(6, 10, 12);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6fb6ff, 0.7);
    rim.position.set(-8, 4, -10);
    scene.add(rim);
    const under = new THREE.PointLight(0x35e0a2, 0.35, 80);
    under.position.set(0, -10, 6);
    scene.add(under);

    // ---- controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 16;
    controls.maxDistance = 60;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.7;
    controls.target.set(0, 0, 0);

    // ---- data-driven capsule figure (the always-available fallback)
    const muscleGroup = new THREE.Group();
    const muscleMeshes: THREE.Mesh[] = [];
    const capsuleGeoCache = new Map<string, THREE.CapsuleGeometry>();

    for (const p of placedMuscles) {
      const key2 = `${p.len.toFixed(2)}_${p.radius.toFixed(2)}`;
      let geo = capsuleGeoCache.get(key2);
      if (!geo) {
        geo = new THREE.CapsuleGeometry(p.radius, p.len, 6, 12);
        capsuleGeoCache.set(key2, geo);
      }
      const mat = new THREE.MeshStandardMaterial({
        color: MUSCLE,
        emissive: MUSCLE_EMISSIVE,
        emissiveIntensity: 0.35,
        roughness: 0.45,
        metalness: 0.0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(p.pos[0], p.pos[1], p.pos[2]);
      // a gentle outward lean for limbs so they don't read as parallel pills
      mesh.rotation.z = (p.pos[0] / 8) * -1;
      mesh.userData = { id: p.id, name: p.name };
      muscleGroup.add(mesh);
      muscleMeshes.push(mesh);
    }
    scene.add(muscleGroup);

    // a faint translucent "core" for body context (head + torso)
    const coreMat = new THREE.MeshStandardMaterial({
      color: CORE,
      transparent: true,
      opacity: 0.22,
      roughness: 1,
    });
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(2.4, 5.2, 8, 16), coreMat);
    torso.position.set(0, 1.2, -0.2);
    torso.scale.set(1, 1, 0.7);
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 24), coreMat);
    head.position.set(0, 6.7, 0);
    const coreGroup = new THREE.Group();
    coreGroup.add(torso, head);
    scene.add(coreGroup);

    // ---- attempt to load a scanned model; recolor it violet if present
    let disposed = false;
    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((obj) => {
          const m = obj as THREE.Mesh;
          if (m.isMesh) {
            m.material = new THREE.MeshStandardMaterial({
              color: MUSCLE,
              emissive: MUSCLE_EMISSIVE,
              emissiveIntensity: 0.25,
              roughness: 0.5,
              metalness: 0.0,
            });
          }
        });
        // frame the model to a consistent size
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const scale = 15 / (size.y || 1);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        muscleGroup.visible = false;
        coreGroup.visible = false;
        scene.add(model);
        setMode("model");
      },
      undefined,
      () => {
        /* no model present — keep the data-driven capsule figure */
      },
    );

    // ---- hover picking (capsule mode only)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    function onPointerMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(muscleMeshes, false);
      const next = (hits[0]?.object as THREE.Mesh) ?? null;
      if (next !== hoveredMesh) {
        if (hoveredMesh) {
          const mm = hoveredMesh.material as THREE.MeshStandardMaterial;
          mm.emissive.copy(MUSCLE_EMISSIVE);
          mm.emissiveIntensity = 0.35;
          mm.color.copy(MUSCLE);
        }
        hoveredMesh = next;
        if (hoveredMesh) {
          const mm = hoveredMesh.material as THREE.MeshStandardMaterial;
          mm.emissive.copy(MUSCLE_HOT);
          mm.emissiveIntensity = 0.9;
          mm.color.copy(MUSCLE_HOT);
          setHover((hoveredMesh.userData as { name: string }).name);
        } else {
          setHover(null);
        }
      }
    }
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    // ---- resize
    function resize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- render loop
    let raf = 0;
    function tick() {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      controls.dispose();
      renderer.dispose();
      capsuleGeoCache.forEach((g) => g.dispose());
      muscleMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      coreMat.dispose();
      torso.geometry.dispose();
      head.geometry.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return (
    <div className="fig3d">
      <div className="fig3d__canvas" ref={mountRef} />
      <div className="fig3d__overlay">
        <span className={`fig3d__badge fig3d__badge--${mode}`}>
          {mode === "model" ? "scanned model" : "data-driven prototype"}
        </span>
        <span className="fig3d__hover">{hover ?? "drag to rotate · hover a muscle"}</span>
      </div>
    </div>
  );
}
