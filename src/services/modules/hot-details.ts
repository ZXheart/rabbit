import { myRequest } from '@/utils/httpInterceptor'
import { IHotParams, ISuperType } from '@/types/hot-details'
export const fetchHotDetails = (hotURL: string, options?: IHotParams) => {
  return myRequest<ISuperType>({
    url: hotURL,
    data: options,
  })
}
