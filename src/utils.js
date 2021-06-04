import Taro from '@tarojs/taro'
import {API_MAP,getHeader} from './api'
import {setGlobalData,getGlobalData}from './constant'
import {isEmpty,each,isNumber,isFunction} from 'lodash'
import dayjs from 'dayjs'
const TOKEN_KEY = 'access_token'
const VALID_SECONDS = 86400*2.8 // = 2.8d
const TOKEN_TIME_SPLIT = '###'

export function getToken(){
  try {
    var value = Taro.getStorageSync(TOKEN_KEY)
    if (value) {
      var info = value.split(TOKEN_TIME_SPLIT)
      var expiredTime = +info[1]
      if (expiredTime >= +new Date) {
        return info[0]
      }
      // token is expired
      return null
    }
    return null
  } catch (e) {
    // Do something when catch error
    return null
  }
}

export function setToken(token){
  try {
    const expiredTime = +new Date + VALID_SECONDS * 1000
    Taro.setStorageSync(TOKEN_KEY, token + TOKEN_TIME_SPLIT + expiredTime)
    return true
  } catch (e) {
    return false
   }
}

export async function checkHasUserInfoAuth() {
  return new Promise((resolve)=>{
    Taro.getSetting({
      success:res=>{
        if(res.authSetting['scope.userInfo']) {
          return resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
export let userReady
export const userResolve = (function(){
  let _resolve 
  userReady = new Promise(resolve=>{
    _resolve = resolve
  })
  return _resolve
})()

export async function getUserRoleInfo() {
  return new Promise((resolve)=>{
    if(getGlobalData('userRoleInfo')) {
      resolve(getGlobalData('userRoleInfo'))
    }else{
      Taro.request({
        url: API_MAP.get_userinfo,
        header: getHeader(),
        success(res){
          if(res.statusCode == 201) {
            setGlobalData('userRoleInfo',res.data.message)
            resolve(res.data.message)
            userResolve()
            console.log('set userRoleInfo')
          } else {
            resolve(null)
          }
        },
        error(err){
          console.log(err)
        }
      })
    }
  })
}


export async function getAllCourses() {
  return new Promise((resolve)=>{
    if(getGlobalData('allCourses')) {
      resolve(getGlobalData('allCourses'))
    }else{
      Taro.request({
        url: API_MAP.get_courses,
        header: getHeader(),
        success(res){
          setGlobalData('allCourses',res.data.message)
          resolve(res.data.message)
        },
        error(err){
          console.log(err)
        }
      })
    }
  })
}

export async function getSessionStudents(session_id) {
  return new Promise((resolve)=>{
      Taro.request({
        method: "POST",
        url: API_MAP.students_taking_classes,
        data: {
          session_id
        },
        header: getHeader(),
        success(res){
          resolve(res.data.message.map(t=>{
            t.label = t.student_name
            t.value = t.student_id
            return t
          }))
        },
        error(err){
          console.log(err)
        }
      })
  })
}

export async function getClassList(data,isTeacher) {
  return new Promise((resolve)=>{
    Taro.request({
      url: isTeacher ? API_MAP.teacher_sessions : 
      API_MAP.get_class_sessions,
      header: getHeader(),
      data:data,
      method:'post',
      success(res){
        resolve(res.data.message.map(t=>{
          t.start_time = getLocalTime(t.start_time_utc)
          t.name = t.course_name
          return t
        }))
      },
      error(err){
        console.log(err)
      }
    })
  })
}

export async function getTeacherList(data) {
  return new Promise((resolve)=>{
    Taro.request({
      url: API_MAP.get_teachers,
      header: getHeader(),
      data:data,
      success(res){
        resolve(res.data.message.filter(t=>{
          return t.validation_status != 2
        }))
      },
      error(err){
        console.log(err)
      }
    })
  })
}

export async function getStudentParents(id) {
  return new Promise((resolve)=>{
    Taro.request({
      url: API_MAP.student_parents,
      header: getHeader(),
      data:{student_id:id},
      method:'post',
      success(res){
        resolve(res.data.message.map(t=>{
          t.name = t.parent_name
          return t
        }))
      },
      error(err){
        console.log(err)
      }
    })
  })
}
export async function getStudentSessions(data) {
  return new Promise((resolve)=>{
    Taro.request({
      url: API_MAP.student_sessions,
      header: getHeader(),
      data,
      method:'post',
      success(res){
        resolve(res.data.message.map(t=>{
          t.name = t.course_name
          return t
        }))
      },
      error(err){
        console.log(err)
      }
    })
  })
}

export async function getStudentCredits(student_id) {
  return new Promise((resolve)=>{
    Taro.request({
      url: API_MAP.student_credits,
      header: getHeader(),
      data:{student_id},
      method:'post',
      success(res){
        resolve(res.data.message.map(t=>{
          t.name = t.course_name
          t.left = t.course_credit
          return t
        }))
      },
      error(err){
        console.log(err)
      }
    })
  })
}


// validate rules
export  function checkFormRules(rules,data,{oneStop=true}={})  {
  let errors=[]
  each(Object.keys(rules),k=>{
    let err
    if((isFunction(rules[k]) && (err=rules[k]())) || 
    (err!=false && !isNumber(data[k]) && isEmpty(data[k]) && (err=rules[k]))){
      // Taro.showToast({
      //   icon:'none',
      //   title: err
      // })
      errors.push({
        key:k,
        err
      })
      if(oneStop) {
        return false
      }
    }
  })
  return errors
}





export function getLocalTime(utc,format='YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utc).local().format(format)
}


