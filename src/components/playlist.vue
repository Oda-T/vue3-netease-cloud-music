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
          <tr v-for="item in playlist" :key="item.id">
            <td>
              <router-link :to="item.id"><img class="c-playlist-main-img" :src="item.imgUrl" :alt="item.name"/></router-link>
            </td>
            <td>
              <router-link :to="item.id">
                {{ item.name }}
              </router-link>
            </td>
            <td>
              <router-link :to="item.artistUrl">
                {{ item.artist }}
              </router-link>
            </td>
            <td class="mdui-table-col-numeric">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'

import mdui from 'mdui'
import axios from 'axios'

export default defineComponent({
  name: 'PlayList',
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

    const headerDetail = ref({})

    const playlist: Array<T> = reactive([])

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getMonth() + 1}月${_d.getDate()}日`
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

            for (let i = 0; i < 100; i++) {
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

    props.listId && getTopListDetail(props.listId)

    onMounted(() => {
      mdui.mutation()
    })

    return {
      headerDetail,
      playlist
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-header {
  position: relative;
  width: 100%;
  height: 360px;
  overflow: hidden;
  .c-playlist-header-img {
    position: absolute;
    left: 135px;
    top: 50px;
    width: 264px;
    height: 264px;
  }
  .c-playlist-header-text {
    position: absolute;
    left: 450px;
    top: 24px;

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
}
</style>
