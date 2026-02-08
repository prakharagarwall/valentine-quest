# Valentine Quest - Complete Project Overview

## 🎯 Project Summary

**Valentine Quest** is an interactive, gamified Valentine's Day proposal web app built with Next.js. It combines a playful password screen, trivia game, heart-catching game, scratch card, vault puzzle, and a final romantic proposal experience with animations and sound effects.

**Repository:** https://github.com/prakharagarwall/valentine-quest

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.2.0 | React framework with SSR/SSG support |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.1.6 | Type safety |
| **Tailwind CSS** | 3.4.7 | Styling & responsive design |
| **Framer Motion** | 10.12.16 | Smooth animations (flying hearts, bouncing elements) |
| **canvas-confetti** | 1.9.4 | Celebration confetti on victory |
| **Howler.js** | 2.2.4 | Audio effects (click, hit, catch, victory, bg music) |
| **Lucide React** | 0.563.0 | Icon library |

---

## ✨ Key Features

### 1. **Lock Screen (Password)**
- Initial screen with password input
- Default password: `iloveyou` (configurable via `.env`)
- Sound effects on attempt

### 2. **Naughty Quiz** (5 Questions)
- Multiple choice questions about your partner
- 5th question with custom options
- Snarky comments on wrong answers
- Score tracking

### 3. **Prep List Checklist**
- Interactive checklist (Candles, Wine, Chocolate, etc.)
- Must complete all items to proceed
- Sound effects for item selection

### 4. **Heart Catcher Game**
- Catch falling hearts on canvas
- Configurable timer (default: 25 seconds)
- Score increases per catch
- Screen shake effect on hit

### 5. **Scratch Card**
- Scratch-to-reveal a hidden message
- Visual feedback with pointer events

### 6. **Safe Vault**
- Two-question security vault
- Default answers: `yellowstone` (trip) and `0225` (anniversary)
- Unlocks final proposal

### 7. **Final Proposal Page**
- "Will you be my Valentine?" with YES/NO buttons
- NO button moves away on hover
- Success state with:
  - **Floating heart animations** in background
  - Confetti celebration
  - Prize receipt with final message
  - "I love you" in 100+ languages (non-overlapping)

### 8. **Flying Animations**
- **Floating Hearts**: 12 animated hearts floating upward (first page & final page)
- **Flying "I love you" text**: Renders in 100 different languages with synchronized animations
- Shared position/timing for visual harmony

---

## 📁 Project Structure

```
valentine-quest/
├── public/
│   └── assets/
│       ├── sounds/
│       │   ├── click.mp3
│       │   ├── hit.mp3
│       │   ├── catch.mp3
│       │   ├── win.mp3
│       │   └── bg-music.mp3
│       └── images/
│           └── (photos, proposal background, etc.)
├── src/
│   ├── app/
│   │   ├── page.tsx (Main entry point, stage manager)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── quest/ (Core game screens)
│   │   │   ├── LockScreen.tsx
│   │   │   ├── NaughtyQuiz.tsx
│   │   │   ├── PrepList.tsx
│   │   │   ├── HeartCatcher.tsx
│   │   │   ├── ScratchCard.tsx
│   │   │   ├── SafeVault.tsx
│   │   │   └── FinalProposal.tsx
│   │   ├── ui/ (Reusable UI components)
│   │   │   ├── FloatingHearts.tsx (Background hearts animation)
│   │   │   ├── FlyingLoveLanguages.tsx (Flying "I love you" text)
│   │   │   └── ToastContainer.tsx (Notifications)
│   ├── lib/
│   │   ├── constants.ts (Personalization: names, passwords, messages)
│   │   ├── i-love-you-100.ts (100 "I love you" phrases in languages)
│   │   └── sounds.ts (Sound effects management)
│   └── hooks/
├── .env (Environment variables)
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 🔑 Personalization Guide

### Edit in `src/lib/constants.ts`:

```typescript
export const GF_NAME = "Kiti";           // Partner's name
export const BF_NAME = "Prakhar";        // Your name
export const PASSWORD = "iloveyou";      // Lock screen password

export const SAFE_ANSWERS = {
  trip: "yellowstone",    // Vault question 1 answer
  anniv: "0225"          // Vault question 2 answer (MMDD format)
};

export const PREP_LIST = [
  "Candles", "Wine", "Chocolate", "😈****😈****😈", "AND!! Your undivided attention"
];

export const VICTORY_DATE_PLAN = {
  date: "Feb 14th, 2026",
  location: "Our favourite home sweet home!",
};
```

### Environment Variables (`.env`):

```bash
NEXT_PUBLIC_PASSWORD=iloveyou
NEXT_PUBLIC_TRIP_ANSWER=yellowstone
NEXT_PUBLIC_ANNIV_ANSWER=0225
NEXT_PUBLIC_HEARTCATCHER_TIME_SEC=25    # Game timer in seconds
```

---

## 🎮 Game Flow & Stages

The app progresses through these stages:

1. **`lock`** → Password screen
   - Shows: Lock screen, floating hearts, "I love you" flying text
2. **`quiz`** → Naughty quiz
3. **`prep`** → Prep list checklist
4. **`game`** → Heart catcher game
5. **`scratch`** → Scratch card
6. **`safe`** → Vault puzzle
7. **`final`** → Proposal page
   - Shows: Final page with floating heart background, confetti on success

---

## 🚀 Setup & Running

### Installation

```bash
# Clone the repository
git clone https://github.com/prakharagarwall/valentine-quest.git
cd valentine-quest

# Install dependencies
npm install

# Create .env.local (optional, uses defaults if not provided)
echo "NEXT_PUBLIC_PASSWORD=iloveyou" > .env.local
echo "NEXT_PUBLIC_TRIP_ANSWER=yellowstone" >> .env.local
echo "NEXT_PUBLIC_ANNIV_ANSWER=0225" >> .env.local
```

### Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint           # Check for errors
npm run lint:fix       # Auto-fix issues
```

---

## 📊 Files & Purposes

### Core Components

| File | Purpose |
|------|---------|
| `page.tsx` | Main orchestrator, manages all stages & shared state |
| `LockScreen.tsx` | Password login screen |
| `NaughtyQuiz.tsx` | 5-question trivia game |
| `PrepList.tsx` | Checklist before game starts |
| `HeartCatcher.tsx` | Canvas-based heart catching game |
| `ScratchCard.tsx` | Interactive scratch-to-reveal card |
| `SafeVault.tsx` | Security questions vault |
| `FinalProposal.tsx` | Proposal screen with YES/NO buttons |

### UI Components

| File | Purpose |
|------|---------|
| `FloatingHearts.tsx` | 12 animated hearts flowing upward |
| `FlyingLoveLanguages.tsx` | "I love you" in 100 languages flying across screen |
| `ToastContainer.tsx` | Toast notifications |

### Utilities

| File | Purpose |
|------|---------|
| `constants.ts` | All configurable values |
| `i-love-you-100.ts` | Array of 100 "I love you" in different languages |
| `sounds.ts` | Howler.js sound management |

---

## 🎵 Sound Effects

| Sound | File | When Used |
|-------|------|-----------|
| Click | `click.mp3` | Button interactions |
| Hit | `hit.mp3` | Wrong quiz answers |
| Catch | `catch.mp3` | Heart catcher success |
| Victory | `win.mp3` | Proposal accepted |
| Background | `bg-music.mp3` | Ambient during game |

---

## 🎨 Animation System

### Floating Hearts (First Page & Final Page)
- **12 random hearts** positioned across screen
- **Duration**: 8-12 seconds
- **Effect**: Upward translation (Y: 110vh → -10vh)
- **Loop**: Infinite with random stagger delays

### Flying "I love you" Text
- **12 independent text animations** (no emoji)
- **Languages**: 100+ different phrases
- **Opacity**: Fade in/out effect
- **Duration**: 6-15 seconds per phrase

### Component Layering
- Animations appear **only on first page** (lock stage) and **final page** success state
- Middle game stages: **no animations** (cleaner UI)
- Z-index management ensures buttons remain clickable

---

## 🔒 Security Notes

⚠️ **Important**: Since `NEXT_PUBLIC_*` variables are exposed to the browser, never use this app for truly sensitive information. The passwords and answers are for gameplay, not serious security.

For production:
1. Add to `.gitignore`: `.env.local`, `.env`
2. Set Vercel environment variables in project settings
3. Never commit secrets to GitHub

---

## 🌐 Deployment (Vercel)

### Quick Deploy

```bash
npm install -g vercel
vercel
```

### Environment Variables in Vercel Dashboard

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_PASSWORD=iloveyou`
   - `NEXT_PUBLIC_TRIP_ANSWER=yellowstone`
   - `NEXT_PUBLIC_ANNIV_ANSWER=0225`
   - `NEXT_PUBLIC_HEARTCATCHER_TIME_SEC=25`

---

## 📝 NaughtyQuiz: 5th Question Details

**Question**: "What's my favorite thing about you?"

**Options**:
```typescript
[
  "Your smile 😊",
  "Your sense of humor 😂",
  "Your kindness ❤️",
  "Everything! You're perfect! 💕"
]
```

**Response on correct answer**:
> "I love that too! ❤️"

All options are "correct" - promotes positive vibes! 🎉

---

## 🎯 Recommended Customizations

- [ ] Add a couple photo to the proposal background
- [ ] Customize prep list items to match your relationship
- [ ] Adjust quiz questions to real memories
- [ ] Change victory date/location to actual plans
- [ ] Record personalized audio messages (replace some sound files)
- [ ] Add video background to final page
- [ ] Customize confetti colors to match theme

---

## 📬 Contact & Support

- **GitHub**: https://github.com/prakharagarwall/valentine-quest
- **Built with ❤️ using Next.js + Framer Motion**

---

## 📄 License

This project is personal and open for personal use. Feel free to fork, customize, and deploy! 🚀

---

**Last Updated**: February 8, 2026
**Version**: 0.1.0
