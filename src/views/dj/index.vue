<template>
  <div id="dj">
    <play-list-header :headerDetail="headerDetail" />
    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_DJ'" />
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
  name: 'Dj',
  components: {
    PlayListHeader,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)

    // 获得歌单
    const getPlayList: (n: string) => void = async n => {
      const { program } = await request['httpGET']('GET_DJ_PROGRAM_DETAIL', { 'id': n })

      headerDetail.value = {
        name: program.name,
        coverImgUrl: program.coverUrl,
        category: program.radio.category,
        description: program.description,
        likedCount: program.likedCount,
        shareCount: program.shareCount,
        subscribedCount: program.subCount,
        updateTime: program.createTime
      }
    }

    typeof route.query.id === 'string' && getPlayList(route.query.id)

    return {
      route,
      headerDetail
    }
  }
})
</script>
