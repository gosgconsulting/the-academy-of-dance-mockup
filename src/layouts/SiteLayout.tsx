import React from 'react'
import { Render } from '@measured/puck'
import puckConfig from '@/puck/config'
import { useEditorData } from '@/puck/store'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Outlet } from 'react-router-dom'

function usePuckLayout() {
  // Read from the same storage key used by the visual editor
  const { data } = useEditorData('layout')
  const content: any[] = Array.isArray(data?.content) ? data!.content : []
  const header = content.find((c) => c?.type === 'Header')
  const footer = content.find((c) => c?.type === 'Footer')
  return { header, footer }
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


