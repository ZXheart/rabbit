import { ISetProfiles } from '@/types/member-info'
import { myRequest } from '@/utils/http-interceptor'
export const setProfiles = (data: ISetProfiles) => {
  return myRequest<ISetProfiles>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
