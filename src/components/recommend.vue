<template>
  <div class="c-hot-recommend">
    <div v-if="topList" class="recommend-playlist">
      <!-- 分割线 -->
      <div class="recommend-typo-top mdui-typo">
        <hr />
      </div>
      <span class="recommend-title mdui-text-color-red-900">{{ topTitle }}</span>
      <div class="recommend-hot-chip mdui-chip" v-for="item in topList" :class="{ 'mdui-color-red-900': item.name === listName }" :key="item.id" @click="handleListSwitch(item)">
        <span class="mdui-chip-title">{{ item.name }}</span>
      </div>
      <!-- 右侧插槽 -->
      <slot></slot>

      <!-- 分割线 -->
      <div class="recommend-typo-bottom mdui-typo">
        <hr />
      </div>
    </div>
    <div v-if="cardList" style="width:100%;height:350px">
      <transition name="fade" mode="out-in">
        <div v-if="toggleCoverShow" class="recommend-card-cover">
          <div class="recommend-card-inner"></div>
        </div>
        <div v-else class="recommend-card">
          <div class="recommend-card-item">
            <div class="recommend-card-item-container" :style="{ left: cardItemContainerLeft }">
              <card v-for="item in cardList" :key="item.id" :item="item"></card>
            </div>
          </div>
          <button v-if="arrowShow" class="recommend-card-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerLeft">
            <i class="mdui-icon material-icons">chevron_left</i>
          </button>
          <button v-else class="recommend-card-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerRight">
            <i class="mdui-icon material-icons">chevron_right</i>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted, ref, watch } from 'vue'

import Card from './card.vue'

import mdui from 'mdui'

export default defineComponent({
  name: 'Recommend',
  props: {
    cardList: Array,
    topList: Array,
    topTitle: String,
    activeName: {
      type: String,
      default: ''
    }
  },
  components: {
    Card
  },
  setup(props, { emit }) {
    const cardItemContainerLeft = ref('0px')
    const arrowShow = ref(false)

    const listName = ref(props.activeName)

    const toggleCoverShow = ref(true)

    let n: number

    const handleCardItemContainerLeft: () => void = () => {
      if (cardItemContainerLeft.value === '0px') {
        return
      }
      cardItemContainerLeft.value = '0px'
      arrowShow.value = !arrowShow.value
    }

    const handleCardItemContainerRight: () => void = () => {
      if (cardItemContainerLeft.value === `-${826 + n * 222}px`) {
        return
      }
      cardItemContainerLeft.value = `-${826 + n * 222}px`

      arrowShow.value = !arrowShow.value
    }

    const handleListSwitch: (one: { name: string }) => void = obj => {
      if (listName.value === obj.name) {
        return
      }

      if (props.activeName === '') {
        listName.value = ''
      } else {
        toggleCoverShow.value = true
        listName.value = obj.name
      }
      // 抛出点击按钮的歌曲/歌单id
      emit('getid', obj)

      // 切换后，滑动条归左
      handleCardItemContainerLeft()
    }

    watch(
      () => {
        return props.cardList
      },
      val => {
        n = val ? val.length - 10 : 0

        toggleCoverShow.value = false
      },
      { deep: true, immediate: true }
    )

    onMounted(() => {
      mdui.mutation()
    })

    onActivated(() => {
      toggleCoverShow.value = false
    })

    return {
      toggleCoverShow,
      arrowShow,
      cardItemContainerLeft,
      handleCardItemContainerLeft,
      handleCardItemContainerRight,
      listName,
      handleListSwitch
    }
  }
})
</script>

<style lang="less" scoped>
.c-hot-recommend {
  width: 100%;
  .recommend-playlist {
    width: 1400px;
    min-height: 71px;
    position: relative;
    margin: 0 auto;
    .recommend-typo-top {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 11px;
      width: 100%;
    }
    .recommend-title {
      display: inline-block;
      font-size: 24px;
      vertical-align: -4px;
      margin-top: 31px;
      margin-left: 10px;
      margin-right: 20px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .recommend-hot-chip {
      margin: 0px 10px 24px;
    }
    .recommend-typo-bottom {
      position: absolute;
      left: 0px;
      bottom: 0px;
      height: 11px;
      width: 100%;
    }
  }

  .recommend-card-cover {
    width: 1400px;
    height: 350px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .recommend-card-inner {
      height: 100px;
      width: 100px;
    }
  }

  .recommend-card {
    width: 100%;
    height: 350px;
    position: relative;

    .recommend-card-item {
      position: relative;
      height: 350px;
      width: 1400px;
      margin: 0 auto;
      overflow-x: hidden;
      .recommend-card-item-container {
        position: absolute;
        top: 0px;
        height: 100%;
        width: 9999px;
        transition: left 0.5s ease-in-out;
        .recommend-card-list {
          display: inline-block;
          width: 192px;
          margin: 35px 25px 0px 10px;
        }
      }
    }
    .recommend-card-arrow-left {
      position: absolute;
      left: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(-50%, -126%);
    }
    .recommend-card-arrow-right {
      position: absolute;
      right: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(50%, -126%);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
