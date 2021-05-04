import Nerv, { Component } from 'nervjs'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCurtain,AtCheckbox,AtSearchBar } from "taro-ui"
import NavBar from '../../components/navbar'
import {debounce} from 'lodash'
export default class Studentlist extends Component {

  constructor () {
    super(...arguments)
    const list = [
      {
        id:1,
        name:'张三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'李三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'王五',
        age: '2',
        gender: '女'
      },

      {
        id:1,
        name:'张三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'李三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'王五',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'张三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'李三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'王五',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'张三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'李三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'王五',
        age: '2',
        gender: '女'
      },

      {
        id:1,
        name:'张三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'李三',
        age: '2',
        gender: '女'
      },
      {
        id:1,
        name:'王五',
        age: '2',
        gender: '女'
      }
    ]
    this.state = {
      lastSelectId:null,
      checkedList:[],
      seachValue: '',
      list: list,
      filterList: list
    }
  }



  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // onLoad
  onLoad (options) {
    console.log(options.id)
  }

  handleChange(){

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

  render () {
    return (
      <View className='StudentList'>
        <NavBar isShowNavLeft={false} showTitle={false}></NavBar>
        <AtSearchBar
        className='searchBar'
        showActionButton
        value={this.state.seachValue}
        onChange={this.onSearchChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
      <View className='scrollWrap'>
        <ScrollView enhanced={true}  scrollY={true} className='scrollList' scrollIntoView={this.state.lastSelectId}>
          <AtCheckbox
          options={this.state.filterList.map(t=>{
            return {
              ...t,
              label:t.name+('('+t.gender+','+t.age+'岁)'),
              value:t.id
            }
          })}
          selectedList={this.state.checkedList}
          onChange={this.handleChange.bind(this)}
          />
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
        </View>
      </View>
    )
  }
}
