<template>
  <div v-if="token && userProfile" id="user">
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
        <button class="mdui-btn mdui-ripple">编辑</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import request from '../../api/index'
import { getToken } from '../../utils/auth'

export default defineComponent({
  name: 'User',
  components: {},
  setup() {
    const token = getToken()
    const route = useRoute()
    const userId = ref('')

    const userProfile = ref({})
    const avatarUrl = ref('')
    const backgroundUrl = ref('')
    const signature = ref('')

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const handleRouteQuery: () => void = async () => {
      if (typeof route.query.id === 'string') {
        userId.value = route.query.id
      } else {
        const { profile } = await request['httpGET']('GET_LOGIN_STATUS')
        userId.value = profile.userId
      }

      const data = await request['httpGET']('GET_USER_DETAIL', { 'uid': userId.value })

      avatarUrl.value = data.profile.avatarUrl + '?param=50y50'
      backgroundUrl.value = data.profile.backgroundUrl + '?param=950y350'
      signature.value = data.profile.signature

      userProfile.value = {
        '昵称': data.profile.nickname,
        '等级': data.level,
        '注册时间': handleTime(data.createTime),
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
    }

    watch(
      () => {
        return route.query.id
      },
      () => {
        route.path === '/user' && handleRouteQuery()
      },
      { immediate: true }
    )

    return {
      token,
      userProfile,
      avatarUrl,
      backgroundUrl,
      signature,
      route
    }
  }
})
</script>
<style lang="less" scoped>
.user-card {
  width: 1200px;
  margin: 50px auto 100px auto;
  overflow: hidden;
  .user-card-list {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 400px;
    }
  }
}
</style>
