import { useSupabaseAuth } from '@/cms/auth/supabaseAuth'
import { useAuth } from '@/cms/auth/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const { session, loading } = useSupabaseAuth()
  const location = useLocation()
  if (loading) return null
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}


