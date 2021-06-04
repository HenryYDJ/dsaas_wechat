import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtTabBar,AtButton,AtList,AtListItem,AtFab,AtCard, AtIcon }  from 'taro-ui'
import Taro from '@tarojs/taro'
import NavBar from '../../components/navbar'
export default class NoAuth extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      color: 'red',
      alertType: 'alert-circle',
      tips:'',
      title:'温馨提示'
    }
  }
  componentWillMount () { 
    let tips = '哎呀系统开了个小差，过会儿再来吧~'
    if(this.props.userRoleInfo.validated == 0) {
      switch(this.props.userRoleInfo.roles){
        case 2:
          tips = '您的家长身份需要老师审核，请联系学校老师'
          break
        case 4:
          tips = '您的老师申请已提交，后台将在2-3个工作日内审核。'
          break
        case 8:
          tips = '您的管理员申请已提交，后台将在2-3个工作日内审核。'
          break
      }
      this.setState({
        alertType: 'clock',
        color: '#f7d46d',
        tips
      })
    } else {
      switch(this.props.userRoleInfo.roles){
        case 2:
          tips = '您的家长身份未被通过，请联系学校老师'
          break
        case 4:
          tips = '您的老师身份未被通过，请联系学校管理员'
          break
        case 8:
          tips = '您的管理员身份未被通过'
          break
      }
      this.setState({
        tips,
        title:'审核未通过'
      })
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-wrap flex-center'>
        <NavBar isShowNavLeft={false} title={this.state.title}></NavBar>
        <View style={{color:this.state.color}}>
          <AtIcon size='22' value={this.state.alertType}></AtIcon>
          {' '+this.state.tips}
        </View>
      </View>
    )
  }
}

NoAuth.defaultProps = {
  userRoleInfo: Object
}