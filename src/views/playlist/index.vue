<template>
  <div id="playlist">
    <play-list-header :headerDetail="headerDetail" />
    <play-list-detail :listDetail="listDetail" />

    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_PLAYLIST'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'
import CommentsPagination from '../../components/commentsPagination.vue'

import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Playlist',
  components: {
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])

    // 获得歌单
    const getPlayList: (n: string) => void = async n => {
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n, 'timestamp': Date.now() })

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

    typeof route.query.id === 'string' && getPlayList(route.query.id)

    return {
      headerDetail,
      listDetail
    }
  }
})
</script>
<style lang="less" scoped></style>
