<template>
  <div id="friend">
    <button class="friend mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900">登录</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import mdui from 'mdui'

export default defineComponent({
  name: 'Friend',
  setup() {
    onMounted(() => {
      mdui.mutation()
    })
    return {}
  }
})
</script>
<style lang="less" scoped>
.friend {
  width: 200px;
  margin: 200px auto 0px auto;
}
</style>
