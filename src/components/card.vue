<template>
  <div class="c-card-item mdui-card mdui-hoverable">
    <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
    <div class="c-card-item-media mdui-card-media" @mouseenter="btnShow = !btnShow" @mouseleave="btnShow = !btnShow">
      <router-link :to="item.id">
        <img v-lazy="`${item.picUrl}?param=150y150&quality=70`" />
      </router-link>
      <transition name="fade">
        <div v-show="btnShow" class="mdui-card-menu">
          <slot></slot>
        </div>
      </transition>
    </div>
    <!-- 卡片的标题和副标题 -->
    <div class="c-card-item-primary mdui-card-primary">
      <div class="mdui-card-primary-title mdui-text-truncate c-card-list-title">
        <router-link :to="item.id" class="c-card-list-title-inner">{{ item.name }}</router-link>
      </div>
      <div v-if="item.playCount" class="mdui-card-primary-subtitle mdui-text-truncate"><i class="c-card-list-title-icon mdui-icon material-icons">headset</i>{{ item.playCount }}</div>
      <div v-if="item.artist" class="mdui-card-primary-subtitle mdui-text-truncate">{{ item.artist }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { cardInt } from '../type/card.type'

export default defineComponent({
  name: 'Card',
  props: {
    item: Object as PropType<cardInt>
  },
  emits: ['card-play-click'],
  setup() {
    const btnShow = ref(false)

    return {
      btnShow
    }
  }
})
</script>

<style lang="less" scoped>
.c-card-item {
  display: inline-block;
  width: 192px;
  height: 285px;
  margin: 25px 15px 10px 15px;
  .c-card-item-media {
    width: 192px;
    height: 192px;
  }
  .c-card-item-primary {
    width: 160px;
    height: 53px;
  }
}
.c-card-menu-vert-btn {
  background-color: rgba(0, 0, 0, 0.4);
}

.c-card-list-title {
  font-size: 0.85em;
  margin-top: -10px;
  margin-bottom: 5px;
  line-height: 28px;
  height: 34px;

  .c-card-list-title-inner {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.c-card-list-title-icon {
  font-size: 1.5em;
  vertical-align: text-top;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
