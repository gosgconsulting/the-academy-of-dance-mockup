import React, { useMemo } from 'react'
import { Puck } from '@measured/puck'
import puckConfig from '@/puck/config'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY_PREFIX = 'puck:'

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function buildTemplate() {
  // New atomic template: create Hero section
  const content: any[] = []
  if ('Hero' in puckConfig.components) {
    content.push({ id: createId(), type: 'Hero', props: (puckConfig.components as any)['Hero'].defaultProps })
  }
  return { content }
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
    // Old design: allow only monolithic Hero block
    const defaultsHero = (puckConfig.components as any)['Hero']?.defaultProps || {}
    const list = Array.isArray(data?.content) ? [...data.content] : []
    const firstHero = list.find((n: any) => n?.type === 'Hero')
    const hero = firstHero ? { ...firstHero, props: { ...defaultsHero, ...(firstHero.props || {}) } } : { id: createId(), type: 'Hero', props: defaultsHero }
    return { content: [hero] }
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
          // Migration: convert old monolithic blocks to new atomic structure if needed
          const migrated = parsed.content.map((c: any) => {
            // Convert legacy Hero with individual props to new Hero with slot content
            if (c?.type === 'Hero' && c?.props && typeof c.props.title === 'string') {
              const p = c.props
              const backgroundImage = p.backgroundImage || (Array.isArray(p.images) ? (typeof p.images[0] === 'string' ? p.images[0] : p.images[0]?.value || p.images[0]?.src) : undefined)
              const heroDefaults = (puckConfig.components as any)['Hero']?.defaultProps || {}
              return {
                id: c.id || createId(),
                type: 'Hero',
                props: {
                  ...heroDefaults,
                  backgroundImage,
                  content: [
                    { type: 'Heading', props: { text: p.title || 'Heading', tag: 'h1', align: 'center' } },
                    { type: 'Text', props: { text: p.description || '', align: 'center' } },
                    { type: 'Button', props: { label: p.ctaText || 'Click', url: p.ctaUrl || '#trials' } },
                  ],
                },
              }
            }
            return c
          })

          const sanitized = sanitize({ content: migrated })
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
      />
    </div>
  )
}


