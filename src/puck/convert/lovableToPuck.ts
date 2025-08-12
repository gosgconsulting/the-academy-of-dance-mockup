// Convert Lovable page JSON to Puck-compatible data
// Minimal mapping covering titles, subtitles, ctas and nested items -> slot children

function newId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function mapSectionToBlock(key: string, section: any) {
  const typeMap: Record<string, string> = {
    trials: 'Trials',
    hero: 'Hero',
    header: 'Header',
    footer: 'Footer',
    about: 'About',
    visionMission: 'Vision',
  }
  const type = typeMap[key] || (section?.type || key)

  const props: any = {}
  if (section?.title) props.title = section.title
  if (section?.subtitle) props.subtitle = section.subtitle
  if (section?.description) props.description = section.description
  if (section?.ctaText) props.ctaText = section.ctaText
  if (section?.ctaUrl) props.ctaUrl = section.ctaUrl

  // Nested items as slot children
  let children: any[] | undefined
  const nestedArrays = Object.values(section || {}).filter(v => Array.isArray(v)) as any[]
  if (nestedArrays.length) {
    children = nestedArrays[0].map((child: any) => ({ id: newId(), type: child.type || 'Block', props: { ...child } }))
  }

  if (children?.length) props.children = children

  return { id: newId(), type, props }
}

export function convertLovablePageToPuck(page: any) {
  const content: any[] = []
  if (!page) return { content, root: {} }

  // Top-level known sections
  const sections = page.sections || page
  Object.keys(sections).forEach((key) => {
    const section = (sections as any)[key]
    if (!section) return
    content.push(mapSectionToBlock(key, section))
  })

  return { content, root: {} }
}
