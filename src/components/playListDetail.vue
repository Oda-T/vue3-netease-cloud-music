<template>
  <!-- 歌曲详情 -->
  <div class="c-playlist-main mdui-table-fluid">
    <table class="mdui-table mdui-table-hoverable">
      <tbody>
        <tr v-for="(item, index) in listDetail" :key="item.id" @mouseenter="curIndex = index" @mouseleave="curIndex = -1">
          <td style="width:123px;maxWidth:123px">
            <router-link :to="item.id"><img class="c-playlist-main-img" v-lazy="`${item.imgUrl}?param=32y32`"/></router-link>
          </td>
          <td style="width:674px;maxWidth:674px" class="mdui-text-truncate">
            <router-link :to="item.id">
              {{ item.name }}
            </router-link>
          </td>
          <td style="width:308px;maxWidth:308px" class="mdui-text-truncate">
            <router-link :to="item.artistUrl">
              {{ handleArtistName(item.artist) }}
            </router-link>
          </td>
          <td style="width:184px;maxWidth:184px" class="c-playlist-main-table-btn">
            <div :class="{ btnShow: curIndex !== index }">
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add</i></button>
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add_to_queue</i></button>
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">share</i></button>
              <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">vertical_align_bottom</i></button>
            </div>
          </td>
          <td style="width:111px" class="mdui-table-col-numeric">{{ handleDrTime(item.time) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'playListDetail',
  props: {
    listDetail: Object
  },
  setup() {
    const curIndex = ref(-1)

    const getDuoNum: (d: number) => string | number = d => {
      return d >= 10 ? d : `0${d}`
    }

    const handleDrTime: (d: number) => string = d => {
      const _d = Math.floor(d / 1000)
      return `${Math.floor(_d / 60)}:${getDuoNum(Math.floor(_d % 60))}`
    }

    // 多个作者用/分割
    const handleArtistName: (arr: string | Array<{ name: string }>) => string = arr => {
      if (typeof arr === 'string') {
        return arr
      } else {
        if (arr.length === 1) {
          return arr[0].name
        }
        const _arr: Array<string> = []
        for (let i = 0; i < arr.length; i++) {
          _arr.push(arr[i].name)
        }
        return _arr.join('/')
      }
    }

    return {
      curIndex,
      getDuoNum,
      handleDrTime,
      handleArtistName
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-main {
  width: 1400px;
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
