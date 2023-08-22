import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关信息
      // userInfo: {
      //   token: '',
      //   userId: ''
      // }
      userInfo: getInfo()

    }
  },
  mutations: {
    // 所有的mutations的第一个参数，必须是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {
  }
}
