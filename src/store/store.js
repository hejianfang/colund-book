// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bookId: ''
  },
  mutations: {
    increment: (state,val) => {
      state.bookId = val
      console.log(state.bookId);
    },
    decrement: (state,val) => {

    }
  }
})

export default store
