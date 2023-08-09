<script setup lang="ts">
import { toRefs } from 'vue'
import { useMemberStore } from '@/stores'
import { myRequest } from '@/utils/httpInterceptor'

const { profile } = toRefs(useMemberStore())
const { setProfile, clearProfile } = useMemberStore()
const set = () => {
  setProfile({
    name: 'julien',
    token: '666',
  })
}
const clear = () => {
  clearProfile()
}
const request = async () => {
  const res = await myRequest<string[]>({
    method: 'GET',
    url: '/member/profile',
  })
}
</script>

<template>
  <view class="my">
    <view>test:{{ profile }}</view>
    <button @click="set" plain size="mini" type="primary">set</button>
    <button @click="clear" plain size="mini" type="warn">clear</button>
    <button @click="request" plain size="mini" type="warn">request</button>
    <image src="../../static/images/blank.png" mode="widthFix" />
  </view>
</template>

<style lang="scss">
//
</style>
<!-- <template><view></view></template> -->
