import { useMemberStore } from '@/stores'

// request interceptor
const BASE_URL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// const BASE_URL_BACKUP = 'https://apipc-xiaotuxian-front.itheima.net/'
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    !options.url.startsWith('http') && (options.url = BASE_URL + options.url)
    options.timeout = 10000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    token && (options.header.Authorization = token)
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// repack network request
type Data<T> = {
  code: string
  msg: string
  result: T
}
export const myRequest = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      method: options.method || 'GET',
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '请更换网络尝试',
        })
        reject(err)
      },
    })
  })
}
