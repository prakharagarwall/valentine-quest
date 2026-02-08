"use client"

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { PASSWORD } from '@/lib/constants'
import { playSound } from '@/lib/sounds'
import { showToast } from '@/lib/toast'

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [showHint, setShowHint] = useState(false)
  const [listening, setListening] = useState(false)

  const startMic = () => {
    // @ts-ignore
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Speech) {
      showToast({ type: 'info', message: 'Use Chrome for voice features.' })
      return
    }
    const rec = new Speech()
    setListening(true)
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.toLowerCase()
      setListening(false)
      // accept if user says the password or says "love"
      if (transcript.includes(PASSWORD) || transcript.includes('love')) {
        try { playSound('kisses') } catch (err) {}
        onUnlock()
      } else {
        try { playSound('hit') } catch (err) {}
        showToast({ type: 'error', message: "You don't know the password, you don't love me" })
      }
    }
    rec.onerror = () => setListening(false)
    rec.start()
  }

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
      <Lock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-rose-600 mb-6">Prakhar&apos;s Heart Vault</h1>

      {!showHint ? (
        <div className="p-6">
          <button onClick={() => setShowHint(true)} className="w-full bg-rose-100 text-rose-600 py-3 rounded-lg font-bold">Click to get your valentine</button>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-4 text-rose-500 font-medium">🎤 I love you to unlock</div>
          <button onClick={startMic} disabled={listening} className="w-full bg-rose-500 text-white py-3 rounded-lg font-bold">{listening ? 'Listening...' : 'Start Microphone'}</button>
        </div>
      )}
    </div>
  )
}
