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
          <div class="recommend-card-item-container" :style="{ left: cardItemContainerLeft }">
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
        <button v-show="arrowleftshow" class="recommend-card-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerLeft">
          <i class="mdui-icon material-icons">chevron_left</i>
        </button>
        <button v-show="arrowrightshow" class="recommend-card-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerRight">
          <i class="mdui-icon material-icons">chevron_right</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

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

    const cardItemContainerLeft = ref('0px')

    const arrowleftshow = ref(false)
    const arrowrightshow = ref(true)

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

    const handleCardItemContainerLeft: () => void = () => {
      if (cardItemContainerLeft.value === '0px') {
        return
      }
      arrowleftshow.value = false
      arrowrightshow.value = true

      cardItemContainerLeft.value = '0px'
    }

    const handleCardItemContainerRight: () => void = () => {
      if (cardItemContainerLeft.value === '-862px') {
        return
      }

      arrowleftshow.value = true
      arrowrightshow.value = false

      cardItemContainerLeft.value = '-862px'
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
      cardsDj,
      arrowleftshow,
      arrowrightshow,
      cardItemContainerLeft,
      handleCardItemContainerLeft,
      handleCardItemContainerRight
    }
  }
})
</script>

<style lang="less" scoped>
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
    position: relative;

    .recommend-card-item {
      position: relative;
      height: 427px;
      width: 1412px;
      margin: 0 auto;
      overflow-x: hidden;
      .recommend-card-item-container {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        margin-left: -30px;
        width: 2304px;
        transition: left 0.5s ease-in-out;
        .recommend-card-list {
          display: inline-block;
          width: 258px;
          height: 382px;
          margin: 15px 0px 30px 30px;
        }
      }
    }
    .recommend-card-arrow-left {
      position: absolute;
      left: calc((100% - 1412px) / 2);
      top: 50%;
      transform: translate(-50%, -172%);
    }
    .recommend-card-arrow-right {
      position: absolute;
      right: calc((100% - 1412px) / 2);
      top: 50%;
      transform: translate(50%, -172%);
    }
  }
}
</style>
