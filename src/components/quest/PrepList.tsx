"use client"
import { showToast } from '@/lib/toast'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { PREP_LIST } from '@/lib/constants'
import { playSound } from '@/lib/sounds'

export default function PrepList({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    try { playSound('animeeffect') } catch (e) {}
  };

  const handleReady = () => {
    if (selected.length === PREP_LIST.length) {
      return onComplete();
    }
    // SWAP: Gunshot replaced with Emotional Damage
    try { playSound('emotionalDamage') } catch (e) {} 
    
    showToast({ 
      type: 'info', // This triggers the panda.gif in your ToastContainer
      title: 'EMOTIONAL DAMAGE', 
      message: 'We need EVERYTHING for Feb 14th! 😉' 
    });
  }

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/60">
      {/* Date Updated to Feb 14th */}
      <h2 className="text-rose-600 text-2xl text-center mb-2 font-serif font-bold tracking-tight">Feb 14th Essentials 🍆🍑</h2>
      <p className="text-gray-500 text-center mb-6 text-sm">Select ALL items to proceed...</p>
      
      <div className="space-y-3">
        {PREP_LIST.map(item => (
          <div 
            key={item} 
            onClick={() => toggle(item)}
            className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all duration-200 ${
              selected.includes(item) 
                ? 'bg-rose-100 border-rose-500 text-rose-700 shadow-sm' 
                : 'bg-white border-gray-100 text-gray-500 hover:bg-rose-50'
            }`}
          >
            <span className="font-semibold">{item}</span>
            {selected.includes(item) && <Check className="w-5 h-5 text-rose-600" />}
          </div>
        ))}
      </div>

      <button 
        onClick={handleReady}
        className="w-full mt-8 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95"
      >
        I&apos;m Ready ➡️
      </button>
    </div>
  );
}