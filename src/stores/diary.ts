import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diary', () => {
  let date = new Date()
  let date_str = `${date.toLocaleDateString('en-US')}`
  let current_date = ref<string>(date_str)
  let days = ref()

  return { current_date }
})
