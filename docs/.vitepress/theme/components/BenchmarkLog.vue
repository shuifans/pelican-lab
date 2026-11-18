<script setup lang="ts">
import { computed } from 'vue'
import catalog2d from '../pelican-catalog.json'
import catalog3d from '../pelican-3d-catalog.json'

const rows = computed(() => {
  const byKey = new Map<string, { set: string; date: string; count: number; models: Set<string> }>()
  for (const [set, catalog] of [['2D', catalog2d], ['3D', catalog3d]] as const) {
    for (const result of catalog.results) {
      const date = result.importedAt.slice(0, 10)
      const key = `${set}|${date}`
      const entry = byKey.get(key) || { set, date, count: 0, models: new Set<string>() }
      entry.count += 1
      entry.models.add(result.modelLabel)
      byKey.set(key, entry)
    }
  }
  return [...byKey.values()]
    .sort((a, b) => b.date.localeCompare(a.date) || a.set.localeCompare(b.set))
    .map(entry => ({ ...entry, models: [...entry.models].sort((a, b) => a.localeCompare(b, 'en', { numeric: true })) }))
})
</script>

<template>
  <div class="benchmark-log">
    <p class="log-note">按作品收录日期汇总；收录日期不是测试执行日期。当前 2D 共 {{ catalog2d.results.length }} 个作品，3D 共 {{ catalog3d.results.length }} 个作品。</p>
    <table>
      <thead><tr><th scope="col">测试集</th><th scope="col">收录日期</th><th scope="col">数量</th><th scope="col">模型</th></tr></thead>
      <tbody>
        <tr v-for="row in rows" :key="`${row.set}-${row.date}`">
          <td>{{ row.set }}</td>
          <td>{{ row.date }}</td>
          <td>{{ row.count }}</td>
          <td>{{ row.models.join(' · ') }}</td>
        </tr>
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
td:first-child, td:nth-child(2), td:nth-child(3) { white-space: nowrap; font-variant-numeric: tabular-nums; }
</style>
