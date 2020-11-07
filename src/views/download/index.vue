<template>
  <div id="download">
    <a
      class="download mdui-btn mdui-btn-block mdui-btn-raised mdui-ripple mdui-color-red-900"
      href="https://music.163.com/stat/?web=pc&from=download&t=1604232137861&redirect=https%3A%2F%2Fmusic.163.com%2Fapi%2Fpc%2Fdownload%2Flatest"
    >
      下载客户端
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Download',
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.download {
  width: 200px;
  margin: 100px auto 0px auto;
}
</style>
