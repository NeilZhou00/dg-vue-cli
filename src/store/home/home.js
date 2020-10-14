import { getHomeInfo } from '@/api/home/home.js'
import config from '@/config'

const state = {
  userName: '',
  isAdmin: false,
  isLoading: false
}

const mutations = {
  loading (state, flag) {
    state.isLoading = flag
  },
  setUserInfo (state, data) {
    const { userName, isAdmin } = data
    state.userName = userName
    state.isAdmin = isAdmin
  }
}

const actions = {
  // 获取用户信息
  getHomeInfo ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      commit('loading', true)
      getHomeInfo(req).then(res => {
        commit('loading', false)
        const data = res.data
        if (+data.code === config.httpStatus) {
          commit('setUserInfo', data.data)
          resolve()
        } else {
          reject(data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
