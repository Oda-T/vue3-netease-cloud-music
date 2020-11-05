<template>
  <div id="song">
    <!-- 详情 -->
    <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
    <!-- 歌词 -->
    <div class="c-song-lyric-container mdui-panel mdui-panel-popout" mdui-panel>
      <div class="mdui-panel-item">
        <div class="mdui-panel-item-header">
          <div class="mdui-panel-item-title">歌词</div>
          <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <div class="mdui-panel-item-body">
          <p v-if="lyric">{{ lyric }}</p>
          <p v-else>无</p>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" />
    <!-- 分页 -->
    <pagination :pageCount="pageCount" @page-number="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import mdui from 'mdui'

import PlayList from '../../components/playlist.vue'
import Comments from '../../components/comments.vue'
import Pagination from '../../components/pagination.vue'

import { commentsInt } from '../../type/comments.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Song',
  components: {
    PlayList,
    Comments,
    Pagination
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])
    const lyric = ref('')
    const pageCount = ref(0)
    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])
    const id = ref('')

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

      lyric.value = lrc

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
    const getComments: (id: string, n?: number) => void = async (id, n = 0) => {
      commentsDetail.length = 0

      const { total, comments, hotComments } = await request['httpGET']('GET_COMMENT_MUSIC', { 'id': id, 'offset': n })

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
      getComments(id.value, 20 * (n - 1))
      window.scrollTo({ top: 0 })
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getSongDetail(id.value), getComments(id.value))

    onMounted(() => {
      mdui.mutation()
    })

    return {
      route,
      headerDetail,
      listDetail,
      lyric,
      commentsDetail,
      hotCommentsDetail,
      pageCount,
      pageNumber,
      id
    }
  }
})
</script>
<style lang="less" scoped>
.c-song-lyric-container {
  width: 1400px;
  margin: 0 auto;
}
</style>
