import {getToken} from './utils'
// const API_HOST = 'http://192.168.3.178:5000/'
// const API_HOST = 'http://152.136.114.102:5000/'
// const API_HOST = 'http://127.0.0.1:5000/'
const API_HOST = 'https://papaya-tech.com:5000/'
export const API_MAP = {
  // 登录
  // login: API_HOST + 'api/v1.0/auth/login',
  // 微信登录
  wechat_login: API_HOST + 'api/v1.0/wechat/login',
  // 创建课程
  create_course: API_HOST + 'api/v1.0/course/add_course',
  // 添加老师
  create_teacher: API_HOST + 'api/v1.0/teacher',
  // 创建课时
  create_class_session: API_HOST + 'api/v1.0/class_session',
  // 添加学生
  add_student: API_HOST + 'api/+v1.0/student',
  // 获取学生列表
  get_students: API_HOST + 'api/v1.0/students',
  // 获取用户信息 (roles,)
  get_userinfo: API_HOST + 'api/v1.0/user',
  // 获取课程
  get_courses: API_HOST + 'api/v1.0/courses',
  // 获取课时
  get_class_sessions: API_HOST + 'api/v1.0/class_sessions',
  teacher_sessions: API_HOST + 'api/v1.0/teacher_sessions',
  // 绑定家长
  bind_parent: API_HOST + 'api/v1.0/bind_parents',
  get_teachers: API_HOST + 'api/v1.0/teachers',
  get_admins: API_HOST + 'api/v1.0/get_admins',
  unvalidated_parents: API_HOST + 'api/v1.0/unvalidated_parents',
  student_sessions: API_HOST + 'api/v1.0/student_sessions',
  students_taking_classes: API_HOST + 'api/v1.0/students_taking_classes',
  attendance_call: API_HOST + 'api/v1.0/attendance_call',
  approve_teacher: API_HOST + 'api/v1.0/approve_teacher',
  validate_admin: API_HOST + 'api/v1.0/validate_admin',
  student_parents: API_HOST + 'api/v1.0/student_parents',
  student_credits: API_HOST + 'api/v1.0/student_credits',
  // 获取课时学生 student_sessions
  // 获取未认证家长 unvalidated_parents
  // 认证家长 validate_parent
  // 认证管理员 
  // 认证老师
  // 首页简介
}

export const getHeader = (headers) => {
  return {
    ...headers,
    Authorization: 'Bearer '+getToken()
  }
}