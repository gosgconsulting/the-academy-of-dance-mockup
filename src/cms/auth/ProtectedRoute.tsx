import { useAuth } from '@/cms/auth/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const { authed } = useAuth()
  const location = useLocation()
  if (!authed) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
