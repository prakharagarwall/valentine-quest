# Valentine Quest

This repository contains a modular, client-side Next.js + Tailwind project scaffold for a playful "Valentine Quest" experience. Copy the files into your Next.js app or use this project directly.

Quick start
```bash
npm install
npm run dev
```

Prerequisites
```bash
npm install framer-motion lucide-react canvas-confetti howler
npm install -D @types/canvas-confetti @types/howler
```

Folder notes
- Put photos/videos/audio in `public/assets/` (e.g. `kiti-prakhar.jpg`, `proposal-bg.mp4`, `victory-sound.mp3`).

Overview
This repo is organized so each screen is a separate component under `src/components/quest/`. Shared UI components live in `src/components/ui/`. Personalizable values and answers live in `src/lib/constants.ts`. Use `.env.local` to hide sensitive answers on GitHub and Vercel.

Included code snippets
Below are the main files and suggested implementations to paste into your project. They are modular and use `framer-motion`, `lucide-react`, `canvas-confetti`, and `howler` for sound.

1) `src/lib/constants.ts` (personalized data)
```ts
export const GF_NAME = "Kiti";
export const BF_NAME = "Prakhar";
export const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || "iloveyou";

export const SAFE_ANSWERS = {
	trip: process.env.NEXT_PUBLIC_TRIP_ANSWER || "yellowstone",
	anniv: process.env.NEXT_PUBLIC_ANNIV_ANSWER || "0225"
};

export const PREP_LIST = [
	"Candles", "Handcuffs", "No Sleep", "Whipped Cream", "Your undivided attention"
];

export const FLOATING_OBJECTS = [
	"Mahal Kita", "❤️", "Sinta", "💃", "Irog", "💖", "Pangga", "🕺", "Maging Akin Ka", "🌹", "Langit Ko"
];

export const SNARKY_COMMENTS = [
	"Try your best! 😏", "Don't fool yourself", "Ohh what do you think of yourself?",
	"You can't skip me!", "Ohh dare you!", "I am inevitable 😈"
];

export const VICTORY_DATE_PLAN = {
	date: "Feb 14th, 2026",
	location: "Our Favorite Italian Place",
};
```

2) `src/app/page.tsx` (controller / stage manager)
```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FLOATING_OBJECTS } from "@/lib/constants";

import LockScreen from "@/components/quest/LockScreen";
import NaughtyQuiz from "@/components/quest/NaughtyQuiz";
import PrepList from "@/components/quest/PrepList";
import HeartCatcher from "@/components/quest/HeartCatcher";
import ScratchCard from "@/components/quest/ScratchCard";
import SafeVault from "@/components/quest/SafeVault";
import FinalProposal from "@/components/quest/FinalProposal";

export default function ValentineQuest() {
	const [stage, setStage] = useState("lock");
	const [score, setScore] = useState(0);
	const [floatingItems, setFloatingItems] = useState<{text: string, x: number, duration: number, delay: number}[]>([]);

	useEffect(() => {
		setFloatingItems(FLOATING_OBJECTS.map((obj, i) => ({
			text: obj, x: Math.random() * 100, duration: 10 + Math.random() * 10, delay: i * 1.5
		})));
	}, []);

	return (
		<main className="relative min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 overflow-hidden flex items-center justify-center p-4">
			{/* Background Animation */}
			<div className="absolute inset-0 pointer-events-none">
				{floatingItems.map((item, i) => (
					<motion.div key={i} initial={{ y: "110vh", x: `${item.x}vw`, opacity: 0 }}
						animate={{ y: "-10vh", opacity: [0, 0.8, 0], rotate: [0, 10, -10, 0] }}
						transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
						className="absolute text-white/40 text-4xl italic">{item.text}</motion.div>
				))}
			</div>

			<AnimatePresence mode="wait">
				{stage === "lock" && <LockScreen onUnlock={() => setStage("quiz")} />}
				{stage === "quiz" && <NaughtyQuiz onComplete={() => setStage("prep")} />}
				{stage === "prep" && <PrepList onComplete={() => setStage("game")} />}
				{stage === "game" && <HeartCatcher onFinish={(s) => { setScore(s); setStage("scratch"); }} />}
				{stage === "scratch" && <ScratchCard onComplete={() => setStage("safe")} />}
				{stage === "safe" && <SafeVault onUnlock={() => setStage("proposal")} />}
				{stage === "proposal" && <FinalProposal score={score} />}
			</AnimatePresence>
		</main>
	);
}
```

3) Lock screen, Naughty Quiz, HeartCatcher, ScratchCard, SafeVault, FinalProposal
-- Paste the component implementations provided in the project instructions into:
	- `src/components/quest/LockScreen.tsx`
	- `src/components/quest/NaughtyQuiz.tsx`
	- `src/components/quest/PrepList.tsx`
	- `src/components/quest/HeartCatcher.tsx`
	- `src/components/quest/ScratchCard.tsx`
	- `src/components/quest/SafeVault.tsx`
	- `src/components/quest/FinalProposal.tsx`

4) Sound effects (Howler)
Install Howler and add short UI sounds to `public/assets/sounds/` (catch.mp3, hit.mp3, win.mp3). Create `src/lib/sounds.ts`:
```ts
import { Howl } from 'howler';

export const sounds = {
	catch: new Howl({ src: ['/assets/sounds/catch.mp3'], volume: 0.5 }),
	hit: new Howl({ src: ['/assets/sounds/hit.mp3'], volume: 0.4 }),
	triumph: new Howl({ src: ['/assets/sounds/win.mp3'], volume: 0.7 }),
	click: new Howl({ src: ['/assets/sounds/click.mp3'], volume: 0.3 })
};
export const playSound = (name: keyof typeof sounds) => sounds[name]?.play();
```

Integrate `playSound` into `HeartCatcher` collisions and into `FinalProposal` for victory.

5) Screen shake & hit flash
Use a `isShaking` state in `HeartCatcher` and animate the container with Framer Motion; overlay a semi-transparent red `motion.div` on hit.

6) .env.local strategy
Create a `.env.local` at the project root with:
```
NEXT_PUBLIC_PASSWORD=iloveyou
NEXT_PUBLIC_TRIP_ANSWER=yellowstone
NEXT_PUBLIC_ANNIV_ANSWER=0225
```
Add these to Vercel environment variables for production.

7) Git ignore
Add to `.gitignore`:
```
# local env files
.env*.local
.env
```

Notes
- Because this app is primarily client-side, `NEXT_PUBLIC_*` vars will be visible in the browser; they are still useful to keep secrets out of your repo history.
- If you'd like, I can also run `npm install` and start the dev server here, or add/play sample sound assets into `public/assets/sounds/` for you to test.

Enjoy building — let me know if you want me to add the final polish (sound files, confetti tuning, or automated deploy steps).

