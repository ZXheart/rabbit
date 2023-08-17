import { myRequest } from '@/utils/http-interceptor'
import { IProfileDetails } from '@/types/member-info'

export const fetchProfiles = () => {
  return myRequest<IProfileDetails>({
    url: '/member/profile',
  })
}
