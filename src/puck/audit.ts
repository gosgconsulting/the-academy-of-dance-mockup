import type { Config } from '@measured/puck'

type PuckData = { content?: Array<{ id?: string; type: string; props?: Record<string, unknown> }> }

function listFieldKeys(fields: any): string[] {
  if (!fields || typeof fields !== 'object') return []
  return Object.keys(fields)
}

export function auditEditorState(config: Config, data: PuckData, label = 'puck:audit') {
  if (!data || !Array.isArray(data.content)) {
    // eslint-disable-next-line no-console
    console.warn(`[${label}] No content array`)
    return
  }

  // eslint-disable-next-line no-console
  console.groupCollapsed(`[${label}] start (items: ${data.content.length})`)

  data.content.forEach((item, index) => {
    const def = (config.components as any)?.[item.type]
    if (!def) {
      console.warn(`[${label}] [${index}] Unknown type "${item.type}"`)
      return
    }
    const fieldKeys = listFieldKeys(def.fields)
    const propKeys = Object.keys(item.props ?? {})

    const missing = fieldKeys.filter((k) => !(k in (item.props ?? {})))
    const extra = propKeys.filter((k) => !fieldKeys.includes(k))

    // eslint-disable-next-line no-console
    console.groupCollapsed(`[${label}] [${index}] ${item.type}`)
    // eslint-disable-next-line no-console
    console.log('fields:', fieldKeys)
    // eslint-disable-next-line no-console
    console.log('props :', propKeys)
    if (missing.length) console.warn('missing props:', missing)
    if (extra.length) console.warn('extra props   :', extra)

    // Outline-level heuristics for Hero
    if (item.type === 'Hero') {
      const hero = item.props ?? {}
      const checks: Array<[string, boolean]> = [
        ['title', typeof (hero as any).title === 'string' && (hero as any).title.length > 0],
        ['description', typeof (hero as any).description === 'string'],
        ['ctaText', typeof (hero as any).ctaText === 'string'],
      ]
      checks.forEach(([k, ok]) => {
        if (!ok) console.warn(`Hero check failed: ${k}`)
      })
    }

    // eslint-disable-next-line no-console
    console.groupEnd()
  })

  // eslint-disable-next-line no-console
  console.groupEnd()
}


