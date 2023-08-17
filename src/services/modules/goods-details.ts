import { myRequest } from '@/utils/http-interceptor'
import { IGoodsResult } from '@/types/goods-details'
export const fetchGoodsDetails = (goodsId: string) => {
  return myRequest<IGoodsResult>({
    url: '/goods',
    data: {
      id: goodsId,
    },
  })
}
