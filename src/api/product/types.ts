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

interface AttrList {
  attrId: number
  id?: number
  valueName: string
}

export namespace Attr {
  export interface ResAttrList {
    attrName: string
    attrValueList: AttrList[]
    categoryId: number
    categoryLevel: number
    id: number
  }
  export interface ReqAttrData {
    attrName: string
    attrValueList: AttrList[]
    categoryId: number
    categoryLevel: number
    id?: number
  }
}
