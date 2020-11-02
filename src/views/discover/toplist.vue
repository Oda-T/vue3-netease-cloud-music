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
      <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
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

import Recommend from '../../components/recommend.vue'
import PlayList from '../../components/playlist.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { commentsInt } from '../../type/comments.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'TopList',
  components: {
    Recommend,
    PlayList,
    Comments,
    Pagination
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const { topListFull } = store.state

    const specialList: Array<topListInt> = reactive([])
    const specialCardList: Array<cardListInt> = reactive([])

    const globalList: Array<topListInt> = reactive([])
    const globalCardList: Array<cardListInt> = reactive([])

    const pageCount = ref(0)

    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])

    const headerDetail = ref({} as headerDetailInt)

    const listDetail: Array<playListInt> = reactive([])

    const topListId = ref(0)

    const getPlayList: (n: number, arr: cardListInt[]) => void = async (n, arr) => {
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n })

      arr[0] = {
        id: '/discover/toplist?id=' + playlist.id.toString(),
        name: playlist.name,
        artist: playlist.description,
        picUrl: playlist.coverImgUrl
      }

      for (let i = 0; i < 10; i++) {
        arr[i + 1] = {
          id: '/song?id=' + playlist.tracks[i].id.toString(),
          name: playlist.tracks[i].name,
          artist: playlist.tracks[i].ar[0].name,
          picUrl: playlist.tracks[i].al.picUrl
        }
      }
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

    const getComments: (id: number, n: number) => void = async (id, n) => {
      commentsDetail.length = 0

      const { total, comments } = await request['httpGET']('GET_COMMENT_PLAYLIST', { 'id': id, 'limit': 20, 'offset': n })

      pageCount.value = Math.ceil(total / 20)

      for (let i = 0; i < comments.length; i++) {
        commentsDetail[i] = {
          username: comments[i].user.nickname,
          useravatar: comments[i].user.avatarUrl + '?param=30y30',
          usertype: comments[i].user.userType,
          content: comments[i].content,
          liked: comments[i].liked,
          likedcount: comments[i].likedCount,
          time: comments[i].time,
          replied: {
            username: comments[i].beReplied.length ? comments[i].beReplied[0].user.nickname : undefined,
            content: comments[i].beReplied.length ? comments[i].beReplied[0].content : undefined
          }
        }
      }
    }

    const getTopListDetail: (id: number) => void = async id => {
      listDetail.length = 0

      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': id })

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl + '?param=264y264',
        description: playlist.description,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        commentCount: playlist.commentCount,
        subscribedCount: playlist.subscribedCount,
        updateTime: playlist.updateTime
      }

      for (let i = 0; i < playlist.tracks.length; i++) {
        listDetail[i] = {
          name: playlist.tracks[i].name,
          id: '/song?id=' + playlist.tracks[i].id,
          artist: playlist.tracks[i].ar,
          artistUrl: '/artist?id' + playlist.tracks[i].ar[0].id,
          imgUrl: playlist.tracks[i].al.picUrl + '?param=32y32',
          time: playlist.tracks[i].dt
        }
      }
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
      headerDetail,
      hotCommentsDetail
    }
  }
})
</script>
