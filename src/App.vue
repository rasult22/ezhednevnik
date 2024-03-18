<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from './components/ui/button'
import ModuleSplash from './modules/module-splash/module-splash.vue'
</script>

<template>
  <ModuleSplash />
  <RouterView />
</template>
