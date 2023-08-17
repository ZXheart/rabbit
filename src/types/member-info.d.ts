type GenderType = '男' | '女'
interface IBaseProfile {
  id: string
  nickname?: string | null
  avatar: string
  account: string
}

export interface ILoginRes extends IBaseProfile {
  mobile: string
  token: string //用于后续接口调用的token，有效期3天
}
export interface IProfileDetails extends IBaseProfile {
  gender?: GenderType | null
  birthday?: string | null
  fullLocation?: string
  profession?: string | null
}

export interface ISetProfiles {
  nickname?: string | null
  gender?: GenderType | null
  birthday?: string | null
  profession?: string | null
  provinceCode?: string | null
  cityCode?: string | null
  countryCode?: string | null
}
