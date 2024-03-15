import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { user } from '@/types'

export const useUserStore = defineStore('user', () => {
  let user = ref<user>()

  return { user }
})
