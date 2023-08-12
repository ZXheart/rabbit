// 参数
export interface IParams {
  page?: number
  pageSize?: number
}
// page items
export interface IPageItems<T> {
  counts: number //总条数
  pageSize: number //每页条数
  pages: number //总页数
  page: number //当前页数
  items: T[] //当前页数据
}
// 商品items
export interface IGoodsItems {
  desc: string //商品描述
  id: string
  name: string //商品名称
  picture: string //商品图片
  price: number //商品价格
}
