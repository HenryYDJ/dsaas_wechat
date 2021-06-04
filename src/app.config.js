export default {
  pages: [
    'pages/index/index',
    'pages/adminTabs/index',

    'pages/bindParent/index',


    'pages/createAdmin/index',
    'pages/studentList/index',
    'pages/classList/index',



    'pages/createClassSession/index',


    'pages/createTeacher/index',
    'pages/home/index',
    'pages/studentMain/index',
    'pages/studentSignInClass/index',
    'pages/classPage/index',
    'pages/createLession/index',
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/home/index',
      iconPath: 'images/home_df.png',
      selectedIconPath: 'images/home.png',
      text: '首页'
    }, 
    {
      pagePath: 'pages/index/index',
      text: '我的',
      iconPath: 'images/user_df.png',
      selectedIconPath: 'images/user.png',
    }],
    'color': '#000',
    'selectedColor': '#84abf4',
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
