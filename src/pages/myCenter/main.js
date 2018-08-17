import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1984d2',
    navigationBarTitleText: '个人中心',
    navigationBarTextStyle: 'light'
  }
}
