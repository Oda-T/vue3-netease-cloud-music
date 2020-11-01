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

import { topListInt, cardListInt } from '../../type/recommend.type'
import { panelInt } from '../../type/panel'

import mdui from 'mdui'

import request from '../../api/index'

export default defineComponent({
  name: 'Djradio',
  components: {
    Recommend
  },
  setup() {
    const djList: Array<topListInt> = reactive([])
    const djCardList: Array<cardListInt> = reactive([])

    const djHotPanelList: Array<panelInt> = reactive([])
    const djNewPanelList: Array<panelInt> = reactive([])

    const activeName = ref('')

    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }

    const getTopList: () => void = async () => {
      const { data } = await request['httpGET']('GET_DJ_CATEGORY_RECOMMEND')

      for (let i = 0; i < data.length; i++) {
        djList[i] = {
          id: data[i].categoryId,
          name: data[i].categoryName
        }
      }
      activeName.value = djList[0].name
    }

    // hot new dj
    const getDjPanelList: (s: string, arr: panelInt[]) => void = async (s, arr) => {
      const { toplist } = await request['httpGET']('GET_DJ_TOPLIST')

      for (let i = 0; i < 15; i++) {
        arr[i] = {
          id: '/djradio?id=' + toplist[i].id.toString(),
          name: toplist[i].name,
          artist: toplist[i].creatorName,
          signature: toplist[i].dj.signature,
          createTime: handleTime(toplist[i].createTime),
          playCount: toplist[i].playCount,
          rcmdtext: toplist[i].rcmdtext
        }
      }
    }

    const getPlayList: (n: number) => void = async n => {
      const { djRadios } = await request['httpGET']('GET_DJ_RADIO_HOT', { 'cateId': n })

      for (let i = 0; i < 10; i++) {
        djCardList[i] = {
          id: '/djradio?id=' + djRadios[i].id.toString(),
          name: djRadios[i].name,
          artist: djRadios[i].dj.nickname,
          picUrl: djRadios[i].picUrl
        }
      }
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
