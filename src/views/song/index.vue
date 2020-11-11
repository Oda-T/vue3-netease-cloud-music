<template>
  <div id="song">
    <!-- 详情 -->
    <play-list-header :headerDetail="headerDetail" />
    <play-list-detail :listDetail="listDetail" />
    <!-- 歌词 -->
    <div class="song-lyric-container mdui-panel mdui-panel-gapless" mdui-panel>
      <div class="mdui-panel-item">
        <div class="mdui-panel-item-header">
          <div class="mdui-panel-item-title">歌词</div>
          <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <div class="mdui-panel-item-body">
          <p v-if="lyric" v-html="lyric" style="line-height:30px"></p>
          <p v-else>无</p>
        </div>
      </div>
    </div>
    <!-- 评论、分页 -->
    <comments-pagination :reuqestURL="'GET_COMMENT_MUSIC'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import mdui from 'mdui'

import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'
import CommentsPagination from '../../components/commentsPagination.vue'

import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Song',
  components: {
    PlayListHeader,
    PlayListDetail,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])
    const lyric = ref('')

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

    const getSongDetail: (ids: string) => void = async ids => {
      const { songs } = await request['httpGET']('GET_SONG_DETAIL', { 'ids': ids })
      const { total } = await request['httpGET']('GET_COMMENT_MUSIC', { 'id': ids })
      const { lrc } = await request['httpGET']('GET_LYRIC', { 'id': ids })

      lrc && (lyric.value = lrc.lyric.replace(/\[.*\]/g, '<br />'))

      headerDetail.value = {
        name: songs[0].name,
        coverImgUrl: songs[0].al.picUrl,
        commentCount: total,
        album: songs[0].al.name,
        albumId: songs[0].al.id,
        artistName: handleArtistName(songs[0].ar),
        artistId: songs[0].ar[0].id
      }
    }

    typeof route.query.id === 'string' && getSongDetail(route.query.id)

    onMounted(() => {
      mdui.mutation()
    })

    return {
      route,
      headerDetail,
      listDetail,
      lyric
    }
  }
})
</script>
<style lang="less" scoped>
.song-lyric-container {
  width: 1400px;
  margin: 0 auto;
}
</style>
