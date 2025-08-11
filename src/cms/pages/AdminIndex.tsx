import { Link } from 'react-router-dom'
import { registry } from '@/cms/content/registry'

export default function AdminIndex() {
  const entries = Object.entries(registry)
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin · Pages</h1>
      <div className="divide-y border rounded">
        {entries.map(([slug, entry]) => (
          <div key={slug} className="flex items-center justify-between p-4 gap-3">
            <div>
              <div className="font-medium">{entry.title}</div>
              <div className="text-sm opacity-70">/{slug}</div>
            </div>
            <Link to={`/admin/${slug}`} className="px-3 py-1.5 border rounded hover:bg-gray-50">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


