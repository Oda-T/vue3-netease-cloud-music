<template>
  <div id="album">
    <play-list-header :headerDetail="headerDetail" />
    <play-list-detail :listDetail="listDetail" />

    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_ALBUM'" />
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
  name: 'Album',
  components: {
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: playListInt[] = reactive([])

    const getPlayList: (n: string) => void = async n => {
      const { album, songs } = await request['httpGET']('GET_ALBUM', { 'id': n })
      headerDetail.value = {
        name: album.name,
        coverImgUrl: album.picUrl,
        description: album.description,
        trackCount: album.trackCount,
        playCount: album.playCount,
        shareCount: album.info.shareCount,
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
          artistUrl: '/artist?id=' + songs[i].ar[0].id,
          imgUrl: songs[i].al.picUrl,
          time: songs[i].dt
        }
      }
    }

    // 单碟 album?id=n
    typeof route.query.id === 'string' && getPlayList(route.query.id)

    return {
      headerDetail,
      listDetail
    }
  }
})
</script>
<style lang="less" scoped></style>
