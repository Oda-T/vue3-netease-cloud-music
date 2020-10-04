import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式
import '@/styles/reset.less'

import 'mdui'
// mdui 自带normalize.css
import 'mdui/src/index.less'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
