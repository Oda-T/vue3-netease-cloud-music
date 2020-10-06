<template>
  <div>
    <!-- 顶部工具栏 -->
    <div class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-red-900">
        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-drawer="{target:'.g-left-drawer'}"><i class="mdui-icon material-icons">menu</i></span>
        <a href="/home" class="mdui-typo-headline">网易云音乐</a>
        <a class="mdui-typo-title">{{ title }}</a>
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
        <li v-for="item in listItem" :key="item.id" class="mdui-collapse-item mdui-collapse-item-open" @click.stop="handleTypoTitle(item.content, item.route)">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-700">{{ item.icon }}</i>
            <div class="mdui-list-item-content">{{ item.content }}</div>
          </div>
          <ul v-if="item.children" class="mdui-collapse-item-body mdui-list mdui-list-dense">
            <li v-for="i in item.children" :key="i.id" class="mdui-list-item mdui-ripple" @click.stop="handleTypoTitle(i.content, i.route)">{{ i.content }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 底栏播放器 -->
    <player />

    <!-- 路由 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import mdui from 'mdui'

import Player from '@/components/player/index.vue'

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
        route: 'discover',
        children: [
          { content: '推荐', route: '/' },
          { content: '歌单', route: '/' },
          { content: '主播电台', route: '/' },
          { content: '歌手', route: '/' },
          { content: '新碟上架', route: '/' }
        ]
      },
      {
        icon: 'queue_music',
        content: '我的音乐',
        route: 'my'
      },
      {
        icon: 'supervisor_account',
        content: '朋友',
        route: 'friend'
      },
      {
        icon: 'shopping_cart',
        content: '商城',
        route: 'store'
      },
      {
        icon: 'strikethrough_s',
        content: '音乐人',
        route: 'nmusician'
      },
      {
        icon: 'vertical_align_bottom',
        content: '下载客户端',
        route: 'download'
      }
    ]

    const title = ref('发现音乐')

    const handleTypoTitle: (ct: string, rt?: string) => void = (content, route) => {
      // 路由跳转
      route = route || '/'
      router.push(route)
      // title改变
      title.value = content
    }

    onMounted(() => {
      mdui.mutation()
    })

    return {
      listItem,
      title,
      handleTypoTitle
    }
  }
})
</script>

<style lang="less"></style>
