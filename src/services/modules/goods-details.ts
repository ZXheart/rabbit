import { myRequest } from '@/utils/httpInterceptor'
import { IGoodsResult } from '@/types/goods-details'
export const fetchGoodsDetails = (goodsId) => {
  return myRequest<IGoodsResult>({
    url: '/goods',
    data: {
      id: goodsId,
    },
  })
}
