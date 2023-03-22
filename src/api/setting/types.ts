export namespace Banner {
  export interface ReqBannerData {
    id?: number
    imageUrl: string
    linkUrl: string
    sort: number
    title: string
  }
  export interface ResBannerList {
    id: number
    imageUrl: string
    linkUrl: string
    sort: number
    title: string
  }
}
