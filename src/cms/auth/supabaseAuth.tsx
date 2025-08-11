import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/cms/supabaseClient'

type AuthValue = {
  session: Session | null
  user: User | null
  loading: boolean
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string }>
  signUpWithPassword: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthValue | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const value: AuthValue = useMemo(() => ({
    session,
    user: session?.user ?? null,
    loading,
    async signInWithPassword(email: string, password: string) {
      if (!supabase) return { error: 'Supabase not configured' }
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error?.message }
    },
    async signUpWithPassword(email: string, password: string) {
      if (!supabase) return { error: 'Supabase not configured' }
      const { error } = await supabase.auth.signUp({ email, password })
      return { error: error?.message }
    },
    async signOut() {
      if (!supabase) return
      await supabase.auth.signOut()
    }
  }), [session, loading])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSupabaseAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider')
  return ctx
}


