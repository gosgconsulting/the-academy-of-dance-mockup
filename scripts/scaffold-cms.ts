/*
  CLI: Scaffold content-only CMS files into a React project.
  Usage:
    npx tsx scripts/scaffold-cms.ts --yes

  This script copies the minimal CMS files (auth providers, hook, editor, schemas, registry)
  into an existing React + Vite project. It avoids overwriting existing files unless --force.
*/
import { promises as fs } from 'fs'
import path from 'path'

type FileSpec = { to: string; content: string }

async function ensureDir(p: string) { await fs.mkdir(p, { recursive: true }) }

async function writeIfMissing(spec: FileSpec, force = false) {
  const abs = path.resolve(spec.to)
  const exists = await fs.stat(abs).then(() => true).catch(() => false)
  if (exists && !force) return
  await ensureDir(path.dirname(abs))
  await fs.writeFile(abs, spec.content, 'utf-8')
}

async function run() {
  const force = process.argv.includes('--force')
  const files: FileSpec[] = [
    {
      to: 'src/cms/supabaseClient.ts',
      content: `import { createClient } from '@supabase/supabase-js'\nconst url = import.meta.env.VITE_SUPABASE_URL as string | undefined\nconst anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined\nexport const supabase = url && anonKey ? createClient(url, anonKey) : null\n`
    },
    {
      to: 'src/cms/auth/supabaseAuth.tsx',
      content: `import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'\nimport type { Session, User } from '@supabase/supabase-js'\nimport { supabase } from '@/cms/supabaseClient'\n\ntype AuthValue = { session: Session | null; user: User | null; loading: boolean; signInWithPassword: (e:string,p:string)=>Promise<{error?:string}>; signUpWithPassword: (e:string,p:string)=>Promise<{error?:string}>; signOut:()=>Promise<void> }\nconst Ctx = createContext<AuthValue | undefined>(undefined)\nexport function SupabaseAuthProvider({ children }: { children: ReactNode }) {\n  const [session, setSession] = useState<Session | null>(null)\n  const [loading, setLoading] = useState(true)\n  useEffect(() => { if (!supabase) { setLoading(false); return } supabase.auth.getSession().then(({data})=>{ setSession(data.session??null); setLoading(false) }); const { data: sub } = supabase.auth.onAuthStateChange((_e,s)=>{ setSession(s) }); return () => { sub.subscription.unsubscribe() } }, [])\n  const value = useMemo(()=>({ session, user: session?.user ?? null, loading, async signInWithPassword(email:string,password:string){ if(!supabase) return {error:'Supabase not configured'}; const { error } = await supabase.auth.signInWithPassword({ email, password }); return { error: error?.message } }, async signUpWithPassword(email:string,password:string){ if(!supabase) return {error:'Supabase not configured'}; const { error } = await supabase.auth.signUp({ email, password }); return { error: error?.message } }, async signOut(){ if(!supabase) return; await supabase.auth.signOut() } }), [session, loading])\n  return <Ctx.Provider value={value}>{children}</Ctx.Provider>\n}\nexport function useSupabaseAuth(){ const ctx = useContext(Ctx); if(!ctx) throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider'); return ctx }\n`
    },
    {
      to: 'src/cms/auth/auth.tsx',
      content: `import { createContext, useContext, useState, type ReactNode } from 'react'\ntype AuthContext = { authed: boolean; login: (t:string)=>boolean; logout: ()=>void }\nconst Ctx = createContext<AuthContext>({ authed:false, login:()=>false, logout:()=>{} })\nconst EXPECTED = import.meta.env.VITE_CMS_TOKEN\nexport const AuthProvider = ({ children }: { children: ReactNode }) => { const [authed, setAuthed] = useState(!!localStorage.getItem('cms:auth')); const login = (token:string)=>{ if(EXPECTED && token===EXPECTED){ localStorage.setItem('cms:auth','1'); setAuthed(true); return true } return false }; const logout = ()=>{ localStorage.removeItem('cms:auth'); setAuthed(false) }; return <Ctx.Provider value={{ authed, login, logout }}>{children}</Ctx.Provider> }\nexport const useAuth = ()=> useContext(Ctx)\n`
    },
    {
      to: 'src/cms/auth/ProtectedRoute.tsx',
      content: `import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'\nimport { useAuth } from '@/cms/auth/auth'\nimport { Navigate, Outlet, useLocation } from 'react-router-dom'\nexport default function ProtectedRoute(){ const { session, loading } = useSupabaseAuth(); const { authed } = useAuth(); const location = useLocation(); if(loading) return null; if(!session) return <Navigate to='/login' replace state={{ from: location.pathname }} />; if(!authed) return <Navigate to='/signup' replace state={{ from: location.pathname }} />; return <Outlet /> }\n`
    },
    {
      to: 'src/cms/usePageContent.ts',
      content: `import { useEffect, useState } from 'react'\nimport { supabase } from '@/cms/supabaseClient'\nexport function usePageContent<T>(slug: string, defaults: T){ const [data,setData]=useState<T>(defaults); const [loading,setLoading]=useState(true); const [error,setError]=useState<string|null>(null); const [exists,setExists]=useState(false); useEffect(()=>{ let cancelled=false; (async()=>{ setLoading(true); setError(null); try{ if(!supabase){ setData(defaults); setLoading(false); return } const { data:row, error } = await supabase.from('pages').select('*').eq('slug', slug).maybeSingle(); if(error) throw error; const next = (row?.data as T) ?? defaults; setExists(!!row); if(!cancelled) setData(next) }catch(e:any){ if(!cancelled) setError(e?.message||'Failed to load content') }finally{ if(!cancelled) setLoading(false) } })(); return ()=>{ cancelled=true } }, [slug]); async function save(next:T){ if(!supabase) throw new Error('Supabase not configured'); const { error } = await supabase.from('pages').upsert({ slug, data: next }); if(error) throw error; setData(next); setExists(true) } return { data, setData, loading, error, save, exists } }\n`
    },
  ]

  for (const f of files) await writeIfMissing(f, force)
  console.log('CMS scaffold complete. Add schemas, registry and routes as per docs/cms-blueprint.md')
}

run().catch(e => { console.error(e); process.exit(1) })


