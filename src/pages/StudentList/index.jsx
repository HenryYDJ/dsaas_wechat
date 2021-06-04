import Nerv, { Component } from 'nervjs'
import { View, Text,Image,Picker,Button } from '@tarojs/components'
import './index.scss'
import { AtTag,AtList, AtListItem, AtCurtain,AtModal,AtModalHeader,AtModalContent,AtForm,AtInput,AtCheckbox, AtButton } from "taro-ui"
import qrcode from '../../images/qrcode.jpg'
import StudentlistComp from '../../components/studentList'
import NavBar from '../../components/navbar'
import { GENDERS,getGlobalData } from '../../constant'
import {API_MAP,getHeader} from '../../api'
import {checkFormRules,userReady,getStudentParents,getStudentCredits,getStudentSessions} from '../../utils'
import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
export default class Studentlist extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      studentQrcode: '',
      isOpened: false,
      parents: [
      ],
      lessions: [
      ],
      isAddOpened: false,
      birthDate: '',
      gender: '',
      name: '',
      checkedList:[],
      isParent: false,
      todayLessions: [],
      studentInfo: {},
      isShare: false
    }
  }

  onClose () {
    this.setState({
      isOpened: false
    })
  }
  listRefLink = (node)=>{
    console.log(this.listRefLink)
    this.listRef = node 
  }
  componentWillMount () { }

  async componentDidMount () { 
    await userReady
    const userRoleInfo = getGlobalData('userRoleInfo')
    this.setState({
      isParent: userRoleInfo.roles == 2
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onLoad (options) {
    console.log(options.id)
  }

  showQrCode(e){
    console.log(e)
    this.setState({
      studentQrcode: qrcode,
      isOpened: true,
      isShare:true
    })
  }
  async openDetail(t){
    const userRoleInfo = getGlobalData('userRoleInfo')
    //TODO 请求学生详情数据
    this.setState({
      studentInfo: t
    })
    let todayLessions = []
    this.setState({
      isOpened: true,
      isShare: true,
    })
    if (userRoleInfo.roles == 2) {
      const sessions = await getStudentSessions({student_id:t.id,
        start_time:dayjs().startOf('month').format(),end_time:dayjs().endOf('month').format()})
        
      sessions.forEach(p=>{
        p.time = dayjs(p.start_time).format('HH:mm') + ' 至 ' 
        + dayjs(p.start_time).add(p.duration,'minutes').format('HH:mm')
        todayLessions.push(p)
      })
      this.setState({
        todayLessions
      })
    }
    if (userRoleInfo.roles > 2) {
      const parents = await getStudentParents(t.id)
      this.setState({
        parents
      })
    }
    const credits = await getStudentCredits(t.id)
    this.setState({
      lessions:credits
    })
  }

  addStudent(){
    this.setState({
      isAddOpened: true
    })
  }

  onSubmit (event) {
    const checkRules = {
      name:'姓名不能为空',
      gender:'性别不能为空',
      birthDate:'生日不能为空',
    }
    const errors = checkFormRules(checkRules,this.state)
    if (errors.length){
      Taro.showToast({
        icon:'none',
        title: errors[0].err
      })
      return 
    }
    Taro.request({
      url: API_MAP.add_student,
      header: getHeader(),
      method: 'post',
      data: {
        real_name: this.state.name,
        gender: this.state.gender,
        dob: dayjs(this.state.birthDate).format('YYYY-MM-DDTHH:MM:ss')
      },
      success:(res)=>{
        console.log(res)
        Taro.showToast({
          title:'添加成功',
          icon: 'success'
        })
        this.setState({
          name:'',
          birthDate: '',
          gender: '',
          checkedList: []
        })
        this.listRef.getList()
        // Taro.navigateBack()
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

  onGenderChange(detail) {
    if(detail) {
      this.setState({
        gender: detail[detail.length-1],
        checkedList: [detail[detail.length-1]]
      })
    }
  }

  onBirthDateChange({detail}) {
    this.setState({
      birthDate: detail.value
    })
  }

  onNameChange(val) {
    this.setState({
      name: val
    })
  }
  setShare(isShare){
    this.setState(
      {
        isShare
      }
    )
  }
  onShareAppMessage (res) {
    console.log('what ?',this.state)
    // 来自页面内转发按钮
    if(this.state.isShare) {
      const userRoleInfo = getGlobalData('userRoleInfo')

      console.log({
        path: '/pages/bindParent/index?id='+
        this.state.studentInfo.id+
        '&name='+encodeURIComponent(this.state.studentInfo.name)+
        '&time='+parseInt(+new Date/1000)+'&tid='+userRoleInfo.id
      })
      return {
        path: '/pages/bindParent/index?id='+
        this.state.studentInfo.id+
        '&name='+encodeURIComponent(this.state.studentInfo.name)+
        '&time='+parseInt(+new Date/1000)+'&tid='+userRoleInfo.id
      }
    } else {
      return {
        path: '/pages/home/index'
      }
    }
  }
  render () {
    return (
      <View className='StudentList'>
        <NavBar></NavBar>
        {/* <AtList>
        {(data.map(t=> <AtListItem onClick={this.showQrCode.bind(this)}    
         extraText='查看学生码'
        title={t.name} note={'联系电话：1366666666'} arrow='right' />))}
        </AtList> */}
        <StudentlistComp mode='card' ref={this.listRefLink} isParent={this.state.isParent} openDetail={this.openDetail.bind(this)} addStudent={this.addStudent.bind(this)}></StudentlistComp>
        {this.state.isOpened?<AtModal isOpened={this.state.isOpened} onClose={()=>{this.setShare(false);this.setState({isOpened:false})}}>
            <AtModalHeader>学生详情</AtModalHeader>
            <AtModalContent >
              <View className='extratext-list'>
              {
                !this.state.isParent?
                <>
                <View className='part'>
                <View className='at-article__h2'>家长绑定</View>
                  <Button open-type="share"  type='primary'>邀请家长绑定</Button>
                  {/* <Image className='qrcode' src={this.state.studentQrcode} mode='aspectFit'/> */}
                </View>
                <View className='part'>
                  <View className='at-article__h2'>已绑定家长</View>
                  <AtList>
                    {this.state.parents.length ? this.state.parents.map(t=> 
                    <AtTag 
                    type='primary' 
                    circle 
                  >{t.relation}</AtTag>):
                    <View className='red-tip'>无绑定家长</View>
                  }
                  </AtList>
                </View>
                </>
                :
                <>
                <View className='part'>
                  <View className='at-article__h2'>学生今日课时</View>
                  <AtList>
                    {this.state.todayLessions.length ? this.state.todayLessions.map(t=> 
                    <AtListItem title={t.name} extraText={t.time}  />):
                    <View class='normal-tip'>无</View>}
                  </AtList>
                </View>
                </>
              }
              <View className='part'>
                <View className='at-article__h2'>课时记录</View>
                <AtList>
                {/* <AtListItem title={t.name} extraText={'已消耗：'+t.used+' 剩余：'+t.left} /> */}
                  {this.state.lessions.length ? this.state.lessions.map(t=> 
                  <AtListItem title={t.name} extraText={'剩余：'+t.left} />):
                  '无课时'}
                </AtList>
              </View>
              </View>
            </AtModalContent>
          </AtModal>:null}
        {this.state.isAddOpened?<AtModal isOpened={this.state.isAddOpened} onClose={()=>this.setState({isAddOpened:false})}>
            <AtModalHeader>添加学生</AtModalHeader>
            <AtModalContent>
            <AtForm
              className='my-form'
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
            >
              <AtInput 
                required
                name='name' 
                title='姓名：' 
                type='text' 
                placeholder='请填写' 
                value={this.state.name} 
                onChange={this.onNameChange.bind(this)} 
              />
              <View className='at-input'>
                <View className='at-input__container'>
                <View className='at-input__title at-input__title--required'>性别：</View>
                <View className=''>
                <AtCheckbox
                    options={GENDERS.map(t=>({label:t.name,value:t.value}))}
                    selectedList={this.state.checkedList}
                    onChange={this.onGenderChange.bind(this)}
                  />
                </View>
                </View>
              </View>
              {/* <View className='gender-selector'>
                  <Picker mode='selector' range={GENDERS} rangeKey='name' onChange={this.onGenderChange.bind(this)}>
                  <AtInput
                   required
                    name='gender'
                    title='性别：'
                    type='text'
                    placeholder='请选择'
                    editable={false}
                    value={this.state.gender}
                  />
                  </Picker>
              </View> */}
              <Picker mode='date' onChange={this.onBirthDateChange.bind(this)}>
                <AtInput
                    required
                    title='出生日期：'
                    type='text'
                    placeholder='请选择'
                    editable={false}
                    value={this.state.birthDate}
                />
              </Picker>
              <View className='submitBtn'>
                  <Button size='mini' formType='submit' type='primary'>提交</Button>
                  <Button size='mini' onClick={()=>this.setState({isAddOpened:false})} type='default'>取消</Button>
              </View>
        </AtForm>
            </AtModalContent>
          </AtModal>:null}
        {/* <AtCurtain
        className='signInModal'
        isOpened={this.state.isOpened}
        onClose={this.onClose.bind(this)}
        >
          <Image src={this.state.studentQrcode} mode='aspectFit'/>
        </AtCurtain> */}
      </View>
    )
  }
}
