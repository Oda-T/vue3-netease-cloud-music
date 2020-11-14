import router from '../router'
import store from '../store/index'

router.beforeEach(to => {
  // 修改layout title subtitle index
  store.commit('setToolbarTitle', to.meta.title)
  store.commit('setToolbarSubTitle', to.meta.subtitle)

  store.commit('setCurIndex', to.meta.index)
  store.commit('setCurChildIndex', to.meta.childindex)

  // 登录状态查询

  if (!sessionStorage.login) {
    //防止重定向出现两次弹窗
    sessionStorage.login = '*login'
    store.dispatch('getLoaginStatus')
  }
})
