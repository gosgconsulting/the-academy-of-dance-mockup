import { useEffect, useState } from 'react'
import { supabase } from '@/cms/supabaseClient'

export type PageData<T = any> = { slug: string; data: T }

export function usePageContent<T>(slug: string, defaults: T, clientId?: string) {
  const [data, setData] = useState<T>(defaults)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [exists, setExists] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      setLoading(true)
      setError(null)
      try {
        if (!supabase) {
          setData(defaults)
          setLoading(false)
          return
        }
        const envClientId = (clientId ?? (import.meta.env.VITE_CMS_CLIENT_ID as string | undefined) ?? 'default')
        const base = supabase.from('pages').select('*').eq('slug', slug)
        let rowRes = await base.eq('client_id', envClientId).maybeSingle()
        // Fallback to legacy rows without client_id
        if (!rowRes.data && !rowRes.error) {
          rowRes = await base.is('client_id', null).maybeSingle()
        }
        const { data: row, error } = rowRes
        if (error) throw error
        const next = (row?.data as T) ?? defaults
        setExists(!!row)
        if (!cancelled) setData(next)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load content')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [slug])

  async function save(next: T) {
    if (!supabase) throw new Error('Supabase not configured')
    const envClientId = (clientId ?? (import.meta.env.VITE_CMS_CLIENT_ID as string | undefined) ?? 'default')
    const payload: any = { slug, data: next, client_id: envClientId }

    // Try to find an existing row by (slug, client_id). If not present, fall back to slug only.
    const base = supabase.from('pages')
    let find = await base.select('id').eq('slug', slug).eq('client_id', envClientId).maybeSingle()
    if (!find.data && !find.error) {
      find = await base.select('id').eq('slug', slug).maybeSingle()
    }

    if (find.error) throw find.error

    if (find.data?.id) {
      const { error: updateErr } = await supabase.from('pages').update({ data: next, client_id: envClientId }).eq('id', find.data.id)
      if (updateErr) throw updateErr
    } else {
      const { error: insertErr } = await supabase.from('pages').insert(payload)
      if (insertErr) throw insertErr
    }
    setData(next)
    setExists(true)
    return true
  }

  return { data, setData, loading, error, save, exists }
}


