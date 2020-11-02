<template>
  <div id="album">
    <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
    <!-- 评论 -->
    <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
    <!-- 分页 -->
    <pagination :pageCount="pageCount" @pagenumber="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import mdui from 'mdui'

import PlayList from '../../components/playlist.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

import { commentsInt } from '../../type/comments.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Album',
  components: {
    PlayList,
    Comments,
    Pagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: playListInt[] = reactive([])
    const pageCount = ref(0)
    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])

    const getPlayList: (n: number) => void = async n => {
      const { album, songs } = await request['httpGET']('GET_ALBUM', { 'id': n })

      headerDetail.value = {
        name: album.name,
        coverImgUrl: album.picUrl + '?param=264y264',
        description: album.description,
        trackCount: album.trackCount,
        playCount: album.playCount,
        shareCount: album.info.shareCount,
        commentCount: album.info.commentCount,
        subscribedCount: album.mark,
        updateTime: album.publishTime,
        artistName: album.artist.name,
        artistId: album.artist.id,
        tags: album.tags
      }

      for (let i = 0; i < songs.length; i++) {
        listDetail[i] = {
          name: songs[i].name,
          id: '/song?id=' + songs[i].id,
          artist: songs[i].ar,
          artistUrl: '/artist?id' + songs[i].ar[0].id,
          imgUrl: songs[i].al.picUrl + '?param=32y32',
          time: songs[i].dt
        }
      }
    }

    // 加载评论
    const getComments: (id: number, n?: number) => void = async (id, n = 0) => {
      commentsDetail.length = 0
      const { total, comments, hotComments } = await request['httpGET']('GET_COMMENT_ALBUM', { 'id': id, 'limit': 20, 'offset': n })

      pageCount.value = Math.ceil(total / 20)
      // 热门评论
      if (n === 0) {
        for (let i = 0; i < hotComments.length; i++) {
          hotCommentsDetail[i] = {
            username: hotComments[i].user.nickname,
            useravatar: hotComments[i].user.avatarUrl + '?param=30y30',
            usertype: hotComments[i].user.userType,
            content: hotComments[i].content,
            liked: hotComments[i].liked,
            likedcount: hotComments[i].likedCount,
            time: hotComments[i].time,
            replied: {
              username: hotComments[i].beReplied.length ? hotComments[i].beReplied[0].user.nickname : undefined,
              content: hotComments[i].beReplied.length ? hotComments[i].beReplied[0].content : undefined
            }
          }
        }
      } else {
        hotCommentsDetail.length = 0
      }

      // 最新评论
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

    const pageNumber: (n: number) => void = n => {
      getComments(Number(route.query.id), 20 * (n - 1))
    }
    // 单碟 album?id=n
    route.query.id && (getPlayList(Number(route.query.id)), getComments(Number(route.query.id)))

    onMounted(() => {
      mdui.mutation()
    })
    return {
      headerDetail,
      listDetail,
      commentsDetail,
      hotCommentsDetail,
      pageCount,
      pageNumber
    }
  }
})
</script>
<style lang="less" scoped></style>
