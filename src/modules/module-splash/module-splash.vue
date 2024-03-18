<script setup lang="ts">
// TODO
// 1. If not authorized, redirect to onboarding page,
// 2. Check if
import { onMounted, ref, watchEffect } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'vue-router'
const router = useRouter()
const progress = ref(13)
let done = ref(false)
onMounted(() => {
  const token = localStorage.getItem('token')
  // const days_created = localStorage.getItem('days_created')
  if (!token) {
    router.push('/onboarding')
  }
})

watchEffect((cleanupFn) => {
  const timer1 = setTimeout(() => (progress.value = 26), 500)
  const timer2 = setTimeout(() => (progress.value = 46), 1000)
  const timer3 = setTimeout(() => (progress.value = 66), 1500)
  const timer4 = setTimeout(() => {
    progress.value = 100
    done.value = true
  }, 2000)
  cleanupFn(() => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
    clearTimeout(timer4)
  })
})
</script>
<template>
  <div
    :class="{ hidden: done }"
    class="fixed z-[599] top-0 h-[100vh] w-[100vw] flex justify-center items-center bg-black text-gray-50"
  >
    <div class="flex flex-col items-center justify-center space-y-20">
      <div class="text-[24px] font-Ubuntu">Ежедневник 20/80</div>
      <Progress v-model="progress" class="w-3/5" />
    </div>
  </div>
</template>
