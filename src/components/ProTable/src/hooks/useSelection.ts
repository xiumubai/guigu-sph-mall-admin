/*
 * @Author: 朽木白
 * @Date: 2023-03-06 17:45:41
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-07 14:16:00
 * @Description: 表格多选操作
 */

// import { computed, ref } from 'vue'

export const useSelection = (selecteId = 'id') => {
  const getRowKeys = (row: any) => {
    return row[selecteId]
  }

  return {
    getRowKeys,
  }
}
