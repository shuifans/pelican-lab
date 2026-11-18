# Pelican Lab（pelican-lab）

Pelican Lab 是一个模型作品测试集站点：用同一道提示词，看看不同模型如何作答。当前收录鹈鹕骑车 2D 动画，并规划鹈鹕骑车 3D 场景与后续测试集。

> 站点地址：<https://shuifans.github.io/pelican-lab/>

## 站点结构

- 首页 `/`：测试集目录，显示各测试集的作品数、模型数与收录状态
- [鹈鹕骑车 2D](/benchmarks/pelican-2d/)：按模型与 reasoning effort 筛选、播放和放大查看作品
- [鹈鹕骑车 3D](/benchmarks/pelican-3d/)：题目页；正式结果尚未收录
- [记录说明](/methodology/)：收录口径、原文与预览差异、收录记录

旧 `/playground/pelican/` 会跳转到鹈鹕骑车 2D 并保留筛选参数；根路径带 `model` / `effort` / `sort` 的旧链接也会转到 2D 测试集。

## 数据与资源

- 测试集清单：`docs/.vitepress/theme/benchmark-registry.mjs`
- 2D 记录：`docs/.vitepress/theme/pelican-catalog.json`
- 3D 记录：`docs/.vitepress/theme/pelican-3d-catalog.json`（当前为空）
- 原始作品与封面：`docs/public/playground/pelican/assets/{batchId}/{id}`
- 原始 HTML 按字节归档，SHA-256 校验；封面为真实运行截图（WEBP）

## 本地开发

```bash
npm install
npm run docs:dev      # http://localhost:5173
node --test tests/*.test.mjs
npm run docs:build    # 构建前校验作品完整性与提示词
npm run docs:preview
```

## 收录新批次

```bash
node scripts/import-pelicans.mjs <源目录> <批次ID> [批次名称]
```

导入脚本按文件名解析模型与 reasoning effort，先完成整批校验再写入。之后生成真实封面、补充截图记录，并运行 `npm run docs:build`。

3D 正式结果尚未接入；首次收录时需要单独确认预览依赖、沙箱与原文下载方案。

## 发布

推送到 `main` 分支即由 GitHub Actions 自动构建并发布到 GitHub Pages（见 `.github/workflows/deploy.yml`）。

首次部署需要：

1. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
2. 仓库名不是 `<user>.github.io` 时，工作流已通过 `VITEPRESS_BASE` 自动注入仓库名前缀，无需手动配置

## 技术栈

- [VitePress](https://vitepress.dev/) 1.x
- Vue 组件负责筛选、隔离预览与详情

## 内容声明

模型作品仅作趣味观察，不代表综合能力排名；不同模型同名 effort 档位不代表相同计算预算。内容许可：CC BY-NC-SA 4.0。
