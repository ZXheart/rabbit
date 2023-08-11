<template name="skeleton">
  <view is="components/CustomSwiper">
    <view class="carousel CustomSwiper--carousel">
      <swiper
        :autoplay="false"
        :circular="true"
        :interval="3000"
        :current="0"
      ></swiper>
      <view class="indicator CustomSwiper--indicator">
        <text class="dot CustomSwiper--dot"></text>
        <text class="dot CustomSwiper--dot active CustomSwiper--active"></text>
        <text class="dot CustomSwiper--dot"></text>
        <text class="dot CustomSwiper--dot"></text>
        <text class="dot CustomSwiper--dot"></text>
      </view>
    </view>
  </view>
  <view is="pages/index/components/Category">
    <view class="category Category--category">
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-499 sk-text"
          >居家</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-892 sk-text"
          >锦鲤</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-145 sk-text"
          >服饰</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-68 sk-text"
          >母婴</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-723 sk-text"
          >个护</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-26 sk-text"
          >严选</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-10 sk-text"
          >数码</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-263 sk-text"
          >运动</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-908 sk-text"
          >杂项</text
        >
      </view>
      <view class="category-item Category--category-item">
        <image class="item-icon Category--item-icon sk-image"></image>
        <text
          class="item-title Category--item-title sk-transparent sk-text-14-2857-531 sk-text"
          >品牌</text
        >
      </view>
    </view>
  </view>
  <view is="pages/index/components/HotRecommend">
    <view class="hot-recommend HotRecommend--hot-recommend">
      <view class="hot-item HotRecommend--hot-item">
        <view class="item-top HotRecommend--item-top">
          <text
            class="title HotRecommend--title sk-transparent sk-text-14-2857-751 sk-text"
            >特惠推荐</text
          >
          <text
            class="sub-title HotRecommend--sub-title sk-transparent sk-text-14-2857-97 sk-text"
            >精选全攻略</text
          >
        </view>
        <view class="item-pics HotRecommend--item-pics">
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 74.9375px"
          ></image>
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 74.9375px"
          ></image>
        </view>
      </view>
      <view class="hot-item HotRecommend--hot-item">
        <view class="item-top HotRecommend--item-top">
          <text
            class="title HotRecommend--title sk-transparent sk-text-14-2857-898 sk-text"
            >爆款推荐</text
          >
          <text
            class="sub-title HotRecommend--sub-title sk-transparent sk-text-14-2857-187 sk-text"
            >最受欢迎</text
          >
        </view>
        <view class="item-pics HotRecommend--item-pics">
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 75.4062px"
          ></image>
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 75.4062px"
          ></image>
        </view>
      </view>
      <view class="hot-item HotRecommend--hot-item">
        <view class="item-top HotRecommend--item-top">
          <text
            class="title HotRecommend--title sk-transparent sk-text-14-2857-74 sk-text"
            >一站买全</text
          >
          <text
            class="sub-title HotRecommend--sub-title sk-transparent sk-text-14-2857-848 sk-text"
            >精心优选</text
          >
        </view>
        <view class="item-pics HotRecommend--item-pics">
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 74.9375px"
          ></image>
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 74.9375px"
          ></image>
        </view>
      </view>
      <view class="hot-item HotRecommend--hot-item">
        <view class="item-top HotRecommend--item-top">
          <text
            class="title HotRecommend--title sk-transparent sk-text-14-2857-354 sk-text"
            >新鲜好物</text
          >
          <text
            class="sub-title HotRecommend--sub-title sk-transparent sk-text-14-2857-808 sk-text"
            >生活加分项</text
          >
        </view>
        <view class="item-pics HotRecommend--item-pics">
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 75.4062px"
          ></image>
          <image
            class="pic HotRecommend--pic sk-image"
            mode="widthFix"
            style="height: 75.4062px"
          ></image>
        </view>
      </view>
    </view>
  </view>
  <view is="components/CustomGuess" class="r">
    <view class="caption CustomGuess--caption">
      <text
        class="text CustomGuess--text sk-transparent sk-text-0-0000-240 sk-text sk-pseudo sk-pseudo-circle"
        >猜你喜欢</text
      >
    </view>
  </view>
</template>
<style lang="scss" scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-3-5714-972 {
  background-image: linear-gradient(
    transparent 3.5714%,
    #eeeeee 0%,
    #eeeeee 96.4286%,
    transparent 0%
  ) !important;
  background-size: 100% 28rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-934 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.2rpx;
  position: relative !important;
}
.sk-text-14-2857-499 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-892 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-145 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-68 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-723 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-26 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-10 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-263 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-908 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-531 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-751 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-97 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-898 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-187 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-74 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-848 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-354 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text-14-2857-808 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-0-0000-240 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 32rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
