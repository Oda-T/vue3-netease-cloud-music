<template>
  <div>
    <div>{{ count }}</div>
    <div>{{ count2 }}</div>
    <div>{{ list._li }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted, onBeforeMount, reactive, toRef, toRefs, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'home',
  props: {
    msg: String
  },
  setup(props, context) {
    const route = useRoute()

    const state = reactive({
      count: computed(() => {
        return route.path
      })
    })
    const count2 = computed(() => {
      return route.path
    })

    const list = reactive({
      _li: 123
    })

    const state2 = reactive({
      list: []
    })

    console.log(useRoute())
    console.log(useRouter())

    watch(
      () => state2.list,
      (val, oldVal) => {
        console.log(val)
        console.log(oldVal)
      }
    )

    onMounted(() => {
      list._li++
    })
    return {
      ...toRefs(state),
      count2,
      list
    }
  }
})
</script>
<style lang="stylus" scoped></style>
