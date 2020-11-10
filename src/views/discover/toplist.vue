<template>
  <div id="discoverToplist">
    <div v-if="!topListId">
      <!-- 特色榜单 -->
      <recommend :topTitle="'特色音乐榜'" :activeName="specialActiveName" :topList="specialList" :cardList="specialCardList" @get-id="getIdCallBackSpecial"></recommend>
      <!-- 全球媒体榜单 -->
      <recommend :topTitle="'全球媒体榜'" :activeName="globalActiveName" :topList="globalList" :cardList="globalCardList" @get-id="getIdCallBackGlobal"></recommend>
    </div>
    <!-- 榜单详情 -->
    <div v-else>
      <play-list-header :headerDetail="headerDetail" />
      <play-list-detail :listDetail="listDetail" />
      <!-- 评论 -->
      <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
      <!-- 分页 -->
      <pagination :pageCount="pageCount" @page-number="pageNumber" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Recommend from '../../components/recommend.vue'
import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { commentsInt } from '../../type/comments.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'discoverTopList',
  components: {
    Recommend,
    Comments,
    Pagination,
    PlayListHeader,
    PlayListDetail
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    const specialList: Array<topListInt> = reactive([])
    const specialCardList: Array<cardListInt> = reactive([])
    const specialActiveName = ref('云音乐飙升榜')

    const globalList: Array<topListInt> = reactive([])
    const globalCardList: Array<cardListInt> = reactive([])
    const globalActiveName = ref('云音乐说唱榜')

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
      const _l = playlist.tracks.length < 10 ? playlist.tracks.length : 10

      for (let i = 0; i < _l; i++) {
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
      for (let i = 5; i < store.state.topListFull.length; i++) {
        globalList[i - 5] = store.state.topListFull[i]
      }
      getPlayList(globalList[0].id, globalCardList)
    }

    const getIdCallBackSpecial: (n: { id: number; name: string }) => void = n => {
      specialActiveName.value = n.name

      getPlayList(n.id, specialCardList)
    }

    const getIdCallBackGlobal: (n: { id: number; name: string }) => void = n => {
      globalActiveName.value = n.name

      getPlayList(n.id, globalCardList)
    }

    const getTopListFull: () => void = async () => {
      // 获取音乐榜媒体榜缓存
      if (store.state.topListFull.length) {
        getSpecialList()
        getGlobalList()
      } else {
        await store.dispatch('getTopListFull')
        getSpecialList()
        getGlobalList()
      }
    }

    const getComments: (id: string, n: number) => void = async (id, n) => {
      commentsDetail.length = 0

      const { total, comments } = await request['httpGET']('GET_COMMENT_PLAYLIST', { 'id': id, 'limit': 20, 'offset': n })

      pageCount.value = Math.ceil(total / 20)

      for (let i = 0; i < comments.length; i++) {
        commentsDetail[i] = {
          username: comments[i].user.nickname,
          useravatar: comments[i].user.avatarUrl,
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

    const getTopListDetail: (id: string) => void = async id => {
      listDetail.length = 0

      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': id })

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
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
          artistUrl: '/artist?id=' + playlist.tracks[i].ar[0].id,
          imgUrl: playlist.tracks[i].al.picUrl,
          time: playlist.tracks[i].dt
        }
      }
    }

    const pageNumber: (n: number) => void = n => {
      typeof route.query.id === 'string' && getComments(route.query.id, 20 * (n - 1))
    }

    getTopListFull()

    // 观测route
    watchEffect(() => {
      route.path === '/discover/toplist' && typeof route.query.id === 'string'
        ? ((topListId.value = Number(route.query.id)), getComments(route.query.id, 0), getTopListDetail(route.query.id), window.scrollTo({ top: 0 }))
        : ((topListId.value = 0), window.scrollTo({ top: 0 }))
    })

    return {
      specialList,
      specialCardList,
      specialActiveName,
      globalList,
      globalCardList,
      globalActiveName,
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
