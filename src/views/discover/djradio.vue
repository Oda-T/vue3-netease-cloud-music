<template>
  <div id="discoverDjradio">
    <recommend :topTitle="'主播电台'" :activeName="activeName" :topList="djList" :cardList="djCardList" @getid="getIdCallBackDj" />
    <div class="dj-card-container">
      <!-- 热门电台 -->
      <h1 class="mdui-typo-title mdui-text-color-red-900">热门电台Top15</h1>
      <div class="mdui-panel mdui-panel-gapless" mdui-panel>
        <div class="mdui-panel-item mdui-panel-item-open" v-for="item in djHotPanelList" :key="item.id">
          <div class="mdui-panel-item-header">
            <div class="mdui-panel-item-title">{{ item.name }}</div>
            <div class="mdui-panel-item-summary">{{ item.artist }}</div>
            <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <div class="mdui-panel-item-body">
            <p>更新时间：{{ item.createTime }}</p>
            <p>签名：{{ item.signature }}</p>
            <p>播放次数{{ item.playCount }}</p>
            <p>###{{ item.rcmdtext }}</p>
          </div>
        </div>
      </div>
      <!-- 新晋电台 -->
      <h1 class="mdui-typo-title mdui-text-color-red-900">新晋电台Top15</h1>
      <div class="mdui-panel mdui-panel-gapless" mdui-panel>
        <div class="mdui-panel-item mdui-panel-item-open" v-for="item in djNewPanelList" :key="item.id">
          <div class="mdui-panel-item-header">
            <div class="mdui-panel-item-title">{{ item.name }}</div>
            <div class="mdui-panel-item-summary">{{ item.artist }}</div>
            <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <div class="mdui-panel-item-body">
            <p>更新时间：{{ item.createTime }}</p>
            <p>签名：{{ item.signature }}</p>
            <p>播放次数{{ item.playCount }}</p>
            <p>###{{ item.rcmdtext }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'

import Recommend from '../../components/recommend.vue'

import axios from 'axios'
import mdui from 'mdui'

export default defineComponent({
  name: 'Djradio',
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

    interface T {
      id: string
      name: string
      artist: string
      createTime: string
      signature: string
      playCount: number
      rcmdtext: number
    }

    const djList: Array<S> = reactive([])
    const djCardList: Array<D> = reactive([])

    const djHotPanelList: Array<T> = reactive([])
    const djNewPanelList: Array<T> = reactive([])

    const activeName = ref('')

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const getTopList: () => void = () => {
      axios({
        url: `http://localhost:3000/dj/category/recommend`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.data
            for (let i = 0; i < _res.length; i++) {
              djList[i] = {
                id: _res[i].categoryId,
                name: _res[i].categoryName
              }
            }
            activeName.value = djList[0].name
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    // hot new dj
    const getDjPanelList: (s: string, arr: T[]) => void = (s, arr) => {
      axios({
        url: `http://localhost:3000/dj/toplist?type=${s}`
      })
        .then(res => {
          if (res.status === 200) {
            // 榜单
            const _res = res.data.toplist

            for (let i = 0; i < 15; i++) {
              arr[i] = {
                id: '/djradio?id=' + _res[i].id.toString(),
                name: _res[i].name,
                artist: _res[i].creatorName,
                signature: _res[i].dj.signature,
                createTime: handleTime(_res[i].createTime),
                playCount: _res[i].playCount,
                rcmdtext: _res[i].rcmdtext
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getPlayList: (n: number) => void = n => {
      axios({
        url: `http://localhost:3000/dj/radio/hot?cateId=${n}`
      })
        .then(res => {
          if (res.status === 200) {
            // 榜单
            const _res = res.data.djRadios
            for (let i = 0; i < 10; i++) {
              djCardList[i] = {
                id: '/djradio?id=' + _res[i].id.toString(),
                name: _res[i].name,
                artist: _res[i].dj.nickname,
                picUrl: _res[i].picUrl
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getIdCallBackDj: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id)
    }

    // 获取特色dj列表
    getTopList()
    // 获取推荐目录 wangyuyun
    getPlayList(1)
    // hot dj
    getDjPanelList('hot', djHotPanelList)
    // new dj
    getDjPanelList('new', djNewPanelList)

    onMounted(() => {
      mdui.mutation()
    })

    return {
      activeName,
      djList,
      djCardList,
      getIdCallBackDj,
      djHotPanelList,
      djNewPanelList
    }
  }
})
</script>
<style lang="less" scoped>
.dj-card-container {
  width: 1333px;
  margin: 0 auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
