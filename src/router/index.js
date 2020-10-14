import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRoutes from './home/index'
import aboutRoutes from './about/index'
import defaultRoutes from './defaultRoute'

Vue.use(VueRouter)

const routes = [].concat(
  homeRoutes,
  aboutRoutes,
  defaultRoutes
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
