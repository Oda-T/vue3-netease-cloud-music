<template>
  <div class="c-swipe">
    <!-- swipe -->
    <div class="c-swipe-container">
      <router-link
        class="c-swipe-link mdui-shadow-16"
        v-for="(item, index) in banners"
        :key="index"
        :to="item.aHref"
        :class="{ 'c-swipe-link-pre': index === preIndex, 'c-swipe-link-cur': index === curIndex, 'c-swipe-link-next': index === nextIndex }"
      >
        <img class="c-swipe-img" :src="`${item.imgSrc}?param=730y271&quality=70`" />
      </router-link>
    </div>
    <!-- 分页 -->
    <div class="c-swipe-pagination">
      <span
        v-for="(item, index) in banners"
        class="c-swipe-pagination-inner"
        :class="{ 'c-swipe-pagination-inner-active': index === curIndex }"
        :key="index"
        @click.stop="handleClickSwipe(index)"
      ></span>
    </div>
    <!-- 左右箭头 -->
    <button class="c-swipe-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click.stop="handleClickArrow(-1)">
      <i class="mdui-icon material-icons">chevron_left</i>
    </button>
    <button class="c-swipe-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click.stop="handleClickArrow(1)">
      <i class="mdui-icon material-icons">chevron_right</i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, PropType } from 'vue'
import { swipeInt } from '../type/swipe.type'

export default defineComponent({
  name: 'Swipe',
  props: {
    banners: Array as PropType<Array<swipeInt>>
  },
  setup(props) {
    // 初始化index
    const preIndex = ref(0)
    const curIndex = ref(0)
    const nextIndex = ref(0)

    let nodeLength = 0
    let timer = 0

    const getCorrectIndex: (one: number) => number = index => {
      if (index >= nodeLength) {
        return index - nodeLength
      } else if (index < 0) {
        return index + nodeLength
      } else {
        return index
      }
    }

    // swipe点击切换动作
    const handleSwipe: (index: number) => void = i => {
      if (i === curIndex.value) {
        return
      }

      preIndex.value = getCorrectIndex(i - 1)
      curIndex.value = getCorrectIndex(i)
      nextIndex.value = getCorrectIndex(i + 1)
    }

    // 定时器
    const handleInterval: () => void = () => {
      timer = setInterval(() => {
        handleSwipe(curIndex.value + 1)
        if (curIndex.value >= nodeLength) {
          curIndex.value = 0
        } else if (curIndex.value < 0) {
          curIndex.value = nodeLength - 1
        }
      }, 10000)
    }

    // 点击清除timer
    const handleClickSwipe: (index: number) => void = i => {
      clearInterval(timer)

      handleSwipe(i)

      handleInterval()
    }

    // 左右箭头
    const handleClickArrow: (d: number) => void = d => {
      if (d < 0) {
        handleClickSwipe(getCorrectIndex(curIndex.value - 1))
      } else {
        handleClickSwipe(getCorrectIndex(curIndex.value + 1))
      }
    }

    // 初始化swipe
    const initSwipe: () => void = () => {
      clearInterval(timer)

      preIndex.value = getCorrectIndex(-1)
      curIndex.value = getCorrectIndex(0)
      nextIndex.value = getCorrectIndex(1)

      handleInterval()
    }

    watchEffect(() => {
      if (props.banners) {
        nodeLength = props.banners.length
        initSwipe()
      }
    })

    return {
      preIndex,
      curIndex,
      nextIndex,
      handleClickSwipe,
      handleClickArrow
    }
  }
})
</script>

<style lang="less" scoped>
@media screen and(min-width: 749px) {
  .c-swipe {
    width: 1060px;
    .c-swipe-container .c-swipe-link-pre {
      left: -145px;
    }

    .c-swipe-container .c-swipe-link-next {
      left: 730px - 539px + 145px;
    }
  }
}
@media screen and(min-width: 1919px) {
  .c-swipe {
    width: 1260px;
    .c-swipe-container .c-swipe-link-pre {
      left: -245px;
    }

    .c-swipe-container .c-swipe-link-next {
      left: 730px - 539px + 245px;
    }
  }
}
@media screen and(min-width: 2398px) {
  .c-swipe {
    width: 1460px;
    .c-swipe-container .c-swipe-link-pre {
      left: -345px;
    }

    .c-swipe-container .c-swipe-link-next {
      left: 730px - 539px + 345px;
    }
  }
}
@media screen and(min-width: 2559px) {
  .c-swipe {
    width: 1660px;
    .c-swipe-container .c-swipe-link-pre {
      left: -445px;
    }

    .c-swipe-container .c-swipe-link-next {
      left: 730px - 539px + 445px;
    }
  }
}
.c-swipe {
  height: 271px;
  position: relative;
  margin: 20px auto 10px auto;
}
.c-swipe-container {
  width: 730px;
  height: 271px;
  margin: 0 auto;
  position: relative;

  .c-swipe-link {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    bottom: 0px;
    left: 0px;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    .c-swipe-img {
      width: 100%;
      height: 100%;
    }
  }
  .c-swipe-link-pre {
    display: block;
    bottom: 20px;
    width: 539px;
    height: 200px;
    opacity: 0.7;
    z-index: 1;
  }
  .c-swipe-link-cur {
    display: block;
    z-index: 2;
  }
  .c-swipe-link-next {
    display: block;
    bottom: 20px;
    width: 539px;
    height: 200px;
    opacity: 0.7;
    z-index: 1;
  }
}
.c-swipe-pagination {
  position: absolute;
  display: inline-block;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  .c-swipe-pagination-inner {
    display: inline-block;
    cursor: pointer;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    margin: 0 10px;
  }
  .c-swipe-pagination-inner-active {
    background-color: #b71c1c;
  }
}
.c-swipe-arrow-left {
  position: absolute;
  left: -10px;
  top: 47%;
  z-index: 10;
}
.c-swipe-arrow-right {
  position: absolute;
  right: -10px;
  top: 47%;
  z-index: 10;
}
</style>
