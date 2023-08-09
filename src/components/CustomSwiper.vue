<script setup lang="ts">
import { ref } from 'vue'
const activeIndex = ref(0)
defineProps({
  bannerList: {
    type: Array,
    default: () => [],
  },
})
</script>
<template>
  <view class="carousel"
    ><swiper indicator-dots autoplay circular :interval="3000">
      <template v-for="item in bannerList" :key="item.id">
        <swiper-item>
          <!-- {{ item.imgUrl }} -->
          <!-- <image :src="item.imgUrl" mode="widthFix" /> -->
        </swiper-item>
      </template>
    </swiper>
  </view>
</template>

<style lang="scss">
.carousel {
  height: 400rpx;
  border: 1px solid red;
}
</style>
