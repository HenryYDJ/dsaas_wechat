import Nerv, { Component } from 'nervjs'
import { View, Text, Picker, Button } from '@tarojs/components'
import './index.scss'
import { PARENT_REALTIONS } from '../../constant'
import { AtForm, AtInput, AtButton, AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro'
import NavBar from '../../components/navbar'
import { API_MAP, getHeader } from '../../api'
import { userReady} from '../../utils'
import {getGlobalData} from '../../constant'
export default class Bindparent extends Component {

  constructor() {
    super(...arguments)

    this.state = {
      studentInfo: '',
      parentName: '',
      phone: '',
      parentType: ''
    }
  }


  componentWillMount() { }

  async componentDidMount() {
    await userReady
    const userRoleInfo = getGlobalData('userRoleInfo')
    this.setState({
      isTeacher: userRoleInfo.roles == 2,
      parentName: userRoleInfo.real_name || ''
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onParentChange(e) {
    this.setState({
      parentType: PARENT_REALTIONS[e.detail.value].name
    })
  }

  onNameChange(val) {
    this.setState({
      parentName: val
    })
  }

  onPhoneChange(val) {
    this.setState({
      phone: val
    })
  }

  onLoad(options) {
    //TODO GET_STUDENT_INFO by id
    let isLoss = !options.time
    if(!isLoss){
      isLoss = ((new Date/1000) - options.time) > 60 * 60
    }
    console.log(options.time)
    if(isLoss){
      Taro.switchTab({
        url: '/pages/index/index'
      })
      return
    }
    this.setState({
      studentId: options.id,
      studentInfo: decodeURIComponent(options.name),
      teacherId:options.tid
    })
  }

  onSubmit(event) {
    Taro.request({
      url: API_MAP.bind_parent,
      method: 'post',
      data: {
        real_name: this.state.parentName,
        student_id: this.state.studentId,
        relation: this.state.parentType,
        phone: this.state.phone,
        teacher_id: this.state.teacherId
      },
      success(res) {
        console.log(res)
        Taro.showToast({
          title: '创建成功',
          icon: 'success'
        })
        Taro.switchTab({
          url: '/pages/index/index'
        })
      },
      error(err) {
        console.log(err)
      }
    })
  }
  onReset(event) {
    this.setState({
      name: '',
    })
  }

  render() {
    return (
      <View className='bindParent'>
        <View class='page-wrap'>
          <NavBar></NavBar>
          <View class='page-body'>
            <AtForm
              className='my-form'
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
            >
              <AtInput
                required
                name='name'
                title='宝贝信息'
                type='text'
                value={this.state.studentInfo}
                editable={false}
              />
              <AtInput
                required
                name='name'
                title='家长姓名：'
                type='text'
                placeholder='请填写'
                value={this.state.parentName}
                onChange={this.onNameChange.bind(this)}
              />
              <AtInput
                required
                name='phone'
                title='手机号：'
                type='text'
                placeholder='请填写'
                value={this.state.phone}
                onChange={this.onPhoneChange.bind(this)}
              />
              <Picker mode='selector' range={PARENT_REALTIONS} rangeKey='name' onChange={this.onParentChange.bind(this)}>
                <AtInput
                  required
                  name='class'
                  title='家长称呼：'
                  type='text'
                  placeholder='请选择'
                  editable={false}
                  value={this.state.parentType}
                />
              </Picker>
              <View className='submitBtn'>
                <Button size='mini' formType='submit' type='primary'>绑定</Button>
                <Button size='mini' onClick={Taro.navigateBack} type='default'>取消</Button>
              </View>
            </AtForm>
          </View>
        </View>
      </View>
    )
  }
}
