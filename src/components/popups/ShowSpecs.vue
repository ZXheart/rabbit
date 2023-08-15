<script setup lang="ts">
import { ref, Ref } from 'vue'
// const popupRef: Ref<> = ref()
const close = () => {}
</script>
<template>
  <view class="popup">
    <uni-popup ref="popupRef" type="bottom" background-color="#fff">
      <view class="popup-content">
        <view class="popup-title">
          <text class="popup-title-text">弹窗标题</text>
        </view>
        <view class="popup-content-text">
          <text class="popup-content-text-text">弹窗内容</text>
        </view>
        <button @click="close">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>
<style lang="scss"></style>
