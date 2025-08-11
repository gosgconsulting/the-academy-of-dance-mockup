import { useState } from 'react'
import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'
import { Navigate, useLocation } from 'react-router-dom'

export default function Login() {
  const { signInWithPassword, session, loading } = useSupabaseAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const from = (location.state as any)?.from || '/admin/migrate'

  if (session && !loading) return <Navigate to={from} replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signInWithPassword(email, password)
    if (error) setError(error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">Log in</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="border px-3 py-2 w-full" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border px-3 py-2 w-full" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-black text-white px-4 py-2" type="submit">Sign in</button>
      </form>
    </div>
  )
}


