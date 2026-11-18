---
title: 知识体系已迁移
layout: page
sidebar: false
outline: false
search: false
readingProgress: false
redirect: https://shuifans.github.io/cloud-ai-knowledge/
---

<script setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
onMounted(() => {
  const destination = new URL(frontmatter.value.redirect)
  destination.search = window.location.search
  if (window.location.hash) destination.hash = window.location.hash
  window.location.replace(destination.href)
})
</script>

<div class="vp-doc" style="max-width: 760px; margin: 0 auto; padding: 32px 24px;">
  <h1>知识体系已迁移</h1>
  <p>云计算、人工智能、软件研发、游戏行业与技术编年史内容已迁移到独立站点。正在打开新站点；也可以<a :href="frontmatter.redirect">直接访问云与 AI 技术知识库</a>。</p>
</div>
