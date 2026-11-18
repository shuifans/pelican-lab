---
layout: page
sidebar: false
outline: false
readingProgress: false
title: 鹈鹕骑车 3D
description: 使用 Three.js 程序化创建鹈鹕骑自行车的 3D 场景，按模型与 reasoning effort 展示收录作品。
---

<script setup>
import PelicanGallery from '../../.vitepress/theme/components/PelicanGallery.vue'
import catalog from '../../.vitepress/theme/pelican-3d-catalog.json'
</script>

<PelicanGallery :dataset="catalog" title="鹈鹕骑车 3D" eyebrow="BENCHMARK · PELICAN 3D" kind="webgl" />
