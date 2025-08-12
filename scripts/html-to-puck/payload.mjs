// Convert parsed tree to Puck data payload: { content: Array<blocks> }

function createId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function mapNodeToBlock(node) {
  const block = {
    id: createId(),
    type: node.type,
    props: { ...(node.extracted || {}) },
  }
  if (node.children && node.children.length) {
    block.props = { ...block.props, children: node.children.map(mapNodeToBlock) }
  }
  return block
}

export function convertToPuckPayload(parsed) {
  const blocks = parsed.tree.map(mapNodeToBlock)
  return { content: blocks }
}




