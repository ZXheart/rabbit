export interface IMemberInfo {
  id: string
  mobile: string
  token: string //用于后续接口调用的token，有效期3天
  nickname: string | null //用户昵称
  avatar: string
  account: string //用户名
}
