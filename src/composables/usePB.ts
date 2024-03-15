import PocketBase from 'pocketbase'
import { ref } from 'vue'

const pb = new PocketBase('https://rasult22.pockethost.io')

export const usePB = () => ({
  pb
})
