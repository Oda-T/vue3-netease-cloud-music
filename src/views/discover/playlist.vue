<template>
  <div id="discoverPlaylist">
    <!-- 列表 -->
    <recommend :topTitle="'全部歌单'" :activeName="activeName" :topList="TopList" @get-id="getIdCallBack" />
    <!-- 推荐 -->
    <div class="playlist-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <pagination :pageCount="totalListCount" @page-number="pageNumber" :key="forceUpdate" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Recommend from '../../components/recommend.vue'
import Card from '../../components/card.vue'
import Pagination from '../../components/pagination.vue'

import { topListInt } from '../../type/recommend.type'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'

export default defineComponent({
  name: 'discoverPlaylist',
  components: {
    Recommend,
    Card,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const TopList: Array<topListInt> = reactive([])
    const cardList: Array<cardInt> = reactive([])
    const totalListCount = ref(0)
    const forceUpdate = ref('')
    const activeName = ref('全部')
    const { playListFull } = toRefs(store.state)

    const getTopList: () => void = async () => {
      for (let i = 0; i < playListFull.value.length; i++) {
        TopList[i] = playListFull.value[i]
      }
    }

    const getCardList: (name: string, offset?: number) => void = async (name, offset = 1) => {
      cardList.length = 0
      const { playlists, total } = await request['httpGET']('GET_TOP_PLAYLIST', { 'cat': name, 'limit': 60, 'order': 'hot', 'offset': (offset - 1) * 60 })

      // 更新分页
      if (offset === 1) {
        totalListCount.value = Math.ceil(total / 60)

        // 强制更新pagination
        forceUpdate.value = name
      }

      for (let i = 0; i < playlists.length; i++) {
        cardList[i] = {
          id: '/playlist?id=' + playlists[i].id,
          name: playlists[i].name,
          artist: playlists[i].creator.nickname,
          picUrl: playlists[i].coverImgUrl
        }
      }
    }

    const getIdCallBack: (obj: { name: string }) => void = obj => {
      router.push(`/discover/playlist?cat=${encodeURIComponent(obj.name)}`)
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(activeName.value, n)
    }
    const getPlaylistFull: () => void = async () => {
      // 从sessionStorage读取
      if (sessionStorage.playListFull) {
        playListFull.value = JSON.parse(sessionStorage.playListFull)
        getTopList()
      } else if (playListFull.value.length) {
        getTopList()
      } else {
        await store.dispatch('getPlaylistFull')
        getTopList()
      }
    }

    getPlaylistFull()

    watchEffect(() => {
      route.path === '/discover/playlist' && typeof route.query.cat === 'string'
        ? ((activeName.value = route.query.cat), getCardList(route.query.cat))
        : ((activeName.value = '全部'), getCardList('全部'))
    })

    return {
      TopList,
      cardList,
      totalListCount,
      pageNumber,
      forceUpdate,
      activeName,
      getIdCallBack
    }
  }
})
</script>
<style lang="less" scoped>
.playlist-card-container {
  width: 1333px;
  height: 3230px;
  margin: 0 auto;
}
</style>
