<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { GuessLikeItemType, pageParamsType } from '@/types/home'
import { fetchHomeGuessLike } from '@/services'
// state
const guessLikeItemList = ref<GuessLikeItemType[]>([])
const isLoading = ref(false)
const noMoreData = ref(false)
// network requests
const pageParams: Required<pageParamsType> = {
  page: 1,
  pageSize: 10,
}
const getHomeGuessLike = async () => {
  if (noMoreData.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await fetchHomeGuessLike(pageParams)
  guessLikeItemList.value.push(...res.result.items)
  if (pageParams.page < res.result.pages) pageParams.page++
  else noMoreData.value = true
}
// custom API
const resetData = () => {
  pageParams.page = 1
  guessLikeItemList.value = []
  noMoreData.value = false
}
// local API
onMounted(() => {
  getHomeGuessLike()
})
defineExpose({ isLoading, resetData, getMore: getHomeGuessLike })
</script>

<template>
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessLikeItemList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="widthFix" :src="item.picture"></image>
      <view class="name">
        {{ item.name }}
      </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <uni-load-more
    v-show="isLoading && !noMoreData"
    iconType="auto"
    status="loading"
  />
  <uni-load-more v-if="noMoreData" iconType="auto" status="noMore" />
</template>

<style lang="scss">
:host {
  display: block;
}
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
</style>