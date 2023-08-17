<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// network request
import { fetchBanner } from '@/services'
import { fetchCategory } from '@/services'
// types
import { BannerType } from '@/types/home'
import { ICategoryPrimary } from '@/types/category'
// states
const bannerList = ref<BannerType[]>([])
const categoriesList = ref<ICategoryPrimary[]>([])

const currentPrimaryIndex = ref(0)
const scrollTop = ref(0)
// fetch network data
const getCategoryBanner = async (distributionSite: number) => {
  const res = await fetchBanner(distributionSite)
  bannerList.value = res.result
}
const getCategory = async () => {
  const res = await fetchCategory()
  categoriesList.value = res.result
}
// custom events
const switchPrimaryTab = (index: number) => {
  currentPrimaryIndex.value = index
  scrollTop.value += 0.01
}
// lifecycle events
onLoad(() => {
  getCategoryBanner(2)
  getCategory()
})
</script>

<template>
  <view class="viewport" v-if="categoriesList">
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          class="item"
          :class="{ active: index === currentPrimaryIndex }"
          v-for="(pItem, index) in categoriesList"
          :key="pItem.id"
          @click="switchPrimaryTab(index)"
        >
          <text class="name"> {{ pItem.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view
        class="secondary"
        scroll-y
        :scroll-top="scrollTop"
        v-if="categoriesList[currentPrimaryIndex]"
      >
        <CustomSwiper class="banner" :bannerList="bannerList" />
        <!-- 内容区域 -->
        <view
          v-for="(sItem, index) in categoriesList[currentPrimaryIndex].children"
          :key="sItem.id"
        >
          <view class="title">
            <text class="name">{{ sItem.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              v-for="goods in categoriesList[currentPrimaryIndex].children[
                index
              ].goods"
              :key="goods.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods-details/goods-details?id=${goods.id}`"
            >
              <image class="image" :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
            <!-- 下边这玩意用来将不足一排的item左对齐 -->
            <navigator
              url="/pages/"
              open-type="navigate"
              hover-class="navigator-hover"
              style="width: 150rpx; height: 0rpx"
              v-for="n in 3"
              :key="n"
            >
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }
  .active {
    background-color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}
/* 二级分类 */
.secondary {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .carousel {
    height: 200rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    width: calc(100vw - 240rpx);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;

    .goods {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 150rpx;
      height: 300rpx;
      border-radius: 4rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;

      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
