<template>
  <div>
    <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
    <div class="mdui-card-media">
      <router-link :to="item.id">
        <img :src="item.picUrl" />
      </router-link>
      <div class="mdui-card-menu">
        <button class="mdui-btn mdui-btn-icon mdui-text-color-white  mdui-text-color-theme-700"><i class="mdui-icon material-icons">play_circle_outline</i></button>
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    item: Object
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
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
