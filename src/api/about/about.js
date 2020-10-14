import axios from '@/libs/axios'

// 获取用户信息
export const getAboutInfo = data => {
  return axios.request({
    url: '/admin/getAboutInfo',
    data
  })
}
