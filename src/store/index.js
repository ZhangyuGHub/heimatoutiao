import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 拿到token
    user: auth.getUser()
    // state修改数据必须通过mutations
  },
  mutations: {
    updateUser (state, payload) {
      // 更新数据
      state.user = payload.user
      // 将数据同步到本地
      auth.setUser(payload.user)
    },
    // 清空user
    clearUser (state) {
      state.user = {}
      auth.delUser()// 清空缓存中的数据
    }
  },
  actions: {
  },
  modules: {
  }
})
