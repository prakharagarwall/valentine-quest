"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { BF_NAME, GF_NAME, SNARKY_COMMENTS, VICTORY_DATE_PLAN } from "@/lib/constants";
import { I_LOVE_YOU_100 } from '@/lib/i-love-you-100';
import { Heart, Calendar, Gift, Star } from "lucide-react";

export default function FinalProposal({ score }: { score: number }) {
  const [destiny, setDestiny] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [snarky, setSnarky] = useState("");
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const noClickCountRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const moveNoButton = () => {
    noClickCountRef.current += 1;
    // shrink faster but not smaller than 40%
    const newScale = Math.max(0.4, 1 - noClickCountRef.current * 0.2);
    setNoScale(newScale);

    let newX = 0;
    let newY = 0;
    let tries = 0;

    const yesRect = yesButtonRef.current ? yesButtonRef.current.getBoundingClientRect() : null;

    do {
      // more aggressive movement range for mobile
      newX = Math.random() * 440 - 220;
      newY = Math.random() * 320 - 160;

      // clamp so the button stays on screen
      if (noButtonRef.current) {
        const rect = noButtonRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const padding = 12; // keep some padding from edges
        const minX = padding - rect.left;
        const maxX = vw - padding - rect.right;
        const minY = padding - rect.top;
        const maxY = vh - padding - rect.bottom;
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        // If we have yesRect, check predicted overlap and retry
        if (yesRect) {
          const predictedLeft = rect.left + (newX - (noPos?.x ?? 0));
          const predictedTop = rect.top + (newY - (noPos?.y ?? 0));
          const predictedRight = predictedLeft + rect.width;
          const predictedBottom = predictedTop + rect.height;

          const overlap = !(predictedRight < yesRect.left || predictedLeft > yesRect.right || predictedBottom < yesRect.top || predictedTop > yesRect.bottom);
          if (!overlap) break;
        } else {
          break;
        }
      }

      tries += 1;
    } while (tries < 8);

    setNoPos({ x: newX, y: newY });
    setSnarky(SNARKY_COMMENTS[Math.floor(Math.random() * SNARKY_COMMENTS.length)]);
  };

  const trigger = () => {
    setSuccess(true);
    const end = Date.now() + 4000;
    const frame = () => {
      confetti({ particleCount: 8, spread: 60, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const checkCollision = (_event: any, info: any) => {
    if (!targetRef.current) return;
    const targetRect = targetRef.current.getBoundingClientRect();
    const x = info.point.x;
    const y = info.point.y;
    if (x >= targetRect.left && x <= targetRect.right && y >= targetRect.top && y <= targetRect.bottom) {
      trigger();
    }
  };

  if (success)
    return (
      <>
        {/* Background floating hearts */}
        <div className="pointer-events-none absolute inset-0 w-full h-full">
          {Array.from({ length: 12 }, (_, i) => {
            const x = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 8 + Math.random() * 4;
            return (
              <motion.div
                key={i}
                initial={{ y: '110vh', x: `${x}vw`, opacity: 0 }}
                animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay,
                }}
                style={{
                  position: 'absolute',
                  fontSize: '2.25rem',
                  color: 'rgba(251, 113, 133, 0.6)',
                }}
              >
                ❤️
              </motion.div>
            );
          })}
        </div>
        {/* Prize receipt card */}
        <div className="bg-white/90 p-10 rounded-3xl text-center shadow-2xl border-8 border-rose-300 max-w-lg relative overflow-hidden z-10">
        <div>
          <h1 className="text-6xl text-rose-600 font-serif mb-4 font-black">MAHAL KITA!</h1>
          <div className="bg-rose-50 p-6 rounded-2xl text-left border-2 border-rose-200 space-y-4 shadow-inner">
            <h3 className="font-bold text-center border-b pb-2">🏆 PRIZE RECEIPT 🏆</h3>
            <div className="flex gap-3">
              <Heart className="text-red-500" /> <p className="font-bold">Official Valentine Status</p>
            </div>
            <div className="flex gap-3">
              <Calendar className="text-rose-500" /> <p className="font-bold">14th Night: {VICTORY_DATE_PLAN.location}</p>
            </div>
            <div className="flex gap-3">
              <Gift className="text-purple-500" /> <p className="font-bold">30-Min Massage (from {BF_NAME})</p>
            </div>
            {score >= 20 && (
              <div className="flex gap-3 text-orange-600">
                <Star /> <p className="font-bold">Marathon Voucher! Redeemable Later!! ❤️</p>
              </div>
            )}
          </div>
          <p className="mt-8 text-xs text-gray-400">Final Score: {score} | Screenshot for proof! ❤️</p>
        </div>
        </div>
      </>
    );

  return (
    <div className="text-center w-full max-w-2xl relative overflow-visible">
      {snarky && (
        <div className="absolute -top-32 left-0 right-0 text-red-600 font-bold text-2xl drop-shadow-md">{snarky}</div>
      )}


      {!destiny ? (
        <>
          <h1 className="text-6xl text-white font-bold mb-16 drop-shadow-lg">Will you be my Valentine? 🌹</h1>
          <div className="flex gap-8 justify-center items-center h-auto relative overflow-visible min-h-24">
            <button
              ref={yesButtonRef}
              onClick={() => setDestiny(true)}
              className="bg-green-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:bg-green-600 transition-colors shadow-lg w-44"
            >
              YES!
            </button>

            <button
              ref={noButtonRef}
              onMouseMove={(e) => {
                if (!noButtonRef.current) return;
                const rect = (noButtonRef.current as HTMLButtonElement).getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
                // larger radius so it escapes earlier
                if (dist < 140) moveNoButton();
              }}
              onTouchStart={(e) => {
                // when touched, immediately run away
                e.preventDefault();
                moveNoButton();
              }}
              onTouchMove={(e) => {
                // also react to touchmove positions
                const t = e.touches && e.touches[0];
                if (!t || !noButtonRef.current) return;
                const rect = (noButtonRef.current as HTMLButtonElement).getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(t.clientX - cx, t.clientY - cy);
                if (dist < 140) moveNoButton();
              }}
              onClick={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`, willChange: 'transform', transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              className="bg-red-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:bg-red-600 transition-all duration-150 shadow-lg w-44 fixed md:absolute"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <div className="relative w-full h-40 flex items-center justify-between px-10">
          <div ref={targetRef} className={`text-4xl transition-all duration-300 ${isDragging ? 'ring-4 ring-rose-400/40 scale-105 animate-pulse' : ''}`} data-bf>
            🤵 {BF_NAME}
          </div>

          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.25}
            dragConstraints={{ left: -300, right: 300, top: -160, bottom: 160 }}
            whileDrag={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => { setIsDragging(false); checkCollision(e, info); }}
            style={{ touchAction: 'none' }}
          >
            <div className="text-4xl cursor-grab select-none">👸 {GF_NAME}
              <div className="text-xs block">DRAG</div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
