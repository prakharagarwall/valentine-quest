"use client";

import { useState, useEffect, useRef } from 'react';
import { Trophy, Timer } from 'lucide-react';
import { playSound } from '@/lib/sounds';
import { HEARTCATCHER_TIME_SEC } from '@/lib/constants';

export default function HeartCatcher({ onFinish, onLose }: { onFinish: (s: number) => void; onLose?: () => void }) {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(HEARTCATCHER_TIME_SEC);
  const [active, setActive] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const basketXRef = useRef(50); // Percentage 0-100
  const itemsRef = useRef<any[]>([]);
  const lastSpawnRef = useRef(0);
  const gameActiveRef = useRef(false);
  const prakharImageRef = useRef<HTMLImageElement | null>(null);

  // Initialize game
  const startGame = () => {
    setActive(true);
    setScore(0);
    setTime(HEARTCATCHER_TIME_SEC);
    gameActiveRef.current = true;
    scoreRef.current = 0;
    itemsRef.current = [];
    render();
  };

  const restartGame = () => {
    startGame();
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas || !gameActiveRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed internal resolution for consistent physics
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const spawnItems = (timestamp: number) => {
      if (timestamp - lastSpawnRef.current > 600) {
        const types = ['prakhar', 'prakhar', 'prakhar', '🔪'];
        itemsRef.current.push({
          id: Math.random(),
          x: Math.random() * (canvas.width - 40) + 20,
          y: -50,
          type: types[Math.floor(Math.random() * types.length)],
          speed: 4
        });
        lastSpawnRef.current = timestamp;
      }
    };

    const update = (timestamp: number) => {
      if (!gameActiveRef.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawnItems(timestamp);

      // Draw Basket
      const basketWidth = 80;
      const bx = (basketXRef.current / 100) * canvas.width;
      ctx.font = '60px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🧺', bx, canvas.height - 20);

      // Update & Draw Items
      itemsRef.current = itemsRef.current.filter(item => {
        item.y += item.speed;

        // Collision Detection
        const hitX = Math.abs(item.x - bx) < 45;
        const hitY = item.y > canvas.height - 80 && item.y < canvas.height - 20;

        if (hitX && hitY) {
          if (item.type === 'prakhar') {
            scoreRef.current += 1;
            setScore(scoreRef.current);
            playSound('catch');
          } else {
            scoreRef.current = Math.max(0, scoreRef.current - 5);
            setScore(scoreRef.current);
            playSound('hit');
          }
          return false;
        }

        // Draw the item
        if (item.type === 'prakhar' && prakharImageRef.current) {
          ctx.drawImage(prakharImageRef.current, item.x - 30, item.y - 30, 60, 60);
        } else {
          ctx.font = '40px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(item.type, item.x, item.y);
        }

        return item.y < canvas.height + 50;
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
  };

  // Input Handlers (Immediate response)
  const handleMove = (clientX: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    basketXRef.current = Math.max(5, Math.min(95, x));
  };

  useEffect(() => {
    // Load prakhar image
    const img = new Image();
    img.src = '/assets/prakhar.png';
    img.onload = () => {
      prakharImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    if (active && time > 0) {
      const timer = setInterval(() => setTime(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      gameActiveRef.current = false;
      cancelAnimationFrame(requestRef.current!);
      score >= 15 ? playSound('fewMoments') : playSound('violin');
    }
  }, [active, time]);

  return (
    <div className="bg-white/95 p-6 rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col relative overflow-hidden border border-rose-200">
      <div className="flex justify-between font-bold text-rose-600 mb-3 px-4">
        <div className="flex gap-2 items-center text-3xl"><Trophy className="text-amber-500" /> {score}</div>
        <div className="flex gap-2 items-center text-3xl"><Timer className="text-rose-500" /> {time}s</div>
      </div>

      <div className="flex-1 relative bg-rose-50/30 rounded-2xl border-2 border-rose-100 overflow-hidden touch-none">
        <canvas 
          ref={canvasRef}
          className="w-full h-full cursor-none"
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        />

        {!active && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-30 overflow-y-auto">
            <div className="text-8xl mb-6">🧺</div>
            <h3 className="text-4xl font-black text-rose-600 mb-4">PRAKHAR CATCHER</h3>
            <p className="mb-8 text-gray-700 font-bold text-lg">Catch Prakhar. Avoid 🔪!<br/></p>
            
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 mb-8 w-full max-w-md">
              <p className="font-black text-rose-600 text-lg mb-4">🎁 AWARDS</p>
              <div className="space-y-3 text-left text-sm">
                <div className={`flex items-center gap-3 p-3 rounded-lg ${score >= 15 ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
                  <span className="text-xl">✅</span>
                           <div>
                             <p className="font-bold text-rose-700">15+ Pass Game!!</p>
                             <p className="text-xs text-gray-600">Continue to next stage</p>
                           </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border-2 border-amber-300">
                  <span className="text-xl">💆</span>
                  <div>
                    <p className="font-bold text-amber-700">Base Reward: 30-Min Massage</p>
                    <p className="text-xs text-gray-600">From Your Valentine</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border-2 border-orange-300">
                  <span className="text-xl">🎟️</span>
                           <div>
                             <p className="font-bold text-orange-700">20+ Marathon Voucher</p>
                             <p className="text-xs text-gray-600">Redeemable Later!!</p>
                           </div>
                </div>
              </div>
            </div>
            
            <button onClick={startGame} className="bg-rose-500 hover:bg-rose-600 text-white px-16 py-4 rounded-full font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95">START</button>
          </div>
        )}

        {time === 0 && (
          <div className="absolute inset-0 bg-rose-600/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8 text-center animate-bounce-in">
            {score >= 15 ? (
              <>
                <h2 className="text-6xl font-black text-white mb-2">WINNER!</h2>
                <p className="text-rose-100 text-2xl mb-8 font-bold">Total Hearts: {score}</p>
                <button 
                  onClick={() => onFinish(score)} 
                  className="bg-white text-rose-600 px-12 py-4 rounded-full font-black text-xl shadow-2xl hover:bg-rose-50 transition-colors"
                >
                  CLAIM REWARDS ➡️
                </button>
              </>
            ) : (
              <>
                <h2 className="text-6xl font-black text-white mb-2">OOPS!</h2>
                <p className="text-rose-100 text-2xl mb-8 font-bold">Total Hearts: {score}</p>
                <div className="flex gap-4 w-full justify-center">
                  <button 
                    onClick={restartGame}
                    className="bg-white text-rose-600 px-8 py-3 rounded-full font-black shadow-2xl hover:bg-rose-50 transition-colors flex-1 max-w-xs"
                  >
                    🔄 RESTART
                  </button>
                  <button 
                    onClick={() => onLose?.()}
                    className="bg-rose-400 text-white px-8 py-3 rounded-full font-black shadow-2xl hover:bg-rose-300 transition-colors flex-1 max-w-xs"
                  >
                    ➡️ SKIP
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}