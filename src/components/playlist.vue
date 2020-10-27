<template>
  <div>
    <!-- 概览 -->
    <header class="c-playlist-header mdui-typo">
      <img class="c-playlist-header-img" :src="headerDetail.coverImgUrl" :alt="headerDetail.description" />
      <div class="c-playlist-header-text">
        <h1>{{ headerDetail.name }}</h1>
        <p>最近更新：{{ headerDetail.updateTime }}</p>
        <p>{{ headerDetail.playCount }}次播放</p>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple"><i class="mdui-icon mdui-icon-left material-icons">add_to_queue</i>{{ headerDetail.shareCount }}</button>
        <button class="c-playlist-header-subscribedCount mdui-btn mdui-color-red-900 mdui-ripple">
          <i class="mdui-icon mdui-icon-left material-icons">share</i>{{ headerDetail.subscribedCount }}
        </button>
        <button class="mdui-btn mdui-color-red-900 mdui-ripple"><i class="mdui-icon mdui-icon-left material-icons">sms</i>{{ headerDetail.commentCount }} </button>
        <h5 class="c-playlist-header-description">{{ headerDetail.description }}</h5>
      </div>
    </header>

    <!-- 歌曲详情 -->
    <div class="c-playlist-main mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverable">
        <tbody>
          <tr v-for="(item, index) in listDetail" :key="item.id" @mouseenter="curIndex = index" @mouseleave="curIndex = -1">
            <td style="width:123px">
              <router-link :to="item.id"><img class="c-playlist-main-img" v-lazy="item.imgUrl" :alt="item.name"/></router-link>
            </td>
            <td style="width:674px;maxWidth:674px" class="mdui-text-truncate">
              <router-link :to="item.id">
                {{ item.name }}
              </router-link>
            </td>
            <td style="width:308px;maxWidth:308px" class="mdui-text-truncate">
              <router-link :to="item.artistUrl">
                {{ item.artist }}
              </router-link>
            </td>
            <td style="width:184px" class="c-playlist-main-table-btn">
              <div :class="{ btnShow: curIndex !== index }">
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">add_to_queue</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">share</i></button>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense"><i class="mdui-icon material-icons">vertical_align_bottom</i></button>
              </div>
            </td>
            <td style="width:111px" class="mdui-table-col-numeric">{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import mdui from 'mdui'

export default defineComponent({
  name: 'PlayList',
  props: {
    headerDetail: Object,
    listDetail: Object
  },
  setup() {
    const curIndex = ref(-1)

    onMounted(() => {
      mdui.mutation()
    })

    return {
      curIndex
    }
  }
})
</script>
<style lang="less" scoped>
.c-playlist-header {
  position: relative;
  width: 1400px;
  margin: 0 auto;
  height: 360px;
  overflow: hidden;
  .c-playlist-header-img {
    position: absolute;
    left: 0px;
    top: 50px;
    width: 264px;
    height: 264px;
  }
  .c-playlist-header-text {
    position: absolute;
    left: 310px;
    top: 25px;

    .c-playlist-header-subscribedCount {
      margin: 0 50px;
    }
  }
}
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
