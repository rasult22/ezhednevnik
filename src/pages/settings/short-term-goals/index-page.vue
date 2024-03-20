<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div>
    <!-- HEADER -->
    <div class="flex shadow-sm bg-[#141414] text-[#f1f1f1] p-4 justify-between">
      <div @click="() => router.back()"><img src="/arrow-left.svg" alt="" /></div>
      <div>Цели на текущий год</div>
      <div class="opacity-0"><img src="/arrow-left.svg" alt="" /></div>
    </div>
  </div>
</template>
