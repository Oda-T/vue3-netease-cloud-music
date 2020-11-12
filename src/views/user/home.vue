<template>
  <div v-if="token && avatarUrl" id="userHome">
    <div class="user-card mdui-card">
      <!-- 卡片头部，包含头像、标题、副标题 -->
      <div class="mdui-card-header">
        <img class="mdui-card-header-avatar" :src="avatarUrl" />
        <div class="mdui-card-header-title">{{ userProfile['昵称'] }}</div>
        <div class="mdui-card-header-subtitle">Lv:{{ userProfile['等级'] }}</div>
      </div>
      <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
      <div class="mdui-card-media">
        <img :src="backgroundUrl" />
        <!-- 卡片的标题和副标题 -->
        <div class="mdui-card-media-covered mdui-card-media-covered-top mdui-card-media-covered-gradient">
          <ul class="user-card-list mdui-list">
            <li class="mdui-list-item mdui-ripple" v-for="(item, value) in userProfile" :key="value">
              <i class="mdui-list-item-avatar mdui-icon material-icons">local_offer</i>
              <div class="mdui-list-item-content">
                <div class="mdui-list-item-title">{{ value }}</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">{{ item }}</div>
              </div>
            </li>
          </ul>
          <!-- 卡片的内容 -->
          <div class="mdui-card-content">签名：{{ signature }}</div>
        </div>
      </div>
      <!-- 卡片的按钮 -->
      <div v-if="!route.query.id" class="mdui-card-actions">
        <button class="mdui-btn mdui-ripple" @click="logout">登出</button>
        <button class="mdui-btn mdui-ripple" @click="refresh">刷新登录状态</button>
        <router-link to="/user/setting">
          <button class="mdui-btn mdui-ripple">编辑个人信息</button>
        </router-link>
      </div>
    </div>
    <div class="user-card-container">
      <div class="user-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">歌单</h1>
      </div>
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Card from '../../components/card.vue'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'
import { getToken } from '../../utils/auth'
import { handleTime } from '../../utils/time'

export default defineComponent({
  name: 'UserHome',
  components: {
    Card
  },
  setup() {
    const token = getToken()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 登录
    let userId = ''
    const userProfile = ref({})
    const avatarUrl = ref('')
    const backgroundUrl = ref('')
    const signature = ref('')
    const cardList: Array<cardInt> = reactive([])

    const getUserPlayList: (n?: number) => void = async (n = 0) => {
      cardList.length = 0

      const { playlist } = await request['httpGET']('GET_USER_PLAYLIST', { 'uid': userId, 'limit': 30, 'offset': n })

      for (let i = 0; i < playlist.length; i++) {
        cardList[i] = {
          id: '/playlist?id=' + playlist[i].id,
          name: playlist[i].name,
          artist: playlist[i].creator.nickname,
          picUrl: playlist[i].coverImgUrl
        }
      }
    }

    const handleRouteQuery: () => void = async () => {
      const data = await request['httpGET']('GET_USER_DETAIL', { 'uid': userId, 'timestamp': Date.now() })

      avatarUrl.value = data.profile.avatarUrl + '?param=50y50'
      backgroundUrl.value = data.profile.backgroundUrl + '?param=950y350'
      signature.value = data.profile.signature

      userProfile.value = {
        '昵称': data.profile.nickname,
        '等级': data.level,
        '注册时间': handleTime(data.createTime),
        '省份': data.profile.province,
        '城市': data.profile.city,
        '生日': handleTime(data.profile.birthday),
        '听过的歌': data.listenSongs,
        '是否可见': data.peopleCanSeeMyPlayRecord,
        '动态': data.profile.eventCount,
        '关注我': data.profile.followMe,
        '关注时间': data.profile.followTime,
        '被关注': data.profile.followed,
        '粉丝': data.profile.followeds,
        '关注': data.profile.newFollows
      }

      getUserPlayList()
    }

    const getUserId: () => void = async () => {
      if (typeof route.query.id === 'string') {
        userId = route.query.id
      } else if (store.state.userId === '') {
        await store.dispatch('getUserId')
        userId = store.state.userId
      } else {
        userId = store.state.userId
      }
      handleRouteQuery()
    }

    const logout: () => void = async () => {
      await request['httpGET']('GET_LOGOUT')
      location.reload()
    }

    const refresh: () => void = async () => {
      await request['httpGET']('GET_LOGIN_REFRESH')
      location.reload()
    }

    // 如果未登录，重定向到首页
    !token && router.replace({ name: 'discover' })

    watch(
      () => {
        return route.query.id
      },
      () => {
        token && route.path === '/user' && getUserId()
      },
      { immediate: true }
    )

    return {
      token,
      userProfile,
      avatarUrl,
      backgroundUrl,
      signature,
      route,
      logout,
      cardList,
      refresh
    }
  }
})
</script>
<style lang="less" scoped>
.user-card {
  width: 1200px;
  margin: 50px auto;
  overflow: hidden;
  .user-card-list {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 400px;
    }
  }
}

.user-card-container {
  width: 1333px;
  margin: 50px auto;
  .user-card-title {
    margin-left: 20px;
  }
}
</style>
