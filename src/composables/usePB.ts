import PocketBase from 'pocketbase'
import { ref } from 'vue'

const pb = new PocketBase(import.meta.env.VITE_PB_HOST)

export const usePB = () => ({
  pb
})
