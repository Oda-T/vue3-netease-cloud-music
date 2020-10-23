import { createStore } from 'vuex'

import axios from 'axios'

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
      interface S {
        id: number
        name: string
      }
      const _list: Array<S> = []

      await axios({
        url: 'http://localhost:3000/toplist'
      }).then(res => {
        if (res.status === 200) {
          const _res = res.data.list
          for (let i = 0; i < _res.length; i++) {
            _list.push({
              id: _res[i].id,
              name: _res[i].name
            })
          }
          commit('setTopListFull', _list)
        }
      })
      return Promise.resolve()
    }
  },
  modules: {}
})
