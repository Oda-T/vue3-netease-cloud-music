<template>
  <div>
    <div v-if="!topListId">
      <!-- 特色榜单 -->
      <keep-alive>
        <recommend :topTitle="'特色音乐榜'" :topList="specialList" :cardList="specialCardList" @getid="getIdCallBackSpecial"></recommend>
      </keep-alive>

      <!-- 全球媒体榜单 -->
      <keep-alive>
        <recommend :topTitle="'全球媒体榜'" :topList="globalList" :cardList="globalCardList" @getid="getIdCallBackGlobal"></recommend>
      </keep-alive>
    </div>
    <!-- 榜单详情 -->
    <play-list v-else :listId="topListId"></play-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, onActivated, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import mdui from 'mdui'
import axios from 'axios'

import Recommend from '../../components/recommend.vue'
import PlayList from '../../components/playlist.vue'

export default defineComponent({
  name: 'TopList',
  components: {
    Recommend,
    PlayList
  },

  setup() {
    interface S {
      id: number
      name: string
    }
    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }

    const store = useStore()
    const route = useRoute()
    const { topListFull } = store.state

    const specialList: Array<S> = reactive([])
    const specialCardList: Array<D> = reactive([])

    const globalList: Array<S> = reactive([])
    const globalCardList: Array<D> = reactive([])

    const topListId = ref(0)

    const getPlayList: (n: number, arr: Array<D>) => void = (n, arr) => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            // 榜单
            const _res = res.data.playlist.tracks
            arr[0] = {
              id: '/discover/toplist?id=' + res.data.playlist.id.toString(),
              name: res.data.playlist.name,
              artist: res.data.playlist.description,
              picUrl: res.data.playlist.coverImgUrl
            }

            for (let i = 0; i < 10; i++) {
              arr[i + 1] = {
                id: '/song?id=' + _res[i].id.toString(),
                name: _res[i].name,
                artist: _res[i].ar[0].name,
                picUrl: _res[i].al.picUrl
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    // getSpecialList
    const getSpecialList: () => void = () => {
      for (let i = 0; i < 5; i++) {
        specialList[i] = store.state.topListFull[i]
      }
      getPlayList(specialList[0].id, specialCardList)
    }

    // getGlobalList
    const getGlobalList: () => void = () => {
      for (let i = 5; i < 35; i++) {
        globalList[i - 5] = store.state.topListFull[i]
      }

      getPlayList(globalList[0].id, globalCardList)
    }

    const getIdCallBackSpecial: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, specialCardList)
    }

    const getIdCallBackGlobal: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, globalCardList)
    }

    if (topListFull.length) {
      getSpecialList()
      getGlobalList()
    } else {
      store.dispatch('getTopListFull').then(() => {
        getSpecialList()
        getGlobalList()
      })
    }

    // 获取数据
    onBeforeRouteUpdate(to => {
      if (!to.query.id) {
        // query null
        topListId.value = 0
      } else {
        // query id
        topListId.value = Number(to.query.id)
      }
    })

    onMounted(() => {
      mdui.mutation()
    })

    onActivated(() => {
      if (route.query.id) {
        topListId.value = Number(route.query.id)
      } else {
        topListId.value = 0
      }
    })

    return {
      specialList,
      specialCardList,
      globalList,
      globalCardList,
      getIdCallBackSpecial,
      getIdCallBackGlobal,
      topListId
    }
  }
})
</script>
