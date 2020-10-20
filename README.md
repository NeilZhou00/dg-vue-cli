# vue-template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production and publish to server
```
npm run build:server
```

### vue 文件内编写SASS样式式，必须使用px2rem 方法，实现响应式布局
```
$baseNum: 192;
@function px2rem($px){
  @return $px / $baseNum * 1rem;
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
