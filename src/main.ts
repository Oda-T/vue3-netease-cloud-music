import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'mdui/src/index.less' // mdui 自带normalize.css
document.body.className = 'mdui-theme-primary-red mdui-theme-accent-red mdui-appbar-with-toolbar mdui-drawer-body-left mdui-bottom-nav-fixed'

import '@/styles/reset.less' // 重置样式

import 'default-passive-events' // 解决滚动背景问题

import './assets/svg.js' // svg-sprite-loader 引入svg

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
