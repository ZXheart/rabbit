<script setup lang="ts">
import { ref, Ref, toRefs } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { fetchProfiles, setProfiles } from '@/services'
import { useMemberStore } from '@/stores'
import { IProfileDetails, GenderType } from '@/types/member-info'

const { safeAreaInsets } = uni.getSystemInfoSync()
const { profile } = toRefs(useMemberStore())
const memberProfiles: Ref<IProfileDetails> = ref()

// network request
const getProfiles = async () => {
  const { result } = await fetchProfiles()
  console.log(result)
  memberProfiles.value = result
}

// custom events
// 0. nickname 通过 v-model 绑定到 memberProfiles.nickname
// 1. gender t通过 RadioGroupOnChang 事件绑定
const chooseGender: UniHelper.RadioGroupOnChange = (e) => {
  memberProfiles.value.gender = e.detail.value as GenderType
}
// 2. birthday 通过 DatePickerOnChange 事件绑定
const chooseBirthday: UniHelper.DatePickerOnChange = (e) => {
  memberProfiles.value.birthday = e.detail.value
}
// 3. region 通过 RegionPickerOnChange 事件绑定
const regionCode: [string, string, string] = ['', '', '']
const chooseRegion: UniHelper.RegionPickerOnChange = (e) => {
  const { value, code } = e.detail
  // .value是省市县组成的数组 - 用于前台展示
  memberProfiles.value.fullLocation = value.join(' ')
  // .code是省市县编码组成的数组 - 用于后台更新，记录
  regionCode[0] = code[0]
  regionCode[1] = code[1]
  regionCode[2] = code[2]
}
// 4. 提交更改
const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = memberProfiles.value
  const { result } = await setProfiles({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: regionCode[0],
    cityCode: regionCode[1],
    countryCode: regionCode[2],
  })
  console.log(result)
  profile.value.nickname = result.nickname
  uni.showToast({ icon: 'none', title: '保存成功！' })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
// lifecycle
onLoad(() => {
  getProfiles()
})
</script>

<template>
  <view class="viewport" v-if="memberProfiles">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator
        open-type="navigateBack"
        class="back icon-left"
        hover-class="none"
      ></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content">
        <image class="image" :src="memberProfiles.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ memberProfiles.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            :value="memberProfiles.nickname"
            :v-model="memberProfiles.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="chooseGender">
            <label class="radio">
              <radio
                value="男"
                color="#27ba9b"
                :checked="memberProfiles.gender === '男'"
              />
              男
            </label>
            <label class="radio">
              <radio
                value="女"
                color="#27ba9b"
                :checked="memberProfiles.gender === '女'"
              />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date().toDateString()"
            :value="memberProfiles.birthday"
            @change="chooseBirthday"
          >
            <view v-if="memberProfiles.birthday">
              {{ memberProfiles.birthday }}
            </view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="['广东省', '广州市', '天河区']"
            @change="chooseRegion"
          >
            <view v-if="memberProfiles.fullLocation">
              {{ memberProfiles.fullLocation }}
            </view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            :value="memberProfiles.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @click="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
