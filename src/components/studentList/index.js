import Nerv, { Component } from 'nervjs'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain,AtCheckbox,AtSearchBar, AtButton,AtCard } from "taro-ui"
import {debounce} from 'lodash'
import { GENDERS, MENU_BTN_INFO } from '../../constant'
import {API_MAP,getHeader} from '../../api'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
export default class Studentlist extends Component {

  constructor () {
    super(...arguments)
   
    this.state = {
      lastSelectId:null,
      checkedList:[],
      seachValue: '',
      list: [],
      filterList: []
    }
  }


  getList() {
    Taro.request({
      url: API_MAP.get_students,
      header: getHeader(),
      success:(res)=>{
        const now = dayjs(new Date())
        const data = res.data.message.map(t=>{
          return {
            ...t,
            name:t.real_name,
            gender: GENDERS.find(g=>g.value==+t.gender)['name'],
            age:now.diff(new Date(t.dob),'year'),
            todayLessions: [
              {
                name:'语文',
                start_time:'2021-05-04T17:24:41+08:00',duration:60
              },
              {
                name:'数学',
                start_time:'2021-05-04T17:24:41+08:00',duration:60
              }
            ]
          }
        })
        this.setState({
          list: data,
          filterList: data
        })
      },
      error(err){
        console.log(err)
      }
    })
  }

  componentWillMount () { 
   this.getList()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onLoad (options) {
    console.log(options.id)
  }

  handleChange(list){
    console.log(this.props)
    this.props.updateCheckList(list,this.state.list)
  }

  onSearchChange(value){
    this.setState({
      seachValue:value
    })
    this.seachAction()
  }
  
  
  seachAction = debounce(()=>{
   
    if(this.state.seachValue) {
      const reg = new RegExp(this.state.seachValue,'i')
      console.log(this.state.seachValue,this.state.list.filter(t=>{
        return reg.test(t.name) 
       }))
      this.setState({
        filterList:this.state.list.filter(t=>{
         return reg.test(t.name) 
        })
      })
    } else {
      this.setState({
        filterList:this.state.list
      })
    }
  },300)

  onActionClick(){
    this.seachAction()
  }

  componentWillReceiveProps(nextProps){

  }

  render () {
    console.log(this.state.filterList)
    return (
      <View className='StudentList'>
        {this.props.mode == 'list' ?<View style={{height:(MENU_BTN_INFO.top + MENU_BTN_INFO.height + 10) + 'px'}}></View>:null}
        
        <View className={this.props.mode == 'card' ? 'card-head':null}>
          <AtSearchBar
          className='searchBar'
          showActionButton
          value={this.state.seachValue}
          onChange={this.onSearchChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        {this.props.mode == 'card' ? <AtButton type='secondary' onClick={this.props.addStudent}>添加</AtButton>:null}
        </View>
        <View className={'scrollWrap ' + (this.props.mode == 'card'?' is-card':'')}>
          <ScrollView enhanced={true}  scrollY={true} className='scrollList' scrollIntoView={this.state.lastSelectId}>
          {this.props.mode == 'list' ?<AtCheckbox
          options={this.state.filterList.map(t=>{
            return {
              ...t,
              label:t.name+('('+t.gender+','+t.age+'岁)'),
              value:t.id
            }
          })}
          selectedList={this.props.checkedList}
          onChange={this.handleChange.bind(this)}
          />:this.state.filterList.map(t=>{
            return <AtCard
            title={t.name}
          >
            <View className='card-content'>
              {
              this.props.isParent?
                <View>今日课程：{t.todayLessions.length ? t.todayLessions.map(t=>t.name).join('，') : '无'}</View>
              :<>
              <View><Text>年龄：{t.age}岁 </Text>{' '}<Text>性别：{t.gender}</Text></View>
              </>
              }
              <AtButton onClick={()=>this.props.openDetail(t)}>查看详情</AtButton>
            </View>
          </AtCard>
          })}
        {/* {data.map(t=> <View className='item'>
          <View>{t.name}</View>
          <View></View>
        </View>)} */}
         {/* <AtList>
        {(data.map(t=> <AtListItem onClick={this.props.showQrCode}    
         extraText='查看学生码'
        title={t.name} note={'联系电话：1366666666'} arrow='right' />))}
        </AtList> */}
          </ScrollView>
          {this.props.mode == 'list' ? <View className='bottom'>已选择：{this.props.checkedList.length}名学生</View>:null}
        </View>
      </View>
    )
  }
}
Studentlist.defaultProps = {
  checkedList: [],
  mode: 'list', // list,card
  isParent: false
}
