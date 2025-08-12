import { useState } from 'react'
import { useAuth } from '@/cms/auth/auth'
import { Navigate, useLocation } from 'react-router-dom'

export default function Login() {
  const { login, authed } = useAuth()
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const from = (location.state as any)?.from || '/admin'

  if (authed) return <Navigate to={from} replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(token)
    if (!success) setError('Invalid token')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-gray-600">Enter your admin token to access the CMS</p>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input 
          className="border px-3 py-2 w-full" 
          type="password" 
          placeholder="Admin token" 
          value={token} 
          onChange={e => setToken(e.target.value)} 
        />
        <button className="w-full bg-black text-white px-4 py-2" type="submit">Sign in</button>
        <div className="text-xs text-gray-500">
          <p>For local development, use any token value.</p>
          <p>Set VITE_CMS_TOKEN in your .env file for production.</p>
        </div>
      </form>
    </div>
  )
}
