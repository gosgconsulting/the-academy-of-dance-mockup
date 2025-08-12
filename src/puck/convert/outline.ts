// Build hierarchical outline from Puck data
export type OutlineItem = { id: string; label: string; type: string; children?: OutlineItem[] }

function titleFrom(block: any) {
  return block?.props?.title || block?.type || 'Block'
}

function walk(blocks: any[]): OutlineItem[] {
  return (blocks || []).map((b) => ({
    id: b.id || b.props?.id || '',
    type: b.type,
    label: titleFrom(b),
    children: walk(b?.props?.children || []),
  }))
}

export function buildOutline(data: { content: any[] }) {
  return walk(data?.content || [])
}
