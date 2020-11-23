<template>
  <div id="discoverIndex">
    <!-- swipe -->
    <Swipe :banners="banner" />
    <!-- 热门推荐 -->
    <Recommend :topTitle="'热门推荐'" :topList="playlistHot" :cardList="cards" @get-id="getIdCallBackHot">
      <!-- 右侧'更多'插槽 -->
      <router-link class="mdui-chip" style="float: right; margin: 30px 10px 0px" to="/discover/playlist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </Recommend>

    <!-- 新碟上架 -->
    <Recommend :topTitle="'新碟上架'" :topList="albumListHot" :cardList="album" @get-id="getIdCallBackAlbums">
      <router-link class="mdui-chip" style="float: right; margin: 30px 10px 0px" to="/discover/album">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </Recommend>

    <!-- 榜单 -->
    <Recommend :topTitle="'热门榜单'" :topList="topList" :cardList="cardsTopList" :activeName="activeName" @get-id="getIdCallBackList">
      <router-link class="mdui-chip" style="float: right; margin: 30px 10px 0px" to="/discover/toplist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
    </Recommend>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { swipeInt } from '../../type/swipe.type'

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
    const router = useRouter()
    const store = useStore()
    const activeName = ref('云音乐飙升榜')
    const playlistHot: topListInt[] = reactive([])
    const topListFull = computed(() => store.state.topListFull)

    // swipe
    const banner: Array<swipeInt> = reactive([])

    // 新碟
    const albumListHot = [
      { id: 'ALL', name: '全部' },
      { id: 'ZH', name: '华语' },
      { id: 'EA', name: '欧美' },
      { id: 'KR', name: '韩国' },
      { id: 'JP', name: '日本' }
    ]

    const cards: Array<cardListInt> = reactive([])

    const album: Array<cardListInt> = reactive([])

    const topList: Array<topListInt> = reactive([])

    const cardsTopList: Array<cardListInt> = reactive([])

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

    // 热门推荐
    const getCardTopList: (n: number) => void = async n => {
      const { playlist } = await request['httpGET']('GET_PLAYLIST_DETAIL', { 'id': n })
      const _res = playlist.tracks
      const _l = playlist.tracks.length < 10 ? playlist.tracks.length : 10

      for (let i = 0; i < _l; i++) {
        cardsTopList[i] = {
          id: '/song?id=' + _res[i].id.toString(),
          name: _res[i].name,
          artist: _res[i].ar[0].name,
          picUrl: _res[i].al.picUrl
        }
      }
    }

    const getTopList: () => void = () => {
      for (let i = 0; i < 3; i++) {
        topList[i] = topListFull.value[i]
      }
      getCardTopList(topList[0].id)
    }

    const getIdCallBackHot: (n: { id: number; name: string }) => void = n => {
      router.push(`/discover/playlist?cat=${n.name}`)
    }

    const getIdCallBackAlbums: (n: { id: number; name: string }) => void = n => {
      router.push(`/discover/album?area=${n.id}`)
    }

    const getIdCallBackList: (n: { id: number; name: string }) => void = n => {
      getCardTopList(n.id)

      activeName.value = n.name
    }

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: number, three: string) => string = (id, type, url) => {
      switch (type) {
        case 3000:
          return url.slice(url.indexOf('com/') + 3)
        case 1000:
          return '/playlist?id=' + id
        case 1004:
          return '/mv?id=' + id
        case 10:
          return '/album?id=' + id
        case 1:
          return '/song?id=' + id
        default:
          return '/404'
      }
    }

    // swipe
    const swipe: () => void = async () => {
      const { banners } = await request['httpGET']('GET_BANNER', { 'type': 0 })

      for (let i = 0, j = banners.length; i < j; i++) {
        banner[i] = {
          imgSrc: banners[i].imageUrl,
          aHref: handleHref(banners[i].encodeId, banners[i].targetType, banners[i].url)
        }
      }
    }

    // 热门歌单分类
    const getPlaylistHot: () => void = async () => {
      const { tags } = await request['httpGET']('GET_PLAYLIST_HOT')

      for (let i = 0, j = tags.length; i < j; i++) {
        playlistHot.push({
          id: tags[i].id,
          name: tags[i].name
        })
      }
    }

    // 首页推荐歌单
    const getPersonalized: () => void = async () => {
      // 歌单
      const { result } = await request['httpGET']('GET_PERSONALIZED')
      for (let i = 0; i < 7; i++) {
        cards.push({
          id: '/playlist?id=' + result[i].id.toString(),
          name: result[i].name,
          playCount: handlePlayCount(result[i].playCount),
          picUrl: result[i].picUrl
        })
      }
      // 电台
      const data = await request['httpGET']('GET_PERSONALIZED_DJ')

      for (let i = 0; i < 3; i++) {
        cards.push({
          id: '/dj?id=' + data.result[i].id.toString(),
          name: data.result[i].name,
          playCount: handlePlayCount(data.result[i].program.listenerCount),
          picUrl: data.result[i].picUrl
        })
      }
    }

    // 首页新碟上架
    const getAlbumNewest: () => void = async () => {
      const { albums } = await request['httpGET']('GET_ALBUM_NEWEST')

      const _l = albums.length < 10 ? albums.length : 10

      for (let i = 0; i < _l; i++) {
        album.push({
          id: '/album?id=' + albums[i].id.toString(),
          name: albums[i].name,
          artist: albums[i].artist.name,
          picUrl: albums[i].picUrl
        })
      }
    }
    // 首页榜单
    const getTopListFull: () => void = async () => {
      if (sessionStorage.topListFull) {
        store.commit('setTopListFull', JSON.parse(sessionStorage.topListFull))
      } else {
        await store.dispatch('getTopListFull')
      }

      getTopList()
    }
    // 调用
    swipe()
    getPlaylistHot()
    getPersonalized()
    getAlbumNewest()
    getTopListFull()

    return {
      getIdCallBackHot,
      getIdCallBackAlbums,
      getIdCallBackList,
      playlistHot,
      cards,
      albumListHot,
      album,
      topList,
      cardsTopList,
      banner,
      activeName
    }
  }
})
</script>
