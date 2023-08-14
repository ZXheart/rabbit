import { IGoodsItems } from './global'

// 一级
export interface ICategoryPrimary {
  id: string
  name: string
  picture: string
  imageBanners: []
  children: Array<ICategorySecondary>
}
// 二级
export interface ICategorySecondary {
  id: string
  name: string
  picture: string
  parentId: null
  parentName: null
  goods: Array<ICategorySecondaryGoods>
  categories: null
  brands: null
  saleProperties: null
}
// 商品
export interface ICategorySecondaryGoods extends IGoodsItems {
  discount: null //商品折扣
  orderNum: number //已下单数
}
