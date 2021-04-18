import Nerv, { Component } from 'nervjs'
import { View, Text,Picker } from '@tarojs/components'
import './index.scss'
import { AtForm,AtInput,AtButton,AtList,AtListItem } from "taro-ui"
import { GENDERS } from '../../constant'

export default class Createteacher extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      phone: '',
      genderChecked: ''
    }
  }

 

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onSubmit (event) {
    console.log(this.state)
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
      <AtForm
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
        <View className='gender-selector'>
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
        </View>
        <AtButton formType='submit' type='primary'>提交</AtButton>
      </AtForm>
    )
  }
}
