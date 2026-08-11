import { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

   
    // SCENE
    

    const scene = new THREE.Scene();

    
    // CAMERA
    

    const camera = new THREE.PerspectiveCamera(
      34,
      1,
      0.1,
      100
    );

    camera.position.set(5.5, 4.2, 7);
    camera.lookAt(0, 0, 0);

   
    // RENDERER
    

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(450, 450);

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;

    container.appendChild(
      renderer.domElement
    );

   
    // MAIN CUBE GROUP
   

    const cubeGroup = new THREE.Group();

    cubeGroup.rotation.x = -0.35;
    cubeGroup.rotation.y = 0.45;

    scene.add(cubeGroup);

 
    // MATERIALS
    

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x080808,
        roughness: 0.32,
        metalness: 0.55,
      }),

      new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.38,
        metalness: 0.45,
      }),

      new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.45,
        metalness: 0.35,
      }),

      new THREE.MeshStandardMaterial({
        color: 0x0b0b0b,
        roughness: 0.28,
        metalness: 0.6,
      }),
    ];

   // BLOCK GEOMETRY
    

    const blockGeometry =
      new THREE.BoxGeometry(
        0.78,
        0.78,
        0.78
      );

    const spacing = 0.86;

   
    // CUBIES
    

    const cubies = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const material =
            materials[
              Math.floor(
                Math.random() *
                  materials.length
              )
            ];

          const cubie =
            new THREE.Mesh(
              blockGeometry,
              material
            );

          cubie.position.set(
            x * spacing,
            y * spacing,
            z * spacing
          );

          cubie.castShadow = true;
          cubie.receiveShadow = true;

          // Logical Rubik coordinates
          cubie.userData.grid = {
            x,
            y,
            z,
          };

          cubeGroup.add(cubie);

          cubies.push(cubie);
        }
      }
    }

    // LIGHTING
    

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.15
      );

    scene.add(ambientLight);

    const mainLight =
      new THREE.DirectionalLight(
        0xffffff,
        4.5
      );

    mainLight.position.set(
      4,
      6,
      5
    );

    mainLight.castShadow = true;

    scene.add(mainLight);

    const sideLight =
      new THREE.DirectionalLight(
        0xffffff,
        2
      );

    sideLight.position.set(
      -5,
      2,
      -4
    );

    scene.add(sideLight);

    const topLight =
      new THREE.PointLight(
        0xffffff,
        2,
        15
      );

    topLight.position.set(
      0,
      6,
      2
    );

    scene.add(topLight);

   
    // SLICE MOVE SYSTEM
    

    let currentMove = null;

    const moveDuration = 650;

    const moveQueue = [];

    // Random Rubik moves
    const createMove = () => {
      const axes = ["x", "y", "z"];

      const axis =
        axes[
          Math.floor(
            Math.random() *
              axes.length
          )
        ];

      const layer =
        Math.floor(
          Math.random() * 3
        ) - 1;

      const direction =
        Math.random() > 0.5
          ? 1
          : -1;

      return {
        axis,
        layer,
        direction,
      };
    };

    // Fill initial queue
    for (let i = 0; i < 5; i++) {
      moveQueue.push(
        createMove()
      );
    }

    // ==========================================
    // START SLICE MOVE
    // ==========================================

    const startMove = (move) => {
      const sliceGroup =
        new THREE.Group();

      cubeGroup.add(
        sliceGroup
      );

      const selected = cubies.filter(
        (cubie) =>
          cubie.userData.grid[
            move.axis
          ] === move.layer
      );

      // Move selected cubies
      selected.forEach(
        (cubie) => {
          sliceGroup.attach(
            cubie
          );
        }
      );

      currentMove = {
        ...move,
        sliceGroup,
        selected,
        startTime:
          performance.now(),
      };
    };

   
    // FINISH SLICE MOVE
    

    const finishMove = () => {
      if (!currentMove) return;

      const {
        axis,
        direction,
        sliceGroup,
        selected,
      } = currentMove;

      // Attach blocks back
      selected.forEach(
        (cubie) => {
          cubeGroup.attach(
            cubie
          );
        }
      );

      // Update logical coordinates
      selected.forEach(
        (cubie) => {
          const {
            x,
            y,
            z,
          } = cubie.userData.grid;

          let nx = x;
          let ny = y;
          let nz = z;

          if (axis === "x") {
            if (direction === 1) {
              ny = -z;
              nz = y;
            } else {
              ny = z;
              nz = -y;
            }
          }

          if (axis === "y") {
            if (direction === 1) {
              nx = z;
              nz = -x;
            } else {
              nx = -z;
              nz = x;
            }
          }

          if (axis === "z") {
            if (direction === 1) {
              nx = -y;
              ny = x;
            } else {
              nx = y;
              ny = -x;
            }
          }

          cubie.userData.grid = {
            x: nx,
            y: ny,
            z: nz,
          };

          // Snap position
          cubie.position.set(
            nx * spacing,
            ny * spacing,
            nz * spacing
          );
        }
      );

      // Dispose temporary group
      cubeGroup.remove(
        sliceGroup
      );

      currentMove = null;
    };

  
    // EASING


    const easeInOut = (t) => {
      return (
        t < 0.5
          ? 2 * t * t
          : 1 -
            Math.pow(
              -2 * t + 2,
              2
            ) / 2
      );
    };

    
    // ANIMATION
   

    let animationId;

    const clock =
      new THREE.Clock();

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      const time =
        clock.getElapsedTime();

      
      // WHOLE CUBE TUMBLE
     

      cubeGroup.rotation.y =
        time * 0.18;

      cubeGroup.rotation.x =
        -0.35 +
        Math.sin(
          time * 0.3
        ) *
          0.35;

      cubeGroup.rotation.z =
        Math.sin(
          time * 0.22
        ) *
          0.18;

     
      // SLICE ANIMATION
     

      if (!currentMove) {
        if (
          moveQueue.length === 0
        ) {
          moveQueue.push(
            createMove()
          );
        }

        startMove(
          moveQueue.shift()
        );
      }

      if (currentMove) {
        const elapsed =
          performance.now() -
          currentMove.startTime;

        const progress =
          Math.min(
            elapsed /
              moveDuration,
            1
          );

        const eased =
          easeInOut(
            progress
          );

        const angle =
          currentMove.direction *
          (Math.PI / 2) *
          eased;

        if (
          currentMove.axis ===
          "x"
        ) {
          currentMove.sliceGroup.rotation.x =
            angle;
        }

        if (
          currentMove.axis ===
          "y"
        ) {
          currentMove.sliceGroup.rotation.y =
            angle;
        }

        if (
          currentMove.axis ===
          "z"
        ) {
          currentMove.sliceGroup.rotation.z =
            angle;
        }

        if (progress >= 1) {
          finishMove();

          // Small pause before next move
          setTimeout(() => {
            moveQueue.push(
              createMove()
            );
          }, 300);
        }
      }

     
      // FLOAT
     

      cubeGroup.position.y =
        Math.sin(
          time * 0.8
        ) *
          0.08;

      
      // RENDER
      

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // CLEANUP
    

    return () => {
      cancelAnimationFrame(
        animationId
      );

      blockGeometry.dispose();

      materials.forEach(
        (material) => {
          material.dispose();
        }
      );

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
  <div
  ref={containerRef}
  className="flex h-[300px] w-[300px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]"
/>
  );
};

export default Cube3D;