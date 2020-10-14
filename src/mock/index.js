import Mock from 'mockjs'

import * as home from './home/home.js'
import * as about from './about/about.js'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 0
})

// home页面
Mock.mock(/\/admin\/getHomeInfo/, home.getHomeInfo)

// about页面
Mock.mock(/\/admin\/getAboutInfo/, about.getAboutInfo)
