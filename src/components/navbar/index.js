import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain } from "taro-ui"
import Taro from '@tarojs/taro'
import { MENU_BTN_INFO } from '../../constant'
import backPng from '../../images/icon_nav_back.png'
import homePng from '../../images/icon_nav_home.png'
export default class NavBar extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      curNavHeight: (MENU_BTN_INFO.top + MENU_BTN_INFO.height) + 'px',
      curMenuBtnHeight: MENU_BTN_INFO.height + 'px',
      curNavPadTop: MENU_BTN_INFO.top + 'px',
      pageName: ''
    }
  }



  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onLoad (options) {
    console.log(options.id)
  }

	goBack(isGoHome) {
    // if (this.customBack) {
    //   this.customBack()
    //   return
    // }
    debugger
    let curPage = Taro.getCurrentPages()
    let backLen = (curPage.length || 0) - 1
    if (backLen > 0) {
      if (isGoHome) {
        Taro.navigateBack({
          delta: backLen
        })
      } else {
        Taro.navigateBack({
          delta: 1
        })
      }
    } else {
      Taro.redirectTo({
        url: '/pages/home/index'
      })
    }
  }

  goHome() {
    console.log('返回首页')
    Taro.reLaunch({
      url: '/pages/home/index'
    })
  }

  render () {
    console.log(this.state)
    return (
      <View className='navbar'>
        <View style={{height: this.state.curMenuBtnHeight, paddingTop: this.state.curNavPadTop}} className="nav-main">
          <View className="nav-wrapper">
            {this.props.isShowNavLeft?<View className="nav-left" >
              <View onClick={this.goBack} className="icon-back-wrapper">
                <Image src={backPng} className="icon-back"></Image>
              </View>
              <View onClick={this.goHome} className="icon-home-wrapper">
                <Image className="icon-home" src={homePng} ></Image>
              </View>
              <View className="center-line"></View>
            </View>
            :null}
            <View className="nav-title">{this.state.pageName}</View>
          </View>
        </View>
        {/* <!-- 导航为固定定位，需要一个占位的元素并设置高度。 --> */}
        <View style={{height: this.state.curNavHeight}}></View>
      </View>
    )
  }
}

NavBar.defaultProps = {
  isShowNavLeft: true
}