import Cookies from 'js-cookie'
import config from '@/config'

const { cookieExpires } = config
export const TOKEN_KEY = 'token'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const delToken = () => {
  Cookies.set(TOKEN_KEY, '')
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  if (!url) {
    return {}
  }
  try {
    const keyValueArr = url.split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
  } catch (e) {
    return {}
  }
}

/**
 * @param {Object} data
 * @description 序列化 AJAX FormData
 */
export const stringifyFormData = (data = {}) => {
  const _data = {}
  Object.keys(data).forEach(k => {
    const val = data[k]
    if (val instanceof Date) {
      // Date 类型
      _data[k] = dateFormatter(val, 'yyyy-MM-dd hh:mm:ss').replace(' 00:00:00', '')
    } else if (val instanceof Array && val.length > 0 && val[0] instanceof Date) {
      // Date 数组
      const temp = []
      val.forEach(v => {
        temp.push(dateFormatter(v, 'yyyy-MM-dd hh:mm:ss').replace(' 00:00:00', ''))
      })
      _data[k] = JSON.stringify(temp)
    } else if (val instanceof File) {
      // 文件类型
      _data[k] = val
    } else if (typeof val === 'object') {
      _data[k] = JSON.stringify(val)
    } else {
      _data[k] = val
    }
  })
  return _data
}

/**
 * @param {Date} date
 * @param {String} fmt
 * @description 格式化日期
 */
export const dateFormatter = (date, fmt) => {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}

/*
  downloadUrl -> 导出地址
  formValue -> 查询条件
*/
export const downloadHandler = (downloadUrl, formValue) => { // 导出函数
  let downloadparams = Object.keys(formValue).reduce((urls, url) => {
    if (formValue[url]) {
      urls += `&${url}=${formValue[url]}`
    }
    return urls
  }, '')
  if (downloadparams) {
    downloadparams = downloadparams.substr(1)
    window.open(downloadUrl + '?' + downloadparams)
  } else {
    window.open(downloadUrl)
  }
}

/*
  obj -> 接收参数为对象 { a: 2 }
  返回:
  {
    "a": "2"
  }
*/
export const formatJson = (obj) => {
  let rep = '~'
  let jsonStr = JSON.stringify(obj, null, rep)
  let str = ''
  for (let i = 0; i < jsonStr.length; i++) {
    str += jsonStr.charAt(i)
  }
  jsonStr = ''
  for (let i = 0; i < str.length; i++) {
    let text = str.charAt(i)
    jsonStr += rep === text ? '    ' : text
  }
  return jsonStr
}

/*
 * 返回IE版本，默认返回版本号为 11
 *
*/
export const getIEVersion = () => {
  let userAgent = navigator.userAgent
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    return parseFloat(RegExp['$1'])
  } else {
    return 11
  }
}
