import Nerv, { Component } from 'nervjs'
import { View, Text,Picker,Button } from '@tarojs/components'
import './index.scss'
import { AtForm,AtInput,AtButton,AtList,AtListItem } from "taro-ui"
import { GENDERS,getGlobalData } from '../../constant'
import Taro from '@tarojs/taro'
import NavBar from '../../components/navbar'
import {API_MAP,getHeader} from '../../api'
import {userReady} from '../../utils'
export default class Createteacher extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      phone: '',
      genderChecked: '',
      isApproved:  false
    }
  }

 

  componentWillMount () { }

  async componentDidMount () { 
    await userReady
    const userRoleInfo = getGlobalData('userRoleInfo')
    this.setState({
      isApproved: userRoleInfo.validated == 0 && userRoleInfo.roles == 4
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onSubmit (event) {
    Taro.request({
      url: API_MAP.create_teacher,
      method: 'post',
      header: getHeader(),
      data: {
        real_name: this.state.name,
        phone: this.state.phone
      },
      success:(res)=>{
        console.log(res)
        Taro.showToast({
          title:'创建成功',
          icon: 'success'
        })
        this.setState({isApproved:true})
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

  handleChange (type,value) {
    this.setState({
      [type]:value
    })
    return value
  }

  onChangeGender(e){
    this.setState({
      genderChecked: GENDERS[e.detail.value].name
    })
  }
  render () {
    return (
      <View>
        <NavBar></NavBar>
      {!this.state.isApproved ? <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        <AtInput 
          required
          name='name' 
          title='姓名' 
          type='text' 
          placeholder='姓名' 
          value={this.state.name} 
          onChange={this.handleChange.bind(this, 'name')} 
        />
         <AtInput 
          required
          name='phone' 
          title='手机号' 
          type='text' 
          placeholder='手机号' 
          value={this.state.phone} 
          onChange={this.handleChange.bind(this, 'phone')} 
        />
        {/* <View className='gender-selector'>
          <View>
            <Picker mode='selector' range={GENDERS} rangeKey='name' onChange={this.onChangeGender.bind(this)}>
            <AtInput
              name='gender'
              title='性别'
              type='text'
              placeholder='请选择'
              editable={false}
              value={this.state.genderChecked}
            />
            </Picker>
          </View>
        </View> */}
        {/* <AtButton formType='submit' type='primary'>提交</AtButton> */}
        <View className='submitBtn'>
            <Button size='mini' formType='submit' type='primary'>提交</Button>
            <Button size='mini' onClick={Taro.navigateBack} type='default'>取消</Button>
        </View>
      </AtForm>:
      <View className='at-article__content'>
        <View className='at-article__section'>
          <View className='at-article__h2'>流程处理中</View>
          <View className='at-article__p'>
            您的资料已提交，管理员将在2-3个工作日内审核，审核通过后可使用老师功能。
          </View>
        </View>
      </View>
      }
      </View>
    )
  }
}
