<template>
  <div id="dj">
    <play-list-header :headerDetail="headerDetail" @handle-play="handlePlay(id)" @handle-share="handleShare(id, 'djprogram', 'test')" @handle-like="handleLike(id, 'djprogram')" />
    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_DJ'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'

import CommentsPagination from '../../components/commentsPagination.vue'

import { headerDetailInt } from '../../type/playList.type'
import { handlePlay, handleShare, handleLike } from '../../utils/usePlayListHeader'

import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
import request from '../../api/index'

export default defineComponent({
  name: 'Dj',
  components: {
    PlayListHeader,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const id = ref('')
    const renderDom = ref(Math.random())

    // 获得详情
    const getHeaderDetail: (n: string) => void = async n => {
      const { program } = await request['httpGET']('GET_DJ_PROGRAM_DETAIL', { 'id': n })

      headerDetail.value = {
        name: program.name,
        coverImgUrl: program.coverUrl,
        category: program.radio.category,
        description: program.description,
        likedCount: program.likedCount,
        liked: program.liked,
        shareCount: program.shareCount,
        subscribedCount: program.subscribedCount,
        updateTime: program.createTime,
        subscribed: program.subscribed
      }
    }

    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['电台'], v)
      renderDom.value = Math.random()
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['电台'], n)
      renderDom.value = Math.random()
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getHeaderDetail(route.query.id))

    return {
      route,
      headerDetail,
      handlePlay,
      handleShare,
      handleLike,
      id,
      sendCommentsVal,
      thumbUp,
      renderDom
    }
  }
})
</script>
