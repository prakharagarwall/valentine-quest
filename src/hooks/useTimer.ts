'use client'
import { useEffect, useState } from 'react'

export default function useTimer(initial = 0) {
  const [t, setT] = useState(initial)
  useEffect(() => {
    const id = setInterval(() => setT(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}
