<template>
  <div id="discoverArtist">
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
    <div class="artist-card-container">
      <card v-for="item in cardList" :key="item.id" :item="item" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Card from '../../components/card.vue'

import mdui from 'mdui'
import axios from 'axios'

export default defineComponent({
  name: 'artist',
  components: {
    Card
  },
  setup() {
    interface D {
      id: string
      name: string
      artist: string
      picUrl: string
    }
    const artistAreaVal = ref(-1)
    const artistTypeVal = ref(-1)

    const cardList: Array<D> = reactive([])

    const getArtist: () => void = () => {
      axios({
        url: `http://localhost:3000/artist/list?type=${artistTypeVal.value}&area=${artistAreaVal.value}&initial=-1&limit=60`
      })
        .then(res => {
          if (res.status === 200) {
            const _res = res.data.artists
            for (let i = 0; i < _res.length; i++) {
              cardList[i] = {
                id: '/artist?id=' + _res[i].id,
                name: _res[i].name,
                artist: 'albumSize' + _res[i].albumSize,
                picUrl: _res[i].picUrl
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
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
    margin-left: 190px;
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
  width: 1333px;
  height: 3230px;
  margin: 0 auto;
}
</style>
