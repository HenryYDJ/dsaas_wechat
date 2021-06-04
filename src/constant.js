import Taro from '@tarojs/taro'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat' 
import calendar from 'dayjs/plugin/calendar'
import utc from 'dayjs/plugin/utc'
require('dayjs/locale/zh-cn')

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)
dayjs.extend(calendar)
dayjs.extend(utc)
// FIXME 暂时先写死中文
dayjs.locale('zh-cn');

export const GENDERS = [
  {
    value:1,
    name:'男'
  },{
    value:0,
    name:'女'
  }
]

export const PARENT_REALTIONS = [
  // "FATHER": 1,
  // "MOTHER": 2,
  // "GRANDPA": 3,
  // "GRANDMA": 4,
  // "MOMGRANDPA": 5,
  // "MOMGRANDMA": 6,
  // "BROTHER": 7,
  // "SISTER": 8,
  // "UNCLE": 9,
  // "AUNT": 10,
  // "PARENT": 11
  {
    value:1,
    name:'爸爸'
  },{
    value:2,
    name:'妈妈'
  },{
    value:3,
    name:'爷爷'
  },{
    value:4,
    name:'奶奶'
  },{
    value:5,
    name:'外公'
  },{
    value:6,
    name:'外婆'
  },{
    value:7,
    name:'哥哥'
  },{
    value:8,
    name:'姐姐'
  },{
    value:9,
    name:'叔叔'
  },{
    value:0,
    name:'姑姑'
  },{
    value:10,
    name:'家长'
  }
]


// 老师审核状态
export const TEACH_APPROVE_STATE = {
  approved: 1,
  approve_wait:0,
  approve_deny:2
}

// 管理员审核状态
export const ADMIN_APPROVE_STATE = {
  approved: 1,
  approve_wait:0,
  approve_deny:2,
  approve_revoke:3
}

export const TEACH_APPROVE_STATE_TEXT = {
  [TEACH_APPROVE_STATE.approved]: '已审核',
  [TEACH_APPROVE_STATE.approve_wait]: '待审核',
  [TEACH_APPROVE_STATE.approve_deny]: '审核未通过'
}

export const ADMIN_APPROVE_STATE_TEXT = {
  [ADMIN_APPROVE_STATE.approved]: '已审核',
  [ADMIN_APPROVE_STATE.approve_wait]: '待审核',
  [ADMIN_APPROVE_STATE.approve_deny]: '审核未通过',
  [ADMIN_APPROVE_STATE.approve_revoke]: '已撤销'
}



export const MENU_BTN_INFO = Taro.getMenuButtonBoundingClientRect()

const globalData = {}

export function setGlobalData (key, val,toStore ) {
  globalData[key] = val
  if (toStore) {
    Taro.setStorageSync(key, val)
  }
}

export function getGlobalData (key,fromStore) {
  if (fromStore) {
    const val = Taro.getStorageSync(key)
    if (val) {
      setGlobalData(key, val)
      return val
    }
  } else {
    return globalData[key]
  }
}

export const GLOBAL_NAMES = {
  WX_USER_INFO:'WX_USER_INFO'
}