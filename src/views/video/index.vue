<template>
  <div id="mv">
    <play-list-header :headerDetail="headerDetail" @handle-play="videoShow = true" @handle-subscribe="handleSubscribe(id, 'video')" @handle-like="handleLike(id, 'video')" />
    <!-- 视频信息 -->
    <teleport to="#modals">
      <transition name="fade">
        <div v-if="videoShow" class="mv-video-container" @click.self="videoShow = false">
          <video :src="videoUrl" class="mv-video" controls />
        </div>
      </transition>
    </teleport>
    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_VIDEO'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import CommentsPagination from '../../components/commentsPagination.vue'
import { handleSubscribe, handleLike } from '../../utils/usePlayListHeader'

import { headerDetailInt } from '../../type/playList.type'
import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
import request from '../../api/index'

export default defineComponent({
  name: 'Video',
  components: {
    PlayListHeader,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const videoUrl = ref('')
    const videoShow = ref(false)
    const headerDetail = ref({} as headerDetailInt)
    const id = ref('')
    const renderDom = ref(Math.random())

    // 加载mv信息
    const getVideoDetail: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_VIDEO_DETAIL', { 'id': n })
      const info = await request['httpGET']('GET_VIDEO_DETAIL_INFO', { 'vid': n })
      headerDetail.value = {
        name: data.title,
        coverImgUrl: data.coverUrl,
        updateTime: data.publishTime,
        userName: data.creator.nickname,
        userId: data.creator.userId,
        subscribedCount: data.subscribeCount,
        playCount: data.playTime,
        shareCount: info.shareCount,
        likedCount: info.likedCount,
        liked: info.liked
      }
    }
    // 获取mv地址
    const getMvUrl: (n: string) => void = async n => {
      const { urls } = await request['httpGET']('GET_VIDEO_URL', { 'id': n })

      videoUrl.value = urls[0].url
    }

    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['视频'], v)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['视频'], n)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getVideoDetail(id.value), getMvUrl(id.value))

    return {
      route,
      headerDetail,
      videoUrl,
      videoShow,
      id,
      handleSubscribe,
      handleLike,
      renderDom,
      sendCommentsVal,
      thumbUp
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
