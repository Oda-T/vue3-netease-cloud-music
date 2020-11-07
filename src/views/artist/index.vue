<template>
  <div id="artist">
    <!-- 概览 -->
    <play-list-header :headerDetail="headerDetail" />
    <!-- 作品 -->
    <div class="c-artist-body">
      <div class="mdui-tab mdui-tab-full-width" mdui-tab>
        <a href="#artist-tab1" class="mdui-ripple mdui-tab-active">热门作品</a>
        <a href="#artist-tab2" class="mdui-ripple" @click="getArtistAlbum(id)">热门专辑</a>
        <a href="#artist-tab3" class="mdui-ripple" @click="getArtistMv(id)">相关MV</a>
        <a href="#artist-tab4" class="mdui-ripple" @click="getArtistDesc(id)">艺人介绍</a>
      </div>
      <div id="artist-tab1" class="mdui-p-t-2 mdui-p-b-2">
        <play-list-detail :listDetail="listDetail" />
      </div>
      <div id="artist-tab2" class="mdui-p-t-2 mdui-p-b-2">
        <card v-for="item in cardList" :key="item.id" :item="item" />
      </div>
      <div id="artist-tab3" class="mdui-p-t-2 mdui-p-b-2">
        <card v-for="item in mvCardList" :key="item.id" :item="item" />
      </div>
      <div id="artist-tab4" class="mdui-p-t-2 mdui-p-b-2">
        <div class="mdui-typo" v-for="item in description" :key="item.id" :item="item">
          <h3>{{ item.ti }}</h3>
          <p>{{ item.txt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import mdui from 'mdui'

import Card from '../../components/card.vue'
import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'
import { playListInt, headerDetailInt } from '../../type/playList.type'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Artist',
  components: {
    Card,
    PlayListHeader,
    PlayListDetail
  },
  setup() {
    const route = useRoute()
    const id = ref(0)

    const headerDetail = ref({} as headerDetailInt)
    const cardList: Array<cardInt> = reactive([])
    const mvCardList: Array<cardInt> = reactive([])

    const description: Array<{ ti: string; txt: string }> = reactive([])

    const listDetail: Array<playListInt> = reactive([])
    // 获取详情以及热门曲目
    const getArtistDetail: (n: number) => void = async n => {
      headerDetail.value = {
        coverImgUrl: '',
        desc: '',
        name: ''
      }

      const { artist, hotSongs } = await request['httpGET']('GET_ARTIST', { 'id': n })

      headerDetail.value = {
        coverImgUrl: artist.img1v1Url + '?param=264y264',
        desc: artist.briefDesc,
        name: artist.name
      }

      listDetail.length = 0

      for (let i = 0; i < hotSongs.length; i++) {
        listDetail[i] = {
          name: hotSongs[i].name,
          id: '/song?id=' + hotSongs[i].id,
          artist: hotSongs[i].ar,
          artistUrl: '/artist?id=' + hotSongs[i].ar[0].id,
          imgUrl: hotSongs[i].al.picUrl,
          time: hotSongs[i].dt
        }
      }
    }

    // 获取歌手专辑
    const getArtistAlbum: (id: number, limit?: number) => void = async (id, limit = 30) => {
      // 已经获取过，不再重复获取
      if (cardList.length) {
        return
      }

      const { hotAlbums } = await request['httpGET']('GET_ARTIST_ALBUM', { 'id': id, 'limit': limit })
      for (let i = 0; i < hotAlbums.length; i++) {
        cardList[i] = {
          id: '/album?id=' + hotAlbums[i].id,
          name: hotAlbums[i].name,
          artist: hotAlbums[i].artists[0].name,
          picUrl: hotAlbums[i].picUrl
        }
      }
    }
    // 获得歌手mv
    const getArtistMv: (id: number) => void = async id => {
      // 已经获取过，不再重复获取
      if (mvCardList.length) {
        return
      }
      const { mvs } = await request['httpGET']('GET_ARTIST_MV', { 'id': id })
      for (let i = 0; i < mvs.length; i++) {
        mvCardList[i] = {
          id: '/mv?id=' + mvs[i].id,
          name: mvs[i].name,
          artist: mvs[i].artist.name,
          picUrl: mvs[i].imgurl
        }
      }
    }

    // 获得详情
    const getArtistDesc: (id: number) => void = async id => {
      // 已经获取过，不再重复获取
      if (description.length) {
        return
      }
      const { introduction } = await request['httpGET']('GET_ARTIST_DESC', { 'id': id })

      for (let i = 0; i < introduction.length; i++) {
        description[i] = {
          ti: introduction[i].ti,
          txt: introduction[i].txt
        }
      }
    }

    route.query.id && ((id.value = Number(route.query.id)), getArtistDetail(id.value))

    onBeforeRouteUpdate(() => {
      setTimeout(() => {
        route.query.id && ((id.value = Number(route.query.id)), getArtistDetail(id.value))
      }, 20)
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      listDetail,
      headerDetail,
      cardList,
      mvCardList,
      getArtistAlbum,
      getArtistMv,
      getArtistDesc,
      id,
      description
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
      overflow-y: scroll;
      width: 1090px;
      height: 190px;
    }
  }
}
.c-artist-body {
  width: 1400px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
