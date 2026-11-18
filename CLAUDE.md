# CLAUDE.md — 本仓库的 AI 协作规范

本文件是写给 AI 协作助手的维护规范。人类维护者同样适用。

## 站点概况

- 站点品牌：**Pelican Lab**，专注模型作品测试集展示
- 首页 `/` 是测试集目录；2D 作品位于 `/benchmarks/pelican-2d/`，3D 题目页位于 `/benchmarks/pelican-3d/`，收录口径位于 `/methodology/`
- 顶部导航为「测试集」「记录说明」
- 技术栈：VitePress 1.x + Vue 组件；不引入后台、账号、数据库或评分系统
- 本站只维护 benchmark 内容，不与任何知识站点交叉引用

## 常用命令

```bash
npm run docs:dev      # 本地预览（热更新）
npm run docs:build    # 发布前必跑：校验作品 + 构建
npm run docs:preview  # 预览构建产物
node --test tests/*.test.mjs
```

## 数据规范

- 测试集清单维护在 `docs/.vitepress/theme/benchmark-registry.mjs`，新增测试集必须有唯一 `id`、`route` 与目录文件
- 2D 记录位于 `docs/.vitepress/theme/pelican-catalog.json`；提示词只保存在目录文件中
- 3D 记录位于 `docs/.vitepress/theme/pelican-3d-catalog.json`，提示词逐字保留，不得改写或补充要求
- 原始 HTML 以 `.html.txt` 归档，文件名、模型名、effort、run/batch ID、SHA-256 与资源路径不得随意修改
- 封面必须是真实运行截图（WEBP），不得用示意图或生成图冒充作品
- 无真实运行结果时显示空状态；不得写入示例作品、分数或“已完成”

## 新增 2D 批次

```bash
node scripts/import-pelicans.mjs <源目录> <批次ID> [批次名称]
```

导入脚本先整批校验再写入；随后生成真实封面并补充截图记录，最后运行 `npm run docs:build`。

## 3D 接入约定（首次收录时执行）

- 原始 HTML 与预览副本分开保存；原文按字节归档并可下载
- 依赖按每份作品锁定并在构建/预览中处理，不替模型修改实现
- 列表只显示真实截图；详情页按需运行单个 WebGL 场景，关闭后卸载
- 预览使用 `sandbox="allow-scripts"`，不加 `allow-same-origin`，不为 Three.js 放开任意 CDN
- iframe `load` 不等于 Three.js 成功；需单独验证首帧、跨时刻运动和实际交互
- 预览失败时明确提示并保留原文下载，不冒称模型失败

## 文案与视觉

- 保留 Pelican Lab 现有白纸/深灰主题与海盐绿交互色；页面首先展示可操作的测试集，不做营销大页
- 文案说明“能看到什么、能做什么”，删掉空泛口号
- 不使用表情包/emoji；状态标记用纯文字
- 作品结果仅作观察，不写综合能力排名或无来源的耗时、费用、分数

## 发布流程

- 推送到 GitHub 仓库 `pelican-lab` 的 `main` 分支，GitHub Actions 自动构建并部署到 Pages
- 提交信息用中文，格式：`新增/更新/修复: <模块>`
- 本机打包 Git bundle，上传 hkserver 后推送 main；本机不直接 push
- 发布前检查 `docs/public` 中是否有未登记、不应公开的文件

## 链接兼容

- 旧 `/playground/pelican/` 跳转到 2D 并保留 query/hash
- 根路径旧筛选链接在首页组件中转发到 2D
