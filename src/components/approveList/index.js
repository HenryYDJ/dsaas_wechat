import Nerv, { Component,forwardRef,createElement } from 'nervjs'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain,AtCard,AtButton,AtModal} from "taro-ui"
import {TEACH_APPROVE_STATE,TEACH_APPROVE_STATE_TEXT} from '../../constant'
import {API_MAP, getHeader} from '../../api'
import dayjs from 'dayjs';
import Taro from '@tarojs/taro'
export const approveList = (WC,options) => {
  return class Index extends WC {

    constructor () {
      super(...arguments)
      this.state = {
        list: [],
        isOpened: false,
        userId: ''
      }
    }

    componentDidMount() {
      this.refreshList()
    }
    refreshList() {
      console.log(options.listUrl)
      // TODO请求数据
      Taro.request({
        // method: 'post',
        header:getHeader(),
        success:(res)=> {
          console.log(res)
          this.formatData(res.data.message)
        },
        error(err) {
          console.log(err)
        },
        url: options.listUrl
      })
      // FIXME
      // this.formatData(data)
    }
    formatData(data){
      const list = data.sort((a,b)=>{
        return a.validation_status - b.validation_status
      }).map(t=>{
        return {
          ...t,
          state: t.validation_status
          // time:dayjs(t.time).format('LLL')
        }
      })
      this.setState({
        list
      })
    }

    doAction(type,id){
      console.log('action---')
      this.setState({
        isOpened:true,
        actionType:type,
        userId: id
      })
    }

    handleConfirm(state) {
      // TODO请求数据
      Taro.request({
       url: options.approveUrl,
       header: getHeader(),
       data: {
        decision: this.state.actionType,
         [options.approveKey]: this.state.userId
       },
       method: 'post',
       success:(res)=> {
         Taro.showToast({
           title:'操作成功',
           icon: 'success'
         })
         this.refreshList()
         this.closeModal()
       },
       error(err) {
         console.log(err)
       }
     })
   }

    closeModal(){
      console.log('1111')
      this.setState({
        isOpened: false
      })
    }
    

    render() {
      return super.render();
      // const { modalContent } = elementsTree.props.children
      console.log('2222',this.state.isOpened)
     
    }
  }
}