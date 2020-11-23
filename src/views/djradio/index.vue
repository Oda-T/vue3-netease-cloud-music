<template>
  <div id="djradio">
    <PlayListHeader :headerDetail="headerDetail" @handle-play="handlePlay(djRadioList)" @handle-share="handleShare(id, 'djradio', 'test')" @handle-subscribe="handleSubscribe(id, 'djradio')" />
    <PlayListDetail :listDetail="listDetail" @handle-list-play="handlePlay" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import PlayListHeader from '../../components/playListHeader.vue'
import PlayListDetail from '../../components/playListDetail.vue'

import { playListInt, headerDetailInt } from '../../type/playList.type'
import { handlePlay, handleShare, handleSubscribe } from '../../utils/usePlayListHeader'

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
    const djRadioList: Array<string> = reactive([])
    const id = ref('')
    // 获得歌单
    const getDjradioList: (n: string) => void = async n => {
      const { data } = await request['httpGET']('GET_DJ_DETAIL', { 'rid': n })
      headerDetail.value = {
        name: data.name,
        coverImgUrl: data.picUrl,
        description: data.desc,
        shareCount: data.shareCount,
        subscribedCount: data.subCount,
        subscribed: data.subed,
        updateTime: data.lastProgramCreateTime
      }

      const { programs } = await request['httpGET']('GET_DJ_PROGRAM', { 'rid': n, 'offset': 0 })

      for (let i = 0; i < programs.length; i++) {
        listDetail[i] = {
          name: programs[i].name,
          id: '/dj?id=' + programs[i].id,
          artist: programs[i].dj.nickname,
          artistUrl: '/user?id=' + programs[i].dj.userId,
          imgUrl: programs[i].blurCoverUrl,
          time: programs[i].duration
        }
        djRadioList[i] = programs[i].id.toString()
      }
    }

    typeof route.query.id === 'string' && ((id.value = route.query.id), getDjradioList(route.query.id))

    return {
      route,
      headerDetail,
      listDetail,
      handlePlay,
      handleShare,
      handleSubscribe,
      djRadioList,
      id
    }
  }
})
</script>
