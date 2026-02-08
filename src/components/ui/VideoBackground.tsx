"use client";

import React from "react";

export default function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Full-screen background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source src="/assets/heart.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.12) 100%)',
          backdropFilter: 'blur(1px)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
