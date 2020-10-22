<template>
  <div>
    <swipe />

    <!-- 热门推荐 -->
    <recommend :topTitle="'热门推荐'" :topList="playlistHot" :cardList="cards" :activeIndex="-1" @getid="getIdCallBackHot">
      <router-link class="mdui-chip" style="float: right;margin: 20px 10px 8px;" to="/discover/playlist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>

    <!-- 新碟上架 -->

    <recommend :topTitle="'新碟上架'" :topList="albumListHot" :cardList="albums" :activeIndex="-1" @getid="getIdCallBackAlbums">
      <router-link class="mdui-chip" style="float: right;margin: 20px 10px 8px;" to="/album/newest">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>

    <!-- 榜单 -->
    <recommend :topTitle="'热门榜单'" :topList="topList" :cardList="cardsTopList" @getid="getIdCallBackList">
      <router-link class="mdui-chip" style="float: right;margin: 20px 10px 8px;" to="/discover/toplist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>

    <div class="discover-bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import mdui from 'mdui'
import axios from 'axios'

import Swipe from '../../components/swipe.vue'
import Recommend from '../../components/recommend.vue'

export default defineComponent({
  name: 'Discover',
  components: {
    Swipe,
    Recommend
  },
  setup() {
    interface T {
      id: string
      name: string
      playCount: string
      copywriter: string
      picUrl: string
      type: number
    }

    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }

    interface S {
      id: number
      name: string
    }

    const router = useRouter()

    const playlistHot: Array<S> = reactive([])

    // 新碟
    const albumListHot = [
      { id: 'ALL', name: '全部' },
      { id: 'ZH', name: '华语' },
      { id: 'EA', name: '欧美' },
      { id: 'KR', name: '韩国' },
      { id: 'JP', name: '日本' }
    ]

    const cards: Array<T> = reactive([])

    const albums: Array<D> = reactive([])

    const topList: Array<S> = reactive([])

    const cardsTopList: Array<D> = reactive([])

    const playListId = ref(0)

    // 热门推荐
    const handlePlayCount: (a: number | string) => string = n => {
      // Number(n)
      let _n = Number(n)
      let _nS = ''
      if (_n > 99999) {
        _n = Math.round(_n / 10000)
        _nS = _n.toString() + '万'
      } else {
        _nS = n.toString()
      }
      return _nS
    }

    const getTopList: (n: number) => void = n => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist.tracks

            for (let i = 0; i < 8; i++) {
              cardsTopList[i] = {
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

    const getIdCallBackHot: (n: { id: number; name: string }) => void = n => {
      router.push(`/discover/playlist/?cat=${n.name}`)
    }

    const getIdCallBackAlbums: (n: { id: number; name: string }) => void = n => {
      router.push(`/album/new?area=${n.id}`)
    }

    const getIdCallBackList: (n: { id: number; name: string }) => void = n => {
      getTopList(n.id)
    }

    // 热门歌单分类
    axios({
      url: 'http://localhost:3000/playlist/hot'
    })
      .then(res => {
        if (res.status === 200) {
          const _res = res.data.tags

          for (let i = 0, j = _res.length; i < j; i++) {
            playlistHot.push({
              id: _res[i].id,
              name: _res[i].name
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })

    // 首页推荐歌单
    axios({
      url: 'http://localhost:3000/personalized'
    }) //歌单
      .then(res => {
        if (res.status === 200) {
          const _res = res.data.result
          for (let i = 0; i < 4; i++) {
            cards.push({
              id: '/playlist?id=' + _res[i].id.toString(),
              name: _res[i].name,
              playCount: handlePlayCount(_res[i].playCount),
              copywriter: _res[i].copywriter,
              picUrl: _res[i].picUrl,
              type: _res[i].type
            })
          }
          return Promise.resolve()
        }
      })
      .then(() => {
        axios({
          url: 'http://localhost:3000/personalized/djprogram'
        }) // 电台
          .then(res => {
            if (res.status === 200) {
              const _res = res.data.result

              for (let i = 0; i < 4; i++) {
                cards.push({
                  id: '/dj?id=' + _res[i].id.toString(),
                  name: _res[i].name,
                  playCount: handlePlayCount(_res[i].program.listenerCount),
                  copywriter: _res[i].copywriter,
                  picUrl: _res[i].picUrl,
                  type: _res[i].type
                })
              }
            }
          })
      })
      .catch(err => {
        console.log(err)
      })

    // 首页新碟上架
    axios({
      url: 'http://localhost:3000/album/newest'
    })
      .then(res => {
        if (res.status === 200) {
          const _res = res.data.albums
          for (let i = 0; i < 8; i++) {
            albums.push({
              id: '/album?id=' + _res[i].id.toString(),
              name: _res[i].name,
              artist: _res[i].artist.name,
              picUrl: _res[i].picUrl
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })

    // 首页榜单
    axios({
      url: 'http://localhost:3000/toplist'
    })
      .then(res => {
        if (res.status === 200) {
          const _res = res.data.list
          for (let i = 0; i < 3; i++) {
            topList.push({
              id: _res[i].id,
              name: _res[i].name
            })
          }
          return Promise.resolve(topList[0].id)
        }
      })
      .then(id => {
        getTopList(Number(id))
      })
      .catch(err => {
        console.log(err)
      })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      getIdCallBackHot,
      getIdCallBackAlbums,
      getIdCallBackList,
      playlistHot,
      cards,
      albumListHot,
      albums,
      topList,
      playListId,
      cardsTopList
    }
  }
})
</script>

<style lang="less" scoped></style>
