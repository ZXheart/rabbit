import { myRequest } from '@/utils/httpInterceptor'
import { ICategoryPrimary } from '@/types/category'
export const fetchCategory = () => {
  return myRequest<ICategoryPrimary[]>({
    url: '/category/top',
  })
}
