<script setup lang="ts">
import { CategoryType } from '@/types/home'

defineProps<{ categoryList: CategoryType[] }>()
</script>
<template>
  <view class="category">
    <template v-for="item in categoryList" :key="item.id">
      <view class="category-item">
        <image class="item-icon" :src="item.icon"></image>
        <text class="item-title">{{ item.name }}</text>
      </view>
    </template>
  </view>
</template>
<style lang="scss">
.category {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;

  .category-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    width: 18vw;

    .item-icon {
      width: 14vw;
      height: 14vw;
    }
  }
}
</style>
