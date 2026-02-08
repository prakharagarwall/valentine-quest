'use client'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium '
  const styles = variant === 'primary'
    ? 'bg-pinky text-white shadow'
    : 'bg-white text-pinky border border-pinky'
  return <button className={base + styles + ' ' + className} {...props} />
}
