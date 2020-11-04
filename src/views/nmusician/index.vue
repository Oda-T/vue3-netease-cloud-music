<template>
  <div id="nmusician">
    <button class="nmusician mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900">登录</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Nmusician',
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.nmusician {
  width: 200px;
  margin: 200px auto 0px auto;
}
</style>
