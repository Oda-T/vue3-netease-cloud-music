<template>
  <div id="discoverToplist">
    <div v-if="!topListId">
      <!-- 特色榜单 -->
      <recommend :topTitle="'特色音乐榜'" :activeName="'云音乐飙升榜'" :topList="specialList" :cardList="specialCardList" @getid="getIdCallBackSpecial"></recommend>
      <!-- 全球媒体榜单 -->
      <recommend :topTitle="'全球媒体榜'" :activeName="'云音乐说唱榜'" :topList="globalList" :cardList="globalCardList" @getid="getIdCallBackGlobal"></recommend>
    </div>
    <!-- 榜单详情 -->
    <div v-else>
      <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
      <!-- 评论 -->
      <comments :commentsDetail="commentsDetail" />
      <!-- 分页 -->
      <pagination :pageCount="pageCount" @pagenumber="pageNumber" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import mdui from 'mdui'
import axios from 'axios'

import Recommend from '../../components/recommend.vue'
import PlayList from '../../components/playlist.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

export default defineComponent({
  name: 'TopList',
  components: {
    Recommend,
    PlayList,
    Comments,
    Pagination
  },

  setup() {
    interface S {
      id: number
      name: string
    }
    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }

    interface C {
      username: string
      useravatar: string
      content: string
      likedcount: number
      time: string
      usertype: number
      replied: {
        username: string | undefined
        content: string | undefined
      }
    }

    interface T {
      name: string
      id: string
      artist: string
      artistUrl: string
      imgUrl: string
      time: string
    }

    const store = useStore()
    const route = useRoute()
    const { topListFull } = store.state

    const specialList: Array<S> = reactive([])
    const specialCardList: Array<D> = reactive([])

    const globalList: Array<S> = reactive([])
    const globalCardList: Array<D> = reactive([])

    const pageCount = ref(0)

    const commentsDetail: Array<C> = reactive([])

    const headerDetail = ref({})
    const listDetail: Array<T> = reactive([])

    const topListId = ref(0)

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }
    const getPlayList: (n: number, arr: D[]) => void = (n, arr) => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            // 榜单
            const _res = res.data.playlist.tracks
            arr[0] = {
              id: '/discover/toplist?id=' + res.data.playlist.id.toString(),
              name: res.data.playlist.name,
              artist: res.data.playlist.description,
              picUrl: res.data.playlist.coverImgUrl
            }

            for (let i = 0; i < 10; i++) {
              arr[i + 1] = {
                id: '/song?id=' + _res[i].id.toString(),
                name: _res[i].name,
                artist: _res[i].ar[0].name,
                picUrl: _res[i].al.picUrl
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    // getSpecialList
    const getSpecialList: () => void = () => {
      for (let i = 0; i < 5; i++) {
        specialList[i] = store.state.topListFull[i]
      }
      getPlayList(specialList[0].id, specialCardList)
    }

    // getGlobalList
    const getGlobalList: () => void = () => {
      for (let i = 5; i < 35; i++) {
        globalList[i - 5] = store.state.topListFull[i]
      }
      getPlayList(globalList[0].id, globalCardList)
    }

    const getIdCallBackSpecial: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, specialCardList)
    }

    const getIdCallBackGlobal: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, globalCardList)
    }

    // 获取音乐榜媒体榜缓存
    if (topListFull.length) {
      getSpecialList()
      getGlobalList()
    } else {
      store.dispatch('getTopListFull').then(() => {
        getSpecialList()
        getGlobalList()
      })
    }
    const getDuoNum: (d: number) => string | number = d => {
      return d >= 10 ? d : `0${d}`
    }

    const handleDrTime: (d: number) => string = d => {
      const _d = Math.floor(d / 1000)
      return `${Math.floor(_d / 60)}:${getDuoNum(Math.floor(_d % 60))}`
    }

    const getComments: (id: number, n: number) => void = (id, n) => {
      commentsDetail.length = 0

      axios({
        url: `http://localhost:3000/comment/playlist?id=${id}&limit=20&offset=${n}`
      })
        .then(res => {
          const _com = res.data.comments
          pageCount.value = Math.ceil(res.data.total / 20)

          for (let i = 0; i < _com.length; i++) {
            commentsDetail[i] = {
              username: _com[i].user.nickname,
              useravatar: _com[i].user.avatarUrl + '?param=30y30',
              usertype: _com[i].user.userType,
              content: _com[i].content,
              likedcount: _com[i].likedCount,
              time: handleTime(_com[i].time),
              replied: {
                username: _com[i].beReplied.length ? _com[i].beReplied[0].user.nickname : undefined,
                content: _com[i].beReplied.length ? _com[i].beReplied[0].content : undefined
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getTopListDetail: (id: number) => void = id => {
      listDetail.length = 0

      axios({
        url: `http://localhost:3000/playlist/detail?id=${id}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist
            const _tracks = res.data.playlist.tracks

            headerDetail.value = {
              name: _res.name,
              coverImgUrl: _res.coverImgUrl + '?param=264y264',
              description: _res.description,
              trackCount: _res.trackCount,
              playCount: _res.playCount,
              shareCount: _res.shareCount,
              commentCount: _res.commentCount,
              subscribedCount: _res.subscribedCount,
              updateTime: handleTime(_res.updateTime)
            }

            for (let i = 0; i < _tracks.length; i++) {
              listDetail[i] = {
                name: _tracks[i].name,
                id: '/song?id=' + _tracks[i].id,
                artist: _tracks[i].ar[0].name,
                artistUrl: '/artist?id' + _tracks[i].ar[0].id,
                imgUrl: _tracks[i].al.picUrl + '?param=32y32',
                time: handleDrTime(_tracks[i].dt)
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const pageNumber: (n: number) => void = n => {
      getComments(Number(route.query.id), 20 * (n - 1))
    }

    // 观测route id
    watchEffect(() => {
      if (route.query.id) {
        topListId.value = Number(route.query.id)
        getComments(Number(route.query.id), 0)
        getTopListDetail(Number(route.query.id))
      } else {
        topListId.value = 0
      }
    })

    onMounted(() => {
      mdui.mutation()
    })

    return {
      specialList,
      specialCardList,
      globalList,
      globalCardList,
      getIdCallBackSpecial,
      getIdCallBackGlobal,
      topListId,
      commentsDetail,
      pageCount,
      pageNumber,
      listDetail,
      headerDetail
    }
  }
})
</script>
