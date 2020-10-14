export default [
  {
    path: '/about',
    name: 'about',
    meta: {
      name: 'about'
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/pages/about/about.vue')
  }
]
