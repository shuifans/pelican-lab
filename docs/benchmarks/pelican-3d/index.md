---
layout: page
sidebar: false
outline: false
readingProgress: false
title: 鹈鹕骑车 3D
description: 使用 Three.js 程序化创建鹈鹕骑自行车的 3D 场景。当前为题目页，正式结果尚未收录。
---

<script setup>
import BenchmarkBrief from '../../.vitepress/theme/components/BenchmarkBrief.vue'
import catalog from '../../.vitepress/theme/pelican-3d-catalog.json'

const dimensions = [
  { title: '造型与场景', detail: '鹈鹕、自行车、环境与灯光的呈现，是否形成完整、可辨认的 3D 场景。' },
  { title: '骑行动作', detail: '腿部、脚踏、车轮和身体运动是否协调，鹈鹕是否像在真实地骑车。' },
  { title: '技术与交互', detail: '是否使用程序化 Three.js 场景与真实交互，并在现代浏览器中可运行，且遵守原题的禁用项。' },
]
</script>

<BenchmarkBrief
  :prompt="catalog.prompt"
  :prompt-version="catalog.promptVersion"
  title="鹈鹕骑车 3D"
  eyebrow="BENCHMARK · PELICAN 3D"
  type="Three.js 3D 场景"
  :dimensions="dimensions"
/>
