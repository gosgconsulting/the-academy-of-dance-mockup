import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'
import { useAuth } from '@/cms/auth/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { supabase } from '@/cms/supabaseClient'

export default function ProtectedRoute() {
  const { session, loading } = useSupabaseAuth()
  const { authed } = useAuth()
  const location = useLocation()

  // If Supabase is configured, use Supabase auth
  if (supabase) {
    if (loading) return null
    if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
    return <Outlet />
  }

  // Otherwise, use simple token auth
  if (!authed) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
