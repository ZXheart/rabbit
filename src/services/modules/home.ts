import { IParams, IPageItems } from '@/types/global'
import {
  BannerType,
  CategoryType,
  HotRecommendType,
  IGuessLikeGoodsItems,
} from '@/types/home'
import { myRequest } from '@/utils/http-interceptor'
// A. home bannerList
// distributionSite integer 可选 1为首页（默认值） 2为商品分类页
export const fetchBanner = (distributionSite = 1) => {
  return myRequest<BannerType[]>({
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
// B. home categoryList
export const fetchHomeCategory = () => {
  return myRequest<CategoryType[]>({
    url: '/home/category/mutli',
  })
}
// C. home hotRecommend
export const fetchHomeHotRecommend = () => {
  return myRequest<HotRecommendType[]>({
    url: '/home/hot/mutli',
  })
}
// D. home guessLike
export const fetchHomeGuessLike = (options?: IParams) => {
  return myRequest<IPageItems<IGuessLikeGoodsItems>>({
    url: '/home/goods/guessLike',
    data: {
      ...options,
    },
  })
}
