
import './orbitvisual.scss';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = {
  red: 0xb81104,
  black: 0x191817,
  cream: 0xfffacd,
} as const;

type ColorKey = keyof typeof COLORS;

type CubeBlock = {
  mesh: THREE.Mesh;
  color: ColorKey;
  index: number;
  home: THREE.Vector3;
  scatter: THREE.Vector3;
  orbitRadius: number;
  orbitAngle: number;
  orbitHeight: number;
};

const GRID = 5;
const INNER_GRID = 3;
const TOTAL_CUBES = GRID ** 3; // 125
const INNER_COUNT = INNER_GRID ** 3; // 27

const BLOCK_SIZE = 0.66;
const GAP = 0.025;

// Only the 27 cubes in the active inner formation are enlarged.
const OUTER_SCALE = 0.55; // Outer cubes: 55% of base size
const INNER_SCALE = 1.65; // Inner cubes: 165% of base size

const OUTER_SIZE = BLOCK_SIZE * OUTER_SCALE;
const INNER_SIZE = BLOCK_SIZE * INNER_SCALE;

const OUTER_STEP = OUTER_SIZE + GAP;
const INNER_STEP = INNER_SIZE + GAP;


const INTRO_DURATION = 1.6;
const PHASE_DURATION = 4;
const ASSEMBLE_FRACTION = 0.22;
const DISPERSE_FRACTION = 0.78;

const COLOR_ORDER: ColorKey[] = ['red', 'black', 'cream'];

export default function OrbitVisual() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let frameId = 0;
    let disposed = false;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(7.8, 7.7, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.6),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);

    host.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.7));

    const keyLight = new THREE.DirectionalLight(0xfff4df, 3.2);
    keyLight.position.set(-4, 6, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
    fillLight.position.set(5, 3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff4b35, 1.5);
    rimLight.position.set(2, 1, 5);
    scene.add(rimLight);

    const materials: Record<ColorKey, THREE.MeshPhysicalMaterial> = {
      red: new THREE.MeshPhysicalMaterial({
        color: COLORS.red,
        roughness: 0.25,
        metalness: 0.18,
        clearcoat: 0.75,
        clearcoatRoughness: 0.22,
      }),
      black: new THREE.MeshPhysicalMaterial({
        color: COLORS.black,
        roughness: 0.24,
        metalness: 0.3,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2,
      }),
      cream: new THREE.MeshPhysicalMaterial({
        color: COLORS.cream,
        roughness: 0.3,
        metalness: 0.08,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25,
      }),
    };

  const outerGeometry = new THREE.BoxGeometry(
    OUTER_SIZE,
    OUTER_SIZE,
    OUTER_SIZE,
  );

  const innerGeometry = new THREE.BoxGeometry(
    INNER_SIZE,
    INNER_SIZE,
    INNER_SIZE,
  );

    // Initial diagonal tilt — retained after every page refresh.
    const INITIAL_ROTATION_X = -0.25;
    const INITIAL_ROTATION_Y = 1.35;
    const INITIAL_ROTATION_Z = 0.9;

    const sculpture = new THREE.Group();
    sculpture.rotation.set(
      INITIAL_ROTATION_X,
      INITIAL_ROTATION_Y,
      INITIAL_ROTATION_Z,
    );
    scene.add(sculpture);

    const half = (GRID - 1) / 2;
    const innerHalf = (INNER_GRID - 1) / 2;

    // 125 cubes, distributed as evenly as possible across three colors.
    const colorAssignments: ColorKey[] = [
      ...Array<ColorKey>(42).fill('red'),
      ...Array<ColorKey>(42).fill('black'),
      ...Array<ColorKey>(41).fill('cream'),
    ];

    // Deterministic shuffle for a repeatable starting composition.
    for (let i = colorAssignments.length - 1; i > 0; i--) {
      const j = (i * 37 + 17) % (i + 1);

      [colorAssignments[i], colorAssignments[j]] = [
        colorAssignments[j],
        colorAssignments[i],
      ];
    }

    const blocks: CubeBlock[] = [];

    // Create all 125 individual cubes.
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        for (let z = 0; z < GRID; z++) {
          const index = x * GRID * GRID + y * GRID + z;
          const color = colorAssignments[index];

          const home = new THREE.Vector3(
            (x - half) * OUTER_STEP,
            (y - half) * OUTER_STEP,
            (z - half) * OUTER_STEP,
          );

          // Initial positions are spread in three dimensions.
          const angle = index * 2.399963;
          const scatterRadius = 3.2 + (index % 5) * 0.22;

          const scatter = new THREE.Vector3(
            Math.cos(angle) * scatterRadius,
            Math.sin(index * 1.73) * 2.5,
            Math.sin(angle) * scatterRadius,
          );

          const mesh = new THREE.Mesh(outerGeometry, materials[color]);

          mesh.position.copy(scatter);
          mesh.rotation.set(
            Math.sin(index * 0.41) * 0.55,
            Math.cos(index * 0.27) * 0.55,
            Math.sin(index * 0.19) * 0.25,
          );

          sculpture.add(mesh);

          blocks.push({
            mesh,
            color,
            index,
            home,
            scatter,
            orbitRadius: 3.6 + (index % 5) * 0.18,
            orbitAngle: angle,
            orbitHeight: Math.sin(index * 1.71) * 2.3,
          });
        }
      }
    }

    // Exact positions of a centered, solid 3x3x3 inner cube.
    const innerPositions: THREE.Vector3[] = [];

    for (let x = 0; x < INNER_GRID; x++) {
      for (let y = 0; y < INNER_GRID; y++) {
        for (let z = 0; z < INNER_GRID; z++) {
          innerPositions.push(
            new THREE.Vector3(
              (x - innerHalf) * INNER_STEP,
              (y - innerHalf) * INNER_STEP,
              (z - innerHalf) * INNER_STEP,
            ),
          );
        }
      }
    }

    // Assign exactly 27 fixed cubes to each color formation.
    // These assignments are created once, not recalculated every frame.
    const coreBlocks: Record<ColorKey, CubeBlock[]> = {
      red: blocks.filter((block) => block.color === 'red').slice(0, INNER_COUNT),
      black: blocks.filter((block) => block.color === 'black').slice(0, INNER_COUNT),
      cream: blocks.filter((block) => block.color === 'cream').slice(0, INNER_COUNT),
    };

    const corePositionByIndex = new Map<number, THREE.Vector3>();

    COLOR_ORDER.forEach((color) => {
      coreBlocks[color].forEach((block, index) => {
        corePositionByIndex.set(block.index, innerPositions[index]);
      });
    });

    const coreIndices: Record<ColorKey, Set<number>> = {
      red: new Set(coreBlocks.red.map((block) => block.index)),
      black: new Set(coreBlocks.black.map((block) => block.index)),
      cream: new Set(coreBlocks.cream.map((block) => block.index)),
    };

    // Pointer interaction
    let dragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    let dragRotationY = INITIAL_ROTATION_Y;
    let dragRotationX = INITIAL_ROTATION_X;
    let pointerRotationY = 0;
    let pointerRotationX = 0;

    let lastInteraction = performance.now();

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      lastInteraction = performance.now();

      try {
        host.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is optional.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        dragRotationY += (event.clientX - lastPointerX) * 0.008;
        dragRotationX += (event.clientY - lastPointerY) * 0.006;

        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
      } else {
        const bounds = host.getBoundingClientRect();

        if (bounds.width > 0 && bounds.height > 0) {
          const normalizedX =
            (event.clientX - bounds.left) / bounds.width - 0.5;
          const normalizedY =
            (event.clientY - bounds.top) / bounds.height - 0.5;

          pointerRotationY = normalizedX * 0.18;
          pointerRotationX = -normalizedY * 0.1;
        }
      }

      lastInteraction = performance.now();
    };

    const onPointerUp = () => {
      dragging = false;
    };

    host.addEventListener('pointerdown', onPointerDown);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerup', onPointerUp);
    host.addEventListener('pointercancel', onPointerUp);
    host.addEventListener('pointerleave', onPointerUp);

    // Responsive canvas
    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const startTime = performance.now();

    const easeInOut = (value: number) => {
      const t = THREE.MathUtils.clamp(value, 0, 1);
      return t * t * (3 - 2 * t);
    };

    const animate = () => {
      if (disposed) return;

      frameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;
      const isIntro = elapsed < INTRO_DURATION;

      const phaseTime = Math.max(0, elapsed - INTRO_DURATION);
      const phaseIndex =
        Math.floor(phaseTime / PHASE_DURATION) % COLOR_ORDER.length;
      const phaseProgress =
        (phaseTime % PHASE_DURATION) / PHASE_DURATION;

      const activeColor = COLOR_ORDER[phaseIndex];

      // Assemble at the beginning, hold the complete core, then disperse.
      const assembleProgress = easeInOut(
        phaseProgress / ASSEMBLE_FRACTION,
      );

      const disperseProgress = easeInOut(
        (phaseProgress - DISPERSE_FRACTION) /
          (1 - DISPERSE_FRACTION),
      );

      const introProgress = easeInOut(elapsed / INTRO_DURATION);

      blocks.forEach((block) => {
        const isActiveCore = coreIndices[activeColor].has(block.index);

        let targetPosition: THREE.Vector3;

        if (isIntro) {
          // Keep the initial scattered scene, then draw cubes inward slightly.
          targetPosition = block.scatter.clone().lerp(
            block.home,
            introProgress * 0.12,
          );
        } else if (isActiveCore) {
          // Each of the 27 active cubes has one unique inner-grid position.
          const coreTarget = corePositionByIndex.get(block.index)!;
          const orbitTarget = new THREE.Vector3(
            Math.cos(block.orbitAngle + elapsed * 0.22) *
              block.orbitRadius,
            block.orbitHeight +
              Math.sin(elapsed * 0.45 + block.index) * 0.18,
            Math.sin(block.orbitAngle + elapsed * 0.22) *
              block.orbitRadius,
          );

          // Core forms, stays together, then releases for the next phase.
          if (phaseProgress < ASSEMBLE_FRACTION) {
            targetPosition = orbitTarget.clone().lerp(
              coreTarget,
              assembleProgress,
            );
          } else if (phaseProgress < DISPERSE_FRACTION) {
            targetPosition = coreTarget;
          } else {
            targetPosition = coreTarget.clone().lerp(
              orbitTarget,
              disperseProgress,
            );
          }
        } else {
          // Inactive colors stay outside the central cube.
          const angle = block.orbitAngle + elapsed * 0.22;
          const radius = block.orbitRadius;

          targetPosition = new THREE.Vector3(
            Math.cos(angle) * radius,
            block.orbitHeight +
              Math.sin(elapsed * 0.45 + block.index) * 0.18,
            Math.sin(angle) * radius,
          );
        }

        // Enlarge only the active inner 3x3x3 formation.
        // All outer/inactive cubes smoothly return to their original size.
        const targetScale = isActiveCore && !isIntro ? INNER_SCALE / OUTER_SCALE : 1;
        const scaleBlend = 0.08;

        block.mesh.scale.x = THREE.MathUtils.lerp(
          block.mesh.scale.x,
          targetScale,
          scaleBlend,
        );
        block.mesh.scale.y = THREE.MathUtils.lerp(
          block.mesh.scale.y,
          targetScale,
          scaleBlend,
        );
        block.mesh.scale.z = THREE.MathUtils.lerp(
          block.mesh.scale.z,
          targetScale,
          scaleBlend,
        );

        // Smooth position changes without competing movement targets.
        const blend = isActiveCore ? 0.12 : 0.065;
        block.mesh.position.lerp(targetPosition, blend);

        if (isActiveCore && !isIntro && phaseProgress >= ASSEMBLE_FRACTION &&
            phaseProgress < DISPERSE_FRACTION) {
          // Align core blocks to form clean, square faces.
          block.mesh.rotation.x = THREE.MathUtils.lerp(
            block.mesh.rotation.x, 0, 0.12,
          );
          block.mesh.rotation.y = THREE.MathUtils.lerp(
            block.mesh.rotation.y, 0, 0.12,
          );
          block.mesh.rotation.z = THREE.MathUtils.lerp(
            block.mesh.rotation.z, 0, 0.12,
          );
        } else {
          // Subtle rotation for the surrounding blocks.
          block.mesh.rotation.x = THREE.MathUtils.lerp(
            block.mesh.rotation.x,
            Math.sin(elapsed * 0.6 + block.index) * 0.16,
            0.025,
          );
          block.mesh.rotation.y += 0.002;
          block.mesh.rotation.z = THREE.MathUtils.lerp(
            block.mesh.rotation.z,
            Math.cos(elapsed * 0.5 + block.index) * 0.1,
            0.025,
          );
        }
      });

      // Slow, continuous rotation of the entire sculpture.
      if (!dragging && performance.now() - lastInteraction > 1800) {
        dragRotationY += 0.00055;
      }

      sculpture.rotation.y = THREE.MathUtils.lerp(
        sculpture.rotation.y,
        dragRotationY + pointerRotationY,
        0.035,
      );

      sculpture.rotation.x = THREE.MathUtils.lerp(
        sculpture.rotation.x,
        dragRotationX + pointerRotationX,
        0.035,
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      host.removeEventListener('pointerdown', onPointerDown);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerup', onPointerUp);
      host.removeEventListener('pointercancel', onPointerUp);
      host.removeEventListener('pointerleave', onPointerUp);

      sculpture.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });

      outerGeometry.dispose();
      innerGeometry.dispose();

      Object.values(materials).forEach((material) => {
        material.dispose();
      });

      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="orbit-visual"
      ref={mountRef}
      role="img"
      aria-label="Interactive rotating 3D cube in AKETI red, near-black, and cream"
    />
  );
}





// import './orbitvisual.scss';
// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const COLORS = {
//   red: 0xb81104,
//   black: 0x191817,
//   cream: 0xfffacd,
// } as const;

// type ColorKey = keyof typeof COLORS;

// type CubeBlock = {
//   mesh: THREE.Mesh;
//   color: ColorKey;
//   index: number;
//   home: THREE.Vector3;
//   scatter: THREE.Vector3;
//   orbitRadius: number;
//   orbitAngle: number;
//   orbitHeight: number;
// };

// const GRID = 5;
// const INNER_GRID = 3;
// const TOTAL_CUBES = GRID ** 3; // 125
// const INNER_COUNT = INNER_GRID ** 3; // 27

// const BLOCK_SIZE = 0.66;
// const GAP = 0.025;

// // Only the 27 cubes in the active inner formation are enlarged.
// const OUTER_SCALE = 0.55; // Outer cubes: 55% of base size
// const INNER_SCALE = 1.65; // Inner cubes: 165% of base size

// const OUTER_SIZE = BLOCK_SIZE * OUTER_SCALE;
// const INNER_SIZE = BLOCK_SIZE * INNER_SCALE;

// const OUTER_STEP = OUTER_SIZE + GAP;
// const INNER_STEP = INNER_SIZE + GAP;


// const INTRO_DURATION = 1.6;
// const PHASE_DURATION = 4;
// const ASSEMBLE_FRACTION = 0.22;
// const DISPERSE_FRACTION = 0.78;

// const COLOR_ORDER: ColorKey[] = ['red', 'black', 'cream'];

// export default function OrbitVisual() {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const host = mountRef.current;
//     if (!host) return;

//     let frameId = 0;
//     let disposed = false;

//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
//     camera.position.set(6.6, 5.4, 9.5);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//       powerPreference: 'high-performance',
//     });

//     renderer.setPixelRatio(
//       Math.min(window.devicePixelRatio || 1, 1.6),
//     );
//     renderer.outputColorSpace = THREE.SRGBColorSpace;
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 1.08;
//     renderer.setClearColor(0x000000, 0);

//     host.appendChild(renderer.domElement);

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 1.7));

//     const keyLight = new THREE.DirectionalLight(0xfff4df, 3.2);
//     keyLight.position.set(-4, 6, 8);
//     scene.add(keyLight);

//     const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
//     fillLight.position.set(5, 3, -4);
//     scene.add(fillLight);

//     const rimLight = new THREE.DirectionalLight(0xff4b35, 1.5);
//     rimLight.position.set(2, 1, 5);
//     scene.add(rimLight);

//     const materials: Record<ColorKey, THREE.MeshPhysicalMaterial> = {
//       red: new THREE.MeshPhysicalMaterial({
//         color: COLORS.red,
//         roughness: 0.25,
//         metalness: 0.18,
//         clearcoat: 0.75,
//         clearcoatRoughness: 0.22,
//       }),
//       black: new THREE.MeshPhysicalMaterial({
//         color: COLORS.black,
//         roughness: 0.24,
//         metalness: 0.3,
//         clearcoat: 0.7,
//         clearcoatRoughness: 0.2,
//       }),
//       cream: new THREE.MeshPhysicalMaterial({
//         color: COLORS.cream,
//         roughness: 0.3,
//         metalness: 0.08,
//         clearcoat: 0.5,
//         clearcoatRoughness: 0.25,
//       }),
//     };

//   const outerGeometry = new THREE.BoxGeometry(
//     OUTER_SIZE,
//     OUTER_SIZE,
//     OUTER_SIZE,
//   );

//   const innerGeometry = new THREE.BoxGeometry(
//     INNER_SIZE,
//     INNER_SIZE,
//     INNER_SIZE,
//   );

//     // Initial diagonal tilt — retained after every page refresh.
//     const INITIAL_ROTATION_X = -0.45;
//     const INITIAL_ROTATION_Y = 0.35;

//     const sculpture = new THREE.Group();
//     sculpture.rotation.set(
//       INITIAL_ROTATION_X,
//       INITIAL_ROTATION_Y,
//       0,
//     );
//     scene.add(sculpture);

//     const half = (GRID - 1) / 2;
//     const innerHalf = (INNER_GRID - 1) / 2;

//     // 125 cubes, distributed as evenly as possible across three colors.
//     const colorAssignments: ColorKey[] = [
//       ...Array<ColorKey>(42).fill('red'),
//       ...Array<ColorKey>(42).fill('black'),
//       ...Array<ColorKey>(41).fill('cream'),
//     ];

//     // Deterministic shuffle for a repeatable starting composition.
//     for (let i = colorAssignments.length - 1; i > 0; i--) {
//       const j = (i * 37 + 17) % (i + 1);

//       [colorAssignments[i], colorAssignments[j]] = [
//         colorAssignments[j],
//         colorAssignments[i],
//       ];
//     }

//     const blocks: CubeBlock[] = [];

//     // Create all 125 individual cubes.
//     for (let x = 0; x < GRID; x++) {
//       for (let y = 0; y < GRID; y++) {
//         for (let z = 0; z < GRID; z++) {
//           const index = x * GRID * GRID + y * GRID + z;
//           const color = colorAssignments[index];

//           const home = new THREE.Vector3(
//             (x - half) * OUTER_STEP,
//             (y - half) * OUTER_STEP,
//             (z - half) * OUTER_STEP,
//           );

//           // Initial positions are spread in three dimensions.
//           const angle = index * 2.399963;
//           // Spread the small cubes across the full hero width.
//           // The inner formation remains anchored in the right-side visual area.
//           const spreadX = ((index % GRID) / (GRID - 1)) * 20 - 10;
//           const spreadY = Math.sin(index * 1.73) * 2.8;
//           const spreadZ = Math.cos(index * 2.399963) * (2.4 + (index % 4) * 0.35);

//           const scatter = new THREE.Vector3(
//             spreadX,
//             spreadY,
//             spreadZ,
//           );

//           const mesh = new THREE.Mesh(outerGeometry, materials[color]);

//           mesh.position.copy(scatter);
//           mesh.rotation.set(
//             Math.sin(index * 0.41) * 0.55,
//             Math.cos(index * 0.27) * 0.55,
//             Math.sin(index * 0.19) * 0.25,
//           );

//           sculpture.add(mesh);

//           blocks.push({
//             mesh,
//             color,
//             index,
//             home,
//             scatter,
//             orbitRadius: 3.6 + (index % 5) * 0.18,
//             orbitAngle: angle,
//             orbitHeight: Math.sin(index * 1.71) * 2.3,
//           });
//         }
//       }
//     }

//     // Exact positions of a centered, solid 3x3x3 inner cube.
//     const innerPositions: THREE.Vector3[] = [];

//     for (let x = 0; x < INNER_GRID; x++) {
//       for (let y = 0; y < INNER_GRID; y++) {
//         for (let z = 0; z < INNER_GRID; z++) {
//           innerPositions.push(
//             new THREE.Vector3(
//               2.6 + (x - innerHalf) * INNER_STEP,
//               (y - innerHalf) * INNER_STEP,
//               (z - innerHalf) * INNER_STEP,
//             ),
//           );
//         }
//       }
//     }

//     // Assign exactly 27 fixed cubes to each color formation.
//     // These assignments are created once, not recalculated every frame.
//     const coreBlocks: Record<ColorKey, CubeBlock[]> = {
//       red: blocks.filter((block) => block.color === 'red').slice(0, INNER_COUNT),
//       black: blocks.filter((block) => block.color === 'black').slice(0, INNER_COUNT),
//       cream: blocks.filter((block) => block.color === 'cream').slice(0, INNER_COUNT),
//     };

//     const corePositionByIndex = new Map<number, THREE.Vector3>();

//     COLOR_ORDER.forEach((color) => {
//       coreBlocks[color].forEach((block, index) => {
//         corePositionByIndex.set(block.index, innerPositions[index]);
//       });
//     });

//     const coreIndices: Record<ColorKey, Set<number>> = {
//       red: new Set(coreBlocks.red.map((block) => block.index)),
//       black: new Set(coreBlocks.black.map((block) => block.index)),
//       cream: new Set(coreBlocks.cream.map((block) => block.index)),
//     };

//     // Pointer interaction
//     let dragging = false;
//     let lastPointerX = 0;
//     let lastPointerY = 0;

//     let dragRotationY = INITIAL_ROTATION_Y;
//     let dragRotationX = INITIAL_ROTATION_X;
//     let pointerRotationY = 0;
//     let pointerRotationX = 0;

//     let lastInteraction = performance.now();

//     const onPointerDown = (event: PointerEvent) => {
//       dragging = true;
//       lastPointerX = event.clientX;
//       lastPointerY = event.clientY;
//       lastInteraction = performance.now();

//       try {
//         host.setPointerCapture(event.pointerId);
//       } catch {
//         // Pointer capture is optional.
//       }
//     };

//     const onPointerMove = (event: PointerEvent) => {
//       if (dragging) {
//         dragRotationY += (event.clientX - lastPointerX) * 0.008;
//         dragRotationX += (event.clientY - lastPointerY) * 0.006;

//         lastPointerX = event.clientX;
//         lastPointerY = event.clientY;
//       } else {
//         const bounds = host.getBoundingClientRect();

//         if (bounds.width > 0 && bounds.height > 0) {
//           const normalizedX =
//             (event.clientX - bounds.left) / bounds.width - 0.5;
//           const normalizedY =
//             (event.clientY - bounds.top) / bounds.height - 0.5;

//           pointerRotationY = normalizedX * 0.18;
//           pointerRotationX = -normalizedY * 0.1;
//         }
//       }

//       lastInteraction = performance.now();
//     };

//     const onPointerUp = () => {
//       dragging = false;
//     };

//     host.addEventListener('pointerdown', onPointerDown);
//     host.addEventListener('pointermove', onPointerMove);
//     host.addEventListener('pointerup', onPointerUp);
//     host.addEventListener('pointercancel', onPointerUp);
//     host.addEventListener('pointerleave', onPointerUp);

//     // Responsive canvas
//     const resize = () => {
//       const width = Math.max(host.clientWidth, 1);
//       const height = Math.max(host.clientHeight, 1);

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     const resizeObserver = new ResizeObserver(resize);
//     resizeObserver.observe(host);
//     resize();

//     const startTime = performance.now();

//     const easeInOut = (value: number) => {
//       const t = THREE.MathUtils.clamp(value, 0, 1);
//       return t * t * (3 - 2 * t);
//     };

//     const animate = () => {
//       if (disposed) return;

//       frameId = requestAnimationFrame(animate);

//       const elapsed = (performance.now() - startTime) / 1000;
//       const isIntro = elapsed < INTRO_DURATION;

//       const phaseTime = Math.max(0, elapsed - INTRO_DURATION);
//       const phaseIndex =
//         Math.floor(phaseTime / PHASE_DURATION) % COLOR_ORDER.length;
//       const phaseProgress =
//         (phaseTime % PHASE_DURATION) / PHASE_DURATION;

//       const activeColor = COLOR_ORDER[phaseIndex];

//       // Assemble at the beginning, hold the complete core, then disperse.
//       const assembleProgress = easeInOut(
//         phaseProgress / ASSEMBLE_FRACTION,
//       );

//       const disperseProgress = easeInOut(
//         (phaseProgress - DISPERSE_FRACTION) /
//           (1 - DISPERSE_FRACTION),
//       );

//       const introProgress = easeInOut(elapsed / INTRO_DURATION);

//       blocks.forEach((block) => {
//         const isActiveCore = coreIndices[activeColor].has(block.index);

//         let targetPosition: THREE.Vector3;

//         if (isIntro) {
//           // Keep the initial scattered scene, then draw cubes inward slightly.
//           targetPosition = block.scatter.clone().lerp(
//             block.home,
//             introProgress * 0.12,
//           );
//         } else if (isActiveCore) {
//           // Each of the 27 active cubes has one unique inner-grid position.
//           const coreTarget = corePositionByIndex.get(block.index)!;
//           const orbitTarget = new THREE.Vector3(
//             ((block.index % GRID) / (GRID - 1)) * 20 - 10,
//             block.orbitHeight * 0.72 +
//               Math.sin(elapsed * 0.45 + block.index) * 0.18,
//             Math.cos(block.orbitAngle + elapsed * 0.12) *
//               (2.4 + (block.index % 4) * 0.35),
//           );

//           // Core forms, stays together, then releases for the next phase.
//           if (phaseProgress < ASSEMBLE_FRACTION) {
//             targetPosition = orbitTarget.clone().lerp(
//               coreTarget,
//               assembleProgress,
//             );
//           } else if (phaseProgress < DISPERSE_FRACTION) {
//             targetPosition = coreTarget;
//           } else {
//             targetPosition = coreTarget.clone().lerp(
//               orbitTarget,
//               disperseProgress,
//             );
//           }
//         } else {
//           // Inactive colors stay outside the central cube.
//           const angle = block.orbitAngle + elapsed * 0.12;
//           const spreadX = ((block.index % GRID) / (GRID - 1)) * 20 - 10;

//           targetPosition = new THREE.Vector3(
//             spreadX + Math.sin(angle) * 0.45,
//             block.orbitHeight * 0.72 +
//               Math.sin(elapsed * 0.45 + block.index) * 0.18,
//             Math.cos(angle) * (2.4 + (block.index % 4) * 0.35),
//           );
//         }

//         // Enlarge only the active inner 3x3x3 formation.
//         // All outer/inactive cubes smoothly return to their original size.
//         const targetScale = isActiveCore && !isIntro ? INNER_SCALE / OUTER_SCALE : 1;
//         const scaleBlend = 0.08;

//         block.mesh.scale.x = THREE.MathUtils.lerp(
//           block.mesh.scale.x,
//           targetScale,
//           scaleBlend,
//         );
//         block.mesh.scale.y = THREE.MathUtils.lerp(
//           block.mesh.scale.y,
//           targetScale,
//           scaleBlend,
//         );
//         block.mesh.scale.z = THREE.MathUtils.lerp(
//           block.mesh.scale.z,
//           targetScale,
//           scaleBlend,
//         );

//         // Smooth position changes without competing movement targets.
//         const blend = isActiveCore ? 0.12 : 0.065;
//         block.mesh.position.lerp(targetPosition, blend);

//         if (isActiveCore && !isIntro && phaseProgress >= ASSEMBLE_FRACTION &&
//             phaseProgress < DISPERSE_FRACTION) {
//           // Align core blocks to form clean, square faces.
//           block.mesh.rotation.x = THREE.MathUtils.lerp(
//             block.mesh.rotation.x, 0, 0.12,
//           );
//           block.mesh.rotation.y = THREE.MathUtils.lerp(
//             block.mesh.rotation.y, 0, 0.12,
//           );
//           block.mesh.rotation.z = THREE.MathUtils.lerp(
//             block.mesh.rotation.z, 0, 0.12,
//           );
//         } else {
//           // Subtle rotation for the surrounding blocks.
//           block.mesh.rotation.x = THREE.MathUtils.lerp(
//             block.mesh.rotation.x,
//             Math.sin(elapsed * 0.6 + block.index) * 0.16,
//             0.025,
//           );
//           block.mesh.rotation.y += 0.002;
//           block.mesh.rotation.z = THREE.MathUtils.lerp(
//             block.mesh.rotation.z,
//             Math.cos(elapsed * 0.5 + block.index) * 0.1,
//             0.025,
//           );
//         }
//       });

//       // Slow, continuous rotation of the entire sculpture.
//       if (!dragging && performance.now() - lastInteraction > 1800) {
//         dragRotationY += 0.00055;
//       }

//       sculpture.rotation.y = THREE.MathUtils.lerp(
//         sculpture.rotation.y,
//         dragRotationY + pointerRotationY,
//         0.035,
//       );

//       sculpture.rotation.x = THREE.MathUtils.lerp(
//         sculpture.rotation.x,
//         dragRotationX + pointerRotationX,
//         0.035,
//       );

//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       disposed = true;
//       cancelAnimationFrame(frameId);
//       resizeObserver.disconnect();

//       host.removeEventListener('pointerdown', onPointerDown);
//       host.removeEventListener('pointermove', onPointerMove);
//       host.removeEventListener('pointerup', onPointerUp);
//       host.removeEventListener('pointercancel', onPointerUp);
//       host.removeEventListener('pointerleave', onPointerUp);

//       sculpture.traverse((object) => {
//         if (object instanceof THREE.Mesh) {
//           object.geometry.dispose();
//         }
//       });

//       outerGeometry.dispose();
//       innerGeometry.dispose();

//       Object.values(materials).forEach((material) => {
//         material.dispose();
//       });

//       renderer.dispose();

//       if (renderer.domElement.parentNode === host) {
//         host.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="orbit-visual"
//       ref={mountRef}
//       role="img"
//       aria-label="Interactive rotating 3D cube in AKETI red, near-black, and cream"
//     />
//   );
// }
