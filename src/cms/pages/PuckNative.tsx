import React, { useMemo } from 'react'
import { Puck } from '@measured/puck'
import puckConfig from '@/puck/config'
import { auditEditorState } from '@/puck/audit'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY_PREFIX = 'puck:'

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function buildTemplate() {
  // Start with a basic homepage: Hero + Trials when available
  const order = ['Hero', 'Trials'].filter((k) => k in puckConfig.components) as Array<keyof typeof puckConfig.components>
  return {
    content: order.map((t) => ({ id: createId(), type: t, props: (puckConfig.components as any)[t].defaultProps }))
  }
}

function getKeyForSlug(slug: string) {
  return `${STORAGE_KEY_PREFIX}${slug}`
}

export default function PuckNative() {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const slug = search.get('slug') || 'homepage'
  const pageTitle = 'Homepage'

  function sanitize(data: any) {
    const list = Array.isArray(data?.content) ? [...data.content] : []
    const result = list
      .filter((n: any) => !!n && typeof n === 'object' && n.type && (puckConfig.components as any)[n.type])
      .map((n: any) => {
        const cfg = (puckConfig.components as any)[n.type]
        const mergedProps = { ...(cfg?.defaultProps ?? {}), ...(n.props ?? {}) }
        return { id: n.id || createId(), type: n.type, props: mergedProps }
      })
    // If nothing valid, seed a sensible default template
    if (!result.length) return buildTemplate()
    return { content: result }
  }

  const persist = (slugParam: string, data: any) => {
    const cleaned = JSON.stringify(sanitize(data))
    localStorage.setItem(getKeyForSlug(slugParam), cleaned)
  }

  const initial = useMemo(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(getKeyForSlug(slug)) : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.content)) {
          const sanitized = sanitize(parsed)
          return {
            content: sanitized.content.map((c: any) => {
              const type = c?.type
              const cfg = (puckConfig.components as any)[type]
              const mergedProps = {
                ...(cfg?.defaultProps ?? {}),
                ...(c?.props ?? {}),
              }
              return { id: c?.id || createId(), type, props: mergedProps }
            })
          }
        }
      } catch {}
    }
    return buildTemplate()
  }, [slug])

  // Note: no auto-persist/cleanup on load to avoid surprising content changes

  return (
    <div className="min-h-screen">
      {/* Official Puck editor UI */}
      <Puck
        config={puckConfig}
        data={initial}
        headerTitle={pageTitle}
        // Removed custom header actions to avoid accidental resets/cleanups
        onPublish={(data) => {
          persist(slug, data)
        }}
        onChange={(data) => {
          try { auditEditorState(puckConfig as any, data as any) } catch {}
        }}
      />
    </div>
  )
}


