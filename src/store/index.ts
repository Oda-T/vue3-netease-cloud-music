import { createStore } from 'vuex'

export default createStore({
  state: {
    toolbarTitle: '发现音乐',
    toolbarSubTitle: '推荐',
    curIndex: -1,
    curChildIndex: -1
  },
  mutations: {
    setToolbarTitle: (state, i) => {
      state.toolbarTitle = i
    },
    setToolbarSubTitle: (state, i) => {
      state.toolbarSubTitle = i
    },
    setCurIndex: (state, i) => {
      state.curIndex = i
    },
    setCurChildIndex: (state, i) => {
      state.curChildIndex = i
    }
  },
  actions: {},
  modules: {}
})
