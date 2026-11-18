---
title: 关于本站
layout: page
sidebar: false
outline: false
search: false
readingProgress: false
redirect: https://shuifans.github.io/cloud-ai-knowledge/about
---

<script setup>
import { onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
onMounted(() => {
  window.location.replace(frontmatter.value.redirect)
})
</script>

<div class="vp-doc" style="max-width: 760px; margin: 0 auto; padding: 32px 24px;">
  <h1>关于本站</h1>
  <p>知识内容与更新记录已迁移到独立站点。也可以<a :href="frontmatter.redirect">查看关于页</a>，或返回 <a href="/pelican-lab/">Pelican Lab 首页</a>。</p>
</div>
