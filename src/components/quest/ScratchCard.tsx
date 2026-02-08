'use client';

import { useState } from 'react';
import { Gift, Star } from 'lucide-react';
import { BF_NAME } from '@/lib/constants';

export default function ScratchCard({ score, onComplete }: { score: number; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const isMarathonVoucher = score >= 20;

  return (
    <div className="bg-white p-2 rounded-2xl shadow-2xl relative overflow-hidden w-72 h-96 flex flex-col items-center justify-center text-center">
      <div className="text-rose-900 p-6 border-4 border-double border-rose-200 h-full w-full flex flex-col justify-center items-center rounded-xl bg-rose-50">
        <Gift className="w-16 h-16 text-rose-500 mb-4" />
        <h3 className="font-bold text-2xl mb-2 text-rose-700 font-serif tracking-tight">{isMarathonVoucher ? '20+ Marathon Voucher' : '15+ Pass Game!!'}</h3>
        <p className="text-rose-600 text-sm mb-4 italic">{isMarathonVoucher ? 'Redeemable Later!' : 'Continue to next stage'}</p>
        <div className="bg-rose-100 px-4 py-3 rounded-lg border border-rose-200 mb-4 shadow-sm">
          <p className="font-black text-3xl text-rose-800 uppercase tracking-tighter">{isMarathonVoucher ? 'Redeemable Later!!' : 'Continue to next stage'}</p>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">{isMarathonVoucher ? '' : 'Continue to next stage'}</p>
      </div>
      
      <div 
        onMouseMove={() => setProgress(p => Math.min(100, p + 5))}
        className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-200 flex items-center justify-center text-gray-500 font-bold cursor-pointer z-20 shadow-inner"
        style={{ display: progress > 70 ? 'none' : 'flex' }}
      >
        <div className="text-center">
          <Star className="mx-auto mb-2 text-yellow-500 animate-pulse" />
          <p className="text-sm tracking-widest uppercase">Rub to Reveal</p>
          <div className="mt-2 w-32 h-1 bg-black/10 rounded-full overflow-hidden">
             <div className="h-full bg-rose-400" style={{ width: `${(progress/70)*100}%` }} />
          </div>
        </div>
      </div>
      
      {progress > 70 && (
        <button onClick={onComplete} className="absolute bottom-6 bg-rose-600 text-white px-8 py-2 rounded-full font-bold z-10 shadow-xl">Claim & Continue ➡️</button>
      )}
    </div>
  );
}
