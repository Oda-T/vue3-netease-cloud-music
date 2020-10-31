<template>
  <div id="discoverAlbum">
    <!-- 列表 -->
    <recommend :topTitle="'全部新碟'" :activeName="'全部'" :topList="TopList" @getid="getIdCallBack" />
    <!-- 推荐 -->
    <div class="album-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <pagination :pageCount="totalListCount" @pagenumber="pageNumber" :key="forceUpdate" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'

import Recommend from '../../components/recommend.vue'
import Card from '../../components/card.vue'
import Pagination from '../../components/pagination.vue'

import mdui from 'mdui'
import axios from 'axios'

export default defineComponent({
  name: 'Playlist',
  components: {
    Recommend,
    Card,
    Pagination
  },
  setup() {
    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }

    const cardList: Array<D> = reactive([])
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

    const getCardList: (obj: string, offset?: number) => void = (id, number = 1) => {
      cardList.length = 0

      axios({
        url: `http://localhost:3000/album/new?area=${id}&limit=60&offset=${(number - 1) * 60}`
      })
        .then(res => {
          const _res = res.data.albums

          for (let i = 0; i < _res.length; i++) {
            cardList[i] = {
              id: '/album?id=' + _res[i].id,
              name: _res[i].name,
              artist: _res[i].artists[0].name,
              picUrl: _res[i].picUrl
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getIdCallBack: (obj: { id: string; name: string }) => void = obj => {
      getCardList(obj.id)
      cat = obj

      axios({
        url: `http://localhost:3000/album/new?area=${obj.id}`
      })
        .then(res => {
          totalListCount.value = Math.ceil(res.data.total / 60)
        })
        .catch(err => {
          console.log(err)
        })

      // 强制更新pagination
      forceUpdate.value = obj.id
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(cat.id, n)
    }

    getIdCallBack(cat)

    onMounted(() => {
      mdui.mutation()
    })
    return {
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
