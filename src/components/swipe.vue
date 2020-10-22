<template>
  <div class="c-swipe">
    <!-- swipe -->
    <div class="c-swipe-container">
      <router-link
        class="c-swipe-link mdui-shadow-16"
        v-for="(itemlink, indexlink) in banners"
        :key="itemlink.id"
        :to="itemlink.aHref"
        :class="{ 'c-swipe-link-pre': indexlink === preIndex, 'c-swipe-link-cur': indexlink === curIndex, 'c-swipe-link-next': indexlink === nextIndex }"
      >
        <img class="c-swipe-img" :src="itemlink.imgSrc" :alt="itemlink.imgSrc" />
      </router-link>
    </div>
    <!-- 分页 -->
    <div class="c-swipe-pagination">
      <span
        v-for="(itempag, indexpag) in banners"
        class="c-swipe-pagination-inner"
        :class="{ 'c-swipe-pagination-inner-active': indexpag === curIndex }"
        :key="itempag.id"
        @click.stop="handleClickSwipe(indexpag)"
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
import { defineComponent, reactive, ref, onMounted } from 'vue'

import axios from 'axios'

export default defineComponent({
  name: 'Swipe',

  setup() {
    interface T {
      imageUrl: string
      encodeId: string
      typeTitle: string
      url: string
    }

    interface B {
      bgSrc: string
      imgSrc: string
      aHref: string
    }

    const banners: Array<B> = reactive([])

    //初始化index
    const preIndex = ref(0)
    const curIndex = ref(0)
    const nextIndex = ref(0)

    let nodeLength = 0
    let timer = 0

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: string, three: string) => string = (id, title, url) => {
      if (id == '0') {
        return url.slice(url.indexOf('com/') + 3)
      } else if (title === '新碟首发') {
        return '/album?id=' + id
      } else {
        return '/song?id=' + id
      }
    }

    const handleBannerCallBack: (one: Array<T>) => void = _b => {
      nodeLength = _b.length

      for (let i = 0, j = nodeLength; i < j; i++) {
        banners.push({
          bgSrc: _b[i].imageUrl + '?imageView&blur=40x20',
          imgSrc: _b[i].imageUrl + '?imageView&quality=30',
          aHref: handleHref(_b[i].encodeId, _b[i].typeTitle, _b[i].url)
        })
      }
    }

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
      preIndex.value = getCorrectIndex(-1)
      curIndex.value = getCorrectIndex(0)
      nextIndex.value = getCorrectIndex(1)

      handleInterval()
    }

    onMounted(() => {
      axios({
        url: 'http://localhost:3000/banner?type=0',
        method: 'get'
      })
        .then(res => {
          handleBannerCallBack(res.data.banners) // 初始化banner

          return Promise.resolve()
        })
        .then(() => {
          initSwipe()
        })
        .catch(err => {
          console.error(err)
        })
    })

    return {
      preIndex,
      curIndex,
      nextIndex,
      banners,
      handleClickSwipe,
      handleClickArrow
    }
  }
})
</script>

<style lang="less" scoped>
.c-swipe {
  width: 1260px;
  height: 271px;
  position: relative;
  margin: 20px auto 10px auto;

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
      left: -245px;
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
      left: 730px - 539px + 245px;
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
}
</style>
