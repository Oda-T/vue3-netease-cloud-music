<template>
  <div>
    <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
    <div class="mdui-card-media" @mouseenter="toggleCardMenuShow" @mouseleave="toggleCardMenuHide">
      <router-link :to="item.id">
        <img :src="item.picUrl" />
      </router-link>
      <div class="c-card-menu-vert mdui-card-menu" :style="{ display: cCardMenuDisplay, opacity: cCardMenuOpacity }">
        <button class="mdui-btn mdui-btn-icon mdui-text-color-white c-card-menu-vert-btn"><i class="mdui-icon material-icons">more_vert</i></button>
      </div>
      <div class="c-card-menu-play" :style="{ display: cCardMenuDisplay, opacity: cCardMenuOpacity }">
        <button class="mdui-btn mdui-btn-icon mdui-text-color-white c-card-menu-play-btn"><i class="mdui-icon material-icons">play_arrow</i></button>
      </div>
    </div>

    <!-- 卡片的标题和副标题 -->
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title recommend-card-list-title">
        <i v-if="item.showIcon" style="border:1px solid red;border-radius:5px;font-size:13px;letter-spacing:-2px;margin-right:8px;padding:2px;">电台节目</i>
        <router-link :to="item.id" class="recommend-card-list-title-inner">{{ item.name }}</router-link>
      </div>
      <div class="mdui-card-primary-subtitle">{{ item.playCount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    item: Object
  },
  setup() {
    const cCardMenuDisplay = ref('none')
    const cCardMenuOpacity = ref('0')

    let timer: number

    const toggleCardMenuShow: () => void = () => {
      clearTimeout(timer)

      cCardMenuDisplay.value = 'block'
      setTimeout(() => {
        cCardMenuOpacity.value = '1'
      }, 10)
    }

    const toggleCardMenuHide: () => void = () => {
      cCardMenuOpacity.value = '0'
      timer = setTimeout(() => {
        cCardMenuDisplay.value = 'none'
      }, 500)
    }

    return {
      cCardMenuDisplay,
      cCardMenuOpacity,
      toggleCardMenuShow,
      toggleCardMenuHide
    }
  }
})
</script>

<style lang="less" scoped>
.c-card-menu-vert {
  transition: opacity 0.5s;
  display: none;
  opacity: 0;
  .c-card-menu-vert-btn {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
.c-card-menu-play {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1;
  transition: opacity 0.5s;
  display: none;
  opacity: 0;
  .c-card-menu-play-btn {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
.recommend-card-list-title {
  font-size: 16px;
  line-height: 28px;
  overflow: hidden;
  height: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  .recommend-card-list-title-inner {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
