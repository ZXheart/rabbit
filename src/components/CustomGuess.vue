<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { IParams } from '@/types/global'
import { IGuessLikeGoodsItems } from '@/types/home'
import { fetchHomeGuessLike } from '@/services'
// state
const guessLikeItemList = ref<IGuessLikeGoodsItems[]>([])
// 是否正在显示底部Loading动画
const isLoading = ref(false)
const noMoreData = ref(false)
// 是否正在请求数据
const isRequesting = ref(false)
// network requests
const pageParams: Required<IParams> = {
  page: 1,
  pageSize: 10,
}
const getHomeGuessLike = async () => {
  // 进入首页自动请求一次数据，请求过程中狂往上拉（触发触底事件）就会再次加载同一条数据
  // 因为此时可能pageParams.page++动作还未执行，而导致多次请求同一数据
  if (isRequesting.value) return
  isRequesting.value = true
  if (noMoreData.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await fetchHomeGuessLike(pageParams)
  guessLikeItemList.value.push(...res.result.items)
  if (pageParams.page < res.result.pages) pageParams.page++
  else noMoreData.value = true
  // 完成一次请求之后将该值改为false
  isRequesting.value = false
}
// custom API
const resetData = () => {
  pageParams.page = 1
  guessLikeItemList.value = []
  noMoreData.value = false
}
// lifecycle
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
      :url="`/pages/goods-details/goods-details?id=${item.id}`"
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
