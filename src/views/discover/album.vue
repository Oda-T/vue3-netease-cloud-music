<template>
  <div id="discoverAlbum">
    <!-- 列表 -->
    <recommend :topTitle="'全部新碟'" :activeName="activeName" :topList="TopList" @get-id="getIdCallBack" />
    <!-- 推荐 -->
    <div class="album-card-container g-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <pagination :pageCount="totalListCount" @page-number="pageNumber" :key="forceUpdate" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Recommend from '../../components/recommend.vue'
import Card from '../../components/card.vue'
import Pagination from '../../components/pagination.vue'

import { cardInt } from '../../type/card.type'

import request from '../../api/index'

export default defineComponent({
  name: 'discoverAlbum',
  components: {
    Recommend,
    Card,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cardList: Array<cardInt> = reactive([])
    const totalListCount = ref(0)

    const forceUpdate = ref('')

    let cat = { id: 'ALL', name: '全部' }

    const _name = ref('全部')

    const TopList = [
      { id: 'ALL', name: '全部' },
      { id: 'ZH', name: '华语' },
      { id: 'EA', name: '欧美' },
      { id: 'KR', name: '韩国' },
      { id: 'JP', name: '日本' }
    ]

    const activeName = ref('全部')

    const getNameById: (id: string) => string = id => {
      for (let i = 0; i < TopList.length; i++) {
        if (TopList[i].id === id) {
          _name.value = TopList[i].name
        }
      }
      return _name.value
    }

    const getCardList: (id: string, offset?: number) => void = async (id, offset = 1) => {
      cardList.length = 0

      const { albums, total } = await request['httpGET']('GET_ALBUM_NEW', { 'area': id, 'limit': 60, 'offset': (offset - 1) * 60 })

      // 分页
      if (offset === 1) {
        totalListCount.value = Math.ceil(total / 60)

        // 强制更新pagination
        forceUpdate.value = id
      }

      for (let i = 0; i < albums.length; i++) {
        cardList[i] = {
          id: '/album?id=' + albums[i].id,
          name: albums[i].name,
          artist: albums[i].artists[0].name,
          picUrl: albums[i].picUrl
        }
      }
    }
    const getIdCallBack: (obj: { id: string; name: string }) => void = obj => {
      cat = obj
      router.push(`/discover/album?area=${obj.id}`)
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(cat.id, n)
    }

    watchEffect(() => {
      route.path === '/discover/album' && typeof route.query.area === 'string'
        ? ((activeName.value = getNameById(route.query.area)), getCardList(route.query.area))
        : ((activeName.value = '全部'), getCardList('ALL'))
    })

    return {
      activeName,
      TopList,
      cardList,
      totalListCount,
      pageNumber,
      forceUpdate,
      getIdCallBack
    }
  }
})
</script>
<style lang="less" scoped>
.album-card-container {
  height: 3230px;
  margin: 0 auto;
}
</style>
