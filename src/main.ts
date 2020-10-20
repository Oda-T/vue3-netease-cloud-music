import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'mdui/src/index.less' // mdui 自带normalize.css

import '@/styles/reset.less' // 重置样式

import 'default-passive-events' // 解决滚动背景问题

import './assets/svg' // svg-sprite-loader 引入svg

import './utils/permission.ts'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
