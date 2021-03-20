import Nerv, { Component } from 'nervjs'
import { View, Text, Image} from '@tarojs/components'
import './index.scss'
import { AtTabs, AtTabsPane, AtButton, AtCurtain } from 'taro-ui'
import StudentList from '../../components/studentList'
import LessionList from '../../components/lessionList'
import qrcode from '../../images/qrcode.jpg'

export default class Classpage extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      studentQrcode: '',
      isOpened: false
    }
  }

  onClose () {
    this.setState({
      isOpened: false
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }


  showQrCode(e){
    console.log(e)
    this.setState({
      studentQrcode: qrcode,
      isOpened: true
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const tabList = [{ title: '课程' }, { title: '学生' }]
    return (
      <View class='page-container'>
        <AtTabs className='top-tabs' current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}  >
            <LessionList className='content' showQrCode={this.showQrCode.bind(this)}></LessionList>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}  >
            <StudentList className='content' showQrCode={this.showQrCode.bind(this)}></StudentList>
          </AtTabsPane>
        </AtTabs>
        <View className='bottom-op' >
          <AtButton type='secondnary'>添加学生</AtButton>
        </View>

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
