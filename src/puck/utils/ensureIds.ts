export type PuckBlock = { id: string; type: string; props: { id: string; [k: string]: any } }
export type PuckData = { content: PuckBlock[]; [k: string]: any }

function newId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function normalizeBlock(b: any): PuckBlock {
  const id = b?.id || newId()
  const baseProps = b?.props || {}
  const props: any = { ...baseProps, id }

  // Handle common slot children field
  const children = Array.isArray(baseProps.children) ? baseProps.children : []
  const normalizedChildren = children.map((child: any) => normalizeBlock(child))
  if (normalizedChildren.length) {
    props.children = normalizedChildren
  }

  return { id, type: String(b?.type || 'Block'), props }
}

export function ensurePuckIds(data: any): PuckData {
  const content = Array.isArray(data?.content) ? data.content.map(normalizeBlock) : []
  return { ...(data || {}), content }
}
