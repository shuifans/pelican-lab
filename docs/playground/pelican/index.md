---
title: 鹈鹕测试已移至新页面
layout: page
sidebar: false
outline: false
search: false
readingProgress: false
redirect: /benchmarks/pelican-2d/
---

<script setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
onMounted(() => {
  const destination = new URL(withBase(frontmatter.value.redirect), window.location.origin)
  destination.search = window.location.search
  if (window.location.hash) destination.hash = window.location.hash
  window.location.replace(destination.href)
})
</script>

<div class="vp-doc" style="max-width: 760px; margin: 0 auto; padding: 32px 24px;">
  <h1>鹈鹕测试已移至新页面</h1>
  <p>正在打开鹈鹕骑车 2D 测试集。也可以<a :href="withBase(frontmatter.redirect)">直接查看作品</a>。</p>
</div>
