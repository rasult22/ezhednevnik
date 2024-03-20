<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { usePB } from '@/composables/usePB'
import { createTestDay, createDays } from '@/modules/module-diary-day/initData'
import ModuleDiaryDay from '@/modules/module-diary-day/module-diary-day.vue'
import { useDiaryStore } from '@/stores/diary'

import { ref } from 'vue'
let days_created = ref(localStorage.getItem('days_created'))
const isLoaded = ref(false)
const user = localStorage.getItem('user') || ''
const { current_date } = useDiaryStore()
const { pb } = usePB()
const createDaysInDB = async () => {
  createDays().then(() => {
    localStorage.setItem('days_created', 'true')
    days_created.value = 'true'
  })
}
</script>
<template>
  <header>
    <div class="wrapper">
      <nav class="bg-[#141414] text-[#f1f1f1] border-b border-gray-400 p-4 flex justify-between">
        <div></div>
        <div>{{ current_date }}</div>
        <RouterLink to="/about">
          <img src="/settings.svg" alt="" />
        </RouterLink>
      </nav>
    </div>
  </header>
  <ModuleDiaryDay v-if="days_created" />
  <div class="flex h-[70vh] items-center justify-center" v-else>
    <Button @click="createDaysInDB"> Загрузить дневник текущего года </Button>
  </div>
</template>
