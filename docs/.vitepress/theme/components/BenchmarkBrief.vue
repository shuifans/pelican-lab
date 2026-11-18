<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

defineProps<{
  title: string
  eyebrow: string
  type: string
  prompt: string
  promptVersion: string
  dimensions: { title: string; detail: string }[]
}>()

const copyLabel = ref('复制提示词')
const announcement = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

function announce(message: string) {
  announcement.value = message
  clearTimeout(timer)
  timer = setTimeout(() => { announcement.value = ''; copyLabel.value = '复制提示词' }, 4000)
}

async function copyPrompt(prompt: string) {
  try {
    await navigator.clipboard.writeText(prompt)
    copyLabel.value = '已复制'
    announce('提示词已复制')
  } catch {
    announce('复制未成功，请选中提示词手动复制')
  }
}
</script>

<template>
  <main class="benchmark-brief" aria-labelledby="brief-title">
    <header class="brief-heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 id="brief-title">{{ title }}</h1>
      <p class="brief-meta">{{ type }} <span>·</span> 尚未收录作品 <span>·</span> 提示词 {{ promptVersion }}</p>
    </header>

    <section class="prompt-panel" aria-label="原始提示词">
      <div class="prompt-head"><span class="field-label">原始提示词 · {{ promptVersion }}</span><button class="quiet-button" type="button" @click="copyPrompt(prompt)">{{ copyLabel }}</button></div>
      <p class="prompt-text">{{ prompt }}</p>
    </section>

    <section class="dimension-section" aria-labelledby="dimension-title">
      <div class="section-heading"><p class="eyebrow">WHAT TO LOOK AT</p><h2 id="dimension-title">观察维度</h2><span>不计分，也不代表已经验收。</span></div>
      <div class="dimension-grid">
        <article v-for="(dimension, index) in dimensions" :key="dimension.title" class="dimension-card">
          <span class="dimension-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ dimension.title }}</h3>
          <p>{{ dimension.detail }}</p>
        </article>
      </div>
    </section>

    <section class="empty-panel" aria-labelledby="empty-title">
      <p class="eyebrow">NO RESULTS YET</p>
      <h2 id="empty-title">正式结果尚未收录</h2>
      <p>作品加入后会在这里按模型与 reasoning effort 展示。当前不显示示例、预生成结果或分数。</p>
      <div class="empty-actions">
        <a class="primary-link" :href="withBase('/benchmarks/pelican-2d/')">先看 2D 作品 <span class="vpi-arrow-right" aria-hidden="true"></span></a>
        <a class="quiet-link" :href="withBase('/methodology/')">记录说明</a>
      </div>
    </section>

    <footer class="brief-footer">
      <p>提示词逐字保留；模型与 effort 按收录文件标注。</p>
      <p>尚未运行、收录或评分任何 3D 结果。</p>
    </footer>
    <p v-if="announcement" class="brief-notice" role="status">{{ announcement }}</p>
  </main>
</template>

<style scoped>
.benchmark-brief { max-width: 1120px; margin: 0 auto; padding: 40px 32px 64px; color: var(--coast-ink); }
.eyebrow { margin: 0 0 12px; color: var(--coast-muted); font-size: 10px; letter-spacing: .18em; line-height: 1.6; }
h1 { margin: 0 0 14px; font-size: clamp(32px, 4.4vw, 52px); font-weight: 600; letter-spacing: .025em; line-height: 1.3; }
.brief-meta { margin: 0; color: var(--coast-muted); font-size: 12px; }
.brief-meta span { padding: 0 7px; }
.prompt-panel { margin-top: 32px; padding: 18px 20px; border: 1px solid var(--coast-line); border-radius: 14px; background: var(--coast-card); }
.prompt-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.field-label { font-size: 13px; font-weight: 550; }
.quiet-button { display: inline-flex; align-items: center; justify-content: center; min-height: 38px; padding: 7px 14px; border: 1px solid var(--coast-line); border-radius: 99px; background: var(--coast-card); font-size: 12px; white-space: nowrap; }
.quiet-button:hover { border-color: var(--coast-accent); }
.quiet-button:focus-visible, a:focus-visible { outline: 3px solid var(--coast-focus); outline-offset: 3px; }
.prompt-text { margin: 14px 0 0; font-size: 15px; line-height: 2; white-space: pre-line; user-select: text; }
.dimension-section { margin-top: 38px; }
.section-heading { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
.section-heading .eyebrow { margin: 0; }
.section-heading h2 { margin: 0; font-size: 22px; font-weight: 550; }
.section-heading > span { margin-left: auto; color: var(--coast-muted); font-size: 11px; }
.dimension-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.dimension-card { padding: 18px; border: 1px solid var(--coast-line); border-radius: 14px; background: var(--coast-card); }
.dimension-number { color: var(--coast-muted); font-size: 10px; letter-spacing: .14em; }
.dimension-card h3 { margin: 8px 0; font-size: 16px; font-weight: 550; }
.dimension-card p { margin: 0; color: var(--coast-muted); font-size: 12px; line-height: 1.9; }
.empty-panel { margin-top: 38px; padding: 38px 26px; border: 1px dashed var(--coast-line); border-radius: 18px; text-align: center; }
.empty-panel h2 { margin: 0 0 10px; font-size: 24px; font-weight: 550; }
.empty-panel > p:not(.eyebrow) { max-width: 520px; margin: 0 auto; color: var(--coast-muted); font-size: 13px; line-height: 1.9; }
.empty-actions { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 22px; }
.primary-link, .quiet-link { display: inline-flex; align-items: center; gap: 8px; min-height: 42px; border-radius: 99px; font-size: 13px; text-decoration: none; }
.primary-link { padding: 9px 18px; background: var(--coast-button); color: #fffdf5; }
.primary-link:hover { filter: brightness(1.07); }
.quiet-link { color: var(--coast-accent); text-decoration: underline; text-underline-offset: 4px; }
.brief-footer { display: flex; justify-content: space-between; gap: 20px; margin-top: 30px; padding-top: 18px; border-top: 1px solid var(--coast-line); color: var(--coast-muted); font-size: 12px; line-height: 1.9; }
.brief-footer p { margin: 0; }
.brief-notice { position: fixed; z-index: 99; bottom: 25px; left: 50%; transform: translateX(-50%); margin: 0; padding: 12px 22px; border-radius: 14px; max-width: calc(100% - 30px); background: var(--coast-ink); color: var(--coast-page); font-size: 13px; }
@media (max-width: 900px) { .dimension-grid { grid-template-columns: 1fr; } }
@media (max-width: 600px) {
  .benchmark-brief { padding: 28px 18px 44px; }
  .prompt-panel { padding: 15px 16px; }
  .prompt-head { align-items: flex-start; flex-direction: column; gap: 10px; }
  .section-heading > span { margin-left: 0; flex-basis: 100%; }
  .brief-footer { display: block; }
  .brief-footer p + p { margin-top: 6px; }
}
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>
