// 从主页四大金刚点进来的特惠推荐/爆款推荐/一站买全/新鲜好物
import { IParams, IPageItems, IGoodsItems } from './global'

// 参数
export interface IHotParams extends IParams {
  subType?: string
}

// 超集
export interface ISuper {
  title: string
  id: string
  bannerPicture: string
  subTypes: ISub[]
}
// 子集
export interface ISub {
  id: string
  title: string
  goodsItems: IPageItems<IGoodsItems>
}
// 子集下goods （在global）
// goods下items （在global）
