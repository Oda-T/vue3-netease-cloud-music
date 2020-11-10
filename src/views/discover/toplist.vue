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
      <!-- 评论、分页 -->
      <comments-pagination :reuqestURL="'GET_COMMENT_PLAYLIST'" />
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

import CommentsPagination from '../../components/commentsPagination.vue'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'discoverTopList',
  components: {
    Recommend,
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
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

    const headerDetail = ref({} as headerDetailInt)

    const listDetail: Array<playListInt> = reactive([])

    const topListId = ref('')

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

    getTopListFull()

    // 观测route
    watchEffect(() => {
      route.path === '/discover/toplist' && typeof route.query.id === 'string'
        ? ((topListId.value = route.query.id), getTopListDetail(route.query.id), window.scrollTo({ top: 0 }))
        : ((topListId.value = ''), window.scrollTo({ top: 0 }))
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
      listDetail,
      headerDetail
    }
  }
})
</script>
