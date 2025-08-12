// Extract and map styles/classes to Tailwind-ish tokens for later manual refinement

const classToTailwind = [
  { re: /container|mx-auto|max-w-(?:\w+)/, tw: 'container mx-auto' },
  { re: /grid-(\d+)/, tw: (m) => `grid grid-cols-${m[1]}` },
  { re: /grid|grid-cols-\d+/, tw: 'grid' },
  { re: /flex|flex-(?:row|col)/, tw: 'flex' },
  { re: /justify-center/, tw: 'justify-center' },
  { re: /items-center/, tw: 'items-center' },
  { re: /gap-(\d+)/, tw: (m) => `gap-${m[1]}` },
]

export function extractStyleInfo(node) {
  const cls = node?.props?.className || ''
  const style = node?.props?.style || ''

  const mapped = []
  for (const rule of classToTailwind) {
    const m = cls.match(rule.re)
    if (m) mapped.push(typeof rule.tw === 'function' ? rule.tw(m) : rule.tw)
  }

  const bgUrl = /background(?:-image)?:\s*url\((['"]?)(.*?)\1\)/i.exec(style)?.[2] || null

  return {
    classes: cls,
    style,
    tailwind: Array.from(new Set(mapped)).join(' '),
    backgroundImage: bgUrl,
  }
}

export function mapStylesRecursively(parsed) {
  function walk(n) {
    const styleInfo = extractStyleInfo(n)
    n.styleInfo = styleInfo
    if (n.children?.length) n.children.forEach(walk)
  }
  parsed.tree.forEach(walk)
  return parsed
}




