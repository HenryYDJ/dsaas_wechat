import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain } from "taro-ui"

export default class Lessionlist extends Component {

  constructor () {
    super(...arguments)
    this.state = {
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



  render () {
    const data = [
      {
        id:1,
        name:'方程课'
      },
      {
        id:1,
        name:'几何课'
      },
      {
        id:1,
        name:'习题课'
      }
    ]
    return (
      <View className='Lessionlist'>
        <AtList>
        {(data.map(t=> <AtListItem 
         note={'上课时间："2021-03-21 12:00:00"'}
        title={t.name} arrow='right' />))}
        </AtList>
      </View>
    )
  }
}
