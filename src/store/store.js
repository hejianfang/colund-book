// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bookId: '',
    show : false
  },
  mutations: {
    increment: (state,val) => {
      state.bookId = val
    },
    show: (state,val) => {
      state.show = val
    }
  }
})

export default store
