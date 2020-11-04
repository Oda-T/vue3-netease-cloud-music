<template>
  <div v-if="pageCount > 12" class="c-playlist-pagination">
    <span
      class="pagination-item"
      :class="{ 'pagination-item-action': curIndex === item }"
      :style="{ cursor: item !== '......' ? 'pointer' : 'default' }"
      @click.stop="handlePagItem(item, index)"
      v-for="(item, index) in stack"
      :key="index"
    >
      {{ item }}
    </span>
  </div>
  <div v-else class="c-playlist-pagination">
    <span
      class="pagination-item"
      :class="{ 'pagination-item-action': curIndex === item }"
      :style="{ cursor: item !== '......' ? 'pointer' : 'default' }"
      @click.stop="handlePagItem(item)"
      v-for="item in pageCount"
      :key="item.id"
      >{{ item }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive, ref } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {
    pageCount: Number
  },
  setup(prop, { emit }) {
    const stack: Array<number | string> = reactive([])

    // 当前页码
    const curIndex = ref(1)

    // 偏移量 max= pageCount-11 min=1
    const pageIndex = ref(1)

    // n 偏移量
    const getStack: (n: number) => void = n => {
      if (!prop.pageCount) {
        return
      }
      stack[0] = 1
      stack[11] = prop.pageCount

      // n 最小值为1，最大值为pageCount-11
      if (n <= 1) {
        n = 1
      } else if (n >= prop.pageCount - 11) {
        n = prop.pageCount - 11
      }

      if (n === 1) {
        stack[1] = 2
      } else {
        stack[1] = '......'
      }

      for (let i = 2 + n; i < 10 + n; i++) {
        stack[i - n] = i
      }

      if (n < prop.pageCount - 11) {
        stack[10] = '......'
      } else {
        stack[10] = prop.pageCount - 1
      }
    }

    const handlePagItem: (item: number | string, index?: number) => void = (item, index) => {
      if (typeof item === 'string' || !prop.pageCount) {
        return false
      }

      if (item === 1) {
        getStack(Number(item))
      }

      if (item === prop.pageCount) {
        getStack(Number(prop.pageCount) - 11)
      }

      // 边界条件
      if (index === 9) {
        getStack(Number(item) - 5)
      }
      if (index === 2) {
        getStack(Number(item) - 5)
      }

      curIndex.value = item

      emit('page-number', item)
    }
    watch(
      () => {
        return prop.pageCount
      },
      () => {
        getStack(pageIndex.value)
      },
      { immediate: true }
    )

    return {
      curIndex,
      stack,
      pageIndex,
      handlePagItem
    }
  }
})
</script>

<style lang="less" scoped>
.c-playlist-pagination {
  width: 840px;
  margin: 60px auto;
  display: flex;
  justify-content: center;
  .pagination-item {
    display: inline-block;
    width: 50px;
    margin: 0 10px;
    text-align: center;
    user-select: none;
  }
  .pagination-item-action {
    color: red;
  }
}
</style>
