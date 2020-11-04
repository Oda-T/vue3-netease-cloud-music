<template>
  <div id="creator">
    <button class="creator mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900">登录</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Creator',
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.creator {
  width: 200px;
  margin: 200px auto 0px auto;
}
</style>
