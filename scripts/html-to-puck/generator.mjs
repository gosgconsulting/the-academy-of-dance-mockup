import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'

// Map parsed component types to Puck block definitions (fields + defaultProps)
function toFieldsAndDefaults(nodeType, extracted) {
  switch (nodeType) {
    case 'Header':
      return {
        label: 'Header',
        fields: {
          logoSrc: { type: 'text' },
          links: { type: 'array', arrayFields: { label: { type: 'text' }, href: { type: 'text' } } },
        },
        defaultProps: {
          logoSrc: extracted?.logoSrc || '/favicon.ico',
          links: (extracted?.links || []).slice(0, 6),
        },
      }
    case 'Hero':
      return {
        label: 'Hero',
        fields: {
          title: { type: 'textarea' },
          description: { type: 'textarea' },
          ctaText: { type: 'text' },
          ctaUrl: { type: 'text' },
          images: { type: 'array', arrayFields: { value: { type: 'text' } } },
          backgroundImage: { type: 'text' },
        },
        defaultProps: {
          title: extracted?.title || 'Headline',
          description: extracted?.description || '',
          ctaText: extracted?.ctaText || 'Learn more',
          ctaUrl: extracted?.ctaUrl || '#',
          images: (extracted?.images || []).map((src) => ({ value: src })),
          backgroundImage: extracted?.backgroundImage || '',
        },
      }
    case 'CardGrid':
      return {
        label: 'Card Grid',
        fields: {
          cards: {
            type: 'array',
            arrayFields: {
              title: { type: 'text' },
              description: { type: 'textarea' },
              image: { type: 'text' },
              href: { type: 'text' },
            },
          },
        },
        defaultProps: {
          cards: (extracted?.cards || []).map((c) => ({
            title: c.title || '',
            description: c.description || '',
            image: c.image || '',
            href: c.href || '',
          })),
        },
      }
    case 'Footer':
      return {
        label: 'Footer',
        fields: {
          logoSrc: { type: 'text' },
          tagline: { type: 'textarea' },
          policyLinks: { type: 'array', arrayFields: { label: { type: 'text' }, href: { type: 'text' } } },
          copyright: { type: 'text' },
        },
        defaultProps: {
          logoSrc: extracted?.logoSrc || '/favicon.ico',
          tagline: extracted?.tagline || '',
          policyLinks: extracted?.policyLinks || [],
          copyright: extracted?.copyright || '',
        },
      }
    case 'Heading':
      return {
        label: 'Heading',
        fields: { text: { type: 'textarea' }, level: { type: 'select', options: ['h1', 'h2', 'h3'] } },
        defaultProps: { text: extracted?.text || '', level: 'h2' },
      }
    case 'Text':
      return {
        label: 'Text',
        fields: { text: { type: 'textarea' } },
        defaultProps: { text: extracted?.text || '' },
      }
    case 'Image':
      return {
        label: 'Image',
        fields: { src: { type: 'text' }, alt: { type: 'text' } },
        defaultProps: { src: extracted?.src || '', alt: extracted?.alt || '' },
      }
    case 'List':
      return {
        label: 'List',
        fields: { items: { type: 'array', arrayFields: { value: { type: 'text' } } } },
        defaultProps: { items: (extracted?.items || []).map((t) => ({ value: t })) },
      }
    default:
      return {
        label: nodeType,
        fields: {},
        defaultProps: {},
      }
  }
}

function renderFunctionSource(name) {
  // minimal TSX renderers; real project can map to existing components
  return `import React from 'react'
import type { WithPuckProps } from '@measured/puck'

export type ${name}Props = any

export default function ${name}(props: WithPuckProps<${name}Props>) {
  return <div data-puck="${name}" ref={props.puck?.dragRef}><pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(props,null,2)}</pre></div>
}
`
}

export async function generatePuckOutputs(parsed, opts = {}) {
  const emitTs = opts.emitTs !== false
  const componentMap = {}

  function walk(nodes) {
    for (const n of nodes) {
      if (!componentMap[n.type]) {
        componentMap[n.type] = toFieldsAndDefaults(n.type, n.extracted)
      }
      if (n.children?.length) walk(n.children)
    }
  }
  walk(parsed.tree)

  const jsonConfig = { components: {} }
  for (const [type, def] of Object.entries(componentMap)) {
    jsonConfig.components[type] = {
      label: def.label,
      fields: def.fields,
      defaultProps: def.defaultProps,
    }
  }

  let tsConfigPath = null
  if (emitTs) {
    const outDir = resolve(process.cwd(), 'scripts/output/generated')
    await mkdir(outDir, { recursive: true })
    // emit renderers
    for (const type of Object.keys(componentMap)) {
      const src = renderFunctionSource(type)
      await writeFile(resolve(outDir, `${type}.tsx`), src, 'utf8')
    }
    // emit puck config TS that imports the generated renderers
    const entries = Object.keys(componentMap)
    const imports = entries.map((t) => `import ${t} from './generated/${t}.tsx'`).join('\n')
    const components = entries
      .map((t) => {
        const { label, fields, defaultProps } = componentMap[t]
        return `${t}: { label: ${JSON.stringify(label)}, fields: ${JSON.stringify(fields)}, defaultProps: ${JSON.stringify(
          defaultProps
        )}, render: ${t} }`
      })
      .join(',\n  ')
    const tsConfig = `import type { Config } from '@measured/puck'
${imports}

export const puckConfig: Config<any> = {
  components: {
  ${components}
  }
}

export default puckConfig
`
    tsConfigPath = resolve(process.cwd(), 'scripts/output/puck-config.ts')
    await writeFile(tsConfigPath, tsConfig, 'utf8')
  }

  return { jsonConfig, tsConfigPath }
}




