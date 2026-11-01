import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

const PortfolioApp = lazy(() => import('./App.jsx'))

function AppEntry() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
  if (path === '/' || path === '/ppmake') {
    return (
      <iframe
        title="Video, Game and PPMake"
        src="/PPMake/index.html"
        style={{ border: 0, display: 'block', position: 'fixed', inset: 0, width: '100vw', height: '100dvh' }}
      />
    )
  }
  return <Suspense fallback={null}><PortfolioApp /></Suspense>
}


// --- Console Signature for Awwwards Judges ---
if (typeof window !== 'undefined') {
  console.log(
    '%c TOM KING %c PORTFOLIO %c',
    'background: #111; color: #fff; padding: 5px 10px; font-weight: bold; border-radius: 3px 0 0 3px;',
    'background: #f33; color: #fff; padding: 5px 10px; font-weight: bold; border-radius: 0 3px 3px 0;',
    'background: transparent'
  );
  console.log(
    '%cHi Jury! %cCheck out the code quality. Clean console = happy dev. 🚀',
    'font-weight: bold; color: #f33; font-size: 14px;',
    'color: #666; font-size: 14px;'
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEntry />
  </StrictMode>,
)
