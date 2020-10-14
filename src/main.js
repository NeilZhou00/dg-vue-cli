import 'babel-polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs/elementUI'
import config from '@/config'

promise.polyfill()

// 非生产环境下，使用mock数据
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
