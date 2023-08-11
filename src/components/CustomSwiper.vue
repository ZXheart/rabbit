<script setup lang="ts">
import { BannerType } from '@/types/home'
import { ref } from 'vue'

defineProps<{ bannerList: BannerType[] }>()

const activeIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (e) => {
  activeIndex.value = e.detail.current
}
</script>
<template>
  <view class="carousel">
    <swiper autoplay circular :interval="3000" @change="onChange">
      <template v-for="item in bannerList" :key="item.id">
        <swiper-item>
          <image class="item-image" :src="item.imgUrl" mode="widthFix" />
        </swiper-item>
      </template>
    </swiper>
    <view class="indicator">
      <text
        class="dot"
        v-for="(item, index) in bannerList"
        :key="item.id"
        :class="{ active: index === activeIndex }"
      >
      </text>
    </view>
  </view>
</template>

<style lang="scss">
.carousel {
  position: relative;
  width: 100%;
  height: 280rpx;
  .item-image {
    width: 100%;
    height: 100%;
  }
  .indicator {
    position: absolute;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dot {
      margin: 0 10rpx;
      width: 30rpx;
      height: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .dot.active {
      background-color: #fff;
    }
  }
}
</style>
