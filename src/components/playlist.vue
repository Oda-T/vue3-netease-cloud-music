<template>
  <div>
    <header class="c-playlist-header mdui-typo">
      <img class="c-playlist-header-img" :src="`${headerDetail.coverImgUrl}?param=264y264'`" :alt="headerDetail.description" />
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PlayList',
  props: {
    listId: Number
  },
  setup(props) {
    const headerDetail = reactive({
      name: String,
      coverImgUrl: String,
      description: String,
      trackCount: Number,
      playCount: Number,
      shareCount: Number,
      commentCount: Number,
      subscribedCount: Number,
      updateTime: String
    })

    const handleTime: (d: number) => any = d => {
      const _d = new Date(d)
      return `${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const getTopListDetail: (id: number) => void = id => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${id}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist
            console.log(res.data.playlist)
            headerDetail.name = _res.name
            headerDetail.coverImgUrl = _res.coverImgUrl
            headerDetail.description = _res.description
            headerDetail.trackCount = _res.trackCount
            headerDetail.playCount = _res.playCount
            headerDetail.shareCount = _res.shareCount
            headerDetail.commentCount = _res.commentCount
            headerDetail.subscribedCount = _res.subscribedCount
            headerDetail.updateTime = handleTime(_res.updateTime)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    props.listId && getTopListDetail(props.listId)
    return {
      headerDetail
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-header {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  .c-playlist-header-img {
    position: absolute;
    left: 135px;
    top: 50px;
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
</style>
