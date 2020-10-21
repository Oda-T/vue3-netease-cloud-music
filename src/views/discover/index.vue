<template>
  <div>
    <swipe />

    <!-- 热门推荐 -->
    <recommend>
      <!-- 分类列表 -->
      <template v-slot:playlist>
        <router-link class="recommend-playlist-hot mdui-chip mdui-color-red-900" to="/discover/playlist">
          <span class="mdui-chip-title">热门推荐</span>
        </router-link>
        <router-link class="recommend-playlist-hot mdui-chip" v-for="item in playlistHot" :key="item.id" :to="'/discover/playlist/?cat=' + item">
          <span class="mdui-chip-title">{{ item }}</span>
        </router-link>
        <router-link class="recommend-playlist-hot mdui-chip" style="float:right" to="/discover/playlist">
          <span class="mdui-chip-title">更多</span>
        </router-link>
      </template>

      <template v-slot:card>
        <!-- 每日推荐歌曲 -->
        <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cards" :key="item.id">
          <card :item="item"></card>
        </div>
        <!-- 每日推荐 dj -->
        <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cardsDj" :key="item.id">
          <card :item="item"></card>
        </div>
      </template>
    </recommend>

    <!-- 新碟上架 -->
    <recommend>
      <!-- 分类列表 -->
      <template v-slot:playlist>
        <router-link class="recommend-playlist-hot mdui-chip mdui-color-red-900" to="/album/newest">
          <span class="mdui-chip-title">新碟上架</span>
        </router-link>
        <router-link class="recommend-playlist-hot mdui-chip" v-for="item in albumListHot" :key="item.id" :to="'/album/new?area=' + item.id">
          <span class="mdui-chip-title">{{ item.name }}</span>
        </router-link>
        <router-link class="recommend-playlist-hot mdui-chip" style="float:right" to="/album/newest">
          <span class="mdui-chip-title">更多</span>
        </router-link>
      </template>

      <template v-slot:card>
        <!-- 新碟上架 -->
        <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in albums" :key="item.id">
          <card :item="item"></card>
        </div>
      </template>
    </recommend>
    <!-- 榜单 -->
    <div class="recommend-playlist">
      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>
      <router-link class="recommend-playlist-hot mdui-chip mdui-color-red-900" to="/discover/toplist">
        <span class="mdui-chip-title">榜单</span>
      </router-link>
      <router-link class="recommend-playlist-hot mdui-chip" v-for="item in topList" :key="item.id" :to="'/discover/toplist?id=' + item.id">
        <span class="mdui-chip-title">{{ item.name }}</span>
      </router-link>
      <router-link class="recommend-playlist-hot mdui-chip" style="float:right" to="/discover/toplist">
        <span class="mdui-chip-title">更多</span>
      </router-link>
      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>
      <div class="recommend-playlist-container">
        <div class="recommend-playlist-item" v-for="item in topList" :key="item.id">
          <div class="recommend-playlist-item-title">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <list :id="item.id"></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

import mdui from 'mdui'
import axios from 'axios'

import Swipe from '../../components/swipe.vue'
import Card from '../../components/card.vue'
import List from '../../components/list.vue'
import Recommend from '../../components/recommend.vue'

export default defineComponent({
  name: 'Discover',
  components: {
    Swipe,
    Card,
    List,
    Recommend
  },
  setup() {
    interface T {
      id: string | number
      name: string
      playCount: string | number
      copywriter: string
      picUrl: string
      type: number
    }

    // 热门推荐
    const playlistHot: Array<string> = reactive([])

    const cards: Array<T> = reactive([])
    const cardsDj: Array<T> = reactive([])

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

    // 新碟

    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }

    const albums: Array<D> = reactive([])

    const albumListHot = [
      { id: 'ALL', name: '全部' },
      { id: 'ZH', name: '华语' },
      { id: 'EA', name: '欧美' },
      { id: 'KR', name: '韩国' },
      { id: 'JP', name: '日本' }
    ]

    interface L {
      name: string
      id: string | number
      coverImgUrl: string
    }

    const topList: Array<L> = reactive([])

    // 热门歌单分类
    axios({
      url: 'http://localhost:3000/playlist/hot'
    }).then(res => {
      if (res.status === 200) {
        const _res = res.data.tags
        for (let i = 0, j = _res.length; i < j; i++) {
          playlistHot.push(_res[i].name)
        }
      }
    })

    // 首页推荐歌单
    axios({
      url: 'http://localhost:3000/personalized'
    }).then(res => {
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
      }
    })

    // 首页推荐电台
    axios({
      url: 'http://localhost:3000/personalized/djprogram'
    }).then(res => {
      if (res.status === 200) {
        const _res = res.data.result

        for (let i = 0; i < 4; i++) {
          cardsDj.push({
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

    // 首页新碟上架
    axios({
      url: 'http://localhost:3000/album/newest'
    }).then(res => {
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

    // 首页榜单
    axios({
      url: 'http://localhost:3000/toplist'
    }).then(res => {
      if (res.status === 200) {
        const _res = res.data.list
        for (let i = 0; i < 3; i++) {
          topList.push({
            id: _res[i].id,
            name: _res[i].name,
            coverImgUrl: _res[i].coverImgUrl + '?param=100y100'
          })
        }
      }
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      playlistHot,
      cards,
      cardsDj,
      albumListHot,
      albums,
      topList
    }
  }
})
</script>

<style lang="less" scoped>
.recommend-playlist {
  width: 1400px;
  overflow: hidden;
  margin: 0 auto;
  .recommend-playlist-hot {
    margin: 20px 10px 8px;
  }
  .recommend-playlist-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .recommend-playlist-item {
      width: 300px;
      .recommend-playlist-item-title {
        text-align: center;
      }
    }
  }
}
.recommend-playlist-hot {
  margin: 20px 10px 8px;
}

.recommend-card-list {
  display: inline-block;
  width: 240px;
  margin: 15px 20px 0px 20px;
}
</style>
