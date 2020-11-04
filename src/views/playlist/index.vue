<template>
  <div id="playlist">
    <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
    <!-- 评论 -->
    <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
    <!-- 分页 -->
    <pagination :pageCount="pageCount" @page-number="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayList from '../../components/playlist.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

import { commentsInt } from '../../type/comments.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Playlist',
  components: {
    PlayList,
    Comments,
    Pagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])
    const pageCount = ref(0)
    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])

    // 获得歌单
    const getPlayList: (n: number) => void = async n => {
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n })

      const tracks = playlist.tracks

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        commentCount: playlist.commentCount,
        subscribedCount: playlist.subscribedCount,
        updateTime: playlist.updateTime,
        tags: playlist.tags
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
      }
    }

    // 加载评论
    const getComments: (id: number, n: number) => void = async (id, n) => {
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

    const pageNumber: (n: number) => void = n => {
      getComments(Number(route.query.id), 20 * (n - 1))
    }

    route.query.id && (getPlayList(Number(route.query.id)), getComments(Number(route.query.id), 0))

    return {
      route,
      headerDetail,
      listDetail,
      commentsDetail,
      pageCount,
      pageNumber,
      hotCommentsDetail
    }
  }
})
</script>
<style lang="less" scoped></style>
