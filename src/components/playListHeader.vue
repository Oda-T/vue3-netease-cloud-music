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
      <p v-if="headerDetail.updateTime">最近更新：{{ handleTime(headerDetail.updateTime) }}</p>
      <p v-if="headerDetail.playCount">{{ headerDetail.playCount }}次播放</p>
      <p v-if="headerDetail.artistName">
        歌手：
        <router-link :to="`/artist?id=${headerDetail.artistId}`">{{ headerDetail.artistName }}</router-link>
      </p>
      <!-- 歌手描述 -->
      <p v-if="headerDetail.desc" class="c-playlist-header-desc mdui-typo">{{ headerDetail.desc }}</p>
      <!-- 专辑描述 -->
      <div v-if="headerDetail.description">
        <button class="c-playlist-header-play mdui-btn mdui-color-red-900 mdui-btn-raised mdui-ripple" @click.stop="handlePlay">
          <i class="mdui-icon mdui-icon-left material-icons">play_arrow</i>播放
        </button>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple">
          <i class="mdui-icon  material-icons" :class="{ 'mdui-icon-left': headerDetail.shareCount }">add_to_queue</i><span v-if="headerDetail.shareCount">{{ headerDetail.shareCount }}</span>
        </button>
        <button class="c-playlist-header-subscribedCount mdui-btn mdui-color-red-900 mdui-ripple">
          <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.subscribedCount }">share</i><span v-if="headerDetail.subscribedCount">{{ headerDetail.subscribedCount }}</span>
        </button>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple">
          <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.commentCount }">sms</i><span v-if="headerDetail.commentCount">{{ headerDetail.commentCount }}</span>
        </button>

        <router-link class="c-playlist-header-tags mdui-chip" v-for="item in headerDetail.tags" :key="item.id" :to="`/discover/playlist?cat=${encodeURIComponent(item)}`">
          <span class="mdui-chip-title">{{ item }}</span>
        </router-link>

        <h5 class="c-playlist-header-description">{{ headerDetail.description }}</h5>
      </div>
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

    return {
      handleTime,
      handlePlay
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

    .c-playlist-header-play {
      margin-right: 50px;
    }

    .c-playlist-header-subscribedCount {
      margin: 0 50px;
    }
  }
  .c-playlist-header-tags {
    margin-left: 50px;
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
