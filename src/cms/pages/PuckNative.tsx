import React, { useMemo } from 'react'
import { Puck } from '@measured/puck'
import puckConfig from '@/puck/config'
import { auditEditorState } from '@/puck/audit'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY_PREFIX = 'puck:'

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function buildTemplate(slugForTemplate: string) {
  // Seed per slug
  if (slugForTemplate === 'layout') {
    const order = ['Header', 'Footer'].filter((k) => k in puckConfig.components) as Array<keyof typeof puckConfig.components>
    return { content: order.map((t) => ({ id: createId(), type: t, props: (puckConfig.components as any)[t].defaultProps })) }
  }
  if (slugForTemplate === 'header') {
    return 'Header' in puckConfig.components
      ? { content: [{ id: createId(), type: 'Header', props: (puckConfig.components as any).Header.defaultProps }] }
      : { content: [] }
  }
  if (slugForTemplate === 'footer') {
    return 'Footer' in puckConfig.components
      ? { content: [{ id: createId(), type: 'Footer', props: (puckConfig.components as any).Footer.defaultProps }] }
      : { content: [] }
  }
  if (slugForTemplate === 'homepage') {
    const order = ['Hero', 'Trials'].filter((k) => k in puckConfig.components) as Array<keyof typeof puckConfig.components>
    return { content: order.map((t) => ({ id: createId(), type: t, props: (puckConfig.components as any)[t].defaultProps })) }
  }
  return { content: [] }
}

function getKeyForSlug(slug: string) {
  return `${STORAGE_KEY_PREFIX}${slug}`
}

export default function PuckNative() {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const slug = search.get('slug') || 'homepage'
  const pageTitle = slug.charAt(0).toUpperCase() + slug.slice(1)

  function sanitize(data: any) {
    const list = Array.isArray(data?.content) ? [...data.content] : []
    let result = list
      .filter((n: any) => !!n && typeof n === 'object' && n.type && (puckConfig.components as any)[n.type])
      .map((n: any) => {
        const cfg = (puckConfig.components as any)[n.type]
        const mergedProps = { ...(cfg?.defaultProps ?? {}), ...(n.props ?? {}) }
        return { id: n.id || createId(), type: n.type, props: mergedProps }
      })

    // If nothing valid, seed a sensible default template
    if (!result.length) return buildTemplate(slug)

    // Homepage-specific constraints only
    if (slug === 'homepage') {
      // Ensure exactly one Hero at the top for homepage content
      if ((puckConfig.components as any).Hero) {
        const firstHeroIndex = result.findIndex((b: any) => b.type === 'Hero')
        if (firstHeroIndex === -1) {
          result.unshift({ id: createId(), type: 'Hero', props: (puckConfig.components as any).Hero.defaultProps })
        } else if (firstHeroIndex > 0) {
          const [hero] = result.splice(firstHeroIndex, 1)
          result.unshift(hero)
        }
        // remove extra Heroes beyond the first
        let heroSeen = false
        result = result.filter((b: any) => {
          if (b.type !== 'Hero') return true
          if (!heroSeen) {
            heroSeen = true
            return true
          }
          return false
        })
      }

      // De-duplicate Trials block (keep the first only)
      let trialsSeen = false
      result = result.filter((b: any) => {
        if (b.type !== 'Trials') return true
        if (!trialsSeen) {
          trialsSeen = true
          return true
        }
        return false
      })
    }

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
    return buildTemplate(slug)
  }, [slug])

  // Note: no auto-persist/cleanup on load to avoid surprising content changes

  // Limit available components based on what is being edited
  const scopedConfig = useMemo(() => {
    const cloned: any = { ...puckConfig, components: { ...puckConfig.components } }
    // Only expose Header/Footer when editing the unified layout slug
    if (slug !== 'layout') {
      delete cloned.components.Header
      delete cloned.components.Footer
    }
    return cloned
  }, [slug])

  return (
    <div className="min-h-screen">
      {/* Official Puck editor UI */}
      <Puck
        config={scopedConfig}
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


