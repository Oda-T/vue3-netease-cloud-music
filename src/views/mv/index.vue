<template>
  <div id="mv">
    <play-list-header :headerDetail="headerDetail" @handle-play="videoShow = true" @handle-share="handleShare(id, 'mv', 'test')" @handle-subscribe="handleSubscribe(id, 'mv')" />
    <!-- 视频信息 -->

    <teleport to="#modals">
      <transition name="fade">
        <div v-if="videoShow" class="mv-video-container" @click.self="videoShow = false">
          <video :src="mvurl" class="mv-video" controls />
        </div>
      </transition>
    </teleport>

    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_MV'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import CommentsPagination from '../../components/commentsPagination.vue'

import { headerDetailInt } from '../../type/playList.type'
import { handleShare, handleSubscribe } from '../../utils/usePlayListHeader'

import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
import request from '../../api/index'

export default defineComponent({
  name: 'MV',
  components: {
    PlayListHeader,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const mvurl = ref('')
    const videoShow = ref(false)
    const headerDetail = ref({} as headerDetailInt)
    const id = ref('')
    const renderDom = ref(Math.random())

    // 加载mv信息
    const getMvDetail: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_MV_DETAIL', { 'mvid': n })

      headerDetail.value = {
        name: data.name,
        coverImgUrl: data.cover,
        updateTime: data.publishTime,
        artistName: data.artists,
        artistId: data.artistId,
        shareCount: data.shareCount,
        subscribedCount: data.subCount,
        playCount: data.playCount
      }
    }
    // 获取mv地址
    const getMvUrl: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_MV_URL', { 'id': n, 'r': 360 })
      mvurl.value = data.url
    }

    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['mv'], v)
      renderDom.value = Math.random()
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['mv'], n)
      renderDom.value = Math.random()
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getMvDetail(id.value), getMvUrl(id.value))

    return {
      headerDetail,
      mvurl,
      videoShow,
      handleShare,
      handleSubscribe,
      id,
      sendCommentsVal,
      thumbUp,
      renderDom
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
