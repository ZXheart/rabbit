<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addAddress } from '@/services'
import { IAddressParameters } from '@/types/address'

// 表单数据
const form = ref<IAddressParameters>({
  receiver: '', // 收货人
  contact: '', // 联系方式
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
const fullLocation = ref('') // 省市区(前端展示)
const formHasNullValue = ref(true)
// custom events
const checkFrom = () => {
  let hasNull = false
  for (const key in form.value) {
    console.log(form.value[key])
    if (form.value[key] === '') {
      hasNull = true
      break
    }
  }
  !hasNull && (formHasNullValue.value = false)
}
const inputDone = () => {
  checkFrom()
}
const chooseRegion: UniHelper.RegionPickerOnChange = (e) => {
  const { code, value } = e.detail
  fullLocation.value = value.join(' ')
  form.value.provinceCode = code[0]
  form.value.cityCode = code[1]
  form.value.countyCode = code[2]
}
const chooseDefault: UniHelper.SwitchOnChange = (e) => {
  e.detail.value ? (form.value.isDefault = 1) : (form.value.isDefault = 0)
}
const onSave = async () => {
  addAddress({
    receiver: '文霞',
    contact: '18888888888',
    provinceCode: '110000',
    cityCode: '110100',
    countyCode: '110105',
    address: '文霞',
    isDefault: 0,
  }).then((res) => console.log(res))
  // uni.showLoading({
  //   title: '正在提交',
  // })
  // const { ...formParameters } = form.value
  // console.log(formParameters)
  // const res = await addAddress(formParameters)
  // console.log(res)
  // uni.hideLoading()
  // uni.showToast({
  //   title: '保存成功',
  //   icon: 'none',
  // })
}

// uni.request({
//   url: '/api/address/save',
//   method: 'POST',
//   data: form.value,
//   success: (res) => {
//     uni.hideLoading()
//     uni.showToast({
//       title: '添加成功',
//       icon: 'none',
//       duration: 2000,
//     })
//   },
//   fail: (err) => {
//     uni.hideLoading()
//     uni.showToast({
//       title: err.errMsg,
//       icon: 'none',
//       duration: 2000,
//     })
//   },
// })

// lifecycle.
onLoad(() => {})
</script>

<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input
          class="input"
          placeholder="请填写收货人姓名"
          v-model="form.receiver"
          @confirm="inputDone"
          @blur="inputDone"
        />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input
          class="input"
          placeholder="请填写收货人手机号码"
          v-model="form.contact"
          @confirm="inputDone"
          @blur="inputDone"
        />
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <picker class="picker" mode="region" @change="chooseRegion">
          <view v-if="fullLocation">广东省 广州市 天河区</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input
          class="input"
          placeholder="街道、楼牌号等信息"
          v-model="form.address"
          @confirm="inputDone"
          @blur="inputDone"
        />
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault"
          @change="chooseDefault"
        />
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @click="onSave" :disabled="formHasNullValue">
    保存并使用
  </button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
