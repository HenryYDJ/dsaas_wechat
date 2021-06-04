import Nerv, { Component } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import { AtList, AtListItem, AtCurtain,AtCard,AtButton,AtModal} from "taro-ui"
import {ADMIN_APPROVE_STATE,ADMIN_APPROVE_STATE_TEXT} from '../../constant'
import {API_MAP} from '../../api'
import dayjs from 'dayjs';
import Taro from '@tarojs/taro'
class ParentList extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      list: [],
      isOpened: false
    }
  }

  render () {
    return (
      <View className='list'>
        {(this.state.list.map(t=> <AtCard
        note={t.time}
        extra={'手机号：'+t.phone}
        title={t.name}
      >
        <View className={'flex space-between ' + (t.state == ADMIN_APPROVE_STATE.approve_wait?'wait':'')}>
          <View>审核状态：<Text className='state'>{ADMIN_APPROVE_STATE_TEXT[t.state]}</Text></View>
          <View className='flex button-group'>
            {t.state == ADMIN_APPROVE_STATE.approve_wait ?
            <><AtButton type='secondary' size='small' onClick={()=>this.doAction(ADMIN_APPROVE_STATE.approve_deny,t.id)}>拒绝</AtButton>
            <AtButton type='primary' size='small' onClick={()=>this.doAction(ADMIN_APPROVE_STATE.approved,t.id)}>通过</AtButton>
            </>
          : <AtButton type='primary' size='small' onClick={()=>this.doAction(ADMIN_APPROVE_STATE.approve_deny,t.id)}>撤销</AtButton>
          }
          </View>
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
              this.state.actionType == ADMIN_APPROVE_STATE.approved ==1?
              '通过审核后该用户将可以管理老师、添加课程、查看课时，请确认。':
              ADMIN_APPROVE_STATE.approved ==2?
              '是否拒绝该用户的管理员申请？':
              '撤销该用户的管理员申请，撤销后不可更改，请确认。'
            }
          />:null}
      </AtCard>))}
      </View>
    )
  }
}

export default approveList(AdminList, {
  listUrl: ParentList.unvalidated_parents,
  approveUrl: ParentList.validate_parent,
  approveKey: 'admin_id'
})
