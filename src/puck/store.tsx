import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type PuckContent = { content: Array<{ id?: string; type: string; props?: Record<string, unknown> }> }

type EditorStore = {
  dataBySlug: Record<string, PuckContent>
  setForSlug: (slug: string, data: PuckContent) => void
}

const Ctx = createContext<EditorStore | null>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [dataBySlug, setDataBySlug] = useState<Record<string, PuckContent>>({})
  const setForSlug = (slug: string, data: PuckContent) => {
    setDataBySlug(prev => ({ ...prev, [slug]: data }))
  }
  const value = useMemo(() => ({ dataBySlug, setForSlug }), [dataBySlug])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/**
 * Access and lazily hydrate Puck content for a given slug.
 * Data is persisted in localStorage under `puck:<slug>`.
 */
export function useEditorData(
  slug: string
): { data: PuckContent | null; setData: (d: PuckContent) => void } {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useEditorData must be used within EditorProvider')

  // Lazy hydration from localStorage when no in-memory data exists
  useEffect(() => {
    const key = `puck:${slug}`
    if (!ctx.dataBySlug[slug] && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(key)
        if (raw) {
          const parsed = JSON.parse(raw) as PuckContent
          if (parsed && Array.isArray(parsed.content)) {
            ctx.setForSlug(slug, parsed)
          }
        }
      } catch {
        // ignore parse errors and keep default null state
      }
    }
  }, [slug, ctx.dataBySlug, ctx.setForSlug])

  return { data: ctx.dataBySlug[slug] ?? null, setData: (d) => ctx.setForSlug(slug, d) }
}


