import { createStore } from 'vuex'

import { topListInt } from '../type/recommend.type'
import request from '../api/index'

export default createStore({
  state: {
    toolbarTitle: '发现音乐',
    toolbarSubTitle: '推荐',
    curIndex: -1,
    curChildIndex: -1,
    topListFull: []
  },
  mutations: {
    setToolbarTitle: (state, i) => {
      state.toolbarTitle = i
    },
    setToolbarSubTitle: (state, i) => {
      state.toolbarSubTitle = i
    },
    setCurIndex: (state, i) => {
      i = i === undefined ? -1 : i
      state.curIndex = i
    },
    setCurChildIndex: (state, i) => {
      i = i === undefined ? -1 : i
      state.curChildIndex = i
    },
    setTopListFull: (state, i) => {
      sessionStorage.topListFull = JSON.stringify(i)
      state.topListFull = i
    }
  },
  actions: {
    getTopListFull: async ({ commit }) => {
      const _list: Array<topListInt> = []

      const { list } = await request['httpGET']('GET_TOPLIST')

      for (let i = 0; i < list.length; i++) {
        _list.push({
          id: list[i].id,
          name: list[i].name
        })
      }
      commit('setTopListFull', _list)

      return Promise.resolve()
    }
  },
  modules: {}
})
