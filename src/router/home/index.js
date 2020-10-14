export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      name: 'home'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/home/home.vue')
  }
]
