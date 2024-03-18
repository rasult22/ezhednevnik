<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { createDaysInDB } from '@/modules/module-diary-day/initData'
import ModuleDiaryDay from '@/modules/module-diary-day/module-diary-day.vue'

import { ref } from 'vue'
let days_created = localStorage.getItem('days_created')
const isLoaded = ref(false)

const createDays = () => {
  // createDaysInDB
}
</script>
<template>
  <header>
    <div class="wrapper">
      <nav class="bg-[#141414] text-[#f1f1f1] border-b border-gray-400 p-4 flex justify-between">
        <div></div>
        <div>чт, 5 марта</div>
        <RouterLink to="/about">
          <img src="/settings.svg" alt="" />
        </RouterLink>
      </nav>
    </div>
  </header>
  <ModuleDiaryDay v-if="!days_created" />
  <div class="flex h-[70vh] items-center justify-center" v-else>
    <Button @click="createDays"> Загрузить дневник текущего года </Button>
  </div>
  <div>
    <div>
      <RouterLink to="/onboarding">Onboarding</RouterLink>
    </div>
  </div>
</template>
