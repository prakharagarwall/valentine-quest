export type ToastType = 'success' | 'error' | 'info'
export type ToastOptions = {
  type?: ToastType
  title?: string
  message?: string
  duration?: number
}

export function showToast(opts: ToastOptions) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('valentine-show-toast', { detail: opts }))
}
