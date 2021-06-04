import Nerv, { Component,forwardRef,createElement } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain,AtCard,AtButton,AtModal} from "taro-ui"
import {TEACH_APPROVE_STATE,TEACH_APPROVE_STATE_TEXT} from '../../constant'
import {API_MAP} from '../../api'
import dayjs from 'dayjs';
import Taro from '@tarojs/taro'
export const approveList = (WC,options) => {
  class Index extends Component {

    constructor () {
      super(...arguments)
    }

    componentDidMount() {
      const data = [
        {
          id: 1,
          name: '张三',
          phone: 123,
          time: '2021-05-04T17:24:41+08:00',
          state: 2
        },
        {
          id: 1,
          name: '李四',
          phone: 123,
          time: '2021-05-04T17:24:41+08:00',
          state: 0
        },
        {
          id: 1,
          name: '王麻子',
          phone: 123,
          time: '2021-05-04T17:24:41+08:00',
          state: 1
        }
      ]
      // TODO请求数据
      Taro.request({
        // url: API_MAP.get_teach,
        method: 'post',
        success(res) {
          console.log(res)
          this.formatData(res.data)
        },
        error(err) {
          console.log(err)
        },
        ...options
      })
      // FIXME
      this.formatData(data)
    }

    formatData(data){
      const list = data.sort((a,b)=>{
        return a.state - b.state
      }).map(t=>{
        return {
          ...t,
          time:dayjs(t.time).format('LLL')
        }
      })
      this.setState({
        list
      })
    }

    render() {
      const { children, forwardRef } = this.props
      return <WC ref={forwardRef}></WC>
    }
  }
  return forwardRef((props, ref) => (
    createElement(Index, { ...props, forwardRef: ref })
  ))
}