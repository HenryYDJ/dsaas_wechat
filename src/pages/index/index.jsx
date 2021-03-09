import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goStudentPage () {
    Taro.navigateTo({
      url: '/pages/studentMain/index'
    })
  }
  render () {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.goStudentPage}>我是学生</AtButton>
        <AtButton type='primary'>我是老师</AtButton>
        <AtButton type='primary'>我是管理员</AtButton>
      </View>
    )
  }
}
