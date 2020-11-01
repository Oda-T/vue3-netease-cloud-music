<template>
  <div id="store">no API {{ query }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Store',
  setup() {
    const route = useRoute()
    const query = route.query.id
    return {
      query
    }
  }
})
</script>
<style lang="less" scoped></style>
