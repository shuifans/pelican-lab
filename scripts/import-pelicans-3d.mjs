import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { EFFORT_ORDER } from '../docs/.vitepress/theme/pelican.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const manifestPath = process.argv[2]
if (!manifestPath) throw new Error('用法：node scripts/import-pelicans-3d.mjs <manifest.json>')

const manifest = JSON.parse(readFileSync(resolve(manifestPath), 'utf8'))
const { batchId, label = batchId, items } = manifest
if (!/^[a-z0-9][a-z0-9-]*$/.test(batchId || '')) throw new Error('批次 ID 只能包含小写字母、数字和短横线')
if (!Array.isArray(items) || !items.length) throw new Error('清单中没有作品')

const catalogPath = resolve(root, 'docs/.vitepress/theme/pelican-3d-catalog.json')
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const capturedOn = new Date().toISOString().slice(0, 10)
const pending = []

for (const item of items) {
  if (!item.file || !item.thumbnail || !item.modelId || !item.effort) throw new Error('每条作品必须提供 file、thumbnail、modelId 与 effort')
  if (!EFFORT_ORDER.includes(item.effort)) throw new Error(`不支持的 reasoning effort：${item.effort}`)
  if (!/^[a-z0-9.-]+$/.test(item.modelId)) throw new Error(`模型标识只能包含小写字母、数字、点和短横线：${item.modelId}`)

  const bytes = readFileSync(resolve(item.file))
  const html = bytes.toString('utf8')
  if (!/<html\b/i.test(html)) throw new Error(`不是完整的 HTML 作品：${item.file}`)
  const thumbnail = readFileSync(resolve(item.thumbnail))
  if (thumbnail.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`封面必须是 WEBP：${item.thumbnail}`)

  const sha256 = createHash('sha256').update(bytes).digest('hex')
  const id = `${batchId}-${item.modelId}-${item.effort}-${sha256.slice(0, 10)}`
  if (catalog.results.some(result => result.id === id)) continue
  if (catalog.results.some(result => result.sha256 === sha256)) throw new Error(`发现已收录的相同文件：${item.file}`)

  const prefix = `/playground/pelican-3d/assets/${batchId}/${id}`
  pending.push({
    bytes,
    thumbnail,
    record: {
      id,
      modelId: item.modelId,
      modelLabel: item.modelLabel || item.modelId,
      reasoningEffort: item.effort,
      challengeId: catalog.challengeId,
      promptVersion: catalog.promptVersion,
      effortSource: 'manual',
      batchId,
      runId: sha256.slice(0, 10),
      sourceFilename: `pelican-bicycle-3d-${item.modelId}-${item.effort}.html`,
      artifactPath: `${prefix}.html.txt`,
      thumbnailPath: `${prefix}.webp`,
      sha256,
      importedAt: new Date().toISOString(),
      testedAt: null,
      previewViewport: { width: 1280, height: 800 },
      capture: {
        viewport: { width: 1280, height: 800 },
        browser: 'Chrome headless',
        timing: 'first rendered frame after navigation and DOM snapshot; animation phase varies',
        capturedOn: item.capturedOn || capturedOn,
      },
      previewKind: 'webgl',
    },
  })
}

if (!pending.length) {
  console.log('没有新作品；现有 3D 记录保持不变。')
} else {
  for (const { bytes, thumbnail, record } of pending) {
    const artifact = resolve(root, 'docs/public' + record.artifactPath)
    const cover = resolve(root, 'docs/public' + record.thumbnailPath)
    mkdirSync(dirname(artifact), { recursive: true })
    if (existsSync(artifact)) throw new Error(`归档路径已存在：${record.artifactPath}`)
    writeFileSync(artifact, bytes, { flag: 'wx' })
    writeFileSync(cover, thumbnail, { flag: 'wx' })
    catalog.results.push(record)
  }
  if (!catalog.batches.some(batch => batch.id === batchId)) catalog.batches.push({ id: batchId, label })
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n')
  console.log(`收录 ${pending.length} 个 3D 作品，共 ${catalog.results.length} 个。`)
}
