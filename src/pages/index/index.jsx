import Nerv, { Component } from 'nervjs'
import { View, Text,Map,OpenData,Image } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import iconPath from '../../images/location.png'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      userInfo:{

      },
      markers: [{
        id:1,
        latitude:34.6,
        longitude:113.6,
        iconPath
      },
      {
        id:2,
        latitude:34.6001,
        longitude:113.6001,
        iconPath
      }]
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    setTimeout(()=>{
      this.setState({
        markers:[
         
        ]
      })
    },10000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goStudentPage () {
    Taro.navigateTo({
      url: '/pages/studentMain/index'
    })
  }
  goClassPage () {
    // TODO teacherPage
    Taro.navigateTo({
      url: '/pages/createTeacher/index'
    })
  }
  goAdminPage(){
    Taro.navigateTo({
      url: '/pages/adminTabs/index'
    })
  }
  onGetUserInfo(detail){
    this.setState({
      userInfo:detail.detail.userInfo
    })
  }
  render () {
    return (
      <View className='index'>
        <View className='head-box'>
          <View className='user-text'>
            <Text>你好</Text>{this.state.userInfo.nickName}<Text>，欢迎您!</Text>
          </View>
          <View className='user-head'>
          <Image src={this.state.userInfo.avatarUrl} mode='aspectFit  '/>
          </View>
        </View>
        <AtButton openType='getUserInfo' onGetUserInfo={this.onGetUserInfo.bind(this)} type='primary'>登录</AtButton>
        <AtButton type='primary' onClick={this.goStudentPage}>我是学生</AtButton>
        <AtButton type='primary' onClick={this.goClassPage}>我是老师</AtButton>
        <AtButton type='primary' onClick={this.goAdminPage}>我是管理员</AtButton>
      </View>
    )
  }
}
