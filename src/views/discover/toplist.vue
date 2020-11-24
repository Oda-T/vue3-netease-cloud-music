<template>
  <div id="discoverToplist">
    <div v-if="!topListId">
      <!-- 特色榜单 -->
      <Recommend :topTitle="'特色音乐榜'" :activeName="specialActiveName" :topList="specialList" :cardList="specialCardList" @get-id="getIdCallBackSpecial" />
      <!-- 全球媒体榜单 -->
      <Recommend :topTitle="'全球媒体榜'" :activeName="globalActiveName" :topList="globalList" :cardList="globalCardList" @get-id="getIdCallBackGlobal" />
    </div>
    <!-- 榜单详情 -->
    <div v-else>
      <PlayListHeader
        :headerDetail="headerDetail"
        @handle-play="handlePlay(topList)"
        @handle-share="handleShare(topListId, 'playlist', 'test')"
        @handle-subscribe="handleSubscribe(topListId, 'playlist')"
      />
      <PlayListDetail :listDetail="listDetail" @handle-list-play="handlePlay" @handle-list-share="handleShare" />
      <!-- 评论、分页 -->
      <CommentsPagination :reuqestURL="'GET_COMMENT_PLAYLIST'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Recommend from '../../components/recommend.vue'
import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'

import CommentsPagination from '../../components/commentsPagination.vue'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import { handlePlay, handleShare, handleSubscribe } from '../../utils/usePlayListHeader'

import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
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
    const topListFull = computed(() => store.state.topListFull)
    const listDetail: Array<playListInt> = reactive([])

    const topList: Array<string> = reactive([])
    const topListId = ref('')
    const renderDom = ref(Math.random())

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
        specialList[i] = topListFull.value[i]
      }
      getPlayList(specialList[0].id, specialCardList)
    }

    // getGlobalList
    const getGlobalList: () => void = () => {
      for (let i = 5; i < topListFull.value.length; i++) {
        globalList[i - 5] = topListFull.value[i]
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
      if (sessionStorage.topListFull) {
        store.commit('setTopListFull', JSON.parse(sessionStorage.topListFull))
      } else {
        await store.dispatch('getTopListFull')
      }

      getSpecialList()
      getGlobalList()
    }

    const getTopListDetail: (id: string) => void = async id => {
      listDetail.length = 0
      topList.length = 0
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': id })

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        subscribedCount: playlist.subscribedCount,
        updateTime: playlist.updateTime,
        subscribed: playlist.subscribed
      }

      for (let i = 0; i < playlist.tracks.length; i++) {
        listDetail[i] = {
          name: playlist.tracks[i].name,
          id: '/song?id=' + playlist.tracks[i].id,
          artist: playlist.tracks[i].ar[0].name,
          artistUrl: '/artist?id=' + playlist.tracks[i].ar[0].id,
          imgUrl: playlist.tracks[i].al.picUrl,
          time: playlist.tracks[i].dt
        }
        topList[i] = playlist.tracks[i].id.toString()
      }
    }

    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(topListId.value, commentsEnum['歌单'], v)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(topListId.value, commentsEnum['歌单'], n)
      nextTick(() => {
        renderDom.value = Math.random()
      })
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
      headerDetail,
      handlePlay,
      handleShare,
      handleSubscribe,
      topList,
      sendCommentsVal,
      thumbUp,
      renderDom
    }
  }
})
</script>
