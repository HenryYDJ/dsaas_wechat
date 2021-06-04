import Nerv, { Component } from 'nervjs'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtCurtain, AtCard, AtButton, AtModal } from "taro-ui"
import { TEACH_APPROVE_STATE, TEACH_APPROVE_STATE_TEXT } from '../../constant'
import { API_MAP } from '../../api'
import dayjs from 'dayjs';
import Taro from '@tarojs/taro'
import { approveList } from '../approveList'

// const MyList =  approveList(TeachList,{
//   url: API_MAP.get_teach
// })

class TeachList extends Component {
  constructor() {
    super(...arguments)
  }


  render() {
    return   <View className='list approve-list'>
    {(this.state.list.map(t=> <AtCard
    note={t.time}
    extra={'手机号：'+t.phone}
    title={'申请人：'+t.real_name}
  >
    <View className={'flex space-between ' + (t.state == TEACH_APPROVE_STATE.approve_wait?'wait':'')}>
      <View>审核状态：<Text className='state'>{TEACH_APPROVE_STATE_TEXT[t.state]}</Text></View>{t.state == TEACH_APPROVE_STATE.approve_wait ?
      <View className='flex button-group'>
        <AtButton type='secondary' size='small' onClick={()=>this.doAction(TEACH_APPROVE_STATE.approve_deny,t.user_id)}>拒绝</AtButton>
        <AtButton type='primary' size='small' onClick={()=>this.doAction(TEACH_APPROVE_STATE.approved,t.user_id)}>通过</AtButton>
      </View>
      :null
    }
    </View>
    {this.state.isOpened?<AtModal
        isOpened={this.state.isOpened}
        title='操作确认'
        cancelText='取消'
        confirmText='确认'
        onClose={ this.closeModal.bind(this)}
        onCancel={ this.closeModal.bind(this) }
        onConfirm={ this.handleConfirm.bind(this) }
        content={
          this.state.actionType == TEACH_APPROVE_STATE.approved ?
          '通过审核后该老师将可以查询学生和创建课时，请确认。':
          '拒绝操作不可撤销，请确认。'
        }
      />:null}
  </AtCard>))}
  </View>
  }
}

export default approveList(TeachList, {
  listUrl: API_MAP.get_teachers,
  approveUrl: API_MAP.approve_teacher,
  approveKey: 'teacher_id'
})
