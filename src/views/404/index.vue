<template>
  <div id="404">404</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mdui from 'mdui'

export default defineComponent({
  name: '404',
  setup() {
    const router = useRouter()
    onMounted(() => {
      mdui.snackbar({
        message: '404',
        position: 'right-bottom',
        buttonText: '返回',
        buttonColor: 'red',
        onButtonClick: function() {
          router.back()
        }
      })
    })
    return {}
  }
})
</script>
<style lang="less" scoped></style>
