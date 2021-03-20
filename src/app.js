import { Component } from 'nervjs'
import './app.scss'
import Taro from '@tarojs/taro'
import { getToken } from './utils'
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
            // Taro.request({
            //   url: 'https://test.com/onLogin',
            //   data: {
            //     code: res.code
            //   }
            // })
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
