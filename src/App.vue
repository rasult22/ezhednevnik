<script setup lang="ts">
import { RouterView } from 'vue-router'
import ModuleSplash from './modules/module-splash/module-splash.vue'
import AppToastFeature from './features/app-toast/app-toast-feature.vue'
import AppLoading from './features/app-loading/app-loading.vue'
import useAppLoader from './features/app-loading/useAppLoader'
const { isLoading } = useAppLoader()
</script>

<template>
  <ModuleSplash />
  <RouterView />
  <AppToastFeature />
  <AppLoading v-if="isLoading" />
</template>
