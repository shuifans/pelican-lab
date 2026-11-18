<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { BENCHMARKS } from '../benchmark-registry.mjs'
import catalog2d from '../pelican-catalog.json'
import catalog3d from '../pelican-3d-catalog.json'

const catalogs: Record<string, { results: any[] }> = {
  'pelican-2d': catalog2d,
  'pelican-3d': catalog3d,
}

const cards = computed(() => BENCHMARKS.map(benchmark => {
  const results = catalogs[benchmark.id]?.results ?? []
  const latest = results.reduce((current: any, result: any) =>
    !current || result.importedAt > current.importedAt ? result : current, null)
  return {
    ...benchmark,
    count: results.length,
    models: new Set(results.map((result: any) => result.modelId)).size,
    latest,
  }
}))
const totalResults = computed(() => cards.value.reduce((total, card) => total + card.count, 0))

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (!['model', 'effort', 'sort'].some(key => params.has(key))) return
  const target = new URL(withBase('/benchmarks/pelican-2d/'), window.location.origin)
  target.search = window.location.search
  target.hash = window.location.hash
  window.location.replace(target.href)
})
</script>

<template>
  <main class="benchmark-index" aria-labelledby="benchmark-title">
    <header class="index-heading">
      <p class="eyebrow">PELICAN LAB</p>
      <h1 id="benchmark-title">同一道题，看看模型怎么答。</h1>
      <p class="index-intro">每个测试集独立收录同一道提示词下的模型作品，保留原始 HTML，并按模型与 reasoning effort 展示。结果仅作观察，不代表模型综合能力排名。</p>
      <p class="index-meta">{{ BENCHMARKS.length }} 个测试集 <span>·</span> {{ totalResults }} 个已收录作品 <span>·</span> <a :href="withBase('/methodology/')">记录说明</a></p>
    </header>

    <section class="benchmark-grid" aria-label="测试集">
      <article v-for="card in cards" :key="card.id" class="benchmark-card">
        <a class="card-link" :href="withBase(card.route)" :aria-label="`${card.title}：${card.count} 个作品`">
          <div class="card-visual" :class="{ 'is-empty': !card.count }">
            <img v-if="card.latest" :src="withBase(card.latest.thumbnailPath)" :alt="`${card.latest.modelLabel} · ${card.latest.reasoningEffort} 的作品截图`" width="1280" height="800" loading="eager" decoding="async" />
            <div v-else class="three-mark" aria-hidden="true"><span>3D</span><small>THREE.JS · WEBGL</small></div>
            <span class="card-type">{{ card.type }}</span>
          </div>
          <div class="card-body">
            <p class="card-kicker">{{ card.english }}</p>
            <h2>{{ card.title }}</h2>
            <p class="card-summary">{{ card.summary }}</p>
            <dl class="card-stats">
              <div><dt>作品</dt><dd>{{ card.count }}</dd></div>
              <div><dt>模型</dt><dd>{{ card.models }}</dd></div>
              <div><dt>状态</dt><dd>{{ card.status }}</dd></div>
            </dl>
            <span class="card-action">{{ card.count ? '查看作品' : '查看题目' }} <span class="vpi-arrow-right" aria-hidden="true"></span></span>
          </div>
        </a>
      </article>
    </section>

    <footer class="index-footer">
      <p>同一条提示词，各自的想象力。</p>
      <p>作品按收录文件标注模型与 effort；同名档位不代表相同计算预算。原始 HTML 按字节保留并可下载。</p>
    </footer>
  </main>
</template>

<style scoped>
.benchmark-index { max-width: 1120px; margin: 0 auto; padding: 40px 32px 64px; color: var(--coast-ink); }
.eyebrow { margin: 0 0 14px; color: var(--coast-muted); font-size: 10px; letter-spacing: .18em; line-height: 1.6; }
h1 { margin: 0 0 18px; font-size: clamp(34px, 4.6vw, 54px); font-weight: 600; letter-spacing: .025em; line-height: 1.3; }
.index-intro { max-width: 720px; margin: 0; color: var(--coast-muted); font-size: 15px; line-height: 2; }
.index-meta { margin: 20px 0 0; color: var(--coast-muted); font-size: 12px; }
.index-meta span { padding: 0 7px; }
.index-meta a { color: var(--coast-accent); text-decoration: underline; text-underline-offset: 4px; }
.benchmark-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
.benchmark-card { min-width: 0; }
.card-link { display: flex; flex-direction: column; height: 100%; border: 1px solid var(--coast-line); border-radius: 16px; background: var(--coast-card); overflow: hidden; color: inherit; text-decoration: none; transition: border-color .18s, transform .18s; }
.card-link:hover { border-color: var(--coast-accent); transform: translateY(-2px); }
.card-link:focus-visible { outline: 3px solid var(--coast-focus); outline-offset: 4px; }
.card-visual { position: relative; aspect-ratio: 16 / 10; background: var(--coast-wash); overflow: hidden; }
.card-visual img { display: block; width: 100%; height: 100%; object-fit: contain; }
.card-type { position: absolute; left: 14px; bottom: 14px; padding: 3px 10px; border-radius: 99px; border: 1px solid var(--coast-line); background: var(--coast-card); color: var(--coast-muted); font-size: 10px; letter-spacing: .04em; }
.three-mark { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; height: 100%; background: repeating-linear-gradient(0deg, transparent 0 31px, var(--coast-line) 31px 32px), repeating-linear-gradient(90deg, transparent 0 31px, var(--coast-line) 31px 32px), var(--coast-wash); color: var(--coast-accent); }
.three-mark span { font-size: clamp(46px, 7vw, 72px); font-weight: 600; letter-spacing: .06em; line-height: 1; }
.three-mark small { color: var(--coast-muted); font-size: 9px; letter-spacing: .18em; }
.card-body { display: flex; flex-direction: column; flex: 1; padding: 20px 20px 18px; }
.card-kicker { margin: 0 0 7px; color: var(--coast-muted); font-size: 9px; letter-spacing: .14em; }
h2 { margin: 0 0 10px; font-size: 24px; font-weight: 550; letter-spacing: .02em; line-height: 1.4; }
.card-summary { margin: 0; color: var(--coast-muted); font-size: 13px; line-height: 1.95; }
.card-stats { display: flex; flex-wrap: wrap; gap: 22px; margin: 18px 0 16px; padding: 14px 0 0; border-top: 1px solid var(--coast-line); }
.card-stats div { display: grid; gap: 2px; }
.card-stats dt { color: var(--coast-muted); font-size: 10px; }
.card-stats dd { margin: 0; font-size: 14px; font-weight: 550; }
.card-action { display: inline-flex; align-items: center; gap: 8px; margin-top: auto; color: var(--coast-accent); font-size: 12px; font-weight: 550; }
.index-footer { display: flex; justify-content: space-between; gap: 24px; margin-top: 44px; padding-top: 22px; border-top: 1px solid var(--coast-line); color: var(--coast-muted); font-size: 12px; line-height: 1.9; }
.index-footer p { margin: 0; }
.index-footer p:first-child { color: var(--coast-ink); font-size: 14px; }
.index-footer p:last-child { text-align: right; }
.index-footer a { color: var(--coast-accent); text-decoration: underline; text-underline-offset: 4px; }
@media (max-width: 760px) {
  .benchmark-index { padding: 28px 20px 44px; }
  .benchmark-grid { grid-template-columns: 1fr; gap: 16px; }
  .index-intro { font-size: 14px; }
  .index-footer { display: block; }
  .index-footer p:last-child { margin-top: 8px; text-align: left; }
}
@media (prefers-reduced-motion: reduce) { .card-link { transition: none; } .card-link:hover { transform: none; } }
</style>
