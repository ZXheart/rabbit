// A.
export type BannerType = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: number
}
// B.
export type CategoryType = {
  id: string
  name: string
  icon: string
}
// C.
export type HotRecommendType = {
  id: string
  pictures: Array<string>
  title: string
  alt: string
  target: string
  type: string
}
// D.
export type pageParamsType = {
  page?: number
  pageSize?: number
}
export type GuessLikeType<T> = {
  counts: number //总条数
  pageSize: number //每页条数
  pages: number //总页数
  page: number //当前页数
  items: T[] //当前页数据
}
export type GuessLikeItemType = {
  id: string
  name: string //商品名称
  desc: string //商品描述
  price: number //商品价格
  picture: string //商品图片
  discount: number //商品折扣
  orderNum: number //已下单数
}
