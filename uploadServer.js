'use strict'
var client = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora(chalk.green('正在发布到服务器...'));
spinner.start();

client.scp('./dist/', {      // 本地打包文件的位置
  "host": 'XX.XX.XX.XX',    // 服务器的IP地址
  "port": '22',              // 服务器端口， 一般为 22
  "username": 'XX',        // 用户名
  "password": 'XX',    // 密码
  "path": 'pwd路径' // 项目部署的服务器目标位置
}, err =>{
  spinner.stop();
  if (!err) {
    console.log(chalk.green("项目发布完毕!"))
  } else {
    console.log("err", err)
  }
})
