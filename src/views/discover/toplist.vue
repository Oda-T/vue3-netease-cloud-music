<template>
  <div>
    <!-- 特色榜单 -->
    <recommend :topTitle="'云音乐特色音乐榜'" :topList="specialList" :cardList="specialCardList" @getid="getIdCallBackSpecial"></recommend>
    <!-- 全球媒体榜单 -->
    <recommend :topTitle="'全球媒体榜'" :topList="globalList" :cardList="globalCardList" @getid="getIdCallBackGlobal"></recommend>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import mdui from 'mdui'
import axios from 'axios'

import Recommend from '../../components/recommend.vue'

export default defineComponent({
  name: 'Toplist',
  components: {
    Recommend
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

    const specialList: Array<S> = reactive([])
    const specialCardList: Array<D> = reactive([])

    const globalList: Array<S> = reactive([])
    const globalCardList: Array<D> = reactive([])

    const getPlayList: (n: number, arr: Array<D>) => void = (n, arr) => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist.tracks

            for (let i = 0; i < 8; i++) {
              arr[i] = {
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
    // getspecialList
    axios({
      url: 'http://localhost:3000/toplist/detail'
    })
      .then(res => {
        if (res.data.code === 200) {
          const _l = res.data.list
          for (let i = 0; i < 4; i++) {
            specialList[i] = {
              id: _l[i].id,
              name: _l[i].name
            }
          }
          return Promise.resolve(specialList[0].id)
        }
      })
      .then(id => {
        getPlayList(Number(id), specialCardList)
      })
      .catch(err => {
        console.log(err)
      })

    // getglobalList
    axios({
      url: 'http://localhost:3000/toplist/detail'
    })
      .then(res => {
        if (res.data.code === 200) {
          const _l = res.data.list
          for (let i = 4; i < _l.length; i++) {
            globalList.push({
              id: _l[i].id,
              name: _l[i].name
            })
          }
          return Promise.resolve(globalList[0].id)
        }
      })
      .then(id => {
        getPlayList(Number(id), globalCardList)
      })
      .catch(err => {
        console.log(err)
      })

    const getIdCallBackSpecial: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, specialCardList)
    }

    const getIdCallBackGlobal: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id, globalCardList)
    }
    onMounted(() => {
      mdui.mutation()
    })

    return {
      specialList,
      specialCardList,
      globalList,
      globalCardList,
      getIdCallBackSpecial,
      getIdCallBackGlobal
    }
  }
})
</script>
<style lang="less" scoped></style>
