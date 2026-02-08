import './globals.css'
import React from 'react'
import dynamic from 'next/dynamic'

const ToastContainer = dynamic(() => import('../components/ui/ToastContainer'), { ssr: false })

export const metadata = {
  title: 'Valentine Quest',
  description: 'A playful quest'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blush min-h-screen text-slate-900">{children}
        <ToastContainer />
      </body>
    </html>
  )
}
