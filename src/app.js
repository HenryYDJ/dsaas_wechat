import { Component } from 'nervjs'
import './app.scss'
import Taro from '@tarojs/taro'
import { getToken, setToken, getUserRoleInfo } from './utils'
import { API_MAP } from './api'
class App extends Component {

  async onLaunch(ioptions) {
    console.log(ioptions)
    const token = getToken()
    if (token) {
      // has token
      const userInfo = await getUserRoleInfo()
      if (userInfo) {
        return
      }
    }
    // no token need login or no userInfo go on login
    Taro.login({
      async success(res) {
        console.log(res)
        if (res.code) {
          // //发起网络请求
          Taro.request({
            url: API_MAP.wechat_login,
            method: 'post',
            data: {
              code: res.code,
              // "phone": "132",
              // "name": "hi",
              // "password": "123456"
            },
            success(res) {
              setToken(res.data.access_token)
              getUserRoleInfo()
            },
            error(err) {
              console.log(err)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
