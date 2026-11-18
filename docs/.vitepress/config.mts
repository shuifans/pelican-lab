import { defineConfig } from 'vitepress'

// GitHub Pages 项目站点部署时需要设置仓库名作为 base。
// 本地开发默认 '/'；CI 构建时通过环境变量注入，例如 /pelican-lab/
const base = (process.env.VITEPRESS_BASE || '/').replace(/([^/])$/, '$1/')

export default defineConfig({
  title: 'Pelican Lab',
  description: '同一道提示词下的模型作品测试集：鹈鹕骑车 2D、鹈鹕骑车 3D 与后续 benchmark。',
  lang: 'zh-CN',
  appearance: true,
  base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg?v=pelican` }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Pelican Lab' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '同一道提示词下的模型作品测试集：鹈鹕骑车 2D、鹈鹕骑车 3D 与后续 benchmark',
      },
    ],
  ],

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
  },

  sitemap: {
    hostname: 'https://shuifans.github.io/pelican-lab/',
    transformItems(items) {
      return items.filter(item => {
        const url = item.url.replace(/\/$/, '')
        return !/^404(?:\.html)?$/.test(url) && url !== 'playground/pelican'
      })
    },
  },

  themeConfig: {
    logo: { light: '/logo.svg?v=pelican', dark: '/logo-dark.svg?v=pelican', alt: 'Pelican Lab' },
    siteTitle: 'Pelican Lab',

    nav: [
      { text: '鹈鹕骑车 2D', link: '/benchmarks/pelican-2d/', activeMatch: '^/benchmarks/pelican-2d/' },
      { text: '鹈鹕骑车 3D', link: '/benchmarks/pelican-3d/', activeMatch: '^/benchmarks/pelican-3d/' },
    ],

    sidebar: false,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/shuifans/pelican-lab',
      },
    ],

    editLink: {
      pattern: 'https://github.com/shuifans/pelican-lab/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: { text: '页面修订于' },

    outline: { level: [2, 3], label: '本页目录' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      message: 'Pelican Lab · 模型作品仅作观察，不代表综合能力排名',
      copyright: 'CC BY-NC-SA 4.0',
    },

    darkModeSwitchLabel: '日夜模式',
    lightModeSwitchTitle: '切换到白天模式',
    darkModeSwitchTitle: '切换到夜间模式',
    returnToTopLabel: '返回顶部',
  },
})
