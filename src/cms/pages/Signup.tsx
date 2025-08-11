import { useRef, useState } from 'react'
import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'
import { useAuth } from '@/cms/auth/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const { signUpWithPassword } = useSupabaseAuth()
  const { authed, login } = useAuth()
  const navigate = useNavigate()

  const tokenRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white border rounded p-6 space-y-4">
          <h1 className="text-xl font-semibold">Enter CMS Token</h1>
          <input ref={tokenRef} className="border px-3 py-2 w-full" type="password" placeholder="CMS token" />
          <button className="w-full bg-black text-white px-4 py-2" onClick={() => {
            const ok = login(tokenRef.current?.value || '')
            if (!ok) alert('Invalid token')
          }}>Continue</button>
        </div>
      </div>
    )
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (!email || !password) { setError('Email and password are required'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    const { error } = await signUpWithPassword(email, password)
    if (error) { setError(error); return }
    setMessage('Sign-up successful. Please log in.')
    setTimeout(() => navigate('/login'), 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create CMS Account</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <input className="border px-3 py-2 w-full" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border px-3 py-2 w-full" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="border px-3 py-2 w-full" type="password" placeholder="confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <button className="w-full bg-black text-white px-4 py-2" type="submit">Sign up</button>
        <p className="text-sm">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
      </form>
    </div>
  )
}


