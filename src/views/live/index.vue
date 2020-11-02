<template>
  <div>
    <div>{{ count }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Live',
  setup() {
    const route = useRoute()

    const state = reactive({
      count: computed(() => {
        return route.query.id
      })
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped></style>
