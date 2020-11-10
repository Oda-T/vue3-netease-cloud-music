<template>
  <div id="my">
    <div class="my-card-container">
      <div class="my-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">歌单</h1>
      </div>
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Card from '../../components/card.vue'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'
import { getToken } from '../../utils/auth'

export default defineComponent({
  name: 'My',
  components: {
    Card
  },
  setup() {
    const token = getToken()
    const router = useRouter()
    const store = useStore()
    const cardList: Array<cardInt> = reactive([])
    let userId = ''

    // 如果未登录，重定向到首页
    !token && router.replace({ name: 'discover' })
    // 如果登录
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

    const getUserId: () => void = async () => {
      if (store.state.userId === '') {
        await store.dispatch('getUserId')
        userId = store.state.userId
        getUserPlayList()
      } else {
        userId = store.state.userId
        getUserPlayList()
      }
    }
    getUserId()

    return {
      cardList
    }
  }
})
</script>
<style lang="less" scoped>
.my-card-container {
  width: 1333px;
  margin: 50px auto;
  .my-card-title {
    margin-left: 20px;
  }
}
</style>
