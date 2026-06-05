"use client";

import React from "react";

export default function Watermark() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] select-none overflow-hidden">
      <img
        src="/eagles-logo.png"
        alt="Watermark"
        className="w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] object-contain opacity-[0.07] dark:opacity-[0.035] select-none transition-all duration-300"
        draggable={false}
      />
    </div>
  );
}
