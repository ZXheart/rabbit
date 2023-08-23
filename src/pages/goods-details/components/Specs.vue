<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue'
import type { SkuPopupLocalData, SkuPopupInstance } from '@/types/SKU'
import type { IGoodsResult } from '@/types/goods-details'
// * 0. defineProps
const props = defineProps<{
  goodsDetails: IGoodsResult
}>()
const res = props.goodsDetails
// * 1. states
const skuRef: Ref<SkuPopupInstance> = ref()
const skuKey = ref(false) // 是否显示SKU组件
// SKU组件 添加购物车/立即购买 显示模式 1：全显示2：只显示购物车3：只显示立即购买
const skuMode = ref({ both: 1, cart: 2, buy: 3 })
const skuModeText: Ref<'both' | 'cart' | 'buy'> = ref()
const localData = ref({} as SkuPopupLocalData)
// 选中商品的样式
const activeStyle = ref({
  'background-color': 'rgba(53, 200, 169,.2)',
  color: '#27ba9b',
  'border-color': '#27ba9b',
})
// * 2. methods
const getLocalData = () => {
  // SKU组件所需格式
  localData.value = {
    _id: res.id,
    name: res.name,
    goods_thumb: res.mainPictures[0], //thumbnail: 缩略图；thumb：拇指；nail：指/趾甲；加起就缩略图？
    spec_list: res.specs.map((v) => ({ list: v.values, name: v.name })),
    sku_list: res.skus.map((v) => ({
      _id: v.id,
      goods_id: res.id,
      goods_name: res.name,
      image: v.picture,
      price: +v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((item) => item.valueName),
    })),
  }
}
// * 3. computed
const selectArrText = computed(() => {
  return skuRef.value.selectArr.join(' ') || '请选择商品规格'
})
// * 4. custom events
const addCart = () => {
  console.log('add')
}
const buyNow = () => {
  console.log('buy')
}
// * 5. lifecycle
onMounted(() => {
  getLocalData()
})

defineExpose({
  skuKey,
  skuModeText,
  selectArrText,
})
</script>

<template>
  <view class="specs" v-if="localData">
    <!-- SKU弹窗组件 -->
    <vk-data-goods-sku-popup
      ref="skuRef"
      v-model="skuKey"
      :mode="(skuMode[skuModeText] as 1|2|3)"
      :localdata="localData"
      add-cart-background-color="#ffa868"
      buy-now-background-color="#27ba9b"
      :actived-style="activeStyle"
      @add-cart="addCart"
      @buy-now="buyNow"
    />
  </view>
</template>
