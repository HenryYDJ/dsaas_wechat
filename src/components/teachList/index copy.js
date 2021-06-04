import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain,AtCard,AtButton,AtModal} from "taro-ui"
import {TEACH_APPROVE_STATE,TEACH_APPROVE_STATE_TEXT} from '../../constant'
import {API_MAP} from '../../api'
import dayjs from 'dayjs';
import Taro from '@tarojs/taro'
export default class TeachList extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      teachList: [],
      isOpened: false
    }
  }



  componentWillMount () { }

  componentDidMount () { 
    const data = [
      {
        id:1,
        name:'张三',
        phone:123,
        time: '2021-05-04T17:24:41+08:00',
        state:2
      },
      {
        id:1,
        name:'李四',
        phone:123,
        time: '2021-05-04T17:24:41+08:00',
        state: 0
      },
      {
        id:1,
        name:'王麻子',
        phone:123,
        time: '2021-05-04T17:24:41+08:00',
        state:1
      }
    ]
    // TODO请求数据
    Taro.request({
      url: API_MAP.get_teach,
      method: 'post',
      success(res){
        console.log(res)
        this.formatData(res.data)
      },
      error(err){
        console.log(err)
      }
    })
    // FIXME
    this.formatData(data)
  }
  formatData(data){
    const teachList = data.sort((a,b)=>{
      return a.state - b.state
    }).map(t=>{
      return {
        ...t,
        time:dayjs(t.time).format('LLL')
      }
    })
    this.setState({
      teachList
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onLoad (options) {
    console.log(options.id)
  }

  doAction(type){
    this.setState({
      isOpened:true,
      actionType:type
    })
  }
  handleConfirm(){

  }


  render () {
    return (
      <View className='Teachlist'>
        {(this.state.teachList.map(t=> <AtCard
        note={t.time}
        extra={'手机号：'+t.phone}
        title={t.name}
      >
        <View className={'flex space-between ' + (t.state == TEACH_APPROVE_STATE.approve_wait?'wait':'')}>
          <View>审核状态：<Text className='state'>{TEACH_APPROVE_STATE_TEXT[t.state]}</Text></View>{t.state == TEACH_APPROVE_STATE.approve_wait ?
          <View className='flex button-group'>
            <AtButton type='secondary' size='small' onClick={()=>this.doAction(TEACH_APPROVE_STATE.approve_deny)}>拒绝</AtButton>
            <AtButton type='primary' size='small' onClick={()=>this.doAction(TEACH_APPROVE_STATE.approved)}>通过</AtButton>
          </View>
          :null
        }
        </View>
        {this.state.isOpened?<AtModal
            isOpened={this.state.isOpened}
            title='操作确认'
            cancelText='取消'
            confirmText='确认'
            onClose={ ()=> this.setState({isOpened:false})}
            onCancel={ ()=> this.setState({isOpened:false}) }
            onConfirm={ this.handleConfirm }
            content={
              this.state.actionType == TEACH_APPROVE_STATE.approved ?
              '通过审核后该老师将可以查询学生和创建课时，请确认。':
              '拒绝操作不可撤销，请确认。'
            }
          />:null}
      </AtCard>))}
      </View>
    )
  }
}
