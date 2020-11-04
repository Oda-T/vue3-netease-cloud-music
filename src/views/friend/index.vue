<template>
  <div id="friend">
    <button class="friend mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900">登录</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Friend',
  setup() {
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
