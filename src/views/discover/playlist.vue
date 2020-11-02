<template>
  <div id="discoverPlaylist">
    <!-- 列表 -->
    <recommend :topTitle="'全部歌单'" :activeName="cat" :topList="TopList" @getid="getUrlCallBack" />
    <!-- 推荐 -->
    <div class="playlist-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <pagination :pageCount="totalListCount" @pagenumber="pageNumber" :key="forceUpdate" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Recommend from '../../components/recommend.vue'
import Card from '../../components/card.vue'
import Pagination from '../../components/pagination.vue'

import { topListInt } from '../../type/recommend.type'
import { cardInt } from '../../type/card.type'

import mdui from 'mdui'

import request from '../../api/index'

export default defineComponent({
  name: 'Playlist',
  components: {
    Recommend,
    Card,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const TopList: Array<topListInt> = reactive([])
    const cardList: Array<cardInt> = reactive([])
    const totalListCount = ref(0)

    const forceUpdate = ref('')

    const cat = ref('全部')

    const getTopList: () => void = async () => {
      const { sub } = await request['httpGET']('GET_PLAYLIST_CATLIST')

      TopList[0] = {
        id: -1,
        name: '全部'
      }
      for (let i = 0; i < sub.length; i++) {
        TopList[i + 1] = {
          id: sub[i].id,
          name: sub[i].name
        }
      }
    }

    const getCardList: (obj: string, offset?: number) => void = async (obj, number = 1) => {
      cardList.length = 0

      const { playlists } = await request['httpGET']('GET_TOP_PLAYLIST', { 'cat': obj, 'limit': 60, 'order': 'hot', 'offset': (number - 1) * 60 })

      for (let i = 0; i < playlists.length; i++) {
        cardList[i] = {
          id: '/playlist?id=' + playlists[i].id,
          name: playlists[i].name,
          artist: playlists[i].creator.nickname,
          picUrl: playlists[i].coverImgUrl
        }
      }
    }

    const getUrlCallBack: (obj: { name: string }) => void = obj => {
      router.push(`/discover/playlist/?cat=${encodeURIComponent(obj.name)}`)
    }

    const getIdCallBack: (name: string) => void = async obj => {
      getCardList(obj)

      const { total } = await request['httpGET']('GET_TOP_PLAYLIST', { 'cat': obj })

      totalListCount.value = Math.ceil(total / 60)

      // 强制更新pagination
      forceUpdate.value = obj
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(cat.value, n)
    }

    getTopList()

    // watch route id
    watchEffect(() => {
      typeof route.query.cat === 'string' ? ((cat.value = route.query.cat), getIdCallBack(cat.value)) : ((cat.value = '全部'), getIdCallBack(cat.value))
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      TopList,
      cardList,
      totalListCount,
      pageNumber,
      forceUpdate,
      cat,
      getUrlCallBack
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
