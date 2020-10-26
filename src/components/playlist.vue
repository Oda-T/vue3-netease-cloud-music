<template>
  <div>
    <!-- 概览 -->
    <header class="c-playlist-header mdui-typo">
      <img class="c-playlist-header-img" :src="headerDetail.coverImgUrl" :alt="headerDetail.description" />
      <div class="c-playlist-header-text">
        <h1>{{ headerDetail.name }}</h1>
        <p>最近更新：{{ headerDetail.updateTime }}</p>
        <p>{{ headerDetail.playCount }}次播放</p>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple"><i class="mdui-icon mdui-icon-left material-icons">add_to_queue</i>{{ headerDetail.shareCount }}</button>
        <button class="c-playlist-header-subscribedCount mdui-btn mdui-color-red-900 mdui-ripple">
          <i class="mdui-icon mdui-icon-left material-icons">share</i>{{ headerDetail.subscribedCount }}
        </button>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple"><i class="mdui-icon mdui-icon-left material-icons">sms</i>{{ headerDetail.commentCount }} </button>
        <h5 class="c-playlist-header-description">{{ headerDetail.description }}</h5>
      </div>
    </header>

    <!-- 歌曲详情 -->
    <div class="c-playlist-main mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
          <tr v-for="(item, index) in playlist" :key="item.id" @mouseenter="curIndex = index" @mouseleave="curIndex = -1">
            <td style="width:123px">
              <router-link :to="item.id"><img class="c-playlist-main-img" v-lazy="item.imgUrl" :alt="item.name"/></router-link>
            </td>
            <td style="width:674px;maxWidth:674px" class="mdui-text-truncate">
              <router-link :to="item.id">
                {{ item.name }}
              </router-link>
            </td>
            <td style="width:308px;maxWidth:308px" class="mdui-text-truncate">
              <router-link :to="item.artistUrl">
                {{ item.artist }}
              </router-link>
            </td>
            <td style="width:184px" class="c-playlist-main-table-btn">
              <div :class="{ btnShow: curIndex !== index }">
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add_to_queue</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">share</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">vertical_align_bottom</i></button>
              </div>
            </td>
            <td style="width:111px" class="mdui-table-col-numeric">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 评论 -->
    <div class="c-playlist-comments-title mdui-typo">
      <h2>评论</h2>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">说点什么</label>
        <input class="mdui-textfield-input" type="email" />
      </div>
    </div>
    <comments :commentsDetail="commentsDetail" />

    <!-- 分页 -->
    <pagination :pageCount="pageCount" @get-age-number="getPageNumber" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'

import Comments from './comments.vue'
import Pagination from './pagination.vue'

import mdui from 'mdui'
import axios from 'axios'

export default defineComponent({
  name: 'PlayList',
  components: {
    Comments,
    Pagination
  },
  props: {
    listId: Number
  },
  setup(props) {
    interface T {
      name: string
      id: string
      artist: string
      artistUrl: string
      imgUrl: string
      time: string
    }
    interface C {
      username: string
      useravatar: string
      content: string
      likedcount: number
      time: string
      usertype: number
      replied: {
        username: string | undefined
        content: string | undefined
      }
    }

    const headerDetail = ref({})
    const commentsDetail: Array<C> = reactive([])
    const pageCount = ref(0)

    const playlist: Array<T> = reactive([])
    const curIndex = ref(-1)

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const getDuoNum: (d: number) => string | number = d => {
      return d >= 10 ? d : `0${d}`
    }

    const handleDrTime: (d: number) => string = d => {
      const _d = Math.floor(d / 1000)
      return `${Math.floor(_d / 60)}:${getDuoNum(Math.floor(_d % 60))}`
    }

    const getTopListDetail: (id: number) => void = id => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${id}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist
            const _tracks = res.data.playlist.tracks

            headerDetail.value = {
              name: _res.name,
              coverImgUrl: _res.coverImgUrl + '?param=264y264',
              description: _res.description,
              trackCount: _res.trackCount,
              playCount: _res.playCount,
              shareCount: _res.shareCount,
              commentCount: _res.commentCount,
              subscribedCount: _res.subscribedCount,
              updateTime: handleTime(_res.updateTime)
            }

            for (let i = 0; i < _tracks.length; i++) {
              playlist[i] = {
                name: _tracks[i].name,
                id: '/song?id=' + _tracks[i].id,
                artist: _tracks[i].ar[0].name,
                artistUrl: '/artist?id' + _tracks[i].ar[0].id,
                imgUrl: _tracks[i].al.picUrl + '?param=32y32',
                time: handleDrTime(_tracks[i].dt)
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getComments: (id: number, n: number) => void = (id, n) => {
      axios({
        url: `http://localhost:3000/comment/playlist?id=${id}&limit=20&offset=${n}`
      }).then(res => {
        const _com = res.data.comments
        pageCount.value = Math.ceil(res.data.total / 20)

        commentsDetail.length = 0

        for (let i = 0; i < _com.length; i++) {
          commentsDetail[i] = {
            username: _com[i].user.nickname,
            useravatar: _com[i].user.avatarUrl + '?param=30y30',
            usertype: _com[i].user.userType,
            content: _com[i].content,
            likedcount: _com[i].likedCount,
            time: handleTime(_com[i].time),
            replied: {
              username: _com[i].beReplied.length ? _com[i].beReplied[0].user.nickname : undefined,
              content: _com[i].beReplied.length ? _com[i].beReplied[0].content : undefined
            }
          }
        }
      })
    }

    // 分页
    const getPageNumber: (n: number) => void = n => {
      props.listId && getComments(props.listId, 20 * (n - 1))
    }

    props.listId && getTopListDetail(props.listId)
    //首页评论
    props.listId && getComments(props.listId, 0)

    onMounted(() => {
      mdui.mutation()
    })

    return {
      curIndex,
      headerDetail,
      playlist,
      commentsDetail,
      pageCount,
      getPageNumber
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-header {
  position: relative;
  width: 1400px;
  margin: 0 auto;
  height: 360px;
  overflow: hidden;
  .c-playlist-header-img {
    position: absolute;
    left: 0px;
    top: 50px;
    width: 264px;
    height: 264px;
  }
  .c-playlist-header-text {
    position: absolute;
    left: 310px;
    top: 25px;

    .c-playlist-header-subscribedCount {
      margin: 0 50px;
    }
  }
}
.c-playlist-main {
  width: 1400px;
  margin: 0 auto;
  .c-playlist-main-img {
    vertical-align: middle;
  }
  .c-playlist-main-table-btn {
    height: 57px;
    overflow: hidden;
    opacity: 0.7;
  }
}
.c-playlist-comments-title {
  width: 1400px;
  margin: 100px auto 80px auto;
}
.btnShow {
  display: none;
}
</style>
