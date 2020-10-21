<template>
  <div>
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple" v-for="item in list" :key="item.id">
        <div class="mdui-list-item-avatar"><img src=""/></div>
        <div class="mdui-list-item-content">{{ item.name }}</div>
        <i class="mdui-list-item-icon mdui-icon material-icons">chat_bubble</i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'List',
  props: {
    id: Number
  },
  setup(props) {
    interface T {
      name: string
      id: number
    }
    const list: Array<T> = reactive([])
    axios({
      url: `http://localhost:3000/playlist/detail?id=${props.id}`
    }).then(res => {
      const _list = res.data.playlist.tracks
      for (let i = 0; i < 10; i++) {
        list.push({
          name: _list[i].name,
          id: _list[i].id
        })
      }
    })
    return {
      list
    }
  }
})
</script>
<style lang="stylus" scoped></style>
