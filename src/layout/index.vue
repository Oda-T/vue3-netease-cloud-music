<template>
  <div>
    <!-- 顶部工具栏 -->
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-red-900">
        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-drawer="{target:'.g-left-drawer'}"><i class="mdui-icon material-icons">menu</i></span>
        <router-link to="/" class="mdui-typo-headline">网易云音乐</router-link>
        <a class="mdui-typo-title">{{ toolbarTitle }}</a>
        <a v-if="toolbarSubTitle" class="type-title-subTitle">{{ toolbarSubTitle }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: '音乐/视频/电台/用户'}"><i class="mdui-icon material-icons">search</i></a>
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" @click="handleTypoTitle('creator')" mdui-tooltip="{content: '创作者中心'}">
          <i class="mdui-icon material-icons">queue</i>
        </a>
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Login'}"><i class="mdui-icon material-icons">person</i></a>
        <a href="https://github.com/Oda-T/vue3-netease-cloud-music" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Github'}">
          <svg class="mdui-icon">
            <use xlink:href="#icon-github"></use>
          </svg>
        </a>
      </div>
    </div>
    <!-- 左侧抽屉 -->
    <div class="mdui-drawer g-left-drawer">
      <ul class="mdui-list" mdui-collapse="{accordion: true}">
        <li v-for="(item, index) in listItem" :key="item.id" class="mdui-collapse-item mdui-collapse-item-open">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple" :class="{ 'mdui-list-item-active': index === curIndex }" @click.stop="handleTypoTitle(item.name)">
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-700">{{ item.icon }}</i>
            <div class="mdui-list-item-content">{{ item.content }}</div>
          </div>
          <ul v-if="item.children" class="mdui-collapse-item-body mdui-list mdui-list-dense">
            <li
              v-for="(i, index) in item.children"
              :key="i.id"
              class="mdui-list-item mdui-ripple"
              :class="{ 'mdui-list-item-active': index === curChildIndex }"
              @click.stop="handleTypoSubTitle(i.name)"
            >
              {{ i.content }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 底栏播放器 -->
    <player ids="" />

    <!-- 路由 transition -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <keep-alive include="Discover,TopList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import mdui from 'mdui'

import Player from '../components/player.vue'

export default defineComponent({
  components: {
    Player
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const { toolbarTitle, toolbarSubTitle, curIndex, curChildIndex } = toRefs(store.state)

    const listItem = [
      {
        icon: 'near_me',
        content: '发现音乐',
        name: 'discover',
        children: [
          { content: '推荐', name: 'discover' },
          { content: '排行榜', name: 'discoverToplist' },
          { content: '歌单', name: 'discoverPlaylist' },
          { content: '主播电台', name: 'discoverDjradio' },
          { content: '歌手', name: 'discoverArtist' },
          { content: '新碟上架', name: 'discoverAlbum' }
        ]
      },
      {
        icon: 'queue_music',
        content: '我的音乐',
        name: 'my'
      },
      {
        icon: 'supervisor_account',
        content: '朋友',
        name: 'friend'
      },
      {
        icon: 'shopping_cart',
        content: '商城',
        name: 'store'
      },
      {
        icon: 'strikethrough_s',
        content: '音乐人',
        name: 'nmusician'
      },
      {
        icon: 'vertical_align_bottom',
        content: '下载客户端',
        name: 'download'
      }
    ]

    const handleTypoTitle: (rt?: string) => void = name => {
      // 路由跳转
      name = name || 'discover'
      router.push({ name: name })
    }
    const handleTypoSubTitle: (rt?: string) => void = name => {
      // 路由跳转
      name = name || 'discover'
      router.push({ name: name })
    }

    onMounted(() => {
      mdui.mutation()
    })

    return {
      listItem,
      toolbarTitle,
      toolbarSubTitle,
      curIndex,
      curChildIndex,
      handleTypoTitle,
      handleTypoSubTitle
    }
  }
})
</script>
<style lang="less" scoped>
.type-title-subTitle {
  width: 65px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
