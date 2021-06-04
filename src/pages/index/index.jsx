import Nerv, { Component } from 'nervjs'
import { View, Text,Map,OpenData,Image } from '@tarojs/components'
import './index.scss'
import { AtButton,AtModal,AtModalHeader,AtModalContent,AtModalAction,AtCard,AtTag, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import iconPath from '../../images/location.png'
import {getGlobalData, setGlobalData ,GLOBAL_NAMES} from '../../constant'
import {checkHasUserInfoAuth,getClassList,getAllCourses,getTeacherList,userReady} from '../../utils'
import NavBar from '../../components/navbar'
import NoAuth from '../../components/noAuth'
import dayjs from 'dayjs';

class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      hasRole:false,
      userInfo:{

      },
      hasAuthUserInfo:null,
      showModal:false,
      courses:[],
      teachers:[],
      unapproveTeacherLen:0,
      classSessions:[]
    }
  }

  async componentDidMount () { 
    const userRoleInfo = getGlobalData('userRoleInfo')
    this.setState({
      hasRole: userRoleInfo.roles && userRoleInfo.validated == 1,
      userRoleInfo
    })
    const authUserInfo =  await checkHasUserInfoAuth()
    const hasInfo = getGlobalData(GLOBAL_NAMES['WX_USER_INFO'],true)
    const hasAuthUserInfo = !!(authUserInfo && hasInfo)
    this.setState({
      hasAuthUserInfo : hasAuthUserInfo,
      showModal:!hasAuthUserInfo
    })
    if(hasAuthUserInfo){
      this.setState({userInfo:hasInfo})
      console.log(hasInfo)
      // Taro.getUserInfo({
      //   success:(detail)=>{
      //     console.log(detail)
      //     this.setState({
      //       userInfo:detail.userInfo
      //     })
      //   }
      // })
    }
    if (userRoleInfo.roles >= 8 ) {
      const courses = await getAllCourses()
      console.log(courses)
      this.setState({
        courses
      })
    }
    if (userRoleInfo.roles >= 8 ) {
      const teachers = await getTeacherList()
      this.setState({
        teachers:teachers,
        unapproveTeacherLen:teachers.filter(t=>t.validation_status==0).length
      })
    }
    if (userRoleInfo.roles >= 4 ){
      const classSessions = await getClassList({start_time:dayjs().startOf('month').format(),end_time:dayjs().endOf('month').format()},userRoleInfo.roles == 4)
      this.setState({
        classSessions:classSessions,
      })
    }
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goStudentPage () {
    Taro.navigateTo({
      url: '/pages/studentList/index'
    })
  }
  goClassPage () {
    Taro.navigateTo({
      url: '/pages/classList/index'
    })
  }
  goAdminPage(){
    Taro.navigateTo({
      url: '/pages/adminTabs/index'
    })
  }
  goLessionPage(){
    console.log(arguments)
    Taro.navigateTo({
      url: '/pages/createLession/index'
    })
  }
  goCreateTeacher(){
    Taro.navigateTo({
      url: '/pages/createTeacher/index'
    })
  }
  goAdminList(){
    Taro.navigateTo({
      url: '/pages/createAdmin/index'
    })
  }
  onGetUserInfo(detail){
    this.setState({
      userInfo:detail.detail.userInfo,
      showModal:false,
      hasAuthUserInfo:true
    })
    setGlobalData(GLOBAL_NAMES['WX_USER_INFO'],detail.detail.userInfo,true)
  }
 render() {
    // const hasAuthUserInfo =  await checkHasUserInfoAuth()
    return (
      <View className='index'>
        <NavBar></NavBar>
        {this.state.hasAuthUserInfo!=false?
        <View className='head-box'>
          <View className='user-head'>
            <Image src={this.state.userInfo.avatarUrl} mode='aspectFit  '/>
          </View>
          <View className='user-text'>
            <Text>你好</Text>{this.state.userInfo.nickName}<Text>，欢迎您!</Text>
          </View>
        </View>:
        <AtModal isOpened={this.state.showModal} onClose={()=>{this.setState({showModal:false})}}>
            <AtModalHeader>授权确认</AtModalHeader>
            <AtModalContent className='flex-center'>
              访问我的功能需要您的微信授权
            </AtModalContent>
            <AtModalAction><AtButton openType='getUserInfo'  onGetUserInfo={this.onGetUserInfo.bind(this)} type='primary'> 确认授权</AtButton> </AtModalAction>
          </AtModal>
        }
        {this.state.hasRole?
          <View>
            <AtCard
              title='学生管理'
              onClick={this.goStudentPage}
              extra='详情>'
            >
              {/* {this.state.role <8 ? 
              '今日上课学生总数：100':
              '学生总数：100'
              } */}
            </AtCard>
            {
              this.state.userRoleInfo.roles>2?
            <>
            <AtCard
              title='课时管理'
              extra='详情>'
              onClick={this.goClassPage}
            >
              {this.state.userRoleInfo.roles <8 ? 
              '今日上课课时：':
              '今日课时总数：'
              }
              {this.state.classSessions.length+'节'}
            </AtCard>
            </>:null}
            {this.state.userRoleInfo.roles>4?
            <>
            <AtCard
              title='老师管理'
              extra='管理>'
              onClick={this.goAdminPage}
            >
              老师总数：{this.state.teachers.length}，待审核老师：{this.state.unapproveTeacherLen}
            </AtCard>
            <AtCard
              title='课程管理'
              extra='添加+'
              onClick={this.goLessionPage}
            >
              {
                this.state.courses.map(c=><AtTag 
                  active
                  type='primary' 
                >
                  {c.name}
                </AtTag>)
              }
            </AtCard>
            </>:null}
            {this.state.userRoleInfo.is_super?<AtCard
              title='管理员审核'
              extra='详情>'
              onClick={this.goAdminList}
            >
            </AtCard>:null}
          </View>:
          <View>
            {/* <AtButton type='primary' onClick={this.goStudentPage}>我是学生</AtButton> */}
            <AtButton type='primary' onClick={this.goCreateTeacher}>我是老师</AtButton>
            {/* <AtButton type='primary' onClick={this.goAdminPage}>我是管理员</AtButton> */}
          </View>
        }
      </View>
    )
  }
}


const indexAuth = (WC)=>{
  return class IndexAuth extends Component {
    constructor(){
      super()
      this.state = {
        loading: true,
        noAuth: true
      }
    }
    async componentWillMount(){
      await userReady
      const userRoleInfo = getGlobalData('userRoleInfo')
      this.setState({
        loading:false,
        noAuth: userRoleInfo.roles != null && userRoleInfo.validated != 1,
        userRoleInfo
      })
    }
    render() {
      if (this.state.loading) {
        return <View class='flex-center page-wrap loading-box'>
          <AtIcon value='loading-3' size='64' color='whitesmoke'></AtIcon>
        </View>
      }
      if (this.state.noAuth) {
        return <NoAuth userRoleInfo={this.state.userRoleInfo}></NoAuth>
      }
      return <WC {...this.props}/>
    }
  } 
}
export default indexAuth(Index)