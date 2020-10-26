<template>
  <div>
    <!-- 列表 -->
    <recommend :topTitle="'全部歌单'" :topList="TopList" @getid="getIdCallBack" />
    <!-- 推荐 -->
    <div class="playlist-card-container">
      <div class="playlist-card-item mdui-card mdui-hoverable" v-for="item in cardList" :key="item.id">
        <card :item="item" />
      </div>
    </div>
    <pagination :pageCount="totalListCount" @get-age-number="getPageNumber" :key="forceUpdate" />
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

    const TopList: Array<{ name: string }> = reactive([])
    const cardList: Array<D> = reactive([])
    const totalListCount = ref(0)

    const forceUpdate = ref(0)
    let cat: string

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

    const getCardList: (cat: string, offset?: number) => void = (cat = '全部', number = 1) => {
      axios({
        url: `http://localhost:3000/top/playlist?cat=${cat}&limit=60&order=hot&offset=${(number - 1) * 60}`
      }).then(res => {
        const _res = res.data.playlists

        cardList.length = 0

        for (let i = 0; i < _res.length; i++) {
          cardList[i] = {
            id: '/playlist?id=' + _res[i].id,
            name: _res[i].name,
            artist: _res[i].creator.nickname,
            picUrl: _res[i].coverImgUrl
          }
        }
      })
    }

    const getIdCallBack: (obj: { name: string }) => void = obj => {
      cat = obj.name === undefined ? '全部' : obj.name
      getCardList(obj.name)

      axios({
        url: `http://localhost:3000/top/playlist?cat=${cat}`
      }).then(res => {
        totalListCount.value = Math.ceil(res.data.total / 60)
      })

      // 强制更新pagination
      forceUpdate.value = Math.random()
    }

    const getPageNumber: (n: number) => void = n => {
      getCardList(cat, n)
    }

    getTopList()

    getIdCallBack({ name: '全部' })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      TopList,
      cardList,
      getIdCallBack,
      totalListCount,
      getPageNumber,
      forceUpdate
    }
  }
})
</script>
<style lang="less" scoped>
.playlist-card-container {
  width: 1332px;
  margin: 0 auto;
  .playlist-card-item {
    display: inline-block;
    width: 192px;
    margin: 35px 15px 0px 15px;
  }
}
</style>
