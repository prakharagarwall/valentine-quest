"use client";

import { useState } from 'react';
import { BF_NAME, GF_NAME } from '@/lib/constants';
import { playSound } from '@/lib/sounds';

const questions = [
  { q: 'Who starts the fights? 😤', a: GF_NAME, r: 'Feisty! I like it. 😈' },
  { q: 'Who drives better? 👨‍🍳', a: BF_NAME, r: 'Correct. Now we should not argue about it 😏' }, 
  {
    q: 'What is the right answer?',
    a: 'Everything',
    options: ['Everything', 'Everything but with exceptions'],
    r: '💋 Now this is getting better! 💋'
  },
  { q: 'Who is more romantic? 🎁', a: BF_NAME, r: 'Good girl, close on getting your valentine 😘' },
  { q: 'Who loves more and give more surprises? ❤️', a: BF_NAME, r: '💋 Now you are one level close to your valentine! 💋' },
];

export default function NaughtyQuiz({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fb, setFb] = useState('');
  const [answered, setAnswered] = useState(false);

  const handle = (choice: string) => {
    if (answered) return;
    setAnswered(true);
    if (choice === questions[idx].a) {
      try { playSound('catch'); } catch (e) {}
      setFb(questions[idx].r);
      setTimeout(() => { 
        setFb(''); 
        setAnswered(false);
        idx < questions.length - 1 ? setIdx(idx + 1) : onComplete(); 
      }, 2000);
    } else {
      try { playSound('fart') } catch (e) {}
      setFb('Be honest! 😈');
      setTimeout(() => {
        setFb('');
        setAnswered(false);
      }, 1000);
    }
  };

  const current = questions[idx];
  const opts = current.options || [BF_NAME, GF_NAME];
  return (
    <div className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
      <h3 className="text-2xl mb-8 font-serif">{current.q}</h3>
      <div className="grid gap-4">
        {opts.map(n => <button key={n} onClick={() => handle(n)} disabled={answered} className="bg-rose-50 p-5 rounded-xl border border-rose-200 text-rose-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed">{n}</button>)}
      </div>
      {fb && <div className="mt-6 font-bold text-rose-600 bg-rose-100 p-2 rounded-lg">{fb}</div>}
    </div>
  );
}
