<template>
  <div id="404" />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '404',
  setup() {
    const router = useRouter()
    onMounted(() => {
      setTimeout(() => {
        router.replace({ name: 'discover' })
      }, 1000)
    })
    return {}
  }
})
</script>
