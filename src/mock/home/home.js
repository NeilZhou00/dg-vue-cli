import { getParams } from '@/libs/util'

// home
export const getHomeInfo = req => {
  req = getParams(req.body)
  return {
    code: 200,
    msg: '',
    data: {
      userName: 'homePage',
      isAdmin: true
    }
  }
}
