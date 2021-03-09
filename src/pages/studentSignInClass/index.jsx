import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtCurtain } from 'taro-ui'

export default class Studentsigninclass extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
    }
  }
  onClose () {
    this.setState({
      isOpened: false
    })
  }

  componentWillMount () { 
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getTime () {
    const now = new Date
    return now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()
  }

  doSignInClass () {
    this.setState({
      isOpened: true
    })
  }

  render () {
    const nowTime = this.getTime()
    return (
      <View className='studentSignInClass'>
        <View className='signBox' onClick={this.doSignInClass.bind(this)}>
          <text>上课签到</text>
          <text>{nowTime}</text>
          <text></text>
        </View>
        <AtCurtain
        className='signInModal'
        isOpened={this.state.isOpened}
        onClose={this.onClose.bind(this)}
        >
          签到成功，快去上课吧~
        </AtCurtain>
      </View>
    )
  }
}
