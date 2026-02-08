"use client"

import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { ToastOptions } from '@/lib/toast'

type T = (ToastOptions & { id: number, total?: number })

export default function ToastContainer() {
  const [toasts, setToasts] = useState<T[]>([])

  useEffect(() => {
    const handler = (e: any) => {
      const opts: ToastOptions = e.detail || {}
      const dur = opts.duration || 3500
      const t: T = { id: Date.now() + Math.floor(Math.random()*1000), duration: dur, total: dur, ...opts }
      setToasts(s => [t, ...s])
      if (t.type === 'success') {
        try { confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } }) } catch (e) {}
      }
    }
    window.addEventListener('valentine-show-toast', handler as EventListener)
    return () => window.removeEventListener('valentine-show-toast', handler as EventListener)
  }, [])

  // prefer local GIFs; if not present Tenor embed was a fallback previously

  useEffect(() => {
    if (!toasts.length) return
    const id = setInterval(() => {
      setToasts(s => s.map(t => ({ ...t, duration: Math.max(0, t.duration! - 100) })))
    }, 100)
    return () => clearInterval(id)
  }, [toasts.length])

  useEffect(() => {
    const expired = toasts.filter(t => t.duration === 0).map(t => t.id)
    if (expired.length) setToasts(s => s.filter(t => !expired.includes(t.id)))
  }, [toasts])

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {toasts.map(t => {
        const exiting = (t.duration ?? 0) <= 500
        const pct = t.total ? Math.max(0, Math.round((t.duration! / t.total!) * 100)) : 0
        return (
          <div key={t.id} className={`w-96 bg-white/98 shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 ${exiting ? 'animate-bounce-exit' : 'animate-bounce-in'}`}>
            <div className="flex gap-4 p-4 items-start">
              <div className="w-28 h-28 rounded-lg flex items-center justify-center bg-rose-50 overflow-hidden">
                {t.type === 'success' ? (
                  <img src="/assets/kiss.gif" alt="success" className="w-28 h-28 object-cover" />
                ) : t.type === 'error' ? (
                  <img src="/assets/cry.gif" alt="error" className="w-28 h-28 object-cover" />
                ) : t.type === 'info' ? (
                  <img src="/assets/cry.gif" alt="emotional damage" className="w-24 h-24 object-cover" />
                ) : (
                  <img src="/assets/cry.gif" alt="info" className="w-24 h-24 object-cover" />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-extrabold text-2xl ${t.type === 'success' ? 'text-rose-600' : t.type === 'error' ? 'text-red-600' : t.type === 'info' ? 'text-orange-600' : 'text-gray-800'}`}>
                  {t.title || (t.type === 'error' ? 'Nope' : 'Yay')}
                </div>
                <div className="text-lg text-gray-800 mt-2">{t.message}</div>
              </div>
            </div>
            <div className="h-2 bg-rose-100 relative">
              <div className="absolute left-0 top-0 h-full bg-rose-500 toast-progress" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
