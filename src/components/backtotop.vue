<template>
  <div class="mdui-fab-wrapper back-to-top" mdui-fab>
    <button class="mdui-fab mdui-ripple mdui-color-red-900" :class="{ 'mdui-fab-hide': isShow }" @click="backToTop">
      <!-- 默认显示的图标 -->
      <i class="mdui-icon material-icons">navigation</i>
      <i class="mdui-icon mdui-fab-opened material-icons">near_me</i>
    </button>
    <div class="mdui-fab-dial">
      <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-pink"><i class="mdui-icon material-icons">backup</i></button>
      <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-red"><i class="mdui-icon material-icons">bookmark</i></button>
      <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-orange"><i class="mdui-icon material-icons">access_alarms</i></button>
      <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-blue"><i class="mdui-icon material-icons">touch_app</i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BackToTop',
  setup() {
    const isShow = ref(true)
    const backToTop: () => void = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    const h = window.outerHeight

    let _timer: number

    document.addEventListener('scroll', () => {
      clearTimeout(_timer)
      _timer = setTimeout(() => {
        const _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        _scrollTop > h / 2 ? (isShow.value = false) : (isShow.value = true)
      }, 20)
    })

    return {
      isShow,
      backToTop
    }
  }
})
</script>
<style lang="less" scoped>
.back-to-top {
  z-index: 5001;
}
</style>
