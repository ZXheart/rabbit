import { ref, Ref } from 'vue'
import { CustomGuessInstance } from '@/types/components'

export function useReachBottom() {
  const customGuessRef: Ref<CustomGuessInstance> = ref()
  const reachBottom = () => {
    customGuessRef.value.isLoading = true
    customGuessRef.value.getMore().then(() => {
      customGuessRef.value.isLoading = false
    })
  }
  return { customGuessRef, reachBottom }
}
