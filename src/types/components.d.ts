import CustomSwiper from '@/components/CustomSwiper.vue'
import CustomGuess from '@/components/CustomGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CustomSwiper: typeof CustomSwiper
    CustomGuess: typeof CustomGuess
  }
}

export type CustomSwiperInstance = InstanceType<typeof CustomSwiper>
export type CustomGuessInstance = InstanceType<typeof CustomGuess>
