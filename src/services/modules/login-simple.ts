import { myRequest } from '@/utils/httpInterceptor'
import { IMemberInfo } from '@/types/member-info'
export const loginSimple = (data: { phoneNumber: string }) => {
  return myRequest<IMemberInfo>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data,
  })
}
