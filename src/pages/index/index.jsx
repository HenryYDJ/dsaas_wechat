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
            <Text>??????</Text>{this.state.userInfo.nickName}<Text>????????????!</Text>
          </View>
        </View>:
        <AtModal isOpened={this.state.showModal} onClose={()=>{this.setState({showModal:false})}}>
            <AtModalHeader>????????????</AtModalHeader>
            <AtModalContent className='flex-center'>
              ??????????????????????????????????????????
            </AtModalContent>
            <AtModalAction><AtButton openType='getUserInfo'  onGetUserInfo={this.onGetUserInfo.bind(this)} type='primary'> ????????????</AtButton> </AtModalAction>
          </AtModal>
        }
        {this.state.hasRole?
          <View>
            <AtCard
              title='????????????'
              onClick={this.goStudentPage}
              extra='??????>'
            >
              {/* {this.state.role <8 ? 
              '???????????????????????????100':
              '???????????????100'
              } */}
            </AtCard>
            {
              this.state.userRoleInfo.roles>2?
            <>
            <AtCard
              title='????????????'
              extra='??????>'
              onClick={this.goClassPage}
            >
              {this.state.userRoleInfo.roles <8 ? 
              '?????????????????????':
              '?????????????????????'
              }
              {this.state.classSessions.length+'???'}
            </AtCard>
            </>:null}
            {this.state.userRoleInfo.roles>4?
            <>
            <AtCard
              title='????????????'
              extra='??????>'
              onClick={this.goAdminPage}
            >
              ???????????????{this.state.teachers.length}?????????????????????{this.state.unapproveTeacherLen}
            </AtCard>
            <AtCard
              title='????????????'
              extra='??????+'
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
              title='???????????????'
              extra='??????>'
              onClick={this.goAdminList}
            >
            </AtCard>:null}
          </View>:
          <View>
            {/* <AtButton type='primary' onClick={this.goStudentPage}>????????????</AtButton> */}
            <AtButton type='primary' onClick={this.goCreateTeacher}>????????????</AtButton>
            {/* <AtButton type='primary' onClick={this.goAdminPage}>???????????????</AtButton> */}
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