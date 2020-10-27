<template>
  <div>
    <!-- 列表 -->
    <recommend :topTitle="'全部歌单'" :activeName="cat" :topList="TopList" @getid="getUrlCallBack" />
    <!-- 推荐 -->
    <div class="playlist-card-container">
      <transition-group name="fade">
        <card v-for="item in cardList" :key="item.id" :item="item" />
      </transition-group>
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

    const route = useRoute()
    const router = useRouter()

    const TopList: Array<{ name: string }> = reactive([])
    const cardList: Array<D> = reactive([])
    const totalListCount = ref(0)

    const forceUpdate = ref(0)

    const cat = ref('全部')

    const getTopList: () => void = () => {
      axios({
        url: `http://localhost:3000/playlist/catlist`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.sub
            TopList[0] = {
              name: '全部'
            }
            for (let i = 0; i < _res.length; i++) {
              TopList[i + 1] = {
                name: _res[i].name
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getCardList: (obj: string, offset?: number) => void = (obj, number = 1) => {
      cardList.length = 0

      axios({
        url: `http://localhost:3000/top/playlist?cat=${obj}&limit=60&order=hot&offset=${(number - 1) * 60}`
      })
        .then(res => {
          const _res = res.data.playlists

          for (let i = 0; i < _res.length; i++) {
            cardList[i] = {
              id: '/playlist?id=' + _res[i].id,
              name: _res[i].name,
              artist: _res[i].creator.nickname,
              picUrl: _res[i].coverImgUrl
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getUrlCallBack: (obj: { name: string }) => void = obj => {
      router.push(`/discover/playlist/?cat=${encodeURIComponent(obj.name)}`)
    }

    const getIdCallBack: (name: string) => void = obj => {
      // 转义

      getCardList(obj)

      axios({
        url: `http://localhost:3000/top/playlist?cat=${obj}`
      })
        .then(res => {
          totalListCount.value = Math.ceil(res.data.total / 60)
        })
        .catch(err => {
          console.log(err)
        })

      // 强制更新pagination
      forceUpdate.value = Math.random()
    }

    const pageNumber: (n: number) => void = n => {
      getCardList(encodeURIComponent(cat.value), n)
    }

    getTopList()

    // watch route id
    watchEffect(() => {
      typeof route.query.cat === 'string' ? ((cat.value = route.query.cat), getIdCallBack(encodeURIComponent(cat.value))) : ((cat.value = '全部'), getIdCallBack(encodeURIComponent(cat.value)))
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
  min-height: 300px;
  margin: 0 auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
