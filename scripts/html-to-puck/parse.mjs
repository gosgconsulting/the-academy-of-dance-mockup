import { load } from 'cheerio'

// Heuristics for mapping HTML elements to abstract component types
const componentHeuristics = [
  // Header / Nav
  {
    name: 'Header',
    match: ($el) => $el.is('header') || $el.is('nav') || $el.find('nav').length > 0,
    extract: ($, $el) => ({
      logoSrc: $el.find('img').first().attr('src') || null,
      links: $el
        .find('a')
        .map((_, a) => ({ label: $(a).text().trim(), href: $(a).attr('href') || '' }))
        .get(),
    }),
  },
  // Hero
  {
    name: 'Hero',
    match: ($el) => $el.is('section') && /hero|banner/i.test(($el.attr('class') || '') + ($el.attr('id') || '')),
    extract: ($, $el) => ({
      title: $el.find('h1, .title, .heading').first().text().trim() || '',
      description: $el.find('p, .subtitle, .description').first().text().trim() || '',
      images: $el
        .find('img')
        .map((_, img) => $(img).attr('src'))
        .get()
        .filter(Boolean),
      backgroundImage: backgroundFromStyle($el.attr('style')),
      ctaText: $el.find('a,button').first().text().trim() || '',
      ctaUrl: $el.find('a').first().attr('href') || '',
    }),
  },
  // Card grid
  {
    name: 'CardGrid',
    match: ($el) =>
      ($el.is('section') || $el.is('div')) &&
      /grid|cards|card-grid/i.test($el.attr('class') || '') &&
      $el.find('article, .card').length >= 2,
    extract: ($, $el) => ({
      cards: $el
        .find('article, .card')
        .map((_, c) => {
          const $c = $(c)
          return {
            title: $c.find('h3,h2,.card-title').first().text().trim(),
            description: $c.find('p,.card-text').first().text().trim(),
            image: $c.find('img').first().attr('src') || null,
            href: $c.find('a').first().attr('href') || null,
          }
        })
        .get(),
    }),
  },
  // Footer
  {
    name: 'Footer',
    match: ($el) => $el.is('footer') || /footer/i.test($el.attr('class') || ''),
    extract: ($, $el) => ({
      logoSrc: $el.find('img').first().attr('src') || null,
      tagline: $el.find('p, small').first().text().trim() || '',
      policyLinks: $el
        .find('a')
        .map((_, a) => ({ label: $(a).text().trim(), href: $(a).attr('href') || '' }))
        .get(),
      copyright: $el.text().match(/©\s*([^\n]+)/)?.[0] || '',
    }),
  },
]

function backgroundFromStyle(style) {
  if (!style) return null
  const m = /background(?:-image)?:\s*url\((['"]?)(.*?)\1\)/i.exec(style)
  return m?.[2] || null
}

function createNodeFromElement($, el) {
  const $el = $(el)
  const type = detectType($el)
  const children = []
  $el.children().each((_, child) => {
    const childNode = createNodeFromElement($, child)
    if (childNode) children.push(childNode)
  })
  return {
    type,
    tag: $el.prop('tagName')?.toLowerCase() || 'div',
    props: {
      id: $el.attr('id') || null,
      className: $el.attr('class') || null,
      style: $el.attr('style') || null,
    },
    extracted: extractByType($, $el, type),
    children,
  }
}

function detectType($el) {
  for (const rule of componentHeuristics) {
    try {
      if (rule.match($el)) return rule.name
    } catch {}
  }
  // Fallbacks
  if ($el.is('section')) return 'Section'
  if ($el.is('article')) return 'Card'
  if ($el.is('ul,ol')) return 'List'
  if ($el.is('h1,h2,h3,h4,h5,h6')) return 'Heading'
  if ($el.is('p')) return 'Text'
  if ($el.is('img')) return 'Image'
  return 'Block'
}

function extractByType($, $el, type) {
  const rule = componentHeuristics.find((r) => r.name === type)
  if (!rule) return null
  try {
    return rule.extract($, $el)
  } catch {
    return null
  }
}

export function parseHtmlToComponentTree(html, meta = {}) {
  const $ = load(html)
  // Prefer main content area if present
  const $root = $('main').length ? $('main').first() : $.root()
  const nodes = []
  const roots = $root.children('header,section,footer,div,nav').toArray()
  for (const el of roots) {
    const node = createNodeFromElement($, el)
    if (node) nodes.push(node)
  }
  return {
    meta,
    tree: nodes,
  }
}


