<template>
  <div id="playlist">
    <PlayListHeader :headerDetail="headerDetail" @handle-play="handlePlay(songList)" @handle-share="handleShare(id, 'playlist', 'test')" @handle-subscribe="handleSubscribe(id, 'playlist')" />
    <PlayListDetail :listDetail="listDetail" @handle-list-play="handlePlay" @handle-list-share="handleShare" />

    <!-- 评论、分页 -->
    <CommentsPagination :reuqestURL="'GET_COMMENT_PLAYLIST'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'
import CommentsPagination from '../../components/commentsPagination.vue'

import { playListInt, headerDetailInt } from '../../type/playList.type'
import { handlePlay, handleShare, handleSubscribe } from '../../utils/usePlayListHeader'

import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
import request from '../../api/index'

export default defineComponent({
  name: 'Playlist',
  components: {
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])
    const songList: Array<string> = reactive([])
    const id = ref('')
    const renderDom = ref(Math.random())

    // 获得歌单
    const getPlayList: (n: string) => void = async n => {
      songList.length = 0
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n })
      const tracks = playlist.tracks

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        subscribedCount: playlist.subscribedCount,
        updateTime: playlist.updateTime,
        tags: playlist.tags,
        subscribed: playlist.subscribed
      }

      for (let i = 0; i < tracks.length; i++) {
        listDetail[i] = {
          name: tracks[i].name,
          id: '/song?id=' + tracks[i].id,
          artist: tracks[i].ar,
          artistUrl: '/artist?id=' + tracks[i].ar[0].id,
          imgUrl: tracks[i].al.picUrl,
          time: tracks[i].dt
        }
        songList[i] = tracks[i].id.toString()
      }
    }
    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['歌单'], v)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['歌单'], n)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getPlayList(id.value))

    return {
      headerDetail,
      listDetail,
      handlePlay,
      handleShare,
      handleSubscribe,
      songList,
      id,
      sendCommentsVal,
      thumbUp,
      renderDom
    }
  }
})
</script>
