import React from 'react'
import { Render } from '@measured/puck'
import puckConfig from '@/puck/config'
import { useEditorData } from '@/puck/store'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Outlet } from 'react-router-dom'

function usePuckLayout() {
  // Prefer unified layout slug; gracefully fall back to separate header/footer slugs
  const { data: layoutData } = useEditorData('layout')
  const layoutContent: any[] = Array.isArray(layoutData?.content) ? layoutData!.content : []
  let header = layoutContent.find((c) => c?.type === 'Header')
  let footer = layoutContent.find((c) => c?.type === 'Footer')

  // Fallback: dedicated header slug
  if (!header) {
    const { data: headerData } = useEditorData('header')
    const headerContent: any[] = Array.isArray(headerData?.content) ? headerData!.content : []
    header = headerContent.find((c) => c?.type === 'Header') || null
  }
  // Fallback: dedicated footer slug
  if (!footer) {
    const { data: footerData } = useEditorData('footer')
    const footerContent: any[] = Array.isArray(footerData?.content) ? footerData!.content : []
    footer = footerContent.find((c) => c?.type === 'Footer') || null
  }

  return { header, footer }
}

export default function SiteLayout() {
  const { header, footer } = usePuckLayout()
  const hasPuckHeader = !!header
  const hasPuckFooter = !!footer

  return (
    <div className="min-h-screen bg-white">
      <div>
        {hasPuckHeader && <Render config={puckConfig} data={{ content: [header] }} />}
        {!hasPuckHeader && <Navigation scrollToSection={() => {}} />}
      </div>

      <div>
        <Outlet />
      </div>

      <div>
        {hasPuckFooter && <Render config={puckConfig} data={{ content: [footer] }} />}
        {!hasPuckFooter && <Footer />}
      </div>
    </div>
  )
}


