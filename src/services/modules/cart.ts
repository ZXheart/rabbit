import { myRequest } from '@/utils/http-interceptor'
import { IAddToCart } from '@/types/cart'
export const addToCart = (data: IAddToCart) => {
  return myRequest({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}
