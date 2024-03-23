import { ref } from 'vue'

const isLoading = ref(false)
export default function () {
  return {
    isLoading,
    showLoading: () => (isLoading.value = true),
    hideLoading: () => (isLoading.value = false)
  }
}
