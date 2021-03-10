export default {
  pages: [
    'pages/index/index',
    'pages/studentMain/index',
    'pages/studentSignInClass/index',
    'pages/StudentList/index',
    'pages/ClassList/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
