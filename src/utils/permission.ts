import router from '../router'
import store from '../store/index'
import mdui from 'mdui'

// const store = useStore()

router.beforeEach((to, from, next) => {
  // 修改layout title subtitle index
  store.commit('setToolbarTitle', to.meta.title)
  store.commit('setToolbarSubTitle', to.meta.subtitle)

  store.commit('setCurIndex', to.meta.index)
  store.commit('setCurChildIndex', to.meta.childindex)

  // 需要登录的页面
  if (to.meta.requireAuth && sessionStorage.login !== 'login') {
    mdui.snackbar({
      message: '未登录',
      position: 'right-bottom',
      timeout: 1000
    })
    // 重定向页，防止左侧出现bug
    next({ name: '404' })
  } else {
    next()
  }

  // 登录状态查询，保存userid
  if (!sessionStorage.login) {
    store.dispatch('getLoaginStatus')
  }
})
