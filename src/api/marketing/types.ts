export namespace Activity {
  export interface ResActivityList {
    activityDesc: string
    activityName: string
    activityType: string
    activityTypeString: string
    createTime: string
    endTime: string
    id: number
    startTime: string
    updateTime: string
  }
}

export namespace Coupon {
  export interface ResCouponlist {
    benefitAmount: number
    couponName: string
    couponType: number
    couponTypeString: string
    createTime: string
    expireTime: string
    id: number
    isChecked: number
    limitNum: number
    rangeDesc: string
    rangeTypeString: string
    startTime: string
    takenCount: string
  }
}
