"use client"

import React from 'react'
import { showToast } from '@/lib/toast'

type Props = { children: React.ReactNode, onReset?: () => void }

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    try { showToast({ type: 'error', title: 'App error', message: 'Something went wrong — try again.' }) } catch (e) {}
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white/90 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-lg font-bold text-rose-600 mb-4">Whoops — an error occurred</h3>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { this.setState({ hasError: false }); this.props.onReset && this.props.onReset() }} className="px-4 py-2 bg-rose-500 text-white rounded">Try again</button>
          </div>
        </div>
      )
    }
    return this.props.children as any
  }
}
