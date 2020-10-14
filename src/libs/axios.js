import axios from 'axios'
import config from '@/config'
import router from '@/router'
import { delToken } from '../libs/util'

const url =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro

class HttpRequest {
  constructor (baseUrl = url) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;'
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        const { data, code } = res
        if (data.code === config.expiryStatus) {
          delToken()
          router.push({ name: 'login' })
        }
        return { data, code }
      },
      error => {
        this.destroy(url)
        let errorInfo = error.response
        if (!errorInfo) {
          const {
            request: { msg, code },
            config
          } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            msg,
            code,
            request: { responseURL: config.url }
          }
        }
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    let data = options.data
    if (options.headers) {
      // 包含文件流
      const formData = new FormData()
      for (const k in data) {
        formData.append(k, data[k])
      }
      data = formData
    }

    options = Object.assign(this.getInsideConfig(), options, { data })
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default new HttpRequest(url)
