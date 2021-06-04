import Nerv, { Component } from 'nervjs'
import { View, Text,Button } from '@tarojs/components'
import './index.scss'
import {API_MAP} from '../../api'
import { AtForm,AtInput,AtButton,AtList,AtListItem,AtTextarea } from "taro-ui"
import Taro from '@tarojs/taro'
import NavBar from '../../components/navbar'
export default class Createlession extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      detail: '',
      name: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (type,value) {
    this.setState({
      [type]:value
    })
    return value
  }

  onSubmit (event) {
    Taro.request({
      url: API_MAP.create_course,
      method: 'post',
      data: {
        name: this.state.name,
      },
      success(res){
        console.log(res)
        Taro.showToast({
          title:'创建成功',
          icon: 'success'
        })
        Taro.navigateBack()
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

  render () {
    return (
      <View className='createLession'>
        <NavBar></NavBar>
         <AtForm
        onSubmit={this.onSubmit.bind(this)}
        onReset={this.onReset.bind(this)}
      >
        <AtInput 
          required
          name='name' 
          title='课程名称' 
          type='text' 
          placeholder='课程名称' 
          value={this.state.name} 
          onChange={this.handleChange.bind(this, 'name')} 
        />
          <AtTextarea
            value={this.state.detail}
            onChange={this.handleChange.bind(this,'detail')}
            maxLength={200}
            placeholder='课程简介...'
          />
          <View className='submitBtn'>
            <Button size='mini' formType='submit' type='primary'>提交</Button>
            <Button size='mini' onClick={Taro.navigateBack} type='default'>取消</Button>
          </View>
        {/* <AtButton formType='submit' type='primary'>提交</AtButton> */}
      </AtForm>
      </View>
    )
  }
}
