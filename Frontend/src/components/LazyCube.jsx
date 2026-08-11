import { lazy, Suspense, useEffect, useState } from "react";

const Cube3D = lazy(() => import("./Cube3D"));

const LazyCube = () => {
  const [showCube, setShowCube] = useState(false);

  useEffect(() => {
    const loadCube = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(
          () => {
            setShowCube(true);
          },
          {
            timeout: 2000,
          }
        );
      } else {
        setTimeout(() => {
          setShowCube(true);
        }, 1000);
      }
    };

    if (document.readyState === "complete") {
      loadCube();
    } else {
      window.addEventListener("load", loadCube);
    }

    return () => {
      window.removeEventListener("load", loadCube);
    };
  }, []);

  if (!showCube) {
    return (
      <div className="h-[320px] w-[320px]" />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-[320px] w-[320px]" />
      }
    >
      <Cube3D />
    </Suspense>
  );
};

export default LazyCube;