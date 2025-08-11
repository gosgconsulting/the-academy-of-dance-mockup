import React, { useMemo, useState } from 'react'
import { Render } from '@measured/puck'
import puckConfig from '@/puck/config'

// For step 1, we only edit the global layout (Header & Footer)
const STORAGE_KEY = 'puck:layout'

type ContentItem = { id: string; type: keyof typeof puckConfig.components | string; props?: Record<string, unknown> }

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export default function PuckEditor() {
  // Limit editor to Header and Footer for now
  const allowed: Array<keyof typeof puckConfig.components> = useMemo(() => {
    return (['Header', 'Footer'] as Array<keyof typeof puckConfig.components>).filter(
      (k) => k in puckConfig.components
    )
  }, [])

  function buildTemplate(): ContentItem[] {
    return allowed.map((t) => ({
      id: createId(),
      type: t,
      props: puckConfig.components[t].defaultProps,
    }))
  }

  const [content, setContent] = useState<ContentItem[]>(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.content)) {
          // Ensure each item has an id and props object
          return parsed.content.map((c: any) => ({
            id: c?.id || createId(),
            type: c?.type,
            props: c?.props ?? {}
          }))
        }
      } catch {}
    }
    return buildTemplate()
  })
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const selected = selectedIndex != null ? content[selectedIndex] : null
  const [jsonDraft, setJsonDraft] = useState<string>(
    JSON.stringify(selected?.props ?? {}, null, 2)
  )
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  // keep jsonDraft in sync when selection changes
  React.useEffect(() => {
    setJsonDraft(JSON.stringify(selected?.props ?? {}, null, 2))
    setJsonError(null)
  }, [selectedIndex])

  function saveToStorage(next: ContentItem[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ content: next })
    )
  }

  function addBlock(type: keyof typeof puckConfig.components) {
    const def = puckConfig.components[type]
    const next = [...content, { id: createId(), type, props: def?.defaultProps ?? {} }]
    setContent(next)
    setSelectedIndex(next.length - 1)
  }

  function removeBlock(index: number) {
    const next = content.filter((_, i) => i !== index)
    setContent(next)
    if (next.length === 0) setSelectedIndex(null)
    else if (index >= next.length) setSelectedIndex(next.length - 1)
    else setSelectedIndex(index)
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= content.length) return
    const next = [...content]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    setContent(next)
    setSelectedIndex(target)
  }

  function duplicateBlock(index: number) {
    const original = content[index]
    if (!original) return
    const clone: ContentItem = {
      id: createId(),
      type: original.type,
      props: JSON.parse(JSON.stringify(original.props ?? {})),
    }
    const next = [...content]
    next.splice(index + 1, 0, clone)
    setContent(next)
    setSelectedIndex(index + 1)
  }

  function applyJsonDraft() {
    if (selectedIndex == null) return
    try {
      const parsed = jsonDraft.trim() ? JSON.parse(jsonDraft) : {}
      const next = content.map((c, i) => (i === selectedIndex ? { ...c, props: parsed } : c))
      setContent(next)
      setJsonError(null)
    } catch (e: any) {
      setJsonError(e?.message || 'Invalid JSON')
    }
  }

  function publish() {
    saveToStorage(content)
  }

  function reorder(list: ContentItem[], from: number, to: number) {
    if (from === to) return list
    const next = [...list]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    return next
  }

  function handleDragStart(index: number, e: React.DragEvent) {
    setDraggingIndex(index)
    try { e.dataTransfer.setData('text/plain', String(index)) } catch {}
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(dropIndex: number, e: React.DragEvent) {
    e.preventDefault()
    let from = draggingIndex
    try {
      const raw = e.dataTransfer.getData('text/plain')
      const parsed = parseInt(raw, 10)
      if (!Number.isNaN(parsed)) from = parsed
    } catch {}
    if (from == null || from === dropIndex) return setDraggingIndex(null)
    const next = reorder(content, from, dropIndex)
    setContent(next)
    setSelectedIndex(dropIndex)
    setDraggingIndex(null)
  }

  function handleDropAtEnd(e: React.DragEvent) {
    e.preventDefault()
    if (draggingIndex == null) return
    const next = reorder(content, draggingIndex, content.length - 1)
    setContent(next)
    setSelectedIndex(content.length - 1)
    setDraggingIndex(null)
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr_360px]">
      {/* Left sidebar */}
      <aside className="border-r bg-gray-50 min-h-screen p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-sm font-semibold tracking-wide text-gray-700">Layout blocks</h2>
        </div>
        <div className="space-y-2">
          {allowed.map((k) => (
            <button
              key={String(k)}
              className="w-full text-left px-3 py-2 rounded border bg-white hover:bg-gray-50 text-sm"
              onClick={() => addBlock(k)}
            >
              {String(k)}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold tracking-wide text-gray-700 mb-2">Outline</h3>
          <div className="space-y-1" onDragOver={handleDragOver}>
            {content.map((item, i) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(i, e)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(i, e)}
                className={`flex items-center justify-between gap-2 px-2 py-1 rounded border bg-white text-xs ${selectedIndex===i?'ring-1 ring-black':''} ${draggingIndex===i?'opacity-60':''}`}
              >
                <button className="text-left flex-1 truncate" onClick={() => setSelectedIndex(i)}>
                  {i + 1}. {String(item.type)}
                </button>
                <div className="flex items-center gap-1">
                  <button className="px-1.5 py-0.5 border rounded" onClick={() => moveBlock(i, -1)} disabled={i===0}>↑</button>
                  <button className="px-1.5 py-0.5 border rounded" onClick={() => moveBlock(i, 1)} disabled={i===content.length-1}>↓</button>
                  <button className="px-1.5 py-0.5 border rounded" onClick={() => duplicateBlock(i)}>⎘</button>
                  <button className="px-1.5 py-0.5 border rounded text-red-600" onClick={() => removeBlock(i)}>✕</button>
                </div>
              </div>
            ))}
            <div
              className="h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-[11px] text-gray-500"
              onDragOver={handleDragOver}
              onDrop={handleDropAtEnd}
            >
              Drop here to move to end
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <button
            className="w-full px-3 py-2 bg-black text-white rounded text-sm"
            onClick={publish}
          >
            Save to browser
          </button>
        </div>
      </aside>

      {/* Canvas */}
      <main className="min-h-screen bg-white overflow-y-auto">
        <div className="sticky top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2 border-b bg-white/90 backdrop-blur">
          <div className="text-sm text-gray-600">Page {selected ? <>› <span className="font-medium">{String(selected.type)}</span></> : null}</div>
          <div className="justify-self-center text-xs text-gray-500">Header + Footer</div>
          <div className="justify-self-end flex items-center gap-2">
            <a className="px-3 py-1.5 border rounded text-sm" href="/" target="_blank" rel="noreferrer">View site</a>
            <button className="px-3 py-1.5 border rounded text-sm" onClick={() => { setContent(buildTemplate()); setSelectedIndex(0); }}>
              Reset template
            </button>
            <button className="px-3 py-1.5 border rounded text-sm" onClick={() => { localStorage.removeItem(STORAGE_KEY); setContent(buildTemplate()); setSelectedIndex(0); }}>
              Clear saved
            </button>
            <button className="px-3 py-1.5 border rounded text-sm" onClick={() => publish()}>Publish</button>
          </div>
        </div>

        {/* Live render of header + footer only */}
        <div className="w-full" style={{ height: 'calc(100vh - 48px)' }}>
          <Render
            config={puckConfig}
            data={{
              content: content.map((c) => ({ type: c.type, props: c.props })),
            }}
          />
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="border-l bg-gray-50 min-h-screen p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-sm font-semibold tracking-wide text-gray-700">Block settings</h2>
          {selected ? (
            <div className="mt-2 text-xs text-gray-600">Editing: {String(selected.type)}</div>
          ) : (
            <div className="mt-2 text-xs text-gray-500">Select a block to edit</div>
          )}
        </div>

        {selected && (
          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-700">Props (JSON)</label>
            <textarea
              className="w-full h-[360px] p-2 text-xs font-mono border rounded bg-white"
              value={jsonDraft}
              onChange={(e) => setJsonDraft(e.target.value)}
              spellCheck={false}
            />
            {jsonError && (
              <div className="text-xs text-red-600">{jsonError}</div>
            )}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-black text-white rounded text-sm" onClick={applyJsonDraft}>
                Apply
              </button>
              <button className="px-3 py-1.5 border rounded text-sm" onClick={() => setJsonDraft(JSON.stringify(selected.props ?? {}, null, 2))}>
                Reset
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <button className="w-full px-3 py-2 bg-black text-white rounded text-sm" onClick={publish}>
            Save to browser
          </button>
        </div>
      </aside>
    </div>
  )
}


