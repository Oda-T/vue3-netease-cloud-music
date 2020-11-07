<template>
  <!-- 概览 -->
  <div class="c-playlist-header mdui-typo">
    <img class="c-playlist-header-img" :src="`${headerDetail.coverImgUrl}?param=200y200`" :alt="headerDetail.name" />
    <div class="c-playlist-header-text">
      <h1>{{ headerDetail.name }}</h1>
      <p v-if="headerDetail.album">
        专辑：
        <router-link :to="`/album?id=${headerDetail.albumId}`">
          {{ headerDetail.album }}
        </router-link>
      </p>
      <p v-if="headerDetail.category">分类：{{ headerDetail.category }}</p>
      <p v-if="headerDetail.updateTime">最近更新：{{ handleTime(headerDetail.updateTime) }}</p>
      <p v-if="headerDetail.playCount">{{ headerDetail.playCount }}次播放</p>
      <p v-if="headerDetail.artistName">
        歌手：
        <router-link :to="`/artist?id=${headerDetail.artistId}`">{{ handleArtistName(headerDetail.artistName) }}</router-link>
      </p>
      <!-- 歌手描述 -->
      <p v-if="headerDetail.desc" class="c-playlist-header-desc mdui-typo">{{ headerDetail.desc }}</p>
      <!-- 专辑描述 -->
      <button class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-btn-raised mdui-ripple" @click.stop="handlePlay">
        <i class="mdui-icon mdui-icon-left material-icons">play_arrow</i>播放
      </button>
      <button v-if="headerDetail.likedCount === 0 ? true : headerDetail.likedCount" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon  material-icons" :class="{ 'mdui-icon-left': headerDetail.likedCount }">thumb_up</i><span v-if="headerDetail.likedCount">{{ headerDetail.likedCount }}</span>
      </button>
      <button v-if="headerDetail.shareCount === 0 ? true : headerDetail.shareCount" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon  material-icons" :class="{ 'mdui-icon-left': headerDetail.shareCount }">share</i><span v-if="headerDetail.shareCount">{{ headerDetail.shareCount }}</span>
      </button>
      <button v-if="headerDetail.subscribedCount === 0 ? true : headerDetail.subscribedCount" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.subscribedCount }">add_to_queue</i
        ><span v-if="headerDetail.subscribedCount">{{ headerDetail.subscribedCount }}</span>
      </button>
      <button v-if="headerDetail.commentCount === 0 ? true : headerDetail.commentCount" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.commentCount }">sms</i><span v-if="headerDetail.commentCount">{{ headerDetail.commentCount }}</span>
      </button>
      <router-link class="c-playlist-header-count mdui-chip" v-for="item in headerDetail.tags" :key="item.id" :to="`/discover/playlist?cat=${encodeURIComponent(item)}`">
        <span class="mdui-chip-title">{{ item }}</span>
      </router-link>
      <h5 class="c-playlist-header-description">{{ headerDetail.description }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'playListHeader',
  props: {
    headerDetail: Object
  },
  setup(prop, { emit }) {
    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const handlePlay: () => void = () => {
      emit('handle-play')
    }

    // 多个作者用/分割
    const handleArtistName: (arr: string | Array<{ name: string }>) => string = arr => {
      if (typeof arr === 'string') {
        return arr
      } else {
        if (arr.length === 1) {
          return arr[0].name
        }
        const _arr: Array<string> = []
        for (let i = 0; i < arr.length; i++) {
          _arr.push(arr[i].name)
        }
        return _arr.join('/')
      }
    }

    return {
      handleTime,
      handlePlay,
      handleArtistName
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
  }
  .c-playlist-header-count {
    margin-right: 40px;
  }
  .c-playlist-header-description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .c-playlist-header-desc {
    width: 1090px;
    height: 190px;
  }
}
</style>
