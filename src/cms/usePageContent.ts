import { useEffect, useState } from 'react'

export type PageData<T = any> = { slug: string; data: T }

// Local storage key prefix for page data
const STORAGE_PREFIX = 'cms:page:'

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
        // Try to load from localStorage
        const storageKey = `${STORAGE_PREFIX}${slug}`
        const stored = localStorage.getItem(storageKey)
        
        if (stored) {
          const parsed = JSON.parse(stored) as T
          setData(parsed)
          setExists(true)
        } else {
          setData(defaults)
          setExists(false)
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load content')
          setData(defaults)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [slug, defaults])

  async function save(next: T) {
    try {
      const storageKey = `${STORAGE_PREFIX}${slug}`
      localStorage.setItem(storageKey, JSON.stringify(next))
      setData(next)
      setExists(true)
      return true
    } catch (e: any) {
      throw new Error('Failed to save content: ' + e?.message)
    }
  }

  return { data, setData, loading, error, save, exists }
}


