declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function trackAppDownload(platform: 'appstore' | 'google_play') {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'app_download_click', { platform })
  }
}
