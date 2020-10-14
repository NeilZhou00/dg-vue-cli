import { getParams } from '@/libs/util'

// 登录
export const getAboutInfo = req => {
  req = getParams(req.body)
  return {
    code: 200,
    msg: '',
    data: {
      userName: 'aboutPage',
      isAdmin: true
    }
  }
}
