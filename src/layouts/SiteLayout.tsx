import React from 'react'
import { Render } from '@measured/puck'
import puckConfig from '@/puck/config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Outlet } from 'react-router-dom'

const STORAGE_KEY = 'puck:layout'

function usePuckLayout() {
  if (typeof window === 'undefined') return { header: null as any, footer: null as any }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    const content: any[] = Array.isArray(parsed?.content) ? parsed.content : []
    const header = content.find((c) => c?.type === 'Header')
    const footer = content.find((c) => c?.type === 'Footer')
    return { header, footer }
  } catch {
    return { header: null as any, footer: null as any }
  }
}

export default function SiteLayout() {
  const { header, footer } = usePuckLayout()
  const hasPuckHeader = !!header
  const hasPuckFooter = !!footer

  return (
    <div className="min-h-screen bg-white">
      <div>
        {hasPuckHeader ? (
          <Render config={puckConfig} data={{ content: [header] }} />
        ) : (
          <Navigation scrollToSection={() => {}} />
        )}
      </div>

      <div>
        <Outlet />
      </div>

      <div>
        {hasPuckFooter ? (
          <Render config={puckConfig} data={{ content: [footer] }} />
        ) : (
          <Footer />
        )}
      </div>
    </div>
  )
}


