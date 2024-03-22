<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from './components/ui/button'
import ModuleSplash from './modules/module-splash/module-splash.vue'
import AppToastFeature from './features/app-toast/app-toast-feature.vue'
</script>

<template>
  <ModuleSplash />
  <RouterView />
  <AppToastFeature />
</template>
