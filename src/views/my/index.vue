<template>
  <div id="my">
    <button class="my-login-in mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900">登录</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'My',
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.my-login-in {
  width: 200px;
  margin: 200px auto 0px auto;
}
</style>
