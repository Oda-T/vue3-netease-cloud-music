<template>
  <div>
    <div>123</div>
    <button class="test mdui-ripple">123</button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.test {
  height: 200px;
  width: 200px;
}
</style>
