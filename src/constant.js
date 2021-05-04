import Taro from '@tarojs/taro'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/advancedFormat' 

dayjs.extend(localizedFormat);
// FIXME 暂时先写死中文
dayjs.locale('zh-cn');

export const GENDERS = [
  {
    value:1,
    name:'男'
  },{
    value:2,
    name:'女'
  }
]

export const MENU_BTN_INFO = Taro.getMenuButtonBoundingClientRect()

const globalData = {}

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}