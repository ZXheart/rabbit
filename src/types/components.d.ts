import CustomSwiper from '@/components/CustomSwiper.vue'
import CustomGuess from '@/components/CustomGuess.vue'
import Specs from '@/pages/goods-details/components/Specs.vue'

declare module 'vue' {
  export interface GlobalComponents {
    CustomSwiper: typeof CustomSwiper
    CustomGuess: typeof CustomGuess
    Specs: typeof Specs
  }
}

export type CustomSwiperInstance = InstanceType<typeof CustomSwiper>
export type CustomGuessInstance = InstanceType<typeof CustomGuess>
export type SpecsInstance = InstanceType<typeof Specs>
