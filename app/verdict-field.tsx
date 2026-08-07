"use client";

import { useEffect, useRef } from "react";

type FieldStage = "view" | "compile" | "release";
type ReviewState = "idle" | "analyzing" | "success" | "error";

interface TasteMotionDetail {
  stage: FieldStage;
  reviewState: ReviewState;
}

interface EvidenceSeed {
  angle: number;
  drift: number;
  group: number;
  rank: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const COMPACT_QUERY = "(max-width: 767px)";
const EVIDENCE_NODE_COUNT = 48;
const COMPACT_EVIDENCE_NODE_COUNT = 24;

export function VerdictField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentHost = hostRef.current;
    if (!currentHost) return;
    const host: HTMLDivElement = currentHost;
    const currentCanvas = host.querySelector<HTMLCanvasElement>("canvas");
    if (!currentCanvas) return;
    const canvas: HTMLCanvasElement = currentCanvas;

    const motionPreference = window.matchMedia(REDUCED_MOTION_QUERY);
    const compactPreference = window.matchMedia(COMPACT_QUERY);
    let disposed = false;
    let initialized = false;
    let visible = false;
    let stage: FieldStage = "view";
    let reviewState: ReviewState = "idle";
    let updateColors = () => {};
    let syncAnimation = () => {};
    let releaseResources = () => {};

    function handleTasteState(event: Event) {
      const detail = (event as CustomEvent<TasteMotionDetail>).detail;
      if (!detail) return;
      stage = detail.stage;
      reviewState = detail.reviewState;
      host.dataset.phase =
        reviewState === "analyzing" || reviewState === "success"
          ? reviewState
          : stage;
      updateColors();
    }

    async function initializeField() {
      if (initialized || disposed || motionPreference.matches) return;
      initialized = true;

      try {
        const THREE = await import("three");
        if (disposed) return;

        const compact =
          compactPreference.matches ||
          (navigator.hardwareConcurrency !== undefined &&
            navigator.hardwareConcurrency <= 4);
        const nodeCount = compact
          ? COMPACT_EVIDENCE_NODE_COUNT
          : EVIDENCE_NODE_COUNT;
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !compact,
          canvas,
          failIfMajorPerformanceCaveat: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5),
        );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
        camera.position.set(0, 0, 8.6);

        const nodeGeometry = new THREE.BoxGeometry(0.58, 0.055, 0.38);
        const nodeMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: compact ? 0.34 : 0.42,
          vertexColors: true,
        });
        const nodes = new THREE.InstancedMesh(
          nodeGeometry,
          nodeMaterial,
          nodeCount,
        );
        nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(nodes);

        const anchorGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.82);
        const anchorMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0.88,
        });
        const verdictAnchor = new THREE.Mesh(anchorGeometry, anchorMaterial);
        scene.add(verdictAnchor);

        const linePositions = new Float32Array(6 * 2 * 3);
        const lineGeometry = new THREE.BufferGeometry();
        const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
        lineGeometry.setAttribute("position", lineAttribute);
        const lineMaterial = new THREE.LineBasicMaterial({
          transparent: true,
          opacity: compact ? 0.16 : 0.26,
        });
        const evidenceLines = new THREE.LineSegments(
          lineGeometry,
          lineMaterial,
        );
        scene.add(evidenceLines);

        const seeds: EvidenceSeed[] = Array.from(
          { length: nodeCount },
          (_, index) => ({
            angle: index * 2.399963,
            drift: ((index * 37) % 100) / 100,
            group: index % 2,
            rank: ((index * 17) % nodeCount) / nodeCount,
          }),
        );
        const positions = seeds.map(
          (seed) =>
            new THREE.Vector3(
              Math.cos(seed.angle) * (1.4 + seed.rank * 2),
              Math.sin(seed.angle) * (0.8 + seed.drift * 1.6),
              (seed.rank - 0.5) * 2,
            ),
        );
        const target = new THREE.Vector3();
        const dummy = new THREE.Object3D();
        const accent = new THREE.Color();
        const ink = new THREE.Color();
        const muted = new THREE.Color();
        const pointer = new THREE.Vector2();
        const pointerTarget = new THREE.Vector2();
        let rendererWidth = 0;
        let rendererHeight = 0;
        let lastTime = performance.now();
        let frameCount = 0;

        function readThemeColors() {
          const styles = getComputedStyle(document.documentElement);
          accent.set(styles.getPropertyValue("--accent").trim());
          ink.set(styles.getPropertyValue("--ink").trim());
          muted.set(styles.getPropertyValue("--ink-muted").trim());
          anchorMaterial.color.copy(accent);
          lineMaterial.color.copy(accent);
        }

        function applyNodeColors() {
          readThemeColors();
          for (let index = 0; index < nodeCount; index += 1) {
            const isVerdictEvidence =
              reviewState === "success"
                ? index % 7 >= 5
                : stage === "compile"
                  ? index % 3 === 2
                  : stage === "release"
                    ? index % 5 === 4
                    : index % 11 === 0;
            nodes.setColorAt(
              index,
              isVerdictEvidence
                ? accent
                : index % 3 === 0
                  ? muted
                  : ink,
            );
          }
          if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
        }

        function setTarget(index: number, time: number) {
          const seed = seeds[index];
          const motionTime = time * 0.00045;

          if (reviewState === "analyzing") {
            const radius = 0.9 + seed.rank * 2.9;
            const angle = seed.angle + motionTime * (2.2 + seed.drift);
            target.set(
              Math.cos(angle) * radius,
              Math.sin(angle * 1.15) * radius * 0.52,
              Math.sin(angle * 0.7) * 1.3,
            );
            return;
          }

          if (reviewState === "success") {
            const column = index % 8;
            const row = Math.floor(index / 8);
            target.set(
              -1.8 + column * 0.58,
              (row - nodeCount / 16) * 0.32 * (1.15 - column * 0.07),
              (column - 4) * -0.08,
            );
            return;
          }

          if (stage === "compile") {
            const lane = index % 3;
            const row = Math.floor(index / 3);
            const rowsPerLane = Math.ceil(nodeCount / 3);
            target.set(
              -2.25 + lane * 2.25,
              2.2 - (row / Math.max(1, rowsPerLane - 1)) * 4.4,
              (seed.drift - 0.5) * 0.8,
            );
            return;
          }

          if (stage === "release") {
            const column = index % 5;
            const row = Math.floor(index / 5);
            const rows = Math.ceil(nodeCount / 5);
            target.set(
              (column - 2) * 0.88,
              2 - (row / Math.max(1, rows - 1)) * 4,
              (column === 4 ? 0.45 : -0.1) + seed.drift * 0.24,
            );
            return;
          }

          const cluster = seed.group === 0 ? -1.45 : 1.45;
          const orbit = seed.angle + motionTime * (0.65 + seed.drift * 0.4);
          target.set(
            cluster + Math.cos(orbit) * (0.35 + seed.rank * 1.05),
            Math.sin(orbit * 1.15) * (0.55 + seed.drift * 1.2),
            Math.sin(orbit * 0.7) * 0.9,
          );
        }

        function resizeRenderer() {
          const bounds = host.getBoundingClientRect();
          const width = Math.max(1, Math.round(bounds.width));
          const height = Math.max(1, Math.round(bounds.height));
          if (rendererWidth !== width || rendererHeight !== height) {
            rendererWidth = width;
            rendererHeight = height;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          }
        }

        function renderFrame(time: number) {
          resizeRenderer();
          const delta = Math.min((time - lastTime) / 1000, 1 / 24);
          lastTime = time;
          const convergence =
            reviewState === "analyzing" ? 3.4 : reviewState === "success" ? 7 : 4.5;
          const blend = 1 - Math.exp(-delta * convergence);
          pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 4));

          for (let index = 0; index < nodeCount; index += 1) {
            setTarget(index, time);
            target.x += pointer.x * (seeds[index].rank - 0.5) * 0.75;
            target.y += pointer.y * (seeds[index].drift - 0.5) * 0.5;
            positions[index].lerp(target, blend);
            dummy.position.copy(positions[index]);
            dummy.rotation.set(
              seeds[index].drift * 0.6 + time * 0.00008,
              seeds[index].angle + time * 0.00012,
              seeds[index].group * 0.18,
            );
            const scale =
              reviewState === "analyzing"
                ? 0.68 + seeds[index].rank * 0.36
                : 0.8 + seeds[index].rank * 0.52;
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            nodes.setMatrixAt(index, dummy.matrix);
          }
          nodes.instanceMatrix.needsUpdate = true;

          const anchorX =
            stage === "compile" ? 2.25 : stage === "release" ? 1.78 : 2.4;
          const anchorY = stage === "release" ? -1.55 : 0;
          verdictAnchor.position.set(anchorX, anchorY, 0.7);
          verdictAnchor.rotation.y =
            -0.22 + pointer.x * 0.08 + Math.sin(time * 0.0007) * 0.03;
          verdictAnchor.rotation.x = pointer.y * -0.06;
          const anchorPulse =
            reviewState === "success"
              ? 1 + Math.sin(time * 0.004) * 0.035
              : 1;
          verdictAnchor.scale.setScalar(anchorPulse);

          for (let line = 0; line < 6; line += 1) {
            const source = positions[(line * 7) % nodeCount];
            const offset = line * 6;
            linePositions[offset] = source.x;
            linePositions[offset + 1] = source.y;
            linePositions[offset + 2] = source.z;
            linePositions[offset + 3] = verdictAnchor.position.x;
            linePositions[offset + 4] = verdictAnchor.position.y;
            linePositions[offset + 5] = verdictAnchor.position.z;
          }
          lineAttribute.needsUpdate = true;

          camera.position.x += (pointer.x * 0.32 - camera.position.x) * blend;
          camera.position.y += (pointer.y * 0.2 - camera.position.y) * blend;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);

          frameCount += 1;
          if (frameCount % 60 === 0) {
            host.dataset.drawCalls = String(renderer.info.render.calls);
            host.dataset.triangles = String(renderer.info.render.triangles);
          }
        }

        function handlePointerMove(event: PointerEvent) {
          if (!visible) return;
          const bounds = host.getBoundingClientRect();
          pointerTarget.set(
            ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
          );
        }

        function handleThemeChange() {
          applyNodeColors();
        }

        const resizeObserver = new ResizeObserver(resizeRenderer);
        const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        resizeObserver.observe(host);
        window.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        colorScheme.addEventListener("change", handleThemeChange);

        updateColors = applyNodeColors;
        syncAnimation = () => {
          if (motionPreference.matches) {
            host.dataset.renderer = "static";
            renderer.setAnimationLoop(null);
            return;
          }
          const shouldAnimate =
            visible && !document.hidden;
          host.dataset.renderer = shouldAnimate ? "ready" : "paused";
          renderer.setAnimationLoop(shouldAnimate ? renderFrame : null);
          if (!shouldAnimate && !motionPreference.matches) {
            renderFrame(performance.now());
          }
        };
        releaseResources = () => {
          renderer.setAnimationLoop(null);
          resizeObserver.disconnect();
          window.removeEventListener("pointermove", handlePointerMove);
          colorScheme.removeEventListener("change", handleThemeChange);
          nodes.dispose();
          nodeGeometry.dispose();
          nodeMaterial.dispose();
          anchorGeometry.dispose();
          anchorMaterial.dispose();
          lineGeometry.dispose();
          lineMaterial.dispose();
          renderer.dispose();
        };

        applyNodeColors();
        resizeRenderer();
        host.dataset.nodeCount = String(nodeCount);
        host.dataset.phase = stage;
        syncAnimation();
      } catch {
        initialized = false;
        host.dataset.renderer = "fallback";
      }
    }

    function handleVisibilityChange() {
      syncAnimation();
    }

    function handleMotionPreference() {
      if (motionPreference.matches) {
        host.dataset.renderer = "static";
        syncAnimation();
      } else if (visible) {
        void initializeField();
        syncAnimation();
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void initializeField();
        syncAnimation();
      },
      { rootMargin: "180px" },
    );
    intersectionObserver.observe(host);
    window.addEventListener("taste:motion-state", handleTasteState);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreference);
    host.dataset.renderer = "static";

    return () => {
      disposed = true;
      intersectionObserver.disconnect();
      window.removeEventListener("taste:motion-state", handleTasteState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionPreference);
      releaseResources();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="verdict-field"
      aria-hidden="true"
      data-phase="view"
      data-renderer="static"
    >
      <canvas className="verdict-field-canvas" />
      <div className="verdict-field-fallback">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
        <i />
      </div>
    </div>
  );
}
