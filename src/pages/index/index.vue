<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// vue components
import CustomNavbar from './components/CustomNavbar.vue'
import Category from './components/Category.vue'
import HotRecommend from './components/HotRecommend.vue'
import IndexSkeleton from './components/IndexSkeleton.vue'
// hooks
import { useReachBottom } from '@/hooks'
// network request
import {
  fetchBanner,
  fetchHomeCategory,
  fetchHomeHotRecommend,
} from '@/services'
// type
import { BannerType, CategoryType, HotRecommendType } from '@/types/home'

// define state
const bannerList = ref<BannerType[]>([])
const categoryList = ref<CategoryType[]>([])
const hotRecommendList = ref<HotRecommendType[]>([])

const isTriggered = ref(false)
const showSkeleton = ref(false)

// fetch network data
const getHomeBanner = async () => {
  const res = await fetchBanner()
  bannerList.value = res.result
}
const getHomeCategory = async () => {
  const res = await fetchHomeCategory()
  categoryList.value = res.result
}
const getHomeHotRecommend = async () => {
  const res = await fetchHomeHotRecommend()
  hotRecommendList.value = res.result
}

// custom events
const { customGuessRef, reachBottom } = useReachBottom()
const onRefresh = () => {
  isTriggered.value = true
  // 1. isTriggered必须【先设置为true再改为false】才有资格触发关闭刷新
  // 2. isTriggered设置为true之后必须【等待一段时间】再设为false。才能成功关闭刷新
  // setTimeout(() => (isTriggered.value = false), 500)
  customGuessRef.value.resetData()
  Promise.all([
    getHomeBanner(),
    getHomeCategory(),
    getHomeHotRecommend(),
    customGuessRef.value.getMore(),
  ]).then(() => {
    isTriggered.value = false
  })
}

// lifecycle
onLoad(() => {
  showSkeleton.value = true
  Promise.all([getHomeBanner(), getHomeCategory(), getHomeHotRecommend()]).then(
    () => {
      showSkeleton.value = false
    },
  )
})
</script>

<template>
  <view class="index">
    <CustomNavbar />
    <scroll-view
      class="scroll-y"
      scroll-y
      refresher-enabled
      enable-back-to-top
      :refresher-triggered="isTriggered"
      @scrolltolower="reachBottom"
      @refresherrefresh="onRefresh"
    >
      <IndexSkeleton v-if="showSkeleton" />
      <template v-else>
        <CustomSwiper :bannerList="bannerList" />
        <Category :categoryList="categoryList" />
        <HotRecommend :hotRecommendList="hotRecommendList" />
        <CustomGuess ref="customGuessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  //
  background-color: #f7f7f7;
  height: 100%;
}
.index {
  display: flex;
  flex-direction: column;
  height: 100%;
  .scroll-y {
    flex: 1;
  }
}
</style>
