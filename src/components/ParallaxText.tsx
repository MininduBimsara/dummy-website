"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface ParallaxTextProps {
  progress: MotionValue<number>;
  inputRange: number[];
  opacityRange?: number[];
  yRange?: string[];
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxText({
  progress,
  inputRange,
  opacityRange = [0, 1, 1, 0],
  yRange = ["50px", "0px", "0px", "-50px"],
  children,
  className = "",
}: ParallaxTextProps) {
  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex items-center justify-center p-8 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
