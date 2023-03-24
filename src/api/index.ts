export { login, getUserInfo, logout } from './user'
export {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
  getUserRolesList,
  assignUserRoles,
} from './acl/account'

export { getRoleList, deleteRole, addRole, updateRole } from './acl/role'

export {
  getRolePermission,
  assignRolePermission,
  getPermissionList,
  deletePermission,
  addPermission,
  updatePermission,
} from './acl/permission'

export { getCategorys1, getCategorys2, getCategorys3 } from './product/category'

export {
  getTrademarkList,
  removeTrademark,
  addTrademark,
  updateTrademark,
} from './product/trademark'

export { getActivityList } from './marketing/activity'
export { getCouponList, removeCoupon } from './marketing/coupon'

export { getOrderList } from './order/order-list'
export { getRefundList } from './order/refund-list'

export { getClientUserList, lockClientUser } from './client-user/user-list'

export {
  getBannerList,
  saveBanner,
  updateBanner,
  removeBanner,
} from './setting/banner'

export { getAttrList, removeAttr, addAttr } from './product/attr'

export { getSkuList } from './product/sku'
