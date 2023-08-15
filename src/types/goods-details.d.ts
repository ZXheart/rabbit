export interface IGoodsResult {
  id: string
  name: string //商品名
  spuCode: string //spu编码（standard product unit - 标准产品单元）
  desc: string //备注
  price: string //当前价格
  oldPrice: string
  discount: number
  inventory: number //库存
  brand: IGoodsBrand //品牌信息
  salesCount: number
  commentCount: number
  collectCount: number //收藏数量
  mainVideos: string[]
  videoScale: number //1为1:1 / 16:9; 2为 3:4
  mainPictures: string[]
  specs: IGoodsSpecs[]
  skus: IGoodsSKUs[] //SKU: stock keeping unit - 库存单元(s) 是产品入库后一种编码归类方法，也是库存控制的最小单位
  categories: IGoodsCategory
  details: IGoodsDetails
  isPreSale: boolean //是否为预售
  isCollect: null
  recommends: null
  userAddresses: null //用户收货地址列表
  evaluationInfo: null
  similarProducts: IGoodsSimilar[] //同类商品
  hotByDay: IGoodsSimilar[] //24小时热销
}
// 品牌
interface IGoodsBrand {
  id: string
  name: string
  nameEn: string //品牌英文名
  picture: string
  logo: string
  type: null
  desc: null
  place: null
}
// 规格
interface IGoodsSpecs {
  id: string
  name: string
  values: ISpecsValues[]
}
interface ISpecsValues {
  name: string
  picture: string | null
  available?: boolean
  desc: string
}
// SKUs
interface IGoodsSKUs {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  inventory: number
  picture: string //sku图片
  specs: ISKUsSpecs[]
}
interface ISKUsSpecs {
  name: string
  valueName: string
}
// 所属分类
interface IGoodsCategory {
  id: string
  name: string
  layer: number
  parent: IGoodsCategory | null
}
// 商品详情
interface IGoodsDetails {
  properties: IDetailsProperties[] //商品属性集合
  pictures: string[] //商品详情图片合计
}
interface IDetailsProperties {
  name: string
  value: string
}
// 类似商品
interface IGoodsSimilar {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  orderNum: number
  discount: null
}
