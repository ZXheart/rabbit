import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

import { IMemberInfo } from '@/types/member-info'

export const useMemberStore = defineStore(
  'member',
  () => {
    // state
    const profile: Ref<IMemberInfo> = ref()

    // actions
    const setProfile = (val: IMemberInfo) => {
      profile.value = val
    }
    const clearProfile = () => {
      profile.value = null
    }

    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
