import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain } from "taro-ui"

export default class Studentlist extends Component {

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
        name:'张三'
      },
      {
        id:1,
        name:'李三'
      },
      {
        id:1,
        name:'王五'
      }
    ]
    return (
      <View className='StudentList'>

        <AtList>
        {(data.map(t=> <AtListItem onClick={this.props.showQrCode}    
         extraText='查看学生码'
        title={t.name} note={'联系电话：1366666666'} arrow='right' />))}
        </AtList>
      </View>
    )
  }
}
