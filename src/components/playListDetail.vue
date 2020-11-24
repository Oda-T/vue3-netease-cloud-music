<template>
  <!-- 歌曲详情 -->
  <div class="g-card-container c-playlist-main mdui-table-fluid">
    <table class="mdui-table mdui-table-hoverable">
      <tbody>
        <tr v-if="!listDetail.length" style="height: 57px"></tr>
        <tr v-else v-for="(item, index) in listDetail" :key="item.id" @mouseenter="curIndex = index" @mouseleave="curIndex = -1">
          <td style="width: 120px; max-width: 120px">
            <router-link :to="item.id">
              <img class="c-playlist-main-img" v-lazy="`${item.imgUrl}?param=32y32`" />
            </router-link>
          </td>
          <td style="width: 410px; max-width: 410px" class="mdui-text-truncate">
            <router-link :to="item.id">
              {{ item.name }}
            </router-link>
          </td>
          <td style="width: 300px; max-width: 300px" class="mdui-text-truncate">
            <router-link :to="item.artistUrl">
              {{ item.artist }}
            </router-link>
          </td>
          <td style="width: 180px; max-width: 180px" class="c-playlist-main-table-btn">
            <div :class="{ btnShow: curIndex !== index }">
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense" @click.stop="$emit('handle-list-play', item.id.split('?id=')[1])"><i class="mdui-icon material-icons">add</i></button>
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense" @click.stop="$emit('handle-list-share', item.id.split('?id=')[1], 'song', 'test')">
                <i class="mdui-icon material-icons">share</i>
              </button>
              <button disabled class="mdui-btn mdui-btn-icon mdui-btn-dense" @click.stop="$emit('handle-list-subscribe', item.id.split('?id=')[1], 'song')">
                <i class="mdui-icon material-icons">add_to_queue</i>
              </button>
            </div>
          </td>
          <td style="width: 100px; max-width: 100px" class="mdui-table-col-numeric">{{ handleDrTime(item.time) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { playListInt } from '../type/playList.type'
import { handleDrTime } from '../utils/time'

export default defineComponent({
  name: 'playListDetail',
  props: {
    listDetail: Object as PropType<Array<playListInt>>
  },
  emits: ['handle-list-play', 'handle-list-share', 'handle-list-subscribe'],
  setup() {
    const curIndex = ref(-1)

    return {
      curIndex,
      handleDrTime
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-main {
  margin: 0 auto;
  .c-playlist-main-img {
    vertical-align: middle;
  }
  .c-playlist-main-table-btn {
    height: 57px;
    overflow: hidden;
    opacity: 0.7;
  }
}
.btnShow {
  display: none;
}
</style>
