import axios from '@/libs/axios'

// 获取用户信息
export const getHomeInfo = data => {
  return axios.request({
    url: '/admin/getHomeInfo',
    data
  })
}
