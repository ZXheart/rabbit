import { myRequest } from '@/utils/http-interceptor'
import { IAddressParameters, IGetAddressList } from '@/types/address'

export const addAddress = (data: IAddressParameters) => {
  return myRequest<{ id: number }>({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

export const fetchAddressList = () => {
  return myRequest<IGetAddressList[]>({
    url: '/member/address',
  })
}

export const deleteAddress = (id: string) => {
  return myRequest<{ id: string }>({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}

export const fetchAddress = (id: string) => {
  return myRequest<IGetAddressList>({
    url: `/member/address/${id}`,
  })
}

export const modifyAddress = (id: string, data: IAddressParameters) => {
  return myRequest<IGetAddressList>({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}
