<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import CoastalThemeToggle from './components/CoastalThemeToggle.vue'
import BackgroundMusic from './components/BackgroundMusic.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <CoastalThemeToggle />
      <BackgroundMusic />
    </template>
  </Layout>
</template>
