import { myRequest } from '@/utils/httpInterceptor'
import { IHotParams, ISuper } from '@/types/hot-details'
export const fetchHotDetails = (hotURL: string, options?: IHotParams) => {
  return myRequest<ISuper>({
    url: hotURL,
    data: options,
  })
}
