import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain } from "taro-ui"
import Taro from '@tarojs/taro'
import { MENU_BTN_INFO } from '../../constant'
import backPng from '../../images/icon_nav_back.png'
import homePng from '../../images/icon_nav_home.png'
export default class WaitPage extends Component {

  constructor () {
    super(...arguments)
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
  pageTitle: ''
}