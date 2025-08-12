#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parseHtmlToComponentTree } from './parse.mjs'
import { mapStylesRecursively } from './styles.mjs'
import { generatePuckOutputs } from './generator.mjs'
import { convertToPuckPayload } from './payload.mjs'

function getArg(flag, fallback = null) {
  const idx = process.argv.indexOf(flag)
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return fallback
}

function getBool(flag) {
  return process.argv.includes(flag)
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true })
}

async function main() {
  const firstArg = process.argv[2]
  const sub = firstArg && !firstArg.startsWith('-') ? firstArg : 'all'
  const input = getArg('--input', 'index.html')
  const outDir = resolve(process.cwd(), getArg('--outDir', 'scripts/output'))
  const emitTs = getBool('--emitTs') || true

  const htmlPath = resolve(process.cwd(), input)
  const html = await readFile(htmlPath, 'utf8')

  let parsed = parseHtmlToComponentTree(html, { sourcePath: htmlPath })
  parsed = mapStylesRecursively(parsed)

  await ensureDir(outDir)

  if (sub === 'parse' || sub === 'all') {
    await writeFile(resolve(outDir, 'parsed.json'), JSON.stringify(parsed, null, 2), 'utf8')
  }

  if (sub === 'generate' || sub === 'all') {
    const gen = await generatePuckOutputs(parsed, { emitTs })
    await writeFile(resolve(outDir, 'puck-config.json'), JSON.stringify(gen.jsonConfig, null, 2), 'utf8')
    if (gen.tsConfigPath) {
      // path already written by generator
    }
  }

  if (sub === 'payload' || sub === 'all') {
    const payload = convertToPuckPayload(parsed)
    await writeFile(resolve(outDir, 'payload.json'), JSON.stringify(payload, null, 2), 'utf8')
  }

  // Done
  const relOut = outDir
  console.log(`[puckgen] Wrote outputs to: ${relOut}`)
}

main().catch((err) => {
  console.error('[puckgen] ERROR:', err)
  process.exit(1)
})


