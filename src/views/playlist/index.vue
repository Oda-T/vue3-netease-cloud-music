<template>
  <div id="playlist">
    <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
    <!-- 评论 -->
    <comments :commentsDetail="commentsDetail" />
    <!-- 分页 -->
    <pagination :pageCount="pageCount" @pagenumber="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import mdui from 'mdui'

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

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }
    const getDuoNum: (d: number) => string | number = d => {
      return d >= 10 ? d : `0${d}`
    }

    const handleDrTime: (d: number) => string = d => {
      const _d = Math.floor(d / 1000)
      return `${Math.floor(_d / 60)}:${getDuoNum(Math.floor(_d % 60))}`
    }

    const handleArtistName: (arr: Array<{ name: string }>) => string = arr => {
      if (arr.length === 1) {
        return arr[0].name
      }
      const _arr: Array<string> = []
      for (let i = 0; i < arr.length; i++) {
        _arr.push(arr[i].name)
      }
      return _arr.join('/')
    }

    // 获得歌单
    const getPlayList: (n: number) => void = async n => {
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n })

      const tracks = playlist.tracks

      headerDetail.value = {
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl + '?param=264y264',
        description: playlist.description,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        commentCount: playlist.commentCount,
        subscribedCount: playlist.subscribedCount,
        updateTime: handleTime(playlist.updateTime),
        tags: playlist.tags
      }

      for (let i = 0; i < tracks.length; i++) {
        listDetail[i] = {
          name: tracks[i].name,
          id: '/song?id=' + tracks[i].id,
          artist: handleArtistName(tracks[i].ar),
          artistUrl: '/artist?id' + tracks[i].ar[0].id,
          imgUrl: tracks[i].al.picUrl + '?param=32y32',
          time: handleDrTime(tracks[i].dt)
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
          useravatar: comments[i].user.avatarUrl + '?param=30y30',
          usertype: comments[i].user.userType,
          content: comments[i].content,
          likedcount: comments[i].likedCount,
          time: handleTime(comments[i].time),
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

    watchEffect(() => {
      route.query.id && (getPlayList(Number(route.query.id)), getComments(Number(route.query.id), 0))
    })
    onMounted(() => {
      mdui.mutation()
    })
    return {
      headerDetail,
      listDetail,
      commentsDetail,
      pageCount,
      pageNumber
    }
  }
})
</script>
<style lang="less" scoped></style>
