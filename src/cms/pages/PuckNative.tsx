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
    const order = ['Header', 'Hero', 'Trials', 'Footer'].filter((k) => k in puckConfig.components) as Array<keyof typeof puckConfig.components>
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
      const ensureSingle = (arr: any[], type: string) => {
        let seen = false
        return arr.filter((b: any) => {
          if (b.type !== type) return true
          if (!seen) { seen = true; return true }
          return false
        })
      }

      // Ensure Header at top
      if ((puckConfig.components as any).Header) {
        const firstHeader = result.findIndex((b: any) => b.type === 'Header')
        if (firstHeader === -1) {
          result.unshift({ id: createId(), type: 'Header', props: (puckConfig.components as any).Header.defaultProps })
        } else if (firstHeader > 0) {
          const [hdr] = result.splice(firstHeader, 1)
          result.unshift(hdr)
        }
        result = ensureSingle(result, 'Header')
      }

      // Ensure Hero after Header
      if ((puckConfig.components as any).Hero) {
        const firstHero = result.findIndex((b: any) => b.type === 'Hero')
        if (firstHero === -1) {
          const hero = { id: createId(), type: 'Hero', props: (puckConfig.components as any).Hero.defaultProps }
          const headerIndex = result.findIndex((b: any) => b.type === 'Header')
          result.splice(Math.max(0, headerIndex + 1), 0, hero)
        }
        // Keep only one Hero
        result = ensureSingle(result, 'Hero')
      }

      // Ensure only one Trials
      result = ensureSingle(result, 'Trials')

      // Ensure Footer at bottom
      if ((puckConfig.components as any).Footer) {
        const firstFooterIdx = result.findIndex((b: any) => b.type === 'Footer')
        if (firstFooterIdx === -1) {
          result.push({ id: createId(), type: 'Footer', props: (puckConfig.components as any).Footer.defaultProps })
        }
        // Keep only the last Footer occurrence
        let lastIdx = -1
        for (let i = 0; i < result.length; i++) {
          if (result[i].type === 'Footer') lastIdx = i
        }
        result = result.filter((b: any, idx: number) => b.type !== 'Footer' || idx === lastIdx)
      }
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


