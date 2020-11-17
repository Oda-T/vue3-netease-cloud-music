<template>
  <div id="layout">
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
        <!-- 未登录 -->
        <a v-if="!loginFlag" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Login'}" mdui-dialog="{target: '#loginDialog'}">
          <i class="mdui-icon material-icons">person</i>
        </a>
        <!-- 登录 -->
        <router-link v-else class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'User Center'}" to="/user">
          <i class="mdui-icon material-icons">free_breakfast</i>
        </router-link>
        <a href="https://github.com/OdaNeo/vue3-netease-cloud-music" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Github'}">
          <svg class="mdui-icon">
            <use xlink:href="#icon-github"></use>
          </svg>
        </a>
      </div>
    </div>
    <!-- 左侧抽屉 -->
    <div class="mdui-drawer g-left-drawer">
      <ul class="mdui-list" mdui-collapse="{accordion: true}">
        <li v-for="(item, index) in listItem" :key="index" class="mdui-collapse-item mdui-collapse-item-open">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple" :class="{ 'mdui-list-item-active': index === curIndex }" @click.stop="handleTypoTitle(item.name)">
            <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-700">{{ item.icon }}</i>
            <div class="mdui-list-item-content">{{ item.content }}</div>
          </div>
          <ul v-if="item.children" class="mdui-collapse-item-body mdui-list mdui-list-dense">
            <li
              v-for="(i, index) in item.children"
              :key="index"
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
    <!-- 登录对话框 -->
    <div class="mdui-dialog" id="loginDialog" ref="loginDialog">
      <div class="mdui-dialog-title">登录</div>
      <div class="mdui-dialog-content">
        <form>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">person</i>
            <label class="mdui-textfield-label">Email/Phone</label>
            <input class="mdui-textfield-input" type="text" required autocomplete="off" maxlength="20" v-model="loginEmailPhone" />
            <div class="mdui-textfield-helper">输入邮箱或者手机号</div>
          </div>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">lock</i>
            <label class="mdui-textfield-label">Password</label>
            <input class="mdui-textfield-input" type="password" pattern="^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9]).*$" required autocomplete="off" maxlength="20" v-model="loginPassword" />
            <div class="mdui-textfield-error">密码至少 8 位，且包含数字大小写字母</div>
          </div>
        </form>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" :disabled="!canLogin" mdui-dialog-confirm>登录</button>
      </div>
    </div>
    <!-- 底栏播放器 -->
    <!-- 返回顶端 -->
    <back-to-top />

    <!-- 路由 transition -->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <keep-alive include="Discover,discoverTopList,discoverDjradio,discoverArtist">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, onMounted, ref, watch } from 'vue'
import mdui from 'mdui'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import BackToTop from '../components/backToTop.vue'

import { getToken } from '../utils/auth'
import { emailValidate, passwordValidate, phoneValidate } from '../validator/layout'
import request from '../api/index'

export default defineComponent({
  components: {
    BackToTop
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const loginFlag = ref('' as string | undefined)
    const loginDialog = ref(null as unknown)
    const { toolbarTitle, toolbarSubTitle, curIndex, curChildIndex } = toRefs(store.state)

    const loginEmailPhone = ref('')
    const loginPassword = ref('')
    const canLogin = ref(false)

    loginFlag.value = getToken()

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

    watch([loginEmailPhone, loginPassword], ([emailPhone, pass]) => {
      // 验证是否通过
      canLogin.value = (emailValidate.test(emailPhone) || phoneValidate.test(emailPhone)) && passwordValidate.test(pass)
    })

    onMounted(() => {
      mdui.mutation()

      const el = loginDialog.value as HTMLElement
      // 点击登录事件 mdui
      el.addEventListener('confirm.mdui.dialog', async () => {
        let data = { code: 0, msg: '' }
        // 手机邮箱登录接口不同
        emailValidate.test(loginEmailPhone.value)
          ? (data = await request['httpPOST']('POST_LOGIN', { 'email': loginEmailPhone.value, 'password': loginPassword.value, 'timestamp': Date.now() }))
          : (data = await request['httpPOST']('POST_LOGIN_CELLPHONE', { 'phone': loginEmailPhone.value, 'password': loginPassword.value, 'timestamp': Date.now() }))

        if (data.code === 200) {
          sessionStorage.login = ''
          location.reload()
        } else {
          sessionStorage.login = ''
          location.reload()
        }
      })
    })

    return {
      loginFlag,
      loginDialog,
      listItem,
      toolbarTitle,
      toolbarSubTitle,
      curIndex,
      curChildIndex,
      handleTypoTitle,
      handleTypoSubTitle,
      loginEmailPhone,
      loginPassword,
      canLogin
    }
  }
})
</script>
<style lang="less" scoped>
.type-title-subTitle {
  width: 65px;
}

.slide-fade-enter-active {
  transition: all 0.15s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
