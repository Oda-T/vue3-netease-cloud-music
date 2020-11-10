import { createStore } from 'vuex'

import { topListInt } from '../type/recommend.type'
import request from '../api/index'

export default createStore({
  state: {
    toolbarTitle: '发现音乐',
    toolbarSubTitle: '推荐',
    curIndex: -1,
    curChildIndex: -1,
    topListFull: [],
    playListFull: [],
    djListFull: [],
    userId: ''
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
    },
    setPlaylistFull: (state, i) => {
      sessionStorage.playListFull = JSON.stringify(i)
      state.playListFull = i
    },
    setDjListFull: (state, i) => {
      sessionStorage.djListFull = JSON.stringify(i)
      state.djListFull = i
    },
    setUserId: (state, i) => {
      state.userId = i
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
    },
    getPlaylistFull: async ({ commit }) => {
      const _list: Array<topListInt> = []
      const { sub } = await request['httpGET']('GET_PLAYLIST_CATLIST')

      _list[0] = {
        id: -1,
        name: '全部'
      }
      for (let i = 0; i < sub.length; i++) {
        _list[i + 1] = {
          id: i,
          name: sub[i].name
        }
      }
      commit('setPlaylistFull', _list)
    },
    getDjListFull: async ({ commit }) => {
      const _list: Array<topListInt> = []
      const { data } = await request['httpGET']('GET_DJ_CATEGORY_RECOMMEND')

      for (let i = 0; i < data.length; i++) {
        _list[i] = {
          id: data[i].categoryId,
          name: data[i].categoryName
        }
      }
      commit('setDjListFull', _list)
    },
    getUserId: async ({ commit }) => {
      const { profile } = await request['httpGET']('GET_LOGIN_STATUS')
      commit('setUserId', profile.userId)
    }
  },
  modules: {}
})
