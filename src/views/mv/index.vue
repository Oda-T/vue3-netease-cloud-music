<template>
  <div id="mv">
    <play-list-header :headerDetail="headerDetail" @handle-play="videoShow = true" />
    <!-- 视频信息 -->
    <transition name="fade">
      <div v-if="videoShow" class="mv-video-container" @click.self="videoShow = false">
        <video :src="mvurl" class="mv-video" controls />
      </div>
    </transition>
    <!-- 评论 -->
    <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
    <!-- 分页 -->
    <pagination :pageCount="pageCount" @page-number="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'
import PlayListHeader from '../../components/playListHeader.vue'

import { headerDetailInt } from '../../type/playList.type'
import { commentsInt } from '../../type/comments.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Playlist',
  components: {
    Comments,
    Pagination,
    PlayListHeader
  },
  setup() {
    const route = useRoute()
    const mvurl = ref('')
    const videoShow = ref(false)
    const headerDetail = ref({} as headerDetailInt)
    const pageCount = ref(0)
    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])

    // 加载mv信息
    const getPlayList: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_MV_DETAIL', { 'mvid': n })

      headerDetail.value = {
        name: data.name,
        coverImgUrl: data.cover,
        updateTime: data.publishTime,
        artistName: data.artists,
        artistId: data.artistId,
        shareCount: data.shareCount,
        subscribedCount: data.subCount,
        commentCount: data.commentCount,
        playCount: data.playCount
      }
    }
    // 获取mv地址
    const getMvUrl: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_MV_URL', { 'id': n, 'r': 360 })
      mvurl.value = data.url
    }

    // 加载评论
    const getComments: (id: string, n?: number) => void = async (id, n = 0) => {
      commentsDetail.length = 0
      const { total, comments, hotComments } = await request['httpGET']('GET_COMMENT_MV', { 'id': id, 'limit': 20, 'offset': n })

      // 热门评论
      if (n === 0) {
        pageCount.value = Math.ceil(total / 20)
        for (let i = 0; i < hotComments.length; i++) {
          hotCommentsDetail[i] = {
            username: hotComments[i].user.nickname,
            useravatar: hotComments[i].user.avatarUrl,
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
      typeof route.query.id === 'string' && getComments(route.query.id, 20 * (n - 1))
      window.scrollTo({ top: 0 })
    }

    typeof route.query.id === 'string' && (getPlayList(route.query.id), getComments(route.query.id), getMvUrl(route.query.id))

    return {
      route,
      commentsDetail,
      hotCommentsDetail,
      pageCount,
      pageNumber,
      headerDetail,
      mvurl,
      videoShow
    }
  }
})
</script>
<style lang="less" scoped>
.mv-video-container {
  position: fixed;
  z-index: 9999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  .mv-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 450px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
