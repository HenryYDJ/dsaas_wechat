import { Component } from 'nervjs'
import './app.scss'
import Taro from '@tarojs/taro'
import { getToken,setToken } from './utils'
import { API_MAP } from './api'
class App extends Component {

  componentDidMount () {
    const token = getToken()
    if (token) {
      // has token
    } else {
      // no token need login
      Taro.login({
        success: function (res) {
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
              success(res){
                setToken(res.data.access_token)
              },
              error(err){
                console.log(err)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
