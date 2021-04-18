import Nerv, { Component } from 'nervjs'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtForm,AtInput,AtButton,AtList,AtListItem } from "taro-ui"

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
    console.log(this.state)
  }
  onReset (event) {
    this.setState({
      name: '',
    })
  }

  render () {
    return (
      <View className='createLession'>
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
        <AtButton formType='submit' type='primary'>提交</AtButton>
      </AtForm>
      </View>
    )
  }
}
