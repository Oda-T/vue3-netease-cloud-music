import router from '../router'
import store from '../store/index'

// const topListFull = store.state.topListFull

router.beforeEach(to => {
  // 修改layout title subtitle index
  store.commit('setToolbarTitle', to.meta.title)
  store.commit('setToolbarSubTitle', to.meta.subtitle)

  store.commit('setCurIndex', to.meta.index)
  store.commit('setCurChildIndex', to.meta.childindex)
})
