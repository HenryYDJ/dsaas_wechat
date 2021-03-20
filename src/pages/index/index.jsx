import Nerv, { Component } from 'nervjs'
import { View, Text,Map } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import iconPath from '../../images/location.png'

export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
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
    Taro.navigateTo({
      url: '/pages/classList/index'
    })
  }
  render () {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.goStudentPage}>我是学生</AtButton>
        <AtButton type='primary' onClick={this.goClassPage}>我是老师</AtButton>
        <AtButton type='primary'>我是管理员</AtButton>
      </View>
    )
  }
}
