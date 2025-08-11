/*
  Simple crawler to mirror puckeditor.com/docs into docs/puck-knowledge as markdown-like plaintext.
  - Fetches /docs and follows internal links under /docs
  - Saves cleaned text content with basic headings retained
*/
import fs from 'fs'
import path from 'path'
import https from 'https'
import { load } from 'cheerio'

const ROOT = 'https://puckeditor.com'
const START = `${ROOT}/docs`
const OUT_DIR = path.join(process.cwd(), 'docs', 'puck-knowledge')

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchUrl(res.headers.location.startsWith('http') ? res.headers.location : ROOT + res.headers.location))
        }
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

function normalizeLink(href: string, base: string): string | null {
  if (!href) return null
  if (href.startsWith('#')) return null
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return null
  if (href.startsWith('http') && !href.startsWith(ROOT)) return null
  const u = href.startsWith('http') ? href : new URL(href, base).href
  if (!u.startsWith(`${ROOT}/docs`)) return null
  // strip hashes and query
  const clean = u.split('#')[0].split('?')[0]
  // ensure trailing slash removed
  return clean.replace(/\/$/, '')
}

function slugToFile(url: string): string {
  const relative = url.replace(`${ROOT}/docs`, '') || '/index'
  const parts = relative.split('/').filter(Boolean)
  const file = parts.length ? parts.join('_') : 'index'
  return path.join(OUT_DIR, `${file}.md`)
}

async function crawl() {
  const queue: string[] = [START]
  const seen = new Set<string>()
  fs.mkdirSync(OUT_DIR, { recursive: true })
  while (queue.length) {
    const url = queue.shift() as string
    if (seen.has(url)) continue
    seen.add(url)
    try {
      const html = await fetchUrl(url)
      const $ = load(html)
      const main = $('main, article, #__next, body')
      // Remove nav, footer, scripts
      main.find('nav, footer, script, style, noscript, aside').remove()
      // Extract text content with headings
      const textLines: string[] = []
      $('h1, h2, h3, h4, h5, h6, p, li, code, pre').each((_i, el) => {
        const tag = el.tagName.toLowerCase()
        if (tag.startsWith('h')) {
          const level = Number(tag.substring(1))
          textLines.push(`${'#'.repeat(Math.min(level, 6))} ${$(el).text().trim()}`)
        } else if (tag === 'pre') {
          textLines.push('```')
          textLines.push($(el).text())
          textLines.push('```')
        } else if (tag === 'code') {
          textLines.push('`' + $(el).text().trim() + '`')
        } else {
          const t = $(el).text().replace(/\s+\n/g, '\n').trim()
          if (t) textLines.push(t)
        }
      })
      const filePath = slugToFile(url)
      fs.writeFileSync(filePath, textLines.join('\n\n'))
      // discover links
      $('a[href]').each((_i, a) => {
        const href = normalizeLink($(a).attr('href') || '', url)
        if (href && !seen.has(href)) queue.push(href)
      })
      console.log('Saved', filePath)
    } catch (e) {
      console.error('Failed', url, e)
    }
  }
}

crawl()
  .then(() => console.log('Done'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })


