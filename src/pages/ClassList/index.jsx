import Nerv, { Component } from 'nervjs'
import { View, Text,Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtGrid,AtCalendar,AtLoadMore,AtList,AtListItem,AtButton,
  AtModal,AtModalContent,AtModalHeader,AtModalAction,AtIcon,AtCheckbox,AtDrawer } from 'taro-ui'
import dayjs from 'dayjs';
import NavBar from '../../components/navbar'
import {API_MAP} from '../../api'
import Studentlist from '../../components/studentList'
// const res = await Taro.request(params)

function formatData(data,day){
  return data.map(t=>{
      return {
        ...t,
        time: dayjs(t.start_time).format('A HH:mm') + ' 至 ' 
        + dayjs(t.start_time).add(t.duration,'hour').format('A HH:mm')
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
    marks={ [ 
      { value: dayjs().format('YYYY/MM/DD') },
      { value: dayjs().add(-1,'days').format('YYYY/MM/DD') } ] } />
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
                <AtCheckbox
                options={this.props.detail.checkboxOption}
                selectedList={this.props.detail.checkedList}
                onChange={this.props.handleCheck}
              />
            </AtModalContent>
            <AtModalAction><Button onClick={this.openConfirm.bind(this)}>点名确认</Button> </AtModalAction>
          </AtModal>:null}
          {this.state.isOpened?<AtModal
            isOpened={this.state.isOpened}
            title='操作确认'
            cancelText='取消'
            confirmText='确认'
            onClose={ ()=> this.setState({isOpened:false})}
            onCancel={ ()=> this.setState({isOpened:false}) }
            onConfirm={ this.props.handleConfirm }
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
    const data = [
    {id:1,name:'数学课',start_time:'2021-05-04T17:24:41+08:00',duration:60},
    {id:1,name:'语文课',start_time:'2021-05-03T13:12:41+08:00',duration:120}
  ]
    const list = formatData(data)
    const today = dayjs()
    this.state = {
      status: 'loading',
      hasData: false,
      classList: list,
      currentDayList: formatData(data,today.format('YYYY-MM-DD')),
      selectDate: +today,
      currentMonth: today.format('YYYY-MM'),
      currentDate: +today,
      changeCanlendar:false,
      lessionDetail: null,
      modalOpened: false,
      showAddStudent: false
    }
  }


  componentWillMount () { }

  componentDidMount () { 
    this.onMonthChange(dayjs().format('YYYY-MM-DD'))
  }

  componentWillUnmount () { }

  componentDidShow () { }

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

  onMonthChange(month) {
    this.setState({
      hasData:false,
      status:'loading',
      selectDate: this.state.currentMonth == dayjs(month,'YYYY-MM-DD').format('YYYY-MM') ?
      this.state.currentDate : +dayjs(month,'YYYY-MM-DD'),
      changeCanlendar:!this.state.changeCanlendar
    })
    //FIXME move to success
    setTimeout(()=>{
      this.setState({
        hasData:true,
        status:'loading' //noMore
      })
    },2000)
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

  openRollModal(detail) {
    console.log(detail)
    // TODO 请求课时学生名单
    const lessionDetail = {
      title: detail.name,
      checkboxOption: [{
        value: 'list1',
        label: '张三',
        },{
          value: 'list2',
          label: '李四'
        },{
          value: 'list3',
          label: '王五',
        },{
          value: 'list4',
          label: '皇后'
      }],
      checkedList: ['list1','list3']
    }
    this.setState({
      lessionDetail,
      modalOpened: true
    })
  }

  handleRollModalCheck(e){
    this.setState({
      lessionDetail:{...this.state.lessionDetail,checkedList:e}
    })
  }

  // 点名提交
  handleConfirmRoll(){

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

  render () {
    console.log(this.state)
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
           ></ClassCalendar>
        </View>
        {this.state.hasData?
          <AtList>
            {(this.state.currentDayList.map(t=> <AtListItem onClick={this.openRollModal.bind(this,t)} 
            title={t.name} 
            note={'上课时间：'+t.time} 
            extraText='点名'
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
          <Studentlist></Studentlist>
        </AtDrawer>:null}
      </View>
    )
  }
}
