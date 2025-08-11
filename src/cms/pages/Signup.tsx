import { Navigate } from 'react-router-dom'

export default function Signup() {
  // For local development, just redirect to login
  return <Navigate to="/login" replace />
}


