import type { BannerItem } from '@/types/home'
import { myRequest } from '@/utils/httpInterceptor'

export const fetchHomeBanner = (distributionSite = 1) => {
  return myRequest<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
