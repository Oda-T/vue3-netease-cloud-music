<template>
  <div id="djradio">
    <play-list-header :headerDetail="headerDetail" />
    <play-list-detail :listDetail="listDetail" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'

import { playListInt, headerDetailInt } from '../../type/playList.type'

import request from '../../api/index'

export default defineComponent({
  name: 'Djradio',
  components: {
    PlayListHeader,
    PlayListDetail
  },
  setup() {
    const route = useRoute()
    const headerDetail = ref({} as headerDetailInt)
    const listDetail: Array<playListInt> = reactive([])

    // 获得歌单
    const getPlayList: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_DJ_DETAIL', { 'rid': n })
      headerDetail.value = {
        name: data.name,
        coverImgUrl: data.picUrl,
        description: data.desc,
        shareCount: data.shareCount,
        subscribedCount: data.subCount,
        updateTime: data.lastProgramCreateTime
      }

      const { programs } = await request['httpGET']('GET_DJ_PROGRAM', { 'rid': n, 'offset': 0 })

      for (let i = 0; i < programs.length; i++) {
        listDetail[i] = {
          name: programs[i].name,
          id: '/dj?id=' + programs[i].id,
          artist: programs[i].dj.nickname,
          artistUrl: '/user/home?id=' + programs[i].dj.userId,
          imgUrl: programs[i].blurCoverUrl,
          time: programs[i].duration
        }
      }
    }

    typeof route.query.id === 'string' && getPlayList(route.query.id)

    return {
      route,
      headerDetail,
      listDetail
    }
  }
})
</script>
