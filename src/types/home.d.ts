import { IGoodsItems } from './global'
// A.banner图
export type BannerType = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: number
}
// B. banner图下边 分类
export type CategoryType = {
  id: string
  name: string
  icon: string
}
// C. 分类下边 四大金刚
export type HotRecommendType = {
  id: string
  alt: string
  pictures: Array<string>
  target: string
  title: string
  type: string
}
// D. 四大金刚下边 猜你喜欢的商品items（page在global里边）
export interface IGuessLikeGoodsItems extends IGoodsItems {
  discount: number //商品折扣
  orderNum: number //已下单数
}
