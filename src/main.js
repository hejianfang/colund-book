import Vue from 'vue'
import App from './App'
import store from './store/store'
Vue.prototype.$store=store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云书',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh:true
    },
    tabBar: {
      color:'#333',
      selectedColor:'#1296db',
      backgroundColor: "#ffffff",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/main",
        iconPath: '/static/img/shouye (1).png',
        selectedIconPath: '/static/img/shouye.png',
        text: "首页",
      },
        {
          pagePath: "pages/studly/main",
          iconPath: '/static/img/shu(1).png',
          selectedIconPath: '/static/img/shu.png',
          text: "我的学习",
        },
        {
          pagePath: "pages/myCenter/main",
          iconPath: '/static/img/my(1).png',
          selectedIconPath: '/static/img/my.png',
          text: "个人中心",
        }
      ]
    }
}
}
