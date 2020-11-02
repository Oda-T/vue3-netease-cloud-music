<template>
  <div id="discoverAlbum">
    <!-- 列表 -->
    <recommend :topTitle="'全部新碟'" :activeName="activeName" :topList="TopList" @getid="getIdCallBack" />
    <!-- 推荐 -->
    <div class="album-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <pagination :pageCount="totalListCount" @pagenumber="pageNumber" :key="forceUpdate" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Recommend from '../../components/recommend.vue'
import Card from '../../components/card.vue'
import Pagination from '../../components/pagination.vue'

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
    const cardList: Array<cardInt> = reactive([])
    const totalListCount = ref(0)

    const forceUpdate = ref('')

    let cat = { id: 'ALL', name: '全部' }

    const TopList = [
      { id: 'ALL', name: '全部' },
      { id: 'ZH', name: '华语' },
      { id: 'EA', name: '欧美' },
      { id: 'KR', name: '韩国' },
      { id: 'JP', name: '日本' }
    ]

    const activeName = ref('全部')

    const getCardList: (obj: string, offset?: number) => void = async (id, offset = 1) => {
      cardList.length = 0

      const { albums } = await request['httpGET']('GET_ALBUM_NEW', { 'area': id, 'limit': 60, 'offset': (offset - 1) * 60 })

      for (let i = 0; i < albums.length; i++) {
        cardList[i] = {
          id: '/album?id=' + albums[i].id,
          name: albums[i].name,
          artist: albums[i].artists[0].name,
          picUrl: albums[i].picUrl
        }
      }
    }

    const getIdCallBack: (obj: { id: string; name: string }) => void = async obj => {
      activeName.value = obj.name

      getCardList(obj.id)

      cat = obj
      router.push(`/discover/album?area=${obj.id}`)

      // 获得总页数
      const { total } = await request['httpGET']('GET_ALBUM_NEW', { 'area': obj.id })
      totalListCount.value = Math.ceil(total / 60)

      // 强制更新pagination
      forceUpdate.value = obj.id
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(cat.id, n)
    }

    if (route.query.area) {
      const _id = route.query.area.toString()
      let _name: string

      for (let i = 0; i < TopList.length; i++) {
        if (TopList[i].id === _id) {
          _name = TopList[i].name
          getIdCallBack({ id: _id, name: _name })
          return
        }
      }
    } else {
      getIdCallBack({ id: 'ALL', name: '全部' })
    }

    onMounted(() => {
      mdui.mutation()
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
  width: 1333px;
  height: 3230px;
  margin: 0 auto;
}
</style>
