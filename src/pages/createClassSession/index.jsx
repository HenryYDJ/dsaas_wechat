import Nerv, { Component } from 'nervjs'
import { View, Text,Picker,Button } from '@tarojs/components'
import './index.scss'
import { AtForm,AtInput,AtButton,AtList,AtListItem,AtCheckbox,AtSwitch,AtDrawer,AtTextarea } from "taro-ui"
import Taro from '@tarojs/taro'
import NavBar from '../../components/navbar'
import './index.scss'
import dayjs from 'dayjs'
import {API_MAP,getHeader} from '../../api'
import {getAllCourses,checkFormRules} from '../../utils'
import Studentlist from '../../components/studentList'
import {isEmpty,each,isNumber,isFunction} from 'lodash'

export default class Createclasssession extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      checkboxOption:[{
        value:1,
        label:'一'
      },{
        value:2,
        label:'二'
      },{
        value:3,
        label:'三'
      },{
        value:4,
        label:'四'
      },{
        value:5,
        label:'五'
      },{
        value:6,
        label:'六'
      },{
        value:0,
        label:'日'
      },
      ],
      checkedList: [],
      repeatEndDate: '',
      startDate:'',
      startTime: '',
      endTime: '',
      hasRepeat: false,
      classList: [
      ],
      class:'',
      info: '',
      showAdd: false,
      studentList: []
    }
  }


  onSubmit (event) {
  //   {
  //     "course_id":1,
  //     "start_time": "2021-03-31T2:30:0+08:00",
  //     "duration": 60,
  //     "info": "test class session",
  //     "repeat_weekly": 1,
  //     "end_time": "2022-03-30T3:30:0+08:00",
  //     "repeat_wkdays": [0, 1, 2, 3, 4, 5, 6],
  //     "student_ids": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  // }
    const checkRules = {
      classId:'课程不能为空',
      startTime:()=>{
        if(!this.state.startTime){
          return '开始时间不能为空'
        }
        if(this.state.startTime>this.state.endTime){
          return '开始时间不能大于结束时间'
        }
        return false
      },
      endTime:'结束时间不能为空',
      startDate:'开始日期不能为空',
    }
    let repeat_info = {}
    if(this.state.hasRepeat) {
      repeat_info = {
        repeat_weekly: this.state.hasRepeat ? 1 : 0,
        repeat_wkdays: this.state.checkedList,
        end_time: dayjs(this.state.repeatEndDate,'YYYY-MM-DD').endOf('day').format()
      }
      checkRules['checkedList'] = '每周重复至少选中一天'
      checkRules['repeatEndDate'] = '重复模式下结束日期不可为空'
      checkRules['startDate'] = ()=>{
        if(!this.state.startDate){
          return '开始日期不能为空'
        }
        if(this.state.startDate>this.state.repeatEndDate){
          return '开始日期不能大于结束日期'
        }
        if(dayjs(this.state.repeatEndDate,'YYYY-MM-DD').diff(dayjs(this.state.startDate,'YYYY-MM-DD'),'weeks') >= 52 ){
          return '周期跨度不能大于一年'
        }
        return false
      }
    }
    const errors = checkFormRules(checkRules,this.state)
    if (errors.length){
      Taro.showToast({
        icon:'none',
        title: errors[0].err
      })
      return 
    }
    if (this.state.studentList.length == 0) {
      Taro.showModal({
        title: '提示',
        content: '您未选择上课学生，是否继续提交？',
        success:res => {
          if (res.confirm) {
            this.submit(repeat_info)
          } else if (res.cancel) {
          }
        }
      })
    } else {
      this.submit(repeat_info)
    }
  }

  submit(repeat_info) {
    Taro.request({
      url: API_MAP.create_class_session,
      method: 'post',
      header: getHeader(),
      data: {
        course_id: this.state.classId,
        start_time: dayjs(this.state.startDate+' '+this.state.startTime,'YYYY-MM-DD HH:mm').format(),
        duration: dayjs(this.state.startDate+' '+this.state.endTime,'YYYY-MM-DD HH:mm')
        .diff(dayjs(this.state.startDate+' '+this.state.startTime,'YYYY-MM-DD HH:mm'),'minute'),
        info: this.state.name,
        end_time: dayjs(this.state.startDate+' '+this.state.endTime,'YYYY-MM-DD HH:mm').format(),
        ...repeat_info,
        student_ids: this.state.studentList
        // student_ids
      },
      success(res){
        if (res.statusCode == 201) {
          Taro.showToast({
            title:'创建成功',
            icon: 'success'
          })
          Taro.navigateBack()
        } else {
          Taro.showToast({
            title:'创建失败',
            icon: 'error'
          })
        }
      },
      error(err){
        console.log(err)
      }
    })
  }

  onReset (event) {
    this.setState({
      name: '',
    })
  }

  async componentWillMount () {
    const courses = await getAllCourses()
    this.setState({
      classList: courses
    })
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleDayCheckChange(value) {
    console.log(value)
    this.setState({
      checkedList:value
    })
  }

  handleRepeatChange(v) {
    console.log(v)
    this.setState({
      hasRepeat:v
    })
  } 

  onStartTimeChange({detail}) {
    this.setState({
      startTime: detail.value
    })
  }

  onEndTimeChange({detail}) {
    this.setState({
      endTime: detail.value
    })
  }

  onStartDateChange({detail}) {
    this.setState({
      startDate: detail.value
    })
  }

  onRepeatEndDateChange({detail}) {
    this.setState({
      repeatEndDate: detail.value
    })
  }

  onClassChange({detail}) {
    console.log(this.state.classList[detail.value])
    this.setState({
      class: this.state.classList[detail.value].name,
      classId: this.state.classList[detail.value].id
    })
  }

  onChangeInfo(info){
    this.setState({
      info
    })
  }

  updateCheckList(checked,list) {
    this.setState({
      studentList:checked
    })
  }

  render () {
    return (
      <View className='createClassSession page-wrap'>
        <NavBar></NavBar>
        <View className='page-body'>
        <AtForm
          className='my-form'
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
            <View>
              <Picker mode='selector' range={this.state.classList} rangeKey='name' onChange={this.onClassChange.bind(this)}>
              <AtInput
                required
                name='class'
                title='课程：'
                type='text'
                placeholder='请选择'
                editable={false}
                value={this.state.class}
              />
              </Picker>
              <Picker mode='time' onChange={this.onStartTimeChange.bind(this)}>
                <AtInput
                required
                title='开始时间：'
                type='text'
                placeholder='请选择'
                editable={false}
                value={this.state.startTime}
                />
              </Picker>
              <Picker mode='time' onChange={this.onEndTimeChange.bind(this)}>
                <AtInput
                required
                title='结束时间：'
                type='text'
                placeholder='请选择'
                editable={false}
                value={this.state.endTime}
                />
              </Picker>
            </View>
            <Picker mode='date' onChange={this.onStartDateChange.bind(this)}>
              <AtInput
                  required
                  title='开始日期：'
                  type='text'
                  placeholder='请选择'
                  editable={false}
                  value={this.state.startDate}
              />
            </Picker>
            <AtSwitch title='是否每周重复：' checked={this.state.hasRepeat} onChange={this.handleRepeatChange.bind(this)} />
            { this.state.hasRepeat ? <><View className='at-input'>
              <View className='at-input__title'>每周重复：</View>
              <View className='week-checkbox-wrap'>
                <AtCheckbox
                options={this.state.checkboxOption}
                selectedList={this.state.checkedList}
                onChange={this.handleDayCheckChange.bind(this)}
              />
              </View>
            </View>
             <Picker mode='date' onChange={this.onRepeatEndDateChange.bind(this)}>
              <AtInput
                  required
                  title='重复至：'
                  type='text'
                  placeholder='请选择'
                  editable={false}
                  value={this.state.repeatEndDate}
              />
            </Picker></>:null}
            
            <AtInput
                  title='上课学生：'
                  type='text'
                  placeholder='请选择'
                  editable={false}
                  onClick={()=>{this.setState({showAdd:true})}}
                  value={this.state.studentList.length?'已选择'+this.state.studentList.length+'位':''}
              />
            <AtTextarea
              value={this.state.info}
              onChange={this.onChangeInfo.bind(this)}
              maxLength={200}
              title='备注：'
              placeholder='请填写课时说明'
            />
          <View className='submitBtn'>
            <Button size='mini' formType='submit' type='primary'>提交</Button>
            <Button size='mini' onClick={Taro.navigateBack} type='default'>取消</Button>
          </View>
         </AtForm>
        </View>
      {
        this.state.showAdd?
        <AtDrawer
          className='addStudentDrawer'
          show={this.state.showAdd}
          width='75%'
          right={true}
          onClose={()=>this.setState({showAdd:false})}
          mask
        >
          <Studentlist checkedList={this.state.studentList} updateCheckList={this.updateCheckList.bind(this)}></Studentlist>
        </AtDrawer>:null
      }
      </View>
    )
  }
}
