import React from 'react'
import { useEditor } from '@craftjs/core'

export default function OutlinePanel() {
  const { actions, rootChildren, query, selected } = useEditor((state, query) => {
    const root = state.nodes['ROOT']
    return {
      rootChildren: (root?.data?.nodes as string[]) || [],
      query,
      selected: state.events.selected,
    }
  }) as any

  const select = (id: string) => actions.selectNode(id)
  const del = (id: string) => actions.delete(id)
  const move = (id: string, dir: -1 | 1) => {
    const idx = rootChildren.indexOf(id)
    if (idx === -1) return
    const to = idx + dir
    if (to < 0 || to >= rootChildren.length) return
    actions.move(id, 'ROOT', to)
  }

  return (
    <div className="p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Outline</div>
      <div className="space-y-2">
        {rootChildren.map((id: string) => {
          const node = query.node(id).get()
          const name = node?.data?.displayName || node?.data?.type?.resolvedName || 'Node'
          const isSelected = selected?.has(id)
          return (
            <div key={id} className={`border rounded p-2 bg-white ${isSelected ? 'ring-1 ring-sky-400' : ''}`}>
              <div className="flex items-center justify-between gap-2">
                <button className="text-left flex-1" onClick={() => select(id)}>
                  <div className="text-sm">{name}</div>
                </button>
                <div className="flex items-center gap-1">
                  <button className="px-2 py-0.5 text-xs border rounded" onClick={() => move(id, -1)}>↑</button>
                  <button className="px-2 py-0.5 text-xs border rounded" onClick={() => move(id, 1)}>↓</button>
                  <button className="px-2 py-0.5 text-xs border rounded text-red-600" onClick={() => del(id)}>✕</button>
                </div>
              </div>
            </div>
          )
        })}
        {!rootChildren.length && (
          <div className="text-xs text-gray-500">Drag components from Toolbox</div>
        )}
      </div>
    </div>
  )
}


