<template>
  <div>
    <!-- 顶部工具栏 -->
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-red-900">
        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-drawer="{target:'.g-left-drawer'}"><i class="mdui-icon material-icons">menu</i></span>
        <a href="/" class="mdui-typo-headline">网易云音乐</a>
        <a class="mdui-typo-title">{{ title }}</a>
        <a v-if="sbuTitle" class="type-title-subTitle">{{ sbuTitle }}</a>
        <div class="mdui-toolbar-spacer"></div>
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: '音乐/视频/电台/用户'}"><i class="mdui-icon material-icons">search</i></a>
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" @click="handleTypoTitle('创作者中心', 'creator')" mdui-tooltip="{content: '创作者中心'}">
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
          <div
            class="left-drawer-list mdui-collapse-item-header mdui-list-item mdui-ripple"
            :class="{ 'mdui-list-item-active': index === curIndex }"
            @click.stop="handleTypoTitle(item.content, item.name)"
            @click=";(curIndex = index), (curChildIndex = -1)"
          >
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-700">{{ item.icon }}</i>
            <div class="mdui-list-item-content">{{ item.content }}</div>
          </div>
          <ul v-if="item.children" class="mdui-collapse-item-body mdui-list mdui-list-dense">
            <li
              v-for="(i, index) in item.children"
              :key="i.id"
              class="left-drawer-list-child mdui-list-item mdui-ripple"
              :class="{ 'mdui-list-item-active': index === curChildIndex }"
              @click.stop="handleTypoSubTitle(i.content, i.name)"
              @click=";(curChildIndex = index), (curIndex = -1)"
            >
              {{ i.content }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 底栏播放器 -->
    <player ids="" />

    <!-- 路由 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import mdui from 'mdui'

import Player from '@/components/player.vue'

export default defineComponent({
  components: {
    Player
  },
  setup() {
    const router = useRouter()

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

    const title = ref('发现音乐')
    const sbuTitle = ref('推荐')

    const handleTypoTitle: (ct: string, rt?: string) => void = (content, name) => {
      // 路由跳转
      name = name || 'discover'
      router.push({ name: name })

      // title改变
      title.value = content
      if (content === '发现音乐') {
        sbuTitle.value = '推荐'
      } else {
        sbuTitle.value = ''
      }
    }
    const handleTypoSubTitle: (ct: string, rt?: string) => void = (content, name) => {
      // 路由跳转
      name = name || 'discover'
      router.push({ name: name })

      // title改变
      title.value = '发现音乐'
      sbuTitle.value = content
    }

    const curIndex = ref(-1)
    const curChildIndex = ref(0)

    onMounted(() => {
      mdui.mutation()
      // curIndex.value = -1
      // curChildIndex.value = 0
    })

    return {
      listItem,
      title,
      sbuTitle,
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
</style>
