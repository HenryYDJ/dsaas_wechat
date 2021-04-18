import Taro from '@tarojs/taro'

const TOKEN_KEY = 'access_token'
const VALID_SECONDS = 86400*2.8 // = 2.8d
const TOKEN_TIME_SPLIT = '###'

export function getToken(){
  try {
    var value = Taro.getStorageSync(TOKEN_KEY)
    if (value) {
      var info = value.split(TOKEN_TIME_SPLIT)
      var expiredTime = +info[1]
      if (expiredTime >= +new Date) {
        return info[0]
      }
      // token is expired
      return null
    }
    return null
  } catch (e) {
    // Do something when catch error
    return null
  }
}

export function setToken(token){
  try {
    const expiredTime = +new Date + VALID_SECONDS * 1000
    Taro.setStorageSync(TOKEN_KEY, token + TOKEN_TIME_SPLIT + expiredTime)
    return true
  } catch (e) {
    return false
   }
}