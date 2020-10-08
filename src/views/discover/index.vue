<template>
  <div>
    <swipe />
    <div class="g-hot-recommend">
      <div class="recommend-list">热门推荐</div>
      <div class="mdui-chip">
        <span class="mdui-chip-icon"><i class="mdui-icon material-icons">face</i></span>
        <span class="mdui-chip-title">Example Chip</span>
      </div>
      <div class="recommend-card">
        <div class="recommend-card-item">
          <!-- 每日推荐歌曲 -->
          <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cards" :key="item.id">
            <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
            <div class="mdui-card-media">
              <router-link :to="item.id">
                <img :src="item.picUrl" />
              </router-link>

              <div class="mdui-card-menu">
                <button class="mdui-btn mdui-btn-icon mdui-text-color-white  mdui-text-color-theme-700"><i class="mdui-icon material-icons">play_circle_outline</i></button>
              </div>
            </div>
            <!-- 卡片的标题和副标题 -->
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title recommend-card-list-title">{{ item.name }}</div>
              <div class="mdui-card-primary-subtitle">{{ item.playCount }}</div>
            </div>
          </div>
          <!-- 每日推荐 dj -->
          <div class="mdui-card recommend-card-list mdui-hoverable" v-for="item in cardsDj" :key="item.id">
            <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
            <div class="mdui-card-media">
              <router-link :to="item.id">
                <img :src="item.picUrl" />
              </router-link>

              <div class="mdui-card-menu">
                <button class="mdui-btn mdui-btn-icon mdui-text-color-white  mdui-text-color-theme-700"><i class="mdui-icon material-icons">play_circle_outline</i></button>
              </div>
            </div>

            <!-- 卡片的标题和副标题 -->
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title recommend-card-list-title">
                <i style="border:1px solid red;border-radius:5px;font-size:13px;letter-spacing:-2px;margin-right:8px;padding:2px;">电台节目</i>{{ item.name }}
              </div>
              <div class="mdui-card-primary-subtitle">{{ item.playCount }}</div>
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

import Swipe from '@/components/swipe/index.vue'

export default defineComponent({
  name: 'Discover',
  components: {
    Swipe
  },
  setup() {
    interface T {
      id: string | number
      name: string
      playCount: string | number
      copywriter: string
      picUrl: string
    }

    interface B extends T {
      program: { listenerCount: number }
    }

    const cards: Array<T> = reactive([])
    const cardsDj: Array<T> = reactive([])

    const handlePlayCount: (a: number | string) => string = n => {
      // Number(n)
      let _n = Number(n)
      let _nS = ''
      if (_n > 9999) {
        _n = Math.round(_n / 10000)
        _nS = _n.toString() + '万'
      } else {
        _nS = n.toString()
      }
      return _nS
    }

    const handleRecommendCard: (a: Array<T>) => void = res => {
      for (let i = 0; i < 5; i++) {
        cards.push({
          id: '/playlist?id=' + res[i].id.toString(),
          name: res[i].name,
          playCount: handlePlayCount(res[i].playCount),
          copywriter: res[i].copywriter,
          picUrl: res[i].picUrl + '?param=280y280'
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
          picUrl: res[i].picUrl + '?param=280y280'
        })
      }
    }

    // 首页推荐歌单
    axios({
      url: 'http://localhost:3000/personalized',
      method: 'get'
    }).then(res => {
      handleRecommendCard(res.data.result)
      return Promise.resolve()
    })

    // 首页推荐电台
    axios({
      url: 'http://localhost:3000/personalized/djprogram',
      method: 'get'
    }).then(res => {
      handleRecommendCardDj(res.data.result)
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      cards,
      cardsDj
    }
  }
})
</script>

<style lang="less" scoped>
.g-hot-recommend {
  width: 100%;
  margin-bottom: 80px !important;
  .recommend-list {
    width: 300px;
  }
  .recommend-card {
    width: 100%;
    height: 100%;
    display: flex;
    .recommend-card-item {
      width: 1320px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .recommend-card-list {
        width: 280px;
        margin: 25px;

        .recommend-card-list-title {
          font-size: 16px;
          line-height: 28px;
          overflow: hidden;
          height: 60px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    &::before {
      flex-grow: 1;
      content: ' ';
    }
    &::after {
      flex-grow: 1;
      content: ' ';
    }
  }
}
</style>
