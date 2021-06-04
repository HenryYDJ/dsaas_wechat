import Nerv, { Component } from 'nervjs'
import { View, Text,Button,ScrollView } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtGrid,AtCalendar,AtLoadMore,AtList,AtListItem,AtButton,AtActionSheet,AtActionSheetItem,
  AtModal,AtModalContent,AtModalHeader,AtModalAction,AtIcon,AtCheckbox,AtDrawer,AtFab } from 'taro-ui'
import dayjs from 'dayjs';
import Studentlist from '../../components/studentList'
import NavBar from '../../components/navbar'
import {API_MAP,getHeader} from '../../api'
import { getClassList, getSessionStudents} from '../../utils'
import { getGlobalData} from '../../constant'
// const res = await Taro.request(params)

function formatData(data,day){
  return data.map(t=>{
      return {
        ...t,
        time: dayjs(t.start_time).format('A HH:mm') + ' 至 ' 
        + dayjs(t.start_time).add(t.duration,'minutes').format('A HH:mm')
      }
  }).filter(t=>{
    return day ? dayjs(t.start_time).format('YYYY-MM-DD') == day : true
  })
}

class ClassCalendar extends Component {
  render() {
    const calendar = <AtCalendar 
    key = {this.props.selectDate+this.props.changeCanlendar}
    currentDate = {this.props.selectDate}
    onSelectDate={this.props.onSelectDate}
    onDayClick={this.props.onDayClick}
    onMonthChange={this.props.onMonthChange}
    marks={ this.props.hasDataDateList} />
    return  calendar
  }
}

class RollModal extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      isOpened: false
    }
  }
  openConfirm(){
    console.log('confirm')
    this.props.handleClose()
    this.setState({
      isOpened:true
    })
  }
  render() {
    console.log(this.state.isOpened)
    return <View>
            {this.props.modalOpened?<AtModal isOpened={this.props.modalOpened} onClose={this.props.handleClose}>
            <AtModalHeader>{this.props.detail.title}</AtModalHeader>
            <AtModalContent>
              <View className='modal-title'>已报名<AtIcon onClick={this.props.openStudentPage} className='icon-add' value='add' size='20' color='#F00'></AtIcon></View>
              <ScrollView className='modal-scroll-list' enhanced={true}  scrollY={true} style={{height:'200px'}}>
                <AtCheckbox
                options={this.props.detail.checkboxOption}
                selectedList={this.props.detail.checkedList}
                onChange={this.props.handleCheck}
              />
              </ScrollView>
            </AtModalContent>
            <AtModalAction><Button onClick={this.openConfirm.bind(this)}>点名确认({this.props.detail.checkedList.length}名)</Button> </AtModalAction>
          </AtModal>:null}
          {this.state.isOpened?<AtModal
            isOpened={this.state.isOpened}
            title='操作确认'
            cancelText='取消'
            confirmText='确认'
            onClose={ ()=> this.setState({isOpened:false})}
            onCancel={ ()=> this.setState({isOpened:false}) }
            onConfirm={ ()=> {this.setState({isOpened:false});this.props.handleConfirm()} }
            content='确认点名后将扣除对应学生的课时，且不可再次点名，请确认已正确添加全部上课的学生。'
          />:null}
        </View>
  }
}

RollModal.defaultProps = {
  detail: {
    title: '',
    checkboxOption: [],
    checkedList: []
  }
}

export default class Classlist extends Component {
  constructor(){
    super(...arguments)
    // const list = formatData(data)
    const today = dayjs()
    this.state = {
      status: 'loading',
      hasData: false,
      classList: [],
      currentDayList: [],//formatData(data,today.format('YYYY-MM-DD')),
      selectDate: +today,
      currentMonth: today.format('YYYY-MM'),
      selectMonth: today.format('YYYY-MM-DD'),
      currentDate: +today,
      changeCanlendar:false,
      lessionDetail: null,
      modalOpened: false,
      showAddStudent: false,
      hasDataDateList:[],
      checkedList: [],
      isOpenAction: false,
      classDetail: null
    }
  }


  componentWillMount () { }

  componentDidMount () { 
    // this.onMonthChange(dayjs().format('YYYY-MM-DD'))
  }
  componentDidShow(){
    this.onMonthChange(this.selectMonth)
  }

  componentWillUnmount () { }


  componentDidHide () { }

  goToDetail (item) {
    console.log(item)
    Taro.navigateTo({
      url: '/pages/classPage/index?id='+item.id
    })
  }

  onDayClick({value}) {
    const data = formatData(this.state.classList,value)
    if (data.length) {
      this.setState({
        hasData: true,
        currentDayList: data,
        selectDate: +dayjs(value,'YYYY-MM-DD'),
        changeCanlendar:!this.state.changeCanlendar
      })
    } else {
      this.setState({
        hasData: false,
        status: 'noMore',
        selectDate: +dayjs(value,'YYYY-MM-DD'),
        changeCanlendar:!this.state.changeCanlendar
      })
    }
  }

  async onMonthChange(month) {
    try{
      this.setState({
        hasData:false,
        status:'loading'
      })
      const monthDate = dayjs(month,'YYYY-MM-DD')
      const userRoleInfo = getGlobalData('userRoleInfo')
      const classList = await getClassList({start_time:monthDate.startOf('month').format(),end_time:monthDate.endOf('month').format()},userRoleInfo.roles == 4)
      this.setState({
        classList
      })
      console.log(classList)
      const monthFormat = dayjs(month,'YYYY-MM-DD').format('YYYY-MM')
      const data = formatData(classList,
        this.state.currentMonth == monthFormat ? dayjs().format('YYYY-MM-DD') : month)
      console.log(this.state.classList
        .filter(t=>monthFormat == dayjs(t.start_time).format('YYYY-MM'))
        .map(t=>dayjs(t.start_time).format('YYYY/MM/DD')))
      this.setState({
        selectDate: this.state.currentMonth == monthFormat ?
        this.state.currentDate : +dayjs(month,'YYYY-MM-DD'),
        changeCanlendar:!this.state.changeCanlendar,
        currentDayList: data,
        hasDataDateList: classList
        .filter(t=>monthFormat == dayjs(t.start_time).format('YYYY-MM'))
        .map(t=>{return {
          value:dayjs(t.start_time).format('YYYY/MM/DD')}
        })
      })
      this.setState({
        hasData:data.length,
        status:data.length?'loading' :'noMore'//noMore
      })
    }catch(e){
      console.log(e)
    }
    //FIXME move to success
    
    // Taro.request({
    //   url: API_MAP.get,
    //   method: 'post',
    //   data: {
    //     realName: this.state.name,
    //     phone: this.state.phone
    //   },
    //   success(res){
    //     console.log(res)
    //     // Taro.navigateBack()
    //   },
    //   error(err){
    //     console.log(err)
    //   }
    // })
  }

  onSelectDate(info){
    console.log(info)
  }

  openAction(detail) {
    this.setState({
      isOpenAction: true,
      classDetail: detail
    })
  }

  async openRollModal() {
    const detail = this.state.classDetail
    this.setState({
      isOpenAction: false
    })
    // TODO 请求课时学生名单
    const students = await getSessionStudents(detail.session_id)
    const list = students.map(t=>t.value)
    const lessionDetail = {
      title: detail.name,
      checkboxOption: students,
      checkedList: list
    }
    this.setState({
      lessionDetail,
      modalOpened: true,
      orignChecked: list,
      checkedList: list
    })
  }

  handleRollModalCheck(e){
    this.setState({
      lessionDetail:{...this.state.lessionDetail,checkedList:e},
      checkedList: e
    })
  }

  // 点名提交
  handleConfirmRoll(){
    const studentsFromDetail = this.state.orignChecked
    const studentsFromCheck = this.state.lessionDetail.checkedList
    const students = [...new Set([...studentsFromDetail,...studentsFromCheck])].map(t=>{
      return {
        attended: studentsFromCheck.indexOf(t) != -1,
        student_id: t
      }
    })
      Taro.request({
        url: API_MAP.attendance_call,
        header: getHeader(),
        method: 'post',
        data: {
          session_id: this.state.classDetail.session_id,
          student_ids: students
        },
        success:(res)=>{
          Taro.showToast({
            title:'点名成功',
            icon: 'success'
          })
          this.onMonthChange(this.selectMonth)
        },
        error(err){
          console.log(err)
        }
    })

  }

  handleRollClose() {
    this.setState({
      modalOpened: false
    })
  }

  openStudentPage() {
    this.setState({
      showAddStudent:true
    })
  }

  createClassSession() {
    Taro.navigateTo({
      url: '/pages/createClassSession/index'
    })
  }
  modifyClassSession(){
    Taro.showToast({
      title:'修改课时功能还未上线，敬请期待~',
      icon: 'none'
    })
  }

  updateCheckList(checked,list) {
    this.setState({
      checkedList:checked,
      lessionDetail: {...this.state.lessionDetail,
        checkboxOption: list.filter(t=> checked.indexOf(t.id) > -1)
        .map(t=> {
          return {
            ...t,
            label:t.name,
            value:t.id
          }
        }),
        checkedList:checked
      }
    })
  }

  render () {
    return (
      <View className='ClassList'>
        <NavBar></NavBar>
        <View className='calendar-view'>
          <ClassCalendar 
           selectDate = {this.state.selectDate}
           onSelectDate={this.onSelectDate.bind(this)}
           onDayClick={this.onDayClick.bind(this)}
           onMonthChange={this.onMonthChange.bind(this)}
           changeCanlendar={this.state.changeCanlendar}
           hasDataDateList={this.state.hasDataDateList}
           ></ClassCalendar>
        </View>
        {this.state.hasData?
          <AtList>
            {(this.state.currentDayList.map(t=> <AtListItem
            onClick={this.openAction.bind(this,t)}
            title={t.name} 
            note={'上课时间：'+t.time} 
            extraText='操作'
            arrow='right' />))}
          </AtList>
          :<AtLoadMore
          noMoreText='没有数据'
          moreText=''
          status={this.state.status}
        />}
        {this.state.lessionDetail?
        <RollModal detail={this.state.lessionDetail} openStudentPage={this.openStudentPage.bind(this)} handleConfirm={this.handleConfirmRoll.bind(this)} handleClose={this.handleRollClose.bind(this)} handleCheck={this.handleRollModalCheck.bind(this)} modalOpened={this.state.modalOpened}></RollModal>
        :null}
        {this.state.showAddStudent?<AtDrawer
          className='addStudentDrawer'
          show={this.state.showAddStudent}
          width='75%'
          right={true}
          onClose={()=>this.setState({showAddStudent:false})}
          mask
        >
          <Studentlist checkedList={this.state.checkedList} updateCheckList={this.updateCheckList.bind(this)}></Studentlist>
        </AtDrawer>:null}
        <AtFab className='right-tab' size='small' onClick={this.createClassSession.bind(this)}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
          {this.state.isOpenAction?<AtActionSheet isOpened={this.state.isOpenAction} cancelText='取消' onClose={()=>this.setState({isOpenAction:false})} title='课时操作'>
            {this.state.classDetail.attendance_call==false?
            <><AtActionSheetItem onClick={this.openRollModal.bind(this)}>
              点名
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.modifyClassSession.bind(this)}>
               修改课时
             </AtActionSheetItem>
             </>
             :null}
          </AtActionSheet>:null}
      </View>
    )
  }
}
