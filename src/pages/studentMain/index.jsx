import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList,AtListItem } from 'taro-ui'
import { AtCurtain } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Studentmain extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goToDetail () {
    Taro.navigateTo({
      url: '/pages/studentSignInClass/index'
    })
  }

  render () {
    const data = [
      {
        title:'数学课',
        time:'2021-02-21 12:00:00'
      },
      {
        title:'数学课',
        time:'2021-02-21 12:00:00'
      },
      {
        title:'数学课',
        time:'2021-02-21 12:00:00'
      },
      {
        title:'数学课',
        time:'2021-02-21 12:00:00'
      }
    ]
    return (
      <View className='studentMain'>
        <AtList>
          {(data.map(t=> <AtListItem onClick={this.goToDetail} title={t.title} note={'上课时间：'+t.time} arrow='right' />))}
        </AtList>
      </View>
    )
  }
}
