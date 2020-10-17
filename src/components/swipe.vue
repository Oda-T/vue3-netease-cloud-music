<template>
  <div class="c-swipe">
    <!-- swipe -->
    <div class="c-swipe-container">
      <router-link class="c-swipe-link mdui-shadow-24" v-for="item in banners" :key="item.id" :to="item.aHref">
        <img class="c-swipe-img" :src="item.imgSrc" alt="" />
      </router-link>
    </div>
    <div class="c-swipe-pagination">
      <span v-for="(item, index) in banners" class="c-swipe-pagination-inner" :key="item.id" @click.stop="handleClickSwipe(index)"></span>
    </div>
    <button class="c-swipe-arrow-left mdui-btn mdui-btn-raised mdui-btn-icon mdui-color-red-900 mdui-ripple" @click.stop="handleClickArrow(-1)">
      <i class="mdui-icon material-icons">chevron_left</i>
    </button>
    <button class="c-swipe-arrow-right mdui-btn mdui-btn-raised mdui-btn-icon mdui-color-red-900 mdui-ripple" @click.stop="handleClickArrow(1)">
      <i class="mdui-icon material-icons">chevron_right</i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

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

    let swipeNode: NodeListOf<HTMLElement>
    let paginationNode: NodeListOf<HTMLElement>

    //初始化index
    let curIndex = 0
    let nodeLength = 0

    let timer = 0

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: string, three: string) => string = (id, title, url) => {
      if (id == '0') {
        return url.slice(21)
      } else if (title === '新碟首发') {
        return '/album?id=' + id
      } else {
        return '/song?id=' + id
      }
    }

    const handleBannerCallBack: (one: Array<T>) => void = _b => {
      for (let i = 0, j = _b.length; i < j; i++) {
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
      const _pre = swipeNode[getCorrectIndex(curIndex - 1)].classList
      const _cur = swipeNode[getCorrectIndex(curIndex)].classList
      const _next = swipeNode[getCorrectIndex(curIndex + 1)].classList

      // remove pre class
      if (_pre.contains('c-swipe-link-pre')) {
        _pre.remove('c-swipe-link-pre')
      }

      if (_cur.contains('c-swipe-link-cur')) {
        _cur.remove('c-swipe-link-cur')
      }

      if (_next.contains('c-swipe-link-next')) {
        _next.remove('c-swipe-link-next')
      }

      // add class
      swipeNode[getCorrectIndex(i - 1)].classList.add('c-swipe-link-pre')
      swipeNode[getCorrectIndex(i)].classList.add('c-swipe-link-cur')
      swipeNode[getCorrectIndex(i + 1)].classList.add('c-swipe-link-next')

      paginationNode[curIndex].classList.remove('c-swipe-pagination-inner-active')
      paginationNode[getCorrectIndex(i)].classList.add('c-swipe-pagination-inner-active')

      curIndex = i
    }

    // 点击清除timer
    const handleClickSwipe: (index: number) => void = i => {
      clearInterval(timer)
      handleSwipe(i)

      timer = setInterval(() => {
        handleSwipe(curIndex + 1)
        if (curIndex >= nodeLength) {
          curIndex = 0
        } else if (curIndex < 0) {
          curIndex = nodeLength - 1
        }
      }, 100000000000)
    }

    // 左右箭头
    const handleClickArrow: (d: number) => void = d => {
      if (d < 0) {
        handleClickSwipe(getCorrectIndex(curIndex - 1))
      } else {
        handleClickSwipe(getCorrectIndex(curIndex + 1))
      }
    }

    // 初始化swipe
    const initSwipe: () => void = () => {
      swipeNode = document.querySelectorAll('.c-swipe-link')
      paginationNode = document.querySelectorAll('.c-swipe-pagination-inner')

      nodeLength = swipeNode.length

      handleSwipe(0)

      timer = setInterval(() => {
        handleSwipe(curIndex + 1)
        if (curIndex >= nodeLength) {
          curIndex = 0
        } else if (curIndex < 0) {
          curIndex = nodeLength - 1
        }
      }, 5000)
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
      banners,
      handleClickSwipe,
      handleClickArrow
    }
  }
})
</script>

<style lang="less" scoped>
.c-swipe {
  width: 1280px;
  height: 271px;
  position: relative;
  // clear: both;
  margin: 0 auto;

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
      left: -250px;
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
      left: 730px - 539px + 250px;
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
    left: 0px;
    top: 50%;
    transform: translateY(-1%);
    z-index: 10;
  }
  .c-swipe-arrow-right {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-1%);
    z-index: 10;
  }
}
</style>
