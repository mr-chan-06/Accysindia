"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && mounted) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value, mounted]);

  useEffect(() => {
    if (!mounted) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Intl.NumberFormat("en-IN").format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix, prefix, mounted]);

  return (
    <span ref={ref}>
      {mounted ? `${prefix}0${suffix}` : `${prefix}${Intl.NumberFormat("en-IN").format(value)}${suffix}`}
    </span>
  );
}

