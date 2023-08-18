import { myRequest } from '@/utils/http-interceptor'
import { IAddressParameters } from '@/types/address'

export const addAddress = (data: IAddressParameters) => {
  return myRequest<number>({
    url: 'member/address',
    method: 'POST',
    data,
  })
}
