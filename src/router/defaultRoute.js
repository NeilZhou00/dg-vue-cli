export default [
  {
    path: '/',
    name: '',
    meta: {
      name: 'home'
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/pages/home/home')
  }
]
