<template>
  <div id="discoverIndex">
    <!-- swipe -->
    <swipe :banners="banners" />
    <!-- 热门推荐 -->
    <recommend :topTitle="'热门推荐'" :topList="playlistHot" :cardList="cards" @getid="getIdCallBackHot">
      <!-- 右侧'更多'插槽 -->
      <router-link class="mdui-chip" style="float: right;margin: 30px 10px 0px;" to="/discover/playlist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>

    <!-- 新碟上架 -->
    <recommend :topTitle="'新碟上架'" :topList="albumListHot" :cardList="albums" @getid="getIdCallBackAlbums">
      <router-link class="mdui-chip" style="float: right;margin: 30px 10px 0px;" to="/album/newest">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>

    <!-- 榜单 -->
    <recommend :topTitle="'热门榜单'" :topList="topList" :cardList="cardsTopList" :activeName="'云音乐飙升榜'" @getid="getIdCallBackList">
      <router-link class="mdui-chip" style="float: right;margin: 30px 10px 0px;" to="/discover/toplist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </recommend>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import mdui from 'mdui'
import axios from 'axios'
import { returnDataType } from '../../type/http-request.type'

import Swipe from '../../components/swipe.vue'
import Recommend from '../../components/recommend.vue'

import request from '../../api/index'

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

    interface B {
      bgSrc: string
      imgSrc: string
      aHref: string
    }

    const router = useRouter()
    const store = useStore()
    const { topListFull } = store.state
    const playlistHot: Array<S> = reactive([])

    // swipe
    const banners: Array<B> = reactive([])

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

    request['httpGET']('GET_PLAYLIST_HOT', {}).then((res: returnDataType) => {
      console.log(res)
    })

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

    const getCardTopList: (n: number) => void = n => {
      axios({
        url: `http://localhost:3000/playlist/detail?id=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.playlist.tracks

            for (let i = 0; i < 10; i++) {
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

    const getTopList: () => void = () => {
      for (let i = 0; i < 3; i++) {
        topList[i] = store.state.topListFull[i]
      }
      getCardTopList(topList[0].id)
    }

    const getIdCallBackHot: (n: { id: number; name: string }) => void = n => {
      router.push(`/discover/playlist/?cat=${n.name}`)
    }

    const getIdCallBackAlbums: (n: { id: number; name: string }) => void = n => {
      router.push(`/album/new?area=${n.id}`)
    }

    const getIdCallBackList: (n: { id: number; name: string }) => void = n => {
      getCardTopList(n.id)
    }

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: string, three: string) => string = (id, title, url) => {
      if (id == '0') {
        return url.slice(url.indexOf('com/') + 3)
      } else if (title === '新碟首发') {
        return '/album?id=' + id
      } else {
        return '/song?id=' + id
      }
    }

    // swipe
    axios({
      url: 'http://localhost:3000/banner?type=0',
      method: 'get'
    })
      .then(res => {
        const _b = res.data.banners

        for (let i = 0, j = _b.length; i < j; i++) {
          banners[i] = {
            bgSrc: _b[i].imageUrl + '?imageView&blur=40x20',
            imgSrc: _b[i].imageUrl + '?imageView&quality=30',
            aHref: handleHref(_b[i].encodeId, _b[i].typeTitle, _b[i].url)
          }
        }
      })
      .catch(err => {
        console.error(err)
      })

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
          for (let i = 0; i < 7; i++) {
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

              for (let i = 0; i < 3; i++) {
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
          for (let i = 0; i < 10; i++) {
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
    if (sessionStorage.topListFull) {
      store.state.topListFull = JSON.parse(sessionStorage.topListFull)
      getTopList()
    } else if (topListFull.length) {
      getTopList()
    } else {
      store.dispatch('getTopListFull').then(() => {
        getTopList()
      })
    }

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
      cardsTopList,
      banners
    }
  }
})
</script>
