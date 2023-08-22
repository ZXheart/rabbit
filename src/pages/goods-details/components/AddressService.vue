<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

import { IGetAddressList } from '@/types/address'

defineProps<{
  openType: 'address' | 'service'
  addressList?: IGetAddressList[]
}>()
const emit = defineEmits<{
  (event: 'closePanel'): void
  (event: 'changeDefault', id: string): void
}>()
const closePanel = () => {
  emit('closePanel')
}
const changeDefault = (id: string) => {
  emit('changeDefault', id)
}
// define states

// lifecycle
onShow(() => {})
</script>

<template>
  <view class="address-service">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @click="closePanel"></text>
    <!-- 标题 -->
    <view class="title">
      {{ openType === 'address' ? '配送至' : '服务说明' }}
    </view>
    <!-- 服务内容 -->
    <view class="service-content" v-if="openType === 'service'">
      <view class="item">
        <view class="dt">无忧退货</view>
        <view class="dd">
          自收到商品之日起30天内, 可在线申请无忧退货服务（食品等特殊商品除外）
        </view>
      </view>
      <view class="item">
        <view class="dt">快速退款</view>
        <view class="dd">
          收到退货包裹并确认无误后, 将在48小时内办理退款, 退款将原路返回,
          不同银行处理时间不同, 预计1-5个工作日到账
        </view>
      </view>
      <view class="item">
        <view class="dt">满88元免邮费</view>
        <view class="dd">
          单笔订单金额(不含运费)满88元可免邮费, 不满88元, 单笔订单收取10元邮费
        </view>
      </view>
    </view>
    <!-- 地址内容 -->
    <view class="address-content" v-if="openType === 'address'">
      <view class="address-items">
        <view class="item" v-for="item in addressList" :key="item.id">
          <view class="user">{{ item.receiver }} {{ item.contact }}</view>
          <view class="address">{{ item.fullLocation }}{{ item.address }}</view>
          <text v-if="item.isDefault" class="icon icon-checked"></text>
          <text
            v-else
            class="icon iconfont icon-weixuanzhong"
            @click="changeDefault(item.id)"
          >
          </text>
        </view>
      </view>
      <view class="footer">
        <navigator
          class="button primary"
          url="/setting-pages/edit-address/edit-address"
          open-type="navigate"
        >
          新建地址
        </navigator>
        <view v-if="false" class="button primary">确定</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import url(../../../static/fonts/iconfont.css);

.address-service {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}
// 地址内容
.service-content {
  padding: 20rpx 20rpx 100rpx 20rpx;

  .item {
    margin-top: 20rpx;
  }

  .dt {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    position: relative;

    &::before {
      content: '';
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
      background-color: #eaeaea;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      left: -20rpx;
    }
  }

  .dd {
    line-height: 1.6;
    font-size: 26rpx;
    color: #999;
  }
}

// 地址内容
.address-content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon.iconfont {
    font-size: 55rpx;
    width: 47rpx;
    height: 47rpx;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
