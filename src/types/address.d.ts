export interface IAddressParameters {
  receiver: string //收货人姓名
  contact: string //联系方式
  provinceCode: string //省份编码
  cityCode: string //城市编码
  countyCode: string //区/县编码
  address: string //详细地址
  isDefault: 0 | 1 //是否为默认。 1是 0否
}
