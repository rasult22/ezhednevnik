<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { createDays } from '@/modules/module-diary-day/initData'
import ModuleDiaryDay from '@/modules/module-diary-day/module-diary-day.vue'
import ModuleHeader from '@/modules/module-header/module-header.vue'
import { ref } from 'vue'
let days_created = ref(localStorage.getItem('days_created'))
const createDaysInDB = async () => {
  createDays().then(() => {
    localStorage.setItem('days_created', 'true')
    days_created.value = 'true'
  })
}
</script>
<template>
  <ModuleHeader />
  <ModuleDiaryDay v-if="days_created" />
  <div class="flex h-[70vh] items-center justify-center" v-else>
    <Button @click="createDaysInDB"> Загрузить дневник текущего года </Button>
  </div>
</template>
