<template>
  <div id="album">
    <play-list-header :headerDetail="headerDetail" @handle-play="handlePlay(albumList)" @handle-share="handleShare(id, 'album', 'test')" @handle-subscribe="handleSubscribe(id, 'album')" />
    <play-list-detail :listDetail="listDetail" @handle-list-play="handlePlay" @handle-list-share="handleShare" />

    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_ALBUM'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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
  name: 'Album',
  components: {
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: playListInt[] = reactive([])
    const albumList: Array<string> = reactive([])
    const id = ref('')
    const renderDom = ref(Math.random())

    const getAlbumList: (n: string) => void = async n => {
      albumList.length = 0
      const { album, songs } = await request['httpGET']('GET_ALBUM', { 'id': n })
      headerDetail.value = {
        name: album.name,
        coverImgUrl: album.picUrl,
        description: album.description,
        trackCount: album.trackCount,
        playCount: album.playCount,
        shareCount: album.info.shareCount,
        subscribedCount: album.mark,
        updateTime: album.publishTime,
        artistName: album.artist.name,
        artistId: album.artist.id,
        tags: album.tags,
        subscribed: album.subscribed
      }

      for (let i = 0; i < songs.length; i++) {
        listDetail[i] = {
          name: songs[i].name,
          id: '/song?id=' + songs[i].id,
          artist: songs[i].ar,
          artistUrl: '/artist?id=' + songs[i].ar[0].id,
          imgUrl: songs[i].al.picUrl,
          time: songs[i].dt
        }
        albumList[i] = songs[i].id
      }
    }

    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['专辑'], v)
      renderDom.value = Math.random()
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['专辑'], n)
      renderDom.value = Math.random()
    }

    // 单碟 album?id=n
    typeof route.query.id === 'string' && ((id.value = route.query.id), getAlbumList(id.value))

    return {
      headerDetail,
      listDetail,
      handlePlay,
      handleShare,
      handleSubscribe,
      albumList,
      id,
      thumbUp,
      sendCommentsVal,
      renderDom
    }
  }
})
</script>
