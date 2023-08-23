<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import AddressService from './components/AddressService.vue'
import Specs from './components/Specs.vue'
import { fetchGoodsDetails, fetchAddressList } from '@/services'
import { IGoodsResult } from '@/types/goods-details'
import { IGetAddressList } from '@/types/address'
import { SpecsInstance } from '@/types/components'

const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps<{ id: string }>()

// * 1. define states
const goodsDetails: Ref<IGoodsResult> = ref(null)
const currentPictureIndex = ref(1)
const popupRef: Ref<UniHelper.UniPopupProps> = ref()
const openType: Ref<'address' | 'service'> = ref()

const addressList: Ref<IGetAddressList[]> = ref([])

const specsRef: Ref<SpecsInstance> = ref()

// * 2. computed
const defaultAddress = computed(() => {
  const defaultItem = addressList.value.find((item) => item.isDefault === 1)
  return defaultItem?.fullLocation + defaultItem?.address || '请选择收获地址'
})
// * 3. network request
const getGoodsDetails = async (goodsId: string) => {
  const { result } = await fetchGoodsDetails(goodsId)
  goodsDetails.value = result
}
const getAddressList = async () => {
  const { result } = await fetchAddressList()
  addressList.value = result
}
// * 4. custom events
const onChange: UniHelper.SwiperOnChange = (e) => {
  currentPictureIndex.value = e.detail.current + 1
}
const openSpecs = () => {
  specsRef.value.skuKey = true
  specsRef.value.skuModeText = 'both'
}
const openAddress = () => {
  popupRef.value.open()
  openType.value = 'address'
}
const openService = () => {
  popupRef.value.open()
  openType.value = 'service'
}
const closePanel = () => {
  popupRef.value.close()
}
const changeDefault = (e: string) => {
  const index = addressList.value.findIndex((item) => item.id === e)
  addressList.value.forEach((item) => (item.isDefault = 0))
  addressList.value[index].isDefault = 1
  setTimeout(() => closePanel(), 500)
}
const addCart = () => {
  specsRef.value.skuKey = true
  specsRef.value.skuModeText = 'cart'
}
const buyNow = () => {
  specsRef.value.skuKey = true
  specsRef.value.skuModeText = 'buy'
}
// * 5. lifecycle
onLoad(async () => {
  getGoodsDetails(props.id)
  getAddressList()
})
</script>

<template>
  <scroll-view class="viewport" scroll-y v-if="goodsDetails">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper class="swiper" circular @change="onChange">
          <swiper-item
            class="swiper-item"
            v-for="(item, index) in goodsDetails.mainPictures"
            :key="index"
          >
            <image class="img" mode="widthFix" :src="item" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ currentPictureIndex }}</text>
          <text class="split">/</text>
          <text class="total">{{ goodsDetails.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goodsDetails.price }}</text>
        </view>
        <view class="name ellipsis">{{ goodsDetails.name }} </view>
        <view class="desc"> {{ goodsDetails.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow" @click="openSpecs">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ specsRef?.selectArrText }}</text>
        </view>
        <view class="item arrow" @click="openAddress">
          <text class="label">送至</text>
          <text class="text ellipsis"> {{ defaultAddress }} </text>
        </view>
        <view class="item arrow" @click="openService">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view
            class="item"
            v-for="item in goodsDetails.details.properties"
            :key="item.name"
          >
            <text class="label">{{ item.name }}</text>
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <view
          class="pictures"
          v-for="item in goodsDetails.details.pictures"
          :key="item"
        >
          <image class="pic" :src="item" mode="widthFix" />
        </view>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in goodsDetails.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <image class="image" mode="widthFix" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view
    class="toolbar"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
  >
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator
        class="icons-button"
        url="/pages/cart/cart"
        open-type="switchTab"
      >
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="add-cart" @click="addCart"> 加入购物车 </view>
      <view class="buy-now" @click="buyNow"> 立即购买 </view>
    </view>
  </view>
  <!-- 地址/服务弹出层 -->
  <view class="popup">
    <uni-popup ref="popupRef" type="bottom" :safe-area="false">
      <AddressService
        :openType="openType"
        :addressList="addressList"
        @close-panel="closePanel"
        @change-default="changeDefault"
      />
    </uni-popup>
  </view>
  <!-- 规格弹出层 -->
  <view class="SKU-popup" v-if="goodsDetails">
    <Specs ref="specsRef" :goodsDetails="goodsDetails"></Specs>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;

    .swiper {
      .img {
        width: 100%;
        height: 100%;
      }
    }

    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;

      .current {
        font-size: 26rpx;
      }

      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }

      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
  .pictures {
    .pic {
      width: 100%;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 0 20rpx 20rpx;
    background-color: #f4f4f4;
    overflow: hidden;
    .goods {
      width: 45vw;
      padding: 20rpx;
      margin-top: 20rpx;
      border-radius: 10rpx;
      background-color: #fff;

      .image {
        width: 100%;
        // height: 260rpx;
      }
      .name {
        height: 80rpx;
        margin: 10rpx 0;
        font-size: 26rpx;
        color: #262626;
      }
      .price {
        line-height: 1;
        font-size: 20rpx;
        color: #cf4444;
        .number {
          font-size: 26rpx;
          margin-left: 2rpx;
        }
      }
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .add-cart {
      background-color: #ffa868;
    }
    .buy-now {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
