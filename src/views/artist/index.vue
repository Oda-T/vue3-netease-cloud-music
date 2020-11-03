<template>
  <div id="artist">
    <!-- 概览 -->
    <header class="c-artist-header mdui-typo">
      <img class="c-artist-header-img" :src="artistDetail.coverImgUrl" :alt="artistDetail.name" />
      <div class="c-artist-header-text">
        <h1>{{ artistDetail.name }}</h1>
        <p class="c-artist-header-sub-text">{{ artistDetail.description }}</p>
      </div>
    </header>
    <!-- 作品 -->
    <div class="c-artist-body">
      <div class="mdui-tab mdui-tab-full-width" mdui-tab>
        <a href="#artist-tab1" class="mdui-ripple mdui-tab-active">热门作品</a>
        <a href="#artist-tab2" class="mdui-ripple">所有专辑</a>
        <a href="#artist-tab3" class="mdui-ripple">相关MV</a>
        <a href="#artist-tab4" class="mdui-ripple">艺人介绍</a>
      </div>
      <div id="artist-tab1" class="mdui-p-a-2">
        <play-list :headerDetail="headerDetail" :listDetail="listDetail" />
      </div>
      <div id="artist-tab2" class="mdui-p-a-2">shopping content</div>
      <div id="artist-tab3" class="mdui-p-a-2">images content</div>
      <div id="artist-tab4" class="mdui-p-a-2">images content</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

import mdui from 'mdui'

import PlayList from '../../components/playlist.vue'

import { artistDetailInt } from '../../type/artist.type'
import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Artist',
  components: {
    PlayList
  },
  setup() {
    const route = useRoute()
    const artistDetail = ref({} as artistDetailInt)
    const headerDetail = ref({} as headerDetailInt)

    const listDetail: Array<playListInt> = reactive([])

    const getArtistDetail: (n: number) => void = async n => {
      const { artist, hotSongs } = await request['httpGET']('GET_ARTIST', { 'id': n })

      artistDetail.value = {
        coverImgUrl: artist.img1v1Url + '?param=264y264',
        description: artist.briefDesc,
        name: artist.name
      }

      for (let i = 0; i < hotSongs.length; i++) {
        listDetail[i] = {
          name: hotSongs[i].name,
          id: '/song?id=' + hotSongs[i].id,
          artist: hotSongs[i].ar,
          artistUrl: '/artist?id=' + hotSongs[i].ar[0].id,
          imgUrl: hotSongs[i].al.picUrl + '?param=32y32',
          time: hotSongs[i].dt
        }
      }
    }

    route.query.id && getArtistDetail(Number(route.query.id))

    onMounted(() => {
      mdui.mutation()
    })
    return {
      artistDetail,
      listDetail,
      headerDetail
    }
  }
})
</script>
<style lang="less" scoped>
.c-artist-header {
  position: relative;
  width: 1400px;
  margin: 0 auto;
  height: 360px;
  overflow: hidden;
  .c-artist-header-img {
    position: absolute;
    left: 0px;
    top: 50px;
    width: 264px;
    height: 264px;
  }
  .c-artist-header-text {
    position: absolute;
    left: 310px;
    top: 25px;
    .c-artist-header-sub-text {
      overflow: hidden;
      width: 1090px;
      height: 200px;
    }
  }
}
.c-artist-body {
  width: 1400px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
