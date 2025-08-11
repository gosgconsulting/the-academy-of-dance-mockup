import React, { useMemo } from 'react'
import { Puck } from '@measured/puck'
import puckConfig from '@/puck/config'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { registry } from '@/cms/content/registry'

const STORAGE_KEY_PREFIX = 'puck:'

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function buildTemplate() {
  const order = [
    'Header', 'Hero', 'Trials', 'About', 'Vision', 'Programs', 'Competitions',
    'Events', 'Achievements', 'Teachers', 'Reviews', 'Locations', 'Gallery', 'Footer'
  ].filter((k) => k in puckConfig.components) as Array<keyof typeof puckConfig.components>
  return {
    content: order.map((t) => ({ id: createId(), type: t, props: puckConfig.components[t].defaultProps }))
  }
}

function getKeyForSlug(slug: string) {
  return `${STORAGE_KEY_PREFIX}${slug}`
}

export default function PuckNative() {
  const location = useLocation()
  const navigate = useNavigate()
  const search = new URLSearchParams(location.search)
  const slug = search.get('slug') || 'homepage'
  const pageTitle = (registry as any)[slug]?.title || slug

  const initial = useMemo(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(getKeyForSlug(slug)) : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.content)) {
          return {
            content: parsed.content.map((c: any) => ({
              id: c?.id || createId(),
              type: c?.type,
              props: c?.props ?? {}
            }))
          }
        }
      } catch {}
    }
    return buildTemplate()
  }, [slug])

  return (
    <div className="min-h-screen">
      {/* Header bar with page switcher */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-2 border-b bg-white">
        <div className="text-sm">
          <span className="opacity-60">Page</span>
          <span className="mx-1">›</span>
          <span className="font-medium">{pageTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Simple page links */}
          {Object.entries(registry).map(([s, entry]) => (
            <Link
              key={s}
              className={`text-xs px-2 py-1 rounded border ${s===slug?'bg-black text-white':'bg-white'}`}
              to={`/edit?slug=${encodeURIComponent(s)}`}
            >
              {entry.title}
            </Link>
          ))}
        </div>
      </div>

      <Puck
        config={puckConfig}
        data={initial}
        onPublish={(data) => {
          localStorage.setItem(getKeyForSlug(slug), JSON.stringify(data))
        }}
      />
    </div>
  )
}


