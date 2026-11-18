import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BenchmarkLayout from './BenchmarkLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: BenchmarkLayout,
} satisfies Theme
