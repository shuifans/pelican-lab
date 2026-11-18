---
title: 记录说明
sidebar: false
outline: false
description: Pelican Lab 如何记录测试集、模型、原始文件与 preview，以及这些结果能说明什么。
---

<script setup>
import BenchmarkLog from '../.vitepress/theme/components/BenchmarkLog.vue'
</script>

# 记录说明

> 本页说明测试集的收录与展示口径。目标是让每个作品可追溯、可下载、可复核，同时避免把趣味观察误读为模型综合能力排名。

## 测试集

- [鹈鹕骑车 2D](/benchmarks/pelican-2d/)：同一条提示词，生成 SVG 鹈鹕骑车 2D 动画。
- [鹈鹕骑车 3D](/benchmarks/pelican-3d/)：使用 Three.js 程序化创建可交互的鹈鹕骑车 3D 场景；正式结果尚未收录。

每个测试集保存自己的提示词与版本。题目原文逐字保留，不替模型补充要求。

## 记录什么

- 模型标识与 reasoning effort 档位，均按收录文件标注。
- 原始 HTML，按字节归档并提供 SHA-256 校验。
- 真实运行截图作为封面，不使用示意图冒充作品。
- 作品所属测试集、批次与收录日期。

## 不记录什么

- 不提供统一分数、排行榜或综合能力结论。
- 没有真实运行与收录的模型，不标记为已完成。
- 收录日期不冒充测试执行日期；`default` 等档位按产品记录保留，不表示推理强度。
- 不同模型同名 effort 档位，不代表相同计算预算。

## 原文、预览与下载

原始 HTML 保持字节不变。页面预览运行在隔离的 iframe 中，预览副本可以为离线化调整依赖，但原始下载始终指向归档原文。

3D 作品首次收录时，列表只使用真实截图；详情页按需运行单个 WebGL 场景，关闭后卸载。预览受限时会明确提示，原文仍可下载；不会因为预览失败改写作品。

## 收录记录

<BenchmarkLog />

## 相关

- [Pelican Lab 首页](/)
- [云与 AI 技术知识库](https://shuifans.github.io/cloud-ai-knowledge/)
