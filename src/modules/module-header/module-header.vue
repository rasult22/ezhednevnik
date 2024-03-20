<script setup lang="ts">
import { useDiaryStore } from '@/stores/diary'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ref, watch } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'

const diaryStore = useDiaryStore()
const date = ref<Date>(new Date(diaryStore.current_date))
const currentYear = new Date().getFullYear()
let open = ref(false)
const queryClient = useQueryClient()

watch(date, () => {
  console.log()
  if (!date.value) return
  if (date.value.getFullYear() !== currentYear) {
    alert('Это дата еще не доступна')
    date.value = new Date()
    return
  }
  queryClient.invalidateQueries({ queryKey: ['current_date'] })
  diaryStore.current_date = date.value.toLocaleDateString('en-US')
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="bg-[#141414] text-[#f1f1f1] border-b border-gray-400 p-4 flex justify-between">
        <div></div>
        <div class="flex space-x-2">
          <img class="text-white" src="/arrow-left.svg" alt="" />
          <Popover :open="open">
            <PopoverTrigger @click="open = true">
              {{
                date &&
                date.toLocaleDateString('ru-RU', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'long'
                })
              }}
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                v-model="date"
                @update:modelValue="
                  (val) => {
                    open = false
                  }
                "
              />
            </PopoverContent>
          </Popover>
          <img src="/arrow-right.svg" alt="" />
        </div>
        <RouterLink to="/about">
          <img src="/settings.svg" alt="" />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
