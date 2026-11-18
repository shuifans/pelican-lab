<script setup lang="ts">
import { computed } from 'vue'
import catalog from '../pelican-catalog.json'

const rows = computed(() => {
  const byDate = new Map<string, { count: number; models: Set<string> }>()
  for (const result of catalog.results) {
    const date = result.importedAt.slice(0, 10)
    const entry = byDate.get(date) || { count: 0, models: new Set<string>() }
    entry.count += 1
    entry.models.add(result.modelLabel)
    byDate.set(date, entry)
  }
  return [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, entry]) => ({ date, count: entry.count, models: [...entry.models].sort((a, b) => a.localeCompare(b, 'en', { numeric: true })) }))
})
</script>

<template>
  <div class="benchmark-log">
    <p class="log-note">按作品收录日期汇总；收录日期不是测试执行日期。当前 2D 共 {{ catalog.results.length }} 个作品。</p>
    <table>
      <thead><tr><th scope="col">收录日期</th><th scope="col">数量</th><th scope="col">模型</th></tr></thead>
      <tbody>
        <tr v-for="row in rows" :key="row.date">
          <td>{{ row.date }}</td>
          <td>{{ row.count }}</td>
          <td>{{ row.models.join(' · ') }}</td>
        </tr>
        <tr><td>—</td><td>0</td><td>鹈鹕骑车 3D：正式结果尚未收录</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.benchmark-log { margin: 24px 0; }
.log-note { color: var(--coast-muted); font-size: 13px; }
table { width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.8; }
th, td { padding: 9px 10px; border-bottom: 1px solid var(--coast-line); text-align: left; vertical-align: top; }
th { color: var(--coast-muted); font-weight: 550; white-space: nowrap; }
td:first-child, td:nth-child(2) { white-space: nowrap; font-variant-numeric: tabular-nums; }
</style>
