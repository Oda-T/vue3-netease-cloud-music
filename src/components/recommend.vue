<template>
  <div class="g-hot-recommend">
    <div class="recommend-playlist">
      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>

      <slot name="playlist"></slot>

      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>
    </div>

    <div class="recommend-card">
      <div class="recommend-card-item">
        <div class="recommend-card-item-container" :style="{ left: cardItemContainerLeft }">
          <!--  -->
          <slot name="card"></slot>
          <!--  -->
        </div>
      </div>
      <button v-if="arrowShow" class="recommend-card-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerLeft">
        <i class="mdui-icon material-icons">chevron_left</i>
      </button>
      <button v-else class="recommend-card-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerRight">
        <i class="mdui-icon material-icons">chevron_right</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import mdui from 'mdui'

export default defineComponent({
  setup() {
    const cardItemContainerLeft = ref('0px')
    const arrowShow = ref(false)

    const handleCardItemContainerLeft: () => void = () => {
      if (cardItemContainerLeft.value === '0px') {
        return
      }
      arrowShow.value = !arrowShow.value

      cardItemContainerLeft.value = '0px'
    }

    const handleCardItemContainerRight: () => void = () => {
      if (cardItemContainerLeft.value === '-840px') {
        return
      }
      arrowShow.value = !arrowShow.value

      cardItemContainerLeft.value = '-840px'
    }

    onMounted(() => {
      mdui.mutation()
    })
    return {
      arrowShow,
      cardItemContainerLeft,
      handleCardItemContainerLeft,
      handleCardItemContainerRight
    }
  }
})
</script>

<style lang="less" scoped>
.g-hot-recommend {
  width: 100%;
  .recommend-playlist {
    width: 1400px;
    overflow: hidden;
    margin: 0 auto;
    height: 95px;
  }

  .recommend-card {
    width: 100%;
    height: 100%;
    position: relative;

    .recommend-card-item {
      position: relative;
      height: 370px;
      width: 1400px;
      margin: 0 auto;
      overflow-x: hidden;
      .recommend-card-item-container {
        position: absolute;
        top: 0px;
        height: 100%;
        width: 9999px;
        transition: left 0.5s ease-in-out;
      }
    }
    .recommend-card-arrow-left {
      position: absolute;
      left: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(-20%, -126%);
    }
    .recommend-card-arrow-right {
      position: absolute;
      right: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(20%, -126%);
    }
  }
}
</style>
