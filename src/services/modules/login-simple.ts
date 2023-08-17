import { myRequest } from '@/utils/http-interceptor'
import { ILoginRes } from '@/types/member-info'
export const loginSimple = (data: { phoneNumber: string }) => {
  return myRequest<ILoginRes>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data,
  })
}
