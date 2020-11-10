<template>
  <div id="mv">
    <play-list-header :headerDetail="headerDetail" @handle-play="videoShow = true" />
    <!-- 视频信息 -->
    <transition name="fade">
      <div v-if="videoShow" class="mv-video-container" @click.self="videoShow = false">
        <video :src="mvurl" class="mv-video" controls />
      </div>
    </transition>
    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_MV'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import CommentsPagination from '../../components/commentsPagination.vue'

import { headerDetailInt } from '../../type/playList.type'

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

    typeof route.query.id === 'string' && (getPlayList(route.query.id), getMvUrl(route.query.id))

    return {
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
