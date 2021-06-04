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
    const pages = Taro.getCurrentPages()
    console.log(pages)
    this.state = {
      curNavHeight: (MENU_BTN_INFO.top + MENU_BTN_INFO.height + 10) + 'px',// 加10px间隙
      curMenuBtnHeight: MENU_BTN_INFO.height + 'px', 
      curNavPadTop: MENU_BTN_INFO.top + 'px', 
      pageName: this.props.title ? this.props.title : pages.length ? pages[pages.length-1].config.navigationBarTitleText: ''
    }
  }



  componentWillMount () {
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onShow (options) {
  }

	goBack(isGoHome) {
    // if (this.customBack) {
    //   this.customBack()
    //   return
    // }
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
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  render () {
    return (
      <View className='navbar'>
        <View style={{height: this.state.curMenuBtnHeight, paddingTop: this.state.curNavPadTop}} className="nav-main">
          <View className="nav-wrapper">
            {this.props.isShowNavLeft?<View className="nav-left" >
              <View onClick={this.goBack.bind(this,false)} className="icon-back-wrapper">
                <Image src={backPng} className="icon-back"></Image>
              </View>
              <View onClick={this.goHome.bind(this,true)} className="icon-home-wrapper">
                <Image className="icon-home" src={homePng} ></Image>
              </View>
              <View className="center-line"></View>
            </View>
            :null}
            {this.props.showTitle?<View className="nav-title">{this.state.pageName}</View>:null}
          </View>
        </View>
        {/* <!-- 导航为固定定位，需要一个占位的元素并设置高度。 --> */}
        <View style={{height: this.state.curNavHeight}}></View>
      </View>
    )
  }
}

NavBar.defaultProps = {
  isShowNavLeft: true,
  showTitle: true,
  title: ''
}