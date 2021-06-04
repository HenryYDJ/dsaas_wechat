import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTabBar,AtButton,AtList,AtListItem,AtFab,AtCard }  from 'taro-ui'
import Taro from '@tarojs/taro'
import TeachList from '../../components/teachList'
import NavBar from '../../components/navbar'
export default class Admintabs extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  goAddLessionPage(){
    Taro.navigateTo({
      url: '/pages/createLession/index'
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-wrap'>
        <NavBar></NavBar>
        <View className='page-body adminTabs'>
          {/* <AtFab className='right-tab' size='small' onClick={this.goAddLessionPage.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab> */}
        {/* <AtList>
          <AtListItem title='课程1'  note='上课老师：张三' arrow='right' />
          <AtListItem title='课程1'  note='上课老师：张三' arrow='right' />
          <AtListItem title='课程1'  note='上课老师：张三' arrow='right' />
        </AtList> */}
        <TeachList></TeachList>
        {/* <AtTabBar
        tabList={[
          { title: '管理课程', text:12 },
          { title: '管理老师', text: 8 }
        ]}
        fixed={true}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      /> */}
      </View>
      </View>
    )
  }
}
