import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { BENCHMARKS } from '../docs/.vitepress/theme/benchmark-registry.mjs'
import { PELICAN_PROMPT } from '../docs/.vitepress/theme/pelican.mjs'

const readCatalog = name => JSON.parse(readFileSync(`docs/.vitepress/theme/${name}`, 'utf8'))
const catalog2d = readCatalog('pelican-catalog.json')
const catalog3d = readCatalog('pelican-3d-catalog.json')

const EXACT_3D_PROMPT = `使用 Three.js 创建一个精致、可交互的 3D 网页场景：一只鹈鹕正在骑自行车。
鹈鹕、自行车、环境、动画、灯光、摄像机和交互均通过程序实现。
鹈鹕需要真实地骑自行车，并具有协调的腿部、脚踏、车轮和身体运动。
不要使用 SVG、2D Canvas、外部 3D 模型或预渲染动画。
最终输出一个可以直接在现代浏览器中运行的完整 HTML 文件。`

test('benchmark registry exposes unique routes and existing catalogs', () => {
  assert.deepEqual(BENCHMARKS.map(benchmark => benchmark.route), ['/benchmarks/pelican-2d/', '/benchmarks/pelican-3d/'])
  assert.equal(new Set(BENCHMARKS.map(benchmark => benchmark.id)).size, BENCHMARKS.length)
  assert.equal(new Set(BENCHMARKS.map(benchmark => benchmark.route)).size, BENCHMARKS.length)
  for (const benchmark of BENCHMARKS) {
    assert.ok(benchmark.title && benchmark.summary && benchmark.catalog)
    assert.doesNotThrow(() => readCatalog(benchmark.catalog))
  }
})

test('2D dataset keeps the original prompt and recorded results unchanged', () => {
  assert.equal(catalog2d.prompt, PELICAN_PROMPT)
  assert.ok(catalog2d.results.length > 0)
  assert.ok(catalog2d.batches.length > 0)
})

test('3D dataset preserves the prompt verbatim and records the published runs', () => {
  assert.equal(catalog3d.challengeId, 'pelican-bicycle-3d')
  assert.equal(catalog3d.promptVersion, 'v1')
  assert.equal(catalog3d.prompt, EXACT_3D_PROMPT)
  assert.equal(catalog3d.batches.length, 5)
  assert.equal(catalog3d.results.length, 11)
  assert.deepEqual(catalog3d.results.map(result => `${result.modelId}/${result.reasoningEffort}`).sort(), [
    'gemini4-argon/high',
    'gemini4-hydrogen/xhigh',
    'gemini4-neon/xhigh',
    'gemini4-orchestrator-neon-hydrogen/xhigh',
    'gpt6.2-astra/xhigh',
    'gpt6.2-sol/xhigh',
    'hy4-flash/high',
    'hy4/high',
    'qaudex-cantus-261120/xhigh',
    'qwen4-max/high',
    'qwen4-max/xhigh',
  ])
  assert.equal(new Set(catalog3d.results.map(result => result.id)).size, 11)
  for (const result of catalog3d.results) {
    assert.match(result.artifactPath, /^\/playground\/pelican-3d\/assets\/batch-00[1-5]\//)
    assert.ok(result.artifactPath.endsWith('.html.txt'))
    assert.ok(result.thumbnailPath.endsWith('.webp'))
    assert.equal(result.previewKind, 'webgl')
    assert.ok(result.capture?.viewport)
    assert.equal(result.sha256.length, 64)
    if (result.previewArtifactPath) assert.ok(result.previewArtifactPath.endsWith('.preview.html.txt'))
  }
})

test('gallery consumes a dataset prop instead of a hardcoded catalog and pages pass their own data', () => {
  const gallery = readFileSync('docs/.vitepress/theme/components/PelicanGallery.vue', 'utf8')
  assert.match(gallery, /defineProps<\{ dataset: Dataset/)
  assert.doesNotMatch(gallery, /import catalog from '\.\.\/pelican-catalog\.json'/)
  const page2d = readFileSync('docs/benchmarks/pelican-2d/index.md', 'utf8')
  assert.match(page2d, /:dataset="catalog"/)
  const page3d = readFileSync('docs/benchmarks/pelican-3d/index.md', 'utf8')
  assert.match(page3d, /:dataset="catalog"/)
  assert.match(page3d, /kind="webgl"/)
})
