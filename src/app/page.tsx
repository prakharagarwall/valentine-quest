'use client';

import { useState, useEffect } from "react";
import { sounds } from "@/lib/sounds";

import LockScreen from "@/components/quest/LockScreen";
import NaughtyQuiz from "@/components/quest/NaughtyQuiz";
import PrepList from "@/components/quest/PrepList";
import HeartCatcher from "@/components/quest/HeartCatcher";
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ScratchCard from "@/components/quest/ScratchCard";
import SafeVault from "@/components/quest/SafeVault";
import FinalProposal from "@/components/quest/FinalProposal";
import FloatingHearts from "@/components/ui/FloatingHearts";
import FlyingLoveLanguages from "@/components/ui/FlyingLoveLanguages";
import VideoBackground from "@/components/ui/VideoBackground";

export default function ValentineQuest() {
  const [stage, setStage] = useState("lock");
  const [score, setScore] = useState(0);
  // Shared heart positions for both animations
  const [hearts, setHearts] = useState(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 4,
  })));

  useEffect(() => {
    // Play background music on app mount
    if (typeof window !== 'undefined') {
      sounds.bgMusic.play();
    }
    return () => {
      sounds.bgMusic.stop();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 flex items-center justify-center p-6 overflow-hidden">
      <VideoBackground />
      {stage === 'lock' && (
        <>
          <FloatingHearts hearts={hearts} />
          <FlyingLoveLanguages />
        </>
      )}
      <div className="w-full max-w-3xl flex items-center justify-center relative z-10">
        {stage === "lock" && <LockScreen onUnlock={() => setStage("quiz")} />}
        {stage === "quiz" && <NaughtyQuiz onComplete={() => setStage("prep")} />}
        {stage === "prep" && <PrepList onComplete={() => setStage("game")} />}
        {stage === "game" && (
          <ErrorBoundary onReset={() => setStage('prep')}>
            <HeartCatcher onFinish={(s: number) => { setScore(s); setStage("scratch"); }} onLose={() => setStage('prep')} />
          </ErrorBoundary>
        )}
        {stage === "scratch" && <ScratchCard score={score} onComplete={() => setStage("safe")} />}
        {stage === "safe" && <SafeVault onUnlock={() => setStage("proposal")} />}
        {stage === "proposal" && <FinalProposal score={score} />}
      </div>
    </main>
  );
}
