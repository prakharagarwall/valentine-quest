"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  srcBase?: string; // base name like kiti_flying
  onEnd?: () => void;
};

export default function SplashVideo({ srcBase = 'kiti_flying', onEnd }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      videoRef.current?.play();
    } catch (e) {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        preload="auto"
        onEnded={() => onEnd && onEnd()}
        className="w-full h-full object-cover"
      >
        <source src={`/assets/${srcBase}_2160.mp4`} type="video/mp4" />
        <source src={`/assets/${srcBase}_2160.webm`} type="video/webm" />
        <source src={`/assets/${srcBase}_720.mp4`} type="video/mp4" />
      </video>

      {/* Title overlay: top-center, slightly smaller */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div className="text-center px-6 pt-12">
          <h1 className="mx-auto max-w-3xl text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-pink-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            Let&apos;s begin your love journey
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-white/90 backdrop-blur-sm bg-black/18 px-3 py-1 rounded-md inline-block font-medium">
            Close your eyes, take a breath — something magical awaits.
          </p>
        </div>
      </div>
    </div>
  );
}
