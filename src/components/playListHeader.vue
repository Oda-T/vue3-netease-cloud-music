<template>
  <!-- 概览 -->
  <div class="c-playlist-header g-card-container mdui-typo">
    <img v-if="headerDetail.coverImgUrl" class="c-playlist-header-img" :src="`${headerDetail.coverImgUrl}?param=200y200`" :alt="headerDetail.name" />
    <div v-if="headerDetail.name" class="c-playlist-header-text">
      <h3>{{ headerDetail.name }}</h3>
      <small v-if="headerDetail.album" style="vertical-align: bottom">
        专辑：
        <router-link v-if="headerDetail.album" :to="`/album?id=${headerDetail.albumId}`">
          {{ headerDetail.album }}
        </router-link>
        <br />
      </small>
      <small v-if="headerDetail.category">分类：{{ headerDetail.category }}<br /></small>
      <small v-if="headerDetail.updateTime">最近更新：{{ handleTime(headerDetail.updateTime) }}<br /></small>
      <small v-if="headerDetail.playCount">{{ headerDetail.playCount }}次播放<br /></small>
      <small v-if="headerDetail.artistName" style="vertical-align: bottom">
        歌手：
        <router-link :to="`/artist?id=${headerDetail.artistId}`">{{ handleArtistName(headerDetail.artistName) }}</router-link>
        <br />
      </small>
      <small v-else-if="headerDetail.userName" style="vertical-align: bottom">
        by：
        <router-link :to="`/user/home?id=${headerDetail.userId}`">{{ handleArtistName(headerDetail.userName) }}</router-link>
        <br />
      </small>
      <small v-if="headerDetail.description" class="c-playlist-header-description">{{ headerDetail.description }}<br /></small>
      <!-- 歌手描述 -->
      <p v-if="headerDetail.desc" class="c-playlist-header-desc mdui-typo">{{ headerDetail.desc }}</p>
      <!-- 播放按钮 -->
      <button v-else class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-btn-raised mdui-ripple" @click.stop="$emit('handle-play')">
        <i class="mdui-icon mdui-icon-left material-icons">play_arrow</i>播放
      </button>
      <!-- 其他按钮 -->
      <button v-if="typeof headerDetail.likedCount === 'number'" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.likedCount }">thumb_up</i><span v-if="headerDetail.likedCount">{{ headerDetail.likedCount }}</span>
      </button>
      <button v-if="typeof headerDetail.shareCount === 'number'" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.shareCount }">share</i><span v-if="headerDetail.shareCount">{{ headerDetail.shareCount }}</span>
      </button>
      <button v-if="typeof headerDetail.subscribedCount === 'number'" class="c-playlist-header-count mdui-btn mdui-color-red-900 mdui-ripple">
        <i class="mdui-icon material-icons" :class="{ 'mdui-icon-left': headerDetail.subscribedCount }">add_to_queue</i>
        <span v-if="headerDetail.subscribedCount">{{ headerDetail.subscribedCount }}</span>
      </button>
      <router-link class="c-playlist-header-count mdui-chip" v-for="(item, index) in headerDetail.tags" :key="index" :to="`/discover/playlist?cat=${encodeURIComponent(item)}`">
        <span class="mdui-chip-title">{{ item }}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { handleTime } from '../utils/time'
import { headerDetailInt } from '../type/playList.type'

export default defineComponent({
  name: 'playListHeader',
  props: {
    headerDetail: Object as PropType<headerDetailInt>
  },
  emits: ['handle-play'],
  setup() {
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
      handleArtistName,
      handleTime
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-header {
  position: relative;
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
    top: 50%;
    transform: translateY(-60%);
  }
  .c-playlist-header-count {
    margin-right: 40px;
  }
  .c-playlist-header-description {
    margin: 0.7em 0px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .c-playlist-header-desc {
    font-size: 0.9em;
  }
}
</style>
