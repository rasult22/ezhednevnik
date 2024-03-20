import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    current_date: ref(`${new Date().toLocaleDateString('en-US')}`)
  })
})
