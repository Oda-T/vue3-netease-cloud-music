<template>
  <div id="at">no API + {{ query }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'At',
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
