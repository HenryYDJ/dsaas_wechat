import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Home extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        <Text>Home
          !</Text>
      </View>
    )
  }
}
