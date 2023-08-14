<script setup lang="ts">
import { ref, Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { fetchHotDetails } from '@/services'
import { IHotParams, ISuper } from '@/types/hot-details'

// state
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const currentURL = ref('')
const hotData: Ref<ISuper> = ref(null)
const currentTabIndex = ref(0)
const scrollTop = ref(0)
const hotPageParams: IHotParams = {
  page: 1,
  pageSize: 10,
}
const isLoading = ref(false)
const noMoreData = ref(false)

// fetch network data
const getHotDetails = async (hotURL: string, hotPageParams: IHotParams) => {
  if (noMoreData.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await fetchHotDetails(hotURL, hotPageParams)
  const goodsItems = res.result.subTypes[currentTabIndex.value].goodsItems
  // 如果第一次获取请求数据，将请求回来的整个对象赋值根hotData。否则将新数据push进已有items数组
  if (!hotData.value) hotData.value = res.result
  else {
    hotData.value.subTypes.forEach((item, index) => {
      item.goodsItems.items.push(...res.result.subTypes[index].goodsItems.items)
    })
  }
  // 如果当前页码小于总页码，继续请求。反之设置没有更多数据
  if (hotPageParams.page < goodsItems.pages) hotPageParams.page++
  else noMoreData.value = true
}
// custom events
const switchTab = (index: number) => {
  currentTabIndex.value = index
  // 切换tab栏期望回到顶部时，需要让scroll-top发生变化。如果没有发生变化
  // 如同官方的描述： `当重复设置某些属性为相同的值时，不会同步到view层`
  scrollTop.value = scrollTop.value + 0.01
}
const reachBottom = async () => {
  isLoading.value = true
  await getHotDetails(currentURL.value, hotPageParams)
  isLoading.value = false
}
// lifecycle
onLoad((options) => {
  const type = options.type
  const currentItem = hotMap.find((item) => item.type === type)
  const currentTitle = currentItem.title
  currentURL.value = currentItem.url
  uni.setNavigationBarTitle({ title: currentTitle })
  getHotDetails(currentURL.value, hotPageParams)
})
</script>

<template>
  <view class="viewport" v-if="hotData">
    <view class="cover">
      <image class="cover-img" :src="hotData.bannerPicture"></image>
    </view>
    <view class="tabs">
      <template v-for="(item, index) in hotData.subTypes" :key="item.id">
        <text
          class="text"
          :class="{ active: currentTabIndex === index }"
          @click="switchTab(index)"
        >
          {{ item.title }}
        </text>
      </template>
    </view>
    <scroll-view
      class="scroll-view"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="reachBottom"
    >
      <view class="goods">
        <navigator
          v-for="goodsItem in hotData.subTypes[currentTabIndex].goodsItems
            .items"
          :key="goodsItem.id"
          hover-class="none"
          class="navigator"
          :url="`/pages/goods/goods?id=`"
        >
          <image class="thumb" :src="goodsItem.picture"></image>
          <view class="name ellipsis">{{ goodsItem.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goodsItem.price }}</text>
          </view>
        </navigator>
      </view>
      <!-- <view class="loading-text">正在加载...</view> -->
      <uni-load-more
        v-show="isLoading && !noMoreData"
        iconType="auto"
        status="loading"
      />
      <uni-load-more v-if="noMoreData" iconType="auto" status="noMore" />
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  .cover-img {
    width: 100%;
    height: 100%;
  }
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}
</style>
