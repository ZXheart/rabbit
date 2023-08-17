import { myRequest } from '@/utils/http-interceptor'
import { ICategoryPrimary } from '@/types/category'
export const fetchCategory = () => {
  return myRequest<ICategoryPrimary[]>({
    url: '/category/top',
  })
}
