export namespace Order {
  export interface ResOrderList {
    consignee: string
    consigneeTel: number
    createTime: string
    deliveryAddress: string
    expireTime: string
    id: number
    imgUrl: string
    orderStatus: string
    orderStatusName: string
    outTradeNo: string
    paymentWay: string
    processStatus: string
    provinceId: string
    refundableTime: string
    totalAmount: string
    trackingNo: number
    tradeBody: string
    updateTime: string
    userId: number
  }
}

export namespace Refund {
  export interface ResRefundList {
    approveOperatorId: number
    approveRemark: string
    approveTime: string
    createTime: string
    id: number
    imgUrl: string
    orderId: number
    orderPrice: string
    outTradeNo: string
    recieveOperatorId: string
    recieveTime: string
    refundAmount: string
    refundNum: number
    refundReasonTxt: string
    refundReasonType: string
    refundReasonTypeString: string
    refundStatus: string
    refundStatusString: string
    refundType: string
    refundTypeString: string
    skuId: number
    skuName: string
    trackingNo: number
    trackingTime: string
    updateTime: string
    userId: number
  }
}
