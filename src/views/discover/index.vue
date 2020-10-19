<template>
  <div>
    <swipe />

    <div class="g-hot-recommend">
      <div class="recommend-playlist">
        <!-- 分割线 -->
        <div class="mdui-typo">
          <hr />
        </div>

        <div class="recommend-playlist-hot mdui-chip mdui-color-red-900">
          <span class="mdui-chip-title">热门推荐</span>
        </div>

        <router-link class="recommend-playlist-hot mdui-chip" v-for="item in playlistHot" :key="item.id" :to="'/discover/playlist/?cat=' + item">
          <span class="mdui-chip-title">{{ item }}</span>
        </router-link>

        <router-link class="recommend-playlist-hot mdui-chip" style="float:right" to="/discover/playlist">
          <span class="mdui-chip-title">更多</span>
        </router-link>

        <!-- 分割线 -->
        <div class="mdui-typo">
          <hr />
        </div>
      </div>

      <div class="recommend-card">
        <div class="recommend-card-item">
          <div class="recommend-card-item-container">
            <!-- 每日推荐歌曲 -->
            <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cards" :key="item.id">
              <card :item="item"></card>
            </div>
            <!-- 每日推荐 dj -->
            <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cardsDj" :key="item.id">
              <card :item="item"></card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

import mdui from 'mdui'
import axios from 'axios'

import Swipe from '@/components/swipe.vue'
import Card from '@/components/card.vue'

export default defineComponent({
  name: 'Discover',
  components: {
    Swipe,
    Card
  },
  setup() {
    interface T {
      id: string | number
      name: string
      playCount: string | number
      copywriter: string
      picUrl: string
      showIcon: boolean
    }

    interface B extends T {
      program: { listenerCount: number }
    }

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

    const handlePlaylistHot: (a: Array<{ name: string }>) => void = res => {
      for (let i = 0, j = res.length; i < j; i++) {
        playlistHot.push(res[i].name)
      }
    }

    const handleRecommendCard: (a: Array<T>) => void = res => {
      for (let i = 0; i < 5; i++) {
        cards.push({
          id: '/playlist?id=' + res[i].id.toString(),
          name: res[i].name,
          playCount: handlePlayCount(res[i].playCount),
          copywriter: res[i].copywriter,
          picUrl: res[i].picUrl + '?param=280y280',
          showIcon: false
        })
      }
    }
    const handleRecommendCardDj: (a: Array<B>) => void = res => {
      for (let i = 0; i < 3; i++) {
        cardsDj.push({
          id: '/dj?id=' + res[i].id.toString(),
          name: res[i].name,
          playCount: handlePlayCount(res[i].program.listenerCount),
          copywriter: res[i].copywriter,
          picUrl: res[i].picUrl + '?param=280y280',
          showIcon: true
        })
      }
    }

    // 热门歌单分类
    axios({
      url: 'http://localhost:3000/playlist/hot'
    }).then(res => {
      if (res.status === 200) {
        handlePlaylistHot(res.data.tags)
      }
    })

    // 首页推荐歌单
    axios({
      url: 'http://localhost:3000/personalized'
    }).then(res => {
      handleRecommendCard(res.data.result)
      return Promise.resolve()
    })

    // 首页推荐电台
    axios({
      url: 'http://localhost:3000/personalized/djprogram'
    }).then(res => {
      handleRecommendCardDj(res.data.result)
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      playlistHot,
      cards,
      cardsDj
    }
  }
})
</script>

<style lang="less" scoped>
// @media screen and (min-width: 600px) {
//   .recommend-card-list {
//     width: calc(100% / 3 - 30px);
//   }
// }
// @media screen and (min-width: 1023px) {
//   .recommend-card-list {
//     width: calc(100% / 4 - 30px);
//   }
// }
// @media screen and(min-width: 1919px) {
//   .recommend-card-list {
//     width: calc(100% / 6 - 30px);
//   }
// }
// @media screen and(min-width: 2559px) {
//   .recommend-card-list {
//     width: calc(100% / 8 - 30px);
//   }
// }

.g-hot-recommend {
  width: 100%;
  .recommend-playlist {
    width: 85%;
    max-width: 1500px;
    overflow: hidden;
    margin: 0 auto;
    height: 95px;

    .recommend-playlist-hot {
      margin: 20px 10px 8px;
    }
  }

  .recommend-card {
    width: 100%;
    height: 100%;

    .recommend-card-item {
      width: 85%;
      height: 500px;
      max-width: 1500px;
      margin: 0 auto;
      overflow-x: scroll;
      overflow-y: hidden;
      .recommend-card-item-container {
        height: 360px;
        margin-left: -15px;
        width: 1920px;
        .recommend-card-list {
          display: inline-block;
          width: 210px;
          height: 330px;
          margin: 15px;
        }
      }
    }
  }
}
</style>
