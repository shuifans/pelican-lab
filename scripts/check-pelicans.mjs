import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { PELICAN_PROMPT, parsePelicanFilename } from '../docs/.vitepress/theme/pelican.mjs'
import { BENCHMARKS } from '../docs/.vitepress/theme/benchmark-registry.mjs'

const readCatalog = name => JSON.parse(readFileSync(new URL(`../docs/.vitepress/theme/${name}`, import.meta.url), 'utf8'))
const catalog = readCatalog('pelican-catalog.json')
const catalog3d = readCatalog('pelican-3d-catalog.json')

if (catalog.prompt !== PELICAN_PROMPT) throw new Error('提示词与当前 v1 记录不一致')
const ids = new Set()
for (const result of catalog.results) {
  if (ids.has(result.id)) throw new Error(`重复记录 ID：${result.id}`)
  ids.add(result.id)
  const parsed = parsePelicanFilename(result.sourceFilename)
  if (parsed.modelId !== result.modelId || parsed.reasoningEffort !== result.reasoningEffort) throw new Error(`元数据与文件名不一致：${result.id}`)
  for (const path of [result.artifactPath, result.thumbnailPath, ...(result.previewArtifactPath ? [result.previewArtifactPath] : [])]) {
    if (!/^\/playground\/pelican\/assets\/[a-z0-9-]+\/[a-z0-9.-]+$/.test(path) || path.includes('..')) throw new Error(`无效资源路径：${path}`)
  }
  if (!result.artifactPath.endsWith('.html.txt')) throw new Error('原始作品须作为文本归档')
  const source = readFileSync(new URL('../docs/public' + result.artifactPath, import.meta.url))
  if (createHash('sha256').update(source).digest('hex') !== result.sha256) throw new Error(`原始文件被改动：${result.id}`)
  if (result.previewArtifactPath) {
    if (!result.previewArtifactPath.endsWith('.preview.html.txt')) throw new Error('预览副本须作为文本存储')
    const preview = readFileSync(new URL('../docs/public' + result.previewArtifactPath, import.meta.url), 'utf8')
    if (!/<svg\b/i.test(preview) || /<script[^>]+src\s*=/i.test(preview)) throw new Error(`预览副本未离线化：${result.id}`)
  }
  const image = readFileSync(new URL('../docs/public' + result.thumbnailPath, import.meta.url))
  if (image.toString('ascii', 8, 12) !== 'WEBP' || !result.capture) throw new Error(`缺少真实封面及截图记录：${result.id}`)
  if (!catalog.batches.some(batch => batch.id === result.batchId)) throw new Error(`批次不存在：${result.id}`)
}

if (catalog3d.challengeId !== 'pelican-bicycle-3d') throw new Error('3D 测试集标识不正确')
if (!catalog3d.prompt?.trim()) throw new Error('3D 原始提示词为空')
if (!Array.isArray(catalog3d.batches) || !Array.isArray(catalog3d.results)) throw new Error('3D 记录结构不正确')
const ids3d = new Set()
for (const result of catalog3d.results) {
  if (ids3d.has(result.id)) throw new Error(`重复 3D 记录 ID：${result.id}`)
  ids3d.add(result.id)
  if (!result.sourceFilename || !result.modelId || !result.reasoningEffort) throw new Error(`3D 元数据不完整：${result.id}`)
  for (const path of [result.artifactPath, result.thumbnailPath, ...(result.previewArtifactPath ? [result.previewArtifactPath] : [])]) {
    if (!/^\/playground\/pelican-3d\/assets\/[a-z0-9-]+\/[a-z0-9.-]+$/.test(path) || path.includes('..')) throw new Error(`无效 3D 资源路径：${path}`)
  }
  const source = readFileSync(new URL('../docs/public' + result.artifactPath, import.meta.url))
  if (createHash('sha256').update(source).digest('hex') !== result.sha256) throw new Error(`3D 原始文件被改动：${result.id}`)
  const image = readFileSync(new URL('../docs/public' + result.thumbnailPath, import.meta.url))
  if (image.toString('ascii', 8, 12) !== 'WEBP' || !result.capture) throw new Error(`缺少真实 3D 封面及截图记录：${result.id}`)
  if (result.previewKind !== 'webgl') throw new Error(`3D 预览类型不正确：${result.id}`)
  if (result.previewArtifactPath) {
    if (!result.previewArtifactPath.endsWith('.preview.html.txt')) throw new Error('3D 预览副本须作为文本存储')
    const preview = readFileSync(new URL('../docs/public' + result.previewArtifactPath, import.meta.url), 'utf8')
    if (/<script[^>]+src\s*=/i.test(preview) || /type="importmap"/i.test(preview)) throw new Error(`3D 预览副本未离线化：${result.id}`)
  }
}

const catalogs = { 'pelican-catalog.json': catalog, 'pelican-3d-catalog.json': catalog3d }
const benchmarkIds = new Set()
const benchmarkRoutes = new Set()
for (const benchmark of BENCHMARKS) {
  if (benchmarkIds.has(benchmark.id)) throw new Error(`重复测试集 ID：${benchmark.id}`)
  benchmarkIds.add(benchmark.id)
  if (benchmarkRoutes.has(benchmark.route)) throw new Error(`重复测试集路由：${benchmark.route}`)
  benchmarkRoutes.add(benchmark.route)
  if (!catalogs[benchmark.catalog]) throw new Error(`测试集缺少目录：${benchmark.id}`)
}
if (!benchmarkRoutes.has('/benchmarks/pelican-2d/') || !benchmarkRoutes.has('/benchmarks/pelican-3d/')) throw new Error('测试集路由不完整')

console.log(`展区校验通过：${ids.size} 个 2D 原始作品及封面，${BENCHMARKS.length} 个测试集。`)
