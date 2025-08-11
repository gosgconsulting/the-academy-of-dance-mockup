import { useState } from 'react'
import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'
import { useAuth } from '@/cms/auth/auth'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '@/cms/supabaseClient'

export default function Login() {
  const { signInWithPassword, session, loading } = useSupabaseAuth()
  const { authed, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const from = (location.state as any)?.from || '/admin'

  // Check authentication status
  const isAuthenticated = supabase ? (session && !loading) : authed
  if (isAuthenticated) return <Navigate to={from} replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (supabase) {
      // Use Supabase authentication
      const { error } = await signInWithPassword(email, password)
      if (error) setError(error)
    } else {
      // Use simple token authentication
      const success = login(token)
      if (!success) setError('Invalid token')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">Log in</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {supabase ? (
          // Supabase login form
          <>
            <input
              className="border px-3 py-2 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="border px-3 py-2 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </>
        ) : (
          // Simple token login form
          <>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <strong>Demo Mode:</strong> Use token <code className="bg-blue-100 px-1 rounded">admin123</code>
            </div>
            <input
              className="border px-3 py-2 w-full"
              type="text"
              placeholder="Access Token"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
            />
          </>
        )}

        <button className="w-full bg-black text-white px-4 py-2" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}
