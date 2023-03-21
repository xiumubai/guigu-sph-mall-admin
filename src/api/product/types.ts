export namespace Category {
  export interface ReqSaveCateGroty {
    id?: number
    name: string
  }
  export interface ResCategoryList {
    createTime?: string
    hasChildren?: boolean
    id?: number
    name: string
    level?: number
    updateTime: string
  }
}

export namespace Trademark {
  export interface ReqTradeMark {
    id?: number
    logoUrl: string
    tmName: string
  }
  export interface ResTradeMarkList {
    createTime: string
    id: number
    logoUrl: string
    tmName: string
    updateTime: string
  }
}
