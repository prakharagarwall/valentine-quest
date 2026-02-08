"use client"
import { showToast } from '@/lib/toast'
import { playSound } from '@/lib/sounds';
import { useState } from 'react';
import { Unlock } from 'lucide-react';
import { SAFE_ANSWERS } from '@/lib/constants';

export default function SafeVault({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState({ trip: '', anniv: '' });

  const handleOpen = () => {
    if (input.trip === SAFE_ANSWERS.trip && input.anniv === SAFE_ANSWERS.anniv) {
      onUnlock();
    } else {
      try { playSound('hit') } catch (e) {}
      showToast({ type: 'error', title: 'Access Denied', message: 'Incorrect combinations! 🔒' });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border-4 border-yellow-500 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
      <Unlock className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-gray-800 font-serif text-3xl mb-8 font-bold tracking-widest uppercase">The Heart Safe</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2">First Trip Location</label>
          <input 
            type="text" 
            placeholder="???" 
            value={input.trip}
            onChange={(e) => setInput({...input, trip: e.target.value.toLowerCase().trim()})}
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800 text-center uppercase tracking-widest focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-inner" 
          />
        </div>
        <div>
          <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2">Anniversary (MMDD)</label>
          <input 
            type="text" 
            placeholder="xxxx" 
            maxLength={4}
            value={input.anniv}
            onChange={(e) => setInput({...input, anniv: e.target.value.trim()})}
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800 text-center text-xl tracking-[0.5em] focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-inner" 
          />
        </div>
      </div>
      
      <button 
        onClick={handleOpen}
        className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition-transform active:scale-95"
      >
        OPEN VAULT 🔓
      </button>
    </div>
  );
}
