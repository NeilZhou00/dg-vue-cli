import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/home.js'
import about from './about/about.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    about
  }
})
