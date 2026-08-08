"use client";

import React from "react";
import { LazyMotion } from "motion/react";

// Async feature loading: the animation feature bundle ships as its own
// deferred chunk instead of riding in the main bundle with the full
// <motion.*> runtime. domMax because turnaround.tsx and timeline.tsx use
// layoutId (layout animations need it); it is a superset of domAnimation.
const loadFeatures = () => import("motion/react").then((m) => m.domMax);

/**
 * Wraps an animated subtree so `m.*` components render with lazily-loaded
 * features. `strict` throws if a plain `<motion.*>` sneaks back in, which
 * would silently reinflate the bundle.
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => (
   <LazyMotion features={loadFeatures} strict>
      {children}
   </LazyMotion>
);
