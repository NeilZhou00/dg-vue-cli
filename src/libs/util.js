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

/**
 * @param any data 校验的数据
 *        'String' 数据类型
 * @description 判断传入数据是否与数据类型一致
 */
export const judgeDataTypeHandler = (data, dataType) => {
  return Object.prototype.toString.call(data) === `[object ${('' + dataType).toLowerCase().replace(/^[a-z]/g, (w) => {return w.toUpperCase()})}]`
}

/**
 * @param [Array] selectList 本地数据 -- select样式数据
 *        {Object} selectData 后端数据，options内容
 * @description 整合select数据，返回selectUI可用数据
 */
export const modifySelectDataHandler = (selectList, selectData) => {
  if (!judgeDataTypeHandler(selectList, 'array') || !selectList.length) {
    return []
  }

  let newSelectList = JSON.parse(JSON.stringify(selectList))
  newSelectList.forEach(item => {
    if (judgeDataTypeHandler(item, 'object') && item.key) {
      item.children = selectData[item.key]
    }
  })
  return newSelectList
}

/**
 * @param {Object} mapMutiBarData 后端数据 --- 柱状图数据
 *        {Object} || [Array] seriesStyle series样式，所以series 样式相同，可以直接使用Object
 * @description 整合图表-柱状图多条数据, 返回Echarts可用数据
 */
export const modifyMapMutiBarDataHandler = (mapMutiBarData, seriesStyle) => {
  if (!mapMutiBarData || !judgeDataTypeHandler(mapMutiBarData, 'object')) {
    return {}
  }

  const seriesList = mapMutiBarData.yAxis && mapMutiBarData.yAxis.map((item, index) => {
    const itemStyle = judgeDataTypeHandler(seriesStyle, 'object') ? seriesStyle : judgeDataTypeHandler(seriesStyle, 'array') && seriesStyle[index] ? seriesStyle[index] : {}
    return {
      name: mapMutiBarData.legend && mapMutiBarData.legend[index] || '',
      data: item,
      type: 'bar',
      ...itemStyle
    }
  })

  return {
    legend: mapMutiBarData.legend,
    series: seriesList
  }
}

/**
 * @param {Object} mapMutiLineData 后端数据 --- 折线图数据
 *        {Object} || [Array] seriesStyle series样式，所以series 样式相同，可以直接使用Object
 * @description 整合图表-折线图多条数据, 返回Echarts可用数据
 */
export const modifyMapMutiLineDataHandler = (mapMutiLineData, seriesStyle) => {
  if (!mapMutiLineData || !judgeDataTypeHandler(mapMutiLineData, 'object')) {
    return {}
  }

  const seriesList = mapMutiLineData.yAxis && mapMutiLineData.yAxis.map((item, index) => {
    const itemStyle = judgeDataTypeHandler(seriesStyle, 'object') ? seriesStyle : judgeDataTypeHandler(seriesStyle, 'array') && seriesStyle[index] ? seriesStyle[index] : {}
    return {
      name: mapMutiLineData.legend && mapMutiLineData.legend[index] || '',
      data: item,
      type: 'line',
      ...itemStyle
    }
  })

  return {
    legend: mapMutiLineData.legend,
    series: seriesList
  }
}

/**
 * @param {Object} mapMutiRadarData 后端数据 --- 雷达图数据
 *        {Object} || [Array] seriesStyle series样式，所以series 样式相同，可以直接使用Object
 * @description 整合图表-雷达图多条数据, 返回Echarts可用数据
 */
export const modifyMapMutiRadarDataHandler = (mapMutiRadarData, seriesStyle) => {
  if (!mapMutiRadarData || !judgeDataTypeHandler(mapMutiRadarData, 'object')) {
    return {}
  }

  const seriesList = mapMutiRadarData.yAxis && mapMutiRadarData.yAxis.map((item, index) => {
    const itemStyle = judgeDataTypeHandler(seriesStyle, 'object') ? seriesStyle : judgeDataTypeHandler(seriesStyle, 'array') && seriesStyle[index] ? seriesStyle[index] : {}
    return {
      name: mapMutiRadarData.legend && mapMutiRadarData.legend[index] || '',
      value: item,
      type: 'radar',
      ...itemStyle
    }
  })

  const indicatorList = (mapMutiRadarData.xAxis && mapMutiRadarData.max && mapMutiRadarData.xAxis.length === mapMutiRadarData.max.length && mapMutiRadarData.xAxis.map((item, index) => {
    return {
      name: item[index],
      max: mapMutiRadarData.max[index]
    }
  })) || []

  return {
    legend: mapMutiRadarData.legend,
    indicator: indicatorList,
    series: seriesList
  }
}

/**
 * @param {Object} mapLineBarData 后端数据 --- 折线&&柱状图数据
 *        {Object} || [Array] seriesStyle series样式，所以series 样式相同，可以直接使用Object
 * @description 整合图表-折线&&柱状图混合数据, 返回Echarts可用数据
 */
export const modifyMapLineBarDataHandler = (mapLineBarData, seriesStyle) => {
  if (!mapLineBarData || !judgeDataTypeHandler(mapLineBarData, 'object')) {
    return {}
  }

  const lineDataLen = mapLineBarData.yAxis && mapLineBarData.yAxis.line && mapLineBarData.yAxis.line.length || 0
  const barDataLen = mapLineBarData.yAxis && mapLineBarData.yAxis.bar && mapLineBarData.yAxis.bar.length || 0
  const mapLineDataList = [], mapBarDataList = []

  if (lineDataLen) {
    mapLineDataList = mapLineBarData.yAxis.line.map((item, index) => {
      const itemStyle = judgeDataTypeHandler(seriesStyle, 'object') ? seriesStyle : judgeDataTypeHandler(seriesStyle, 'array') && seriesStyle[index + barDataLen] ? seriesStyle[index + barDataLen] : {}
      return {
        name: mapLineBarData.legend && mapLineBarData.legend[index + barDataLen] || '',
        data: item,
        type: 'line',
        ...itemStyle
      }
    })
  }

  if (barDataLen) {
    mapBarDataList = mapLineBarData.yAxis.bar.map((item, index) => {
      const itemStyle = judgeDataTypeHandler(seriesStyle, 'object') ? seriesStyle : judgeDataTypeHandler(seriesStyle, 'array') && seriesStyle[index] ? seriesStyle[index] : {}
      return {
        name: mapLineBarData.legend && mapLineBarData.legend[index] || '',
        data: item,
        type: 'bar',
        ...itemStyle
      }
    })
  }

  return {
    legend: mapLineBarData.legend,
    series: [].concat(mapLineDataList, mapBarDataList)
  }
}
