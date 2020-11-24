<template>
  <div id="song">
    <!-- 详情 -->
    <PlayListHeader :headerDetail="headerDetail" @handle-play="handlePlay(id)" />
    <!-- 歌词 -->
    <div class="g-card-container song-lyric-container mdui-panel mdui-panel-gapless" mdui-panel>
      <div class="mdui-panel-item">
        <div class="mdui-panel-item-header">
          <div class="mdui-panel-item-title">歌词</div>
          <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <div class="mdui-panel-item-body">
          <small v-if="lyric" v-html="lyric" style="line-height: 30px"></small>
          <small v-else>无</small>
        </div>
      </div>
    </div>
    <!-- 评论、分页 -->
    <CommentsPagination :reuqestURL="'GET_COMMENT_MUSIC'" @get-comments-val="sendCommentsVal" @thumb-up="thumbUp" :key="renderDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import mdui from 'mdui'

import PlayListHeader from '../../components/playListHeader.vue'
import CommentsPagination from '../../components/commentsPagination.vue'
import { handlePlay } from '../../utils/usePlayListHeader'

import { headerDetailInt } from '../../type/playList.type'
import { commentsEnum } from '../../enum/comments'
import { useSendComments, useCommentsLike } from '../../utils/comments'
import request from '../../api/index'

export default defineComponent({
  name: 'Song',
  components: {
    PlayListHeader,
    CommentsPagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const lyric = ref('')
    const id = ref('')
    const renderDom = ref(Math.random())

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
      const { lrc } = await request['httpGET']('GET_LYRIC', { 'id': ids })
      const { success } = await request['httpGET']('GET_CHECK_MUSIC', { 'id': ids })

      lrc && (lyric.value = lrc.lyric.replace(/\[.*\]/g, '<br />'))

      headerDetail.value = {
        name: songs[0].name,
        coverImgUrl: songs[0].al.picUrl,
        album: songs[0].al.name,
        albumId: songs[0].al.id,
        artistName: handleArtistName(songs[0].ar),
        artistId: songs[0].ar[0].id,
        disabled: !success
      }
    }
    const sendCommentsVal: (v: string) => void = async v => {
      await useSendComments(id.value, commentsEnum['歌曲'], v)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    const thumbUp: (n: number) => void = async n => {
      await useCommentsLike(id.value, commentsEnum['歌曲'], n)
      nextTick(() => {
        renderDom.value = Math.random()
      })
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getSongDetail(id.value))

    onMounted(() => {
      mdui.mutation()
    })

    return {
      route,
      headerDetail,
      lyric,
      handlePlay,
      id,
      sendCommentsVal,
      renderDom,
      thumbUp
    }
  }
})
</script>
<style lang="less" scoped>
.song-lyric-container {
  margin: 0 auto;
}
</style>
