# 追加鹈鹕作品

2D 页面入口为 `/benchmarks/pelican-2d/`（旧 `/playground/pelican/` 会跳转到 2D 并保留参数），清单在 `docs/.vitepress/theme/pelican-catalog.json`。

1. 准备原始 HTML，命名为 `pelican-bicycle-<完整模型名>-<reasoning effort>.html`。只从最后一个短横线拆分 effort，模型名可以包含 `-max`、`-flash` 等后缀。
2. 将本次新增文件放入独立目录，执行 `node scripts/import-pelicans.mjs /新增作品目录 batch-003 第三批`。批次 ID 使用未占用的英文小写与短横线；目录不要混入已收录文件。原文按字节存为 `.html.txt`，网页只在隔离的 iframe 中运行，不直接作为同源 HTML 执行。
3. 在浏览器中逐个查看原始作品，默认参考视口 1280 × 800。出现页面滚动或截断时提高视口高度，完整展示原始页面并记录尺寸；不要修改原 HTML。首批 `gpt6-sol / xhigh` 使用 1280 × 1000。
4. 截取真实画面，等比例输出宽度 960 px 的 WebP，写入清单中对应的 `thumbnailPath`。不能使用设计草案插画。填写该记录的 `previewViewport` 与 `capture`（浏览器、视口、日期、实际截图时机）。首批为 DOM 就绪后截图，动画相位不固定，不表示同步截帧。
5. 运行 `node scripts/check-pelicans.mjs`、`node --test tests/*.test.mjs`、`npm run docs:build`，并在带 `/pelican-lab/` base 的构建预览中验证筛选、播放与下载。
6. 按仓库发布约定，经 hkserver 中转 Git bundle 并推送 main。

导入不会覆盖已有 run。同一批次、同一文件的重复导入不产生新记录；新内容使用新哈希与记录 ID。其他批次出现完全相同的哈希会报错，先核对是否重复导入。生成时间、token、成本等不详时保持 null / 缺省；不要将文件修改时间当成测试时间。

当前题目使用提示词 v1：

> 创建一个HTML，内容是SVG绘制一个鹈鹕骑自行车的2D动画。

当前导入器只收录此 v1 题目。改变提示词时，先扩展题目版本与关联数据，不能直接改写现有提示词。

## 追加 3D 作品

3D 测试集页面为 `/benchmarks/pelican-3d/`，清单在 `docs/.vitepress/theme/pelican-3d-catalog.json`，提示词逐字保留。

1. 准备原始 HTML 与真实封面（WEBP，1280 × 800 视口截图），写一份 `manifest.json`：`batchId`、`label` 和 `items[].file / thumbnail / modelId / effort`。
2. 执行 `node scripts/import-pelicans-3d.mjs <manifest.json>`。原文按字节归档为 `.html.txt`，封面写入同一批次目录；相同哈希不会重复收录。
3. 作品引用 CDN 依赖时，另存预览副本 `<id>.preview.html.txt`：把锁定版本的依赖内联为单个内联 module 脚本，原始归档保持字节不变；清单记录 `previewArtifactPath` 与 `previewDependencies`。预览副本不得保留外链脚本、importmap 或字体外链。
4. 在带 CSP 的隔离预览中逐个确认首帧、运动与交互，再运行 `node scripts/check-pelicans.mjs`、`node --test tests/*.test.mjs` 与 `npm run docs:build`。

第二批于 2026-09-30 收录，真实参考视口均宽 1280 px：`gpt6.1-sol / medium` 高 840 px，`gpt6.1-sol / high、xhigh` 高 1000 px，`gpt6-astra / high` 高 1050 px。这些尺寸用于保留原始页面的完整画面。

第三批于 2026-10-07 收录 `gemini3.8-flash / high`，参考视口为 1280 × 1000。原作依赖在线 Tailwind 脚本，原始归档和下载保留该脚本；`previewArtifactPath` 指向仅以生成的静态 CSS 替换该依赖的预览副本，继续使用同一隔离策略。后续依赖外部样式的作品可沿用此方式，不能开放 iframe 网络权限或改写原始归档。

第四批于 2026-10-10 收录 `grok4.6 / xhigh` 与 `grok4.7 / xhigh`，参考视口均为 1280 × 800。两份原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。

第五批于 2026-10-17 收录 `deepseek-v4.1-flash-1017 / max`，参考视口为 1280 × 800。原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。

第六批于 2026-10-19 收录 `qaudex-fast-261019 / default`、`qaudex-efficient-261019 / default` 与 `qaudex-ultimate-261019 / xhigh`。fast 与 efficient 的参考视口为 1280 × 800，ultimate 为 1280 × 1029，以便页脚完整显示。三份原作没有外链脚本或样式，直接使用原始归档预览。`default` 不表示推理强度。三个模型标识的版本后缀补充年份前缀，由 `-1019` 改为 `-261019`，HTML 字节不变；`261019` 是 2026-10-19 的模型版本标识，不表示测试时间。

第七批于 2026-10-20 收录 `mimo-v2.6-pro / default`、`step5-preview / high` 与 `minimax-m3.1-flash / default`，参考视口均为 1280 × 800。三份原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。`mimo-v2.6-pro` 与 `minimax-m3.1-flash` 的源文件名末段属于模型名，导入副本补上 `default`，HTML 字节不变。源文件 `pelican-bicycle-mimimax-m3.1-flash.html` 按模型名 `minimax-m3.1-flash` 收录。`default` 不表示推理强度。

第八批于 2026-10-24 收录 `deepseek-v4-pro-0813 / max`、`kimi-k2.8-preview / max` 与 `kimi-k3.1-pro / max`，参考视口均为 1280 × 800。三份原作没有外链脚本或样式，直接使用原始归档预览。

第九批于 2026-10-24 收录 `qaudex-cantus-261019 / xhigh` 与 `qaudex-sonus-261019 / xhigh`。`qaudex-cantus-261019` 的参考视口为 1280 × 800；`qaudex-sonus-261019` 为 1280 × 1068，用于完整展示包含页头、控制栏与页脚的整页内容。两份原作没有外链脚本或样式，直接使用原始归档预览。两个模型标识的版本后缀补充年份前缀，由 `-1019` 改为 `-261019`，HTML 字节不变；`261019` 是 2026-10-19 的模型版本标识，不表示测试时间。

第十批于 2026-10-27 收录 `gpt6.1-terra / max`，参考视口为 1280 × 889，用于完整展示页面自身的内容区域。原作没有外链脚本或样式，直接使用原始归档预览。

第十一批于 2026-11-02 收录 `claude-haiku5.5 / default`、`claude-opus5.5 / default` 与 `claude-sonnet5.5 / default`，参考视口均为 1280 × 800。三份原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。源文件未带 effort 段，导入副本补上 `default`，HTML 字节不变。`default` 不表示推理强度。

第十二批于 2026-11-04 收录 `hy4 / high`，参考视口为 1280 × 800。原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。

第十三批于 2026-11-05 收录 `qwenwork-pro-20261105 / default`、`qwenwork-ultra-20261105 / default`、`qwenwork-standard-20261105 / default` 与 `qwenwork-deepseek-v4.1-flash / default`。`qwenwork-ultra-20261105` 的参考视口为 1280 × 1042，用于完整展示包含页头、控制栏与页脚的整页内容；其余为 1280 × 800。四份原作没有外链脚本或样式，直接使用原始归档预览。源文件未带 effort 段，导入副本补上 `default`；除 `qwenwork-deepseek-v4.1-flash` 外的三个模型标识追加 `-20261105` 日期后缀，HTML 字节不变。`default` 不表示推理强度。

第十四批于 2026-11-08 收录 `qoduck / xhigh`，参考视口为 1280 × 800。原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。

第十五批于 2026-11-17 收录 `qwen4-max / high` 与 `qwen4-max / xhigh`。`qwen4-max-high` 的参考视口为 1280 × 1298，用于完整展示页头、场景、骑行控制台与页脚；`qwen4-max-xhigh` 为 1280 × 898，整页在视口内展示，右侧控制台按原作自身设计在面板内滚动。两份原作没有外链脚本或样式，直接使用原始归档预览。

第十六批于 2026-11-17 收录 `qwen4-max / low`，参考视口为 1280 × 865，用于完整展示场景、数据条与右侧控制面板。原作没有外链脚本或样式，直接使用原始归档预览。

第十七批于 2026-11-17 收录 `qaudex-cantus-261117 / xhigh`，参考视口为 1280 × 800。原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。模型标识原记为 `cantus-1117`，版本后缀补充年份前缀后为 `-261117`，HTML 字节不变；`261117` 是 2026-11-17 的模型版本标识，不表示测试时间。

第十八批于 2026-11-18 收录 `gpt6.2-astra` 与 `gpt6.2-sol` 的 `low / medium / high / xhigh` 共 8 个作品。`gpt6.2-astra-low` 的参考视口为 1280 × 841，`gpt6.2-astra-medium` 与 `gpt6.2-sol-high` 为 1280 × 868，`gpt6.2-sol-xhigh` 为 1280 × 813，其余四个为 1280 × 800。八份原作没有外链脚本或样式，页面在对应视口内完整展示，直接使用原始归档预览。

第十九批于 2026-11-18 收录 `hy4-flash / high`，参考视口为 1280 × 800。原作没有外链脚本或样式，页面在该视口内完整展示，直接使用原始归档预览。

3D 第二批于 2026-11-18 收录 `hy4-flash / high`、`hy4 / high`、`qwen4-max / high` 与 `qwen4-max / xhigh`，参考视口均为 1280 × 800。四份原作都从 CDN 加载 three.js：前三份为 0.160.0，`qwen4-max / xhigh` 为 0.161.0 并引用 Google Fonts。预览副本把锁定版本的内联实现写入 `<id>.preview.html.txt`，原始归档按字节保留。
