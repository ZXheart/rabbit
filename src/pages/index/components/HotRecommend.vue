<script setup lang="ts">
import { HotRecommendType } from '@/types/home'

defineProps<{ hotRecommendList: HotRecommendType[] }>()

const toHotDetails = (item: HotRecommendType) => {
  uni.navigateTo({
    url: `/pages/hot-details/hot-details?type=${item.type}`,
  })
}
</script>
<template>
  <view class="hot-recommend">
    <view
      class="hot-item"
      v-for="item in hotRecommendList"
      :key="item.id"
      @click="toHotDetails(item)"
    >
      <view class="item-top">
        <text class="title">{{ item.title }}</text>
        <text class="sub-title">{{ item.alt }}</text>
      </view>
      <view class="item-pics">
        <template v-for="i in item.pictures" :key="i">
          <image class="pic" :src="i" mode="widthFix" />
        </template>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.hot-recommend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border: 1px solid #fff;
  border-radius: 14rpx;
  background-color: #fff;
  width: 95vw;

  .hot-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20rpx;
    width: 50%;
    height: 254rpx;

    .item-top {
      .title {
        margin-right: 28rpx;
      }
      .sub-title {
        font-size: 24rpx;
        color: #959595;
      }
    }

    .item-pics {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10rpx;
      width: 100%;
      .pic {
        width: 48%;
      }
    }
  }
  & .hot-item:nth-child(1) {
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  & .hot-item:nth-child(2) {
    border-bottom: 1px solid #eee;
  }
  & .hot-item:nth-child(3) {
    border-right: 1px solid #eee;
  }
}
</style>
