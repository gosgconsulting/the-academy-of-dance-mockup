import React from 'react'
import { useEditor } from '@craftjs/core'
import { isHtmlPropName, safeStringify } from './utils'

export default function SettingsPanel() {
  const { actions, selectedId, meta, isTopLevel, queryApi } = useEditor((state, query) => {
    const selected = state.events.selected
    const id = selected.size ? Array.from(selected)[0] : null
    return {
      selectedId: id,
      meta: id ? query.node(id).get() : null,
      isTopLevel: id ? (query.node(id).get()?.data?.parent === 'ROOT') : false,
      queryApi: query,
    }
  }) as any

  if (!selectedId || !meta) return <div className="p-3 text-sm text-gray-500">Select a node to edit</div>

  function hasEditableProps(m: any) {
    const p = (m?.data?.props) || {}
    const keys = Object.keys(p).filter((k) => typeof (p as any)[k] !== 'function')
    const filtered = keys.filter((k) => !isHtmlPropName(k))
    return filtered.length > 0
  }

  let editableId = selectedId
  let editableMeta = meta
  while (editableId && editableMeta?.data?.parent && editableMeta.data.parent !== 'ROOT' && !hasEditableProps(editableMeta)) {
    const pid = editableMeta.data.parent
    const pm = queryApi.node(pid).get()
    if (!pm) break
    editableId = pid
    editableMeta = pm
  }

  const type = editableMeta.data.displayName || editableMeta.data.type?.resolvedName
  const props = editableMeta.data.props || {}

  const componentSchemas: Record<string, Record<string, { type: 'string'|'string-long'|'number'|'boolean'|'array-string'|'json'; label?: string }>> = {}

  const setProp = (key: string, value: any) => {
    actions.setProp(editableId, (p: any) => { p[key] = value })
  }

  return (
    <div className="p-3 space-y-3">
      <div className="text-xs text-gray-500">Selected: {type}</div>
      <div>
        <button
          className={`px-3 py-1.5 text-sm border rounded bg-white ${isTopLevel ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 text-red-600'}`}
          disabled={isTopLevel}
          onClick={() => { if (!isTopLevel) actions.delete(selectedId) }}
        >
          Delete element
        </button>
      </div>
      {editableId !== selectedId && (
        <div className="text-xs text-gray-500">
          Editing parent component props ({type}).
          <button className="ml-2 underline" onClick={() => actions.selectNode(editableId)}>select</button>
        </div>
      )}

      {type && componentSchemas[type] ? (
        <div className="space-y-2">
          {Object.entries(componentSchemas[type]).map(([key, cfg]) => {
            const label = cfg.label || key
            const val = (props as any)[key]
            if (cfg.type === 'boolean') {
              return (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-xs text-gray-600">{label}</label>
                  <input type="checkbox" checked={Boolean(val)} onChange={(e) => setProp(key, e.target.checked)} />
                </div>
              )
            }
            if (cfg.type === 'number') {
              return (
                <div key={key} className="space-y-1">
                  <label className="text-xs text-gray-600">{label}</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={Number(val) || 0} onChange={(e) => setProp(key, Number(e.target.value))} />
                </div>
              )
            }
            if (cfg.type === 'string' || cfg.type === 'string-long') {
              const Long = cfg.type === 'string-long'
              return (
                <div key={key} className="space-y-1">
                  <label className="text-xs text-gray-600">{label}</label>
                  {Long ? (
                    <textarea className="w-full border rounded px-2 py-1" rows={3} value={val || ''} onChange={(e) => setProp(key, e.target.value)} />
                  ) : (
                    <input className="w-full border rounded px-2 py-1" value={val || ''} onChange={(e) => setProp(key, e.target.value)} />
                  )}
                </div>
              )
            }
            if (cfg.type === 'array-string') {
              const arr: string[] = Array.isArray(val) ? val : []
              const updateAt = (i: number, v: string) => setProp(key, arr.map((it, idx) => idx === i ? v : it))
              const addItem = () => setProp(key, [...arr, ''])
              const removeAt = (i: number) => setProp(key, arr.filter((_, idx) => idx !== i))
              return (
                <div key={key} className="space-y-1">
                  <label className="text-xs text-gray-600">{label}</label>
                  <div className="space-y-1">
                    {arr.map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input className="flex-1 border rounded px-2 py-1" value={v} onChange={(e) => updateAt(i, e.target.value)} />
                        <button className="px-2 py-1 text-xs border rounded" onClick={() => removeAt(i)}>✕</button>
                      </div>
                    ))}
                    <button className="px-2 py-1 text-xs border rounded" onClick={addItem}>+ Add</button>
                  </div>
                </div>
              )
            }
            return (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-600">{label} (JSON)</label>
                <textarea className="w-full border rounded px-2 py-1 font-mono text-xs" rows={6}
                  value={safeStringify(val)}
                  onChange={(e) => { try { setProp(key, JSON.parse(e.target.value)) } catch {} }}
                />
              </div>
            )
          })}
        </div>
      ) : null}

      <div className="space-y-2">
        {Object.entries(props).filter(([k]) => !isHtmlPropName(k)).map(([key, val]) => {
          if (typeof val === 'function') return null
          if (typeof val === 'boolean') {
            return (
              <div key={key} className="flex items-center justify-between">
                <label className="text-xs text-gray-600">{key}</label>
                <input type="checkbox" checked={val} onChange={(e) => setProp(key, e.target.checked)} />
              </div>
            )
          }
          if (typeof val === 'number') {
            return (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-600">{key}</label>
                <input type="number" className="w-full border rounded px-2 py-1" value={val} onChange={(e) => setProp(key, Number(e.target.value))} />
              </div>
            )
          }
          if (typeof val === 'string') {
            const isLong = /title|subtitle|description|text|label|content|html/i.test(key)
            return (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-600">{key}</label>
                {isLong ? (
                  <textarea className="w-full border rounded px-2 py-1" rows={3} value={val} onChange={(e) => setProp(key, e.target.value)} />
                ) : (
                  <input className="w-full border rounded px-2 py-1" value={val} onChange={(e) => setProp(key, e.target.value)} />
                )}
              </div>
            )
          }
          if (Array.isArray(val) && val.every((v) => typeof v === 'string')) {
            const arr = val as string[]
            const updateAt = (i: number, v: string) => setProp(key, arr.map((it, idx) => idx === i ? v : it))
            const addItem = () => setProp(key, [...arr, ''])
            const removeAt = (i: number) => setProp(key, arr.filter((_, idx) => idx !== i))
            return (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-600">{key} (one per line)</label>
                <div className="space-y-1">
                  {arr.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input className="flex-1 border rounded px-2 py-1" value={v} onChange={(e) => updateAt(i, e.target.value)} />
                      <button className="px-2 py-1 text-xs border rounded" onClick={() => removeAt(i)}>✕</button>
                    </div>
                  ))}
                  <button className="px-2 py-1 text-xs border rounded" onClick={addItem}>+ Add</button>
                </div>
              </div>
            )
          }
          return (
            <div key={key} className="space-y-1">
              <label className="text-xs text-gray-600">{key} (JSON)</label>
              <textarea className="w-full border rounded px-2 py-1 font-mono text-xs" rows={6}
                value={safeStringify(val)}
                onChange={(e) => { try { setProp(key, JSON.parse(e.target.value)) } catch {} }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}


