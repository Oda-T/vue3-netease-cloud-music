<template>
  <button class="mdui-fab mdui-fab-fixed mdui-color-red-900 mdui-ripple" :class="{ 'mdui-fab-hide': isShow }" @click="backToTop"><i class="mdui-icon material-icons">golf_course</i></button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import mdui from 'mdui'

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

    let _timer: number

    document.addEventListener('scroll', () => {
      clearTimeout(_timer)
      _timer = setTimeout(() => {
        const _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        _scrollTop > 0 ? (isShow.value = false) : (isShow.value = true)
      }, 20)
    })

    onMounted(() => {
      mdui.mutation()
    })
    return {
      isShow,
      backToTop
    }
  }
})
</script>

<style lang="less" scoped></style>
