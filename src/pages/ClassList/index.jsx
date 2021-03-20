import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtGrid } from 'taro-ui'
// const res = await Taro.request(params)

export default class Classlist extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goToDetail (item) {
    console.log(item)
    Taro.navigateTo({
      url: '/pages/classPage/index?id='+item.id
    })
  }

  render () {
    const classList = [
      {
        id:1,
        name:'数学一班'
      },
      {
        id:1,
        name:'数学一班'
      },
      {
        id:1,
        name:'数学二班'
      },
      {
        id:1,
        name:'数学三班'
      },
      {
        id:1,
        name:'美术一班'
      },
      {
        id:1,
        name:'美术二班'
      },
      {
        id:1,
        name:'美术三班'
      }
    ]
    return (
      <View className='ClassList'>
        <AtGrid mode='rect' data={classList.map(t=>{return {value:t.name,id:t.id} })} onClick={this.goToDetail.bind(this)}/>
      </View>
    )
  }
}
