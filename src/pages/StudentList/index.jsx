import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain } from "taro-ui"
import qrcode from '../../images/qrcode.jpg'

export default class Studentlist extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      studentQrcode: '',
      isOpened: false
    }
  }

  onClose () {
    this.setState({
      isOpened: false
    })
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

  showQrCode(e){
    console.log(e)
    this.setState({
      studentQrcode: qrcode,
      isOpened: true
    })
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
        {(data.map(t=> <AtListItem onClick={this.showQrCode.bind(this)}    
         extraText='查看学生码'
        title={t.name} note={'联系电话：1366666666'} arrow='right' />))}
        </AtList>
        <AtCurtain
        className='signInModal'
        isOpened={this.state.isOpened}
        onClose={this.onClose.bind(this)}
        >
          <Image src={this.state.studentQrcode} mode='aspectFit'/>
        </AtCurtain>
      </View>
    )
  }
}
