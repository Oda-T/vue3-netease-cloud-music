<template>
  <div v-if="cardList.length" id="discoverArtist">
    <div class="artist-container">
      <span class="artist-span">类别选择</span>
      <span class="artist-area">
        <select class="mdui-select" v-model="artistAreaVal" @change="handleArtistAreaChange" mdui-select>
          <option value="-1">全部</option>
          <option value="7">华语</option>
          <option value="96">欧美</option>
          <option value="8">日本</option>
          <option value="16">韩国</option>
          <option value="0">其他</option>
        </select>
      </span>
      <span class="artist-type">
        <select class="mdui-select" v-model="artistTypeVal" @change="handleArtistTypeChange" mdui-select>
          <option value="-1">全部</option>
          <option value="1">男歌手</option>
          <option value="2">女歌手</option>
          <option value="3">乐队</option>
        </select>
      </span>
    </div>
    <div class="artist-card-container g-card-container">
      <Card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Card from '../../components/card.vue'

import mdui from 'mdui'

import { cardInt } from '../../type/card.type'

import request from '../../api/index'

export default defineComponent({
  name: 'discoverArtist',
  components: {
    Card
  },
  setup() {
    const artistAreaVal = ref(-1)
    const artistTypeVal = ref(-1)

    const cardList: Array<cardInt> = reactive([])

    const getArtist: () => void = async () => {
      const { artists } = await request['httpGET']('GET_ARTIST_LIST', { 'type': artistTypeVal.value, 'area': artistAreaVal.value, 'initial': -1, 'limit': 60 })

      for (let i = 0; i < artists.length; i++) {
        cardList[i] = {
          id: '/artist?id=' + artists[i].id,
          name: artists[i].name,
          artist: 'albumSize' + artists[i].albumSize,
          picUrl: artists[i].picUrl
        }
      }
    }

    const handleArtistAreaChange: () => void = () => {
      getArtist()
    }

    const handleArtistTypeChange: () => void = () => {
      getArtist()
    }

    getArtist()

    onMounted(() => {
      mdui.mutation()
    })
    return {
      cardList,
      artistAreaVal,
      artistTypeVal,
      handleArtistAreaChange,
      handleArtistTypeChange
    }
  }
})
</script>
<style lang="less" scoped>
.artist-container {
  margin-top: 20px;
  .artist-span {
    margin-left: 40%;
    margin-right: 30px;
  }
  .artist-area {
    margin-left: 30px;
    margin-right: 30px;
  }
  .artist-type {
    margin-left: 30px;
    margin-right: 30px;
  }
}
.artist-card-container {
  height: 3230px;
  margin: 0 auto;
}
</style>
