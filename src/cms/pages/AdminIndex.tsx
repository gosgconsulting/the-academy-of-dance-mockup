import { Link } from 'react-router-dom'
import { useAuth } from '@/cms/auth/auth'
import { registry } from '@/cms/content/registry'

export default function AdminIndex() {
  const { logout } = useAuth()
  const entries = Object.entries(registry)
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin · Pages</h1>
        <button 
          onClick={logout}
          className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
      <div className="divide-y border rounded">
        {entries.map(([slug, entry]) => (
          <div key={slug} className="flex items-center justify-between p-4 gap-3">
            <div>
              <div className="font-medium">{entry.title}</div>
              <div className="text-sm opacity-70">/{slug}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/admin/${slug}`} className="px-3 py-1.5 border rounded hover:bg-gray-50">Edit</Link>
              <Link to={`/edit`} className="px-3 py-1.5 border rounded hover:bg-gray-50">Visual editor</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


