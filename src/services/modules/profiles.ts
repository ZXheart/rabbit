import { myRequest } from '@/utils/http-interceptor'
import { IProfileDetails, ISetProfiles } from '@/types/member-info'

export const fetchProfiles = () => {
  return myRequest<IProfileDetails>({
    url: '/member/profile',
  })
}

export const setProfiles = (data: ISetProfiles) => {
  return myRequest<IProfileDetails>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
