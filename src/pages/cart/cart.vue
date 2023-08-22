<script lang="ts" setup>
import { ref } from 'vue'

// define states
const skuPopup = ref()
// 是否打开SKU弹窗
const skuKey = ref(false)
// SKU弹窗模式
const skuMode = ref(1)
const goodsInfo = ref({})

// custom events
const openSkuPopup = () => {
  goodsInfo.value = {
    _id: '002',
    name: '迪奥香水',
    goods_thumb:
      'https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530',
    sku_list: [
      {
        _id: '004',
        goods_id: '002',
        goods_name: '迪奥香水',
        image:
          'https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530',
        price: 19800,
        sku_name_arr: ['50ml/瓶'],
        stock: 100,
      },
      {
        _id: '005',
        goods_id: '002',
        goods_name: '迪奥香水',
        image:
          'https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530',
        price: 9800,
        sku_name_arr: ['70ml/瓶'],
        stock: 100,
      },
    ],
    spec_list: [
      {
        list: [
          {
            name: '20ml/瓶',
          },
          {
            name: '50ml/瓶',
          },
          {
            name: '70ml/瓶',
          },
        ],
        name: '规格',
      },
    ],
  }
  skuKey.value = true
}
const onOpenSkuPopup = () => {}
const SkuPopup = () => {}
const addCart = () => {}
const buyNow = () => {}
</script>

<template>
  <view class="app">
    <button @click="openSkuPopup">打开SKU组件</button>
    <vk-data-goods-sku-popup
      ref="skuPopup"
      v-model="skuKey"
      border-radius="20"
      :localdata="goodsInfo"
      :mode="skuMode"
      @open="onOpenSkuPopup"
      @close="SkuPopup"
      @add-cart="addCart"
      @buy-now="buyNow"
    >
    </vk-data-goods-sku-popup>
  </view>
</template>

<style lang="scss" scoped>
.app {
  padding: 30rpx;
  font-size: 28rpx;
}
</style>
