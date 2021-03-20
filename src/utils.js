const TOKEN_KEY = 'access_token'

export function getToken(){
  try {
    var value = Taro.getStorageSync(TOKEN_KEY)
    if (value) {
      // Do something with return value
      return value
    }
    return null
  } catch (e) {
    // Do something when catch error
    return null
  }
}

export function setToken(token){
  try {
    Taro.setStorageSync(TOKEN_KEY, token)
    return true
  } catch (e) {
    return false
   }
}