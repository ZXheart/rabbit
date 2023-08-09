<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'

import { fetchHomeBanner } from '@/services'

const bannerList = ref([])
fetchHomeBanner().then((res) => (bannerList.value = res.result))
</script>

<template>
  <view class="index">
    <custom-navbar />
    <CustomSwiper :bannerList="bannerList" />
  </view>
</template>

<style lang="scss">
//
</style>
