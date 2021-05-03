export default {
  pages: [
    'pages/home/index',
    'pages/index/index',
    'pages/studentMain/index',
    'pages/studentSignInClass/index',
    'pages/studentList/index',
    'pages/classList/index',
    'pages/classPage/index',
    'pages/createTeacher/index',
    'pages/createLession/index',
    'pages/adminTabs/index'
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/home/index',
      text: '首页'
    }, {
      pagePath: 'pages/index/index',
      text: '我的'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#84abf4',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    "navigationStyle": "custom"
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
