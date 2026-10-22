"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { AppMockup } from "./AppMockup";

/** The hero phone, resting at an angle and turning a few degrees toward the pointer. */
export function HeroPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-22, -8]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, 2]), { stiffness: 120, damping: 18 });

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative mx-auto w-[min(78vw,320px)] [perspective:1800px] lg:w-[330px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, rotateZ: 6 }}
        animate={{ opacity: 1, y: 0, rotateZ: 3 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      >
        <div className="animate-float">
          <AppMockup />
        </div>
      </motion.div>
    </div>
  );
}
