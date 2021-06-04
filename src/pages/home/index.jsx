import Nerv, { Component } from 'nervjs'
import { View, Text, RichText } from '@tarojs/components'
import './index.scss'
import { Swiper, SwiperItem } from '@tarojs/components'
import NavBar from '../../components/navbar'
const htmlSnip =
`  <div class='at-article__section'>
<div class='at-article__h2'>这是二级标题</div>
<div class='at-article__h3'>这是三级标题</div>
<div class='at-article__p'>
  这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。1234567890123456789012345678901234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ
</div>
<div class='at-article__p'>
  这是文本段落。这是文本段落。
</div>
</div>`
export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      htmlSnip
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        <NavBar isShowNavLeft={false}></NavBar>
         <Swiper
        className='swiper-box'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>老师管理课程</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>家长绑定学生</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>更多功能开发中</View>
        </SwiperItem>
      </Swiper>

      <View className='at-article__content'>
        <View className='at-article__section'>
          <View className='at-article__h2'>课程顾问</View>
          <View className='at-article__p'>
           邻课思（英文：Lynx School） 小程序是为了方便教学课程管理，包含教师、家长、管理员多个身份的功能，您可以点击我的选择对应的身份后使用。
          </View>
          <RichText nodes={this.state.htmlSnip}></RichText>
        </View>
      </View>
    </View>
    )
  }
}
