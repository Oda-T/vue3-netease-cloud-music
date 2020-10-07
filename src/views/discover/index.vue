<template>
  <div class="c-swipe">
    <div class="c-swipe-container">
      <a class="c-swipe-link" v-for="item in banners" :key="item.id" :href="item.aHref">
        <img class="c-swipe-img" :src="item.imgSrc" alt="" />
      </a>
    </div>
    <div class="c-swipe-pagination"></div>
    <button class="mdui-fab mdui-color-red-900 mdui-ripple c-swipe-button-prev"><i class="mdui-icon material-icons">keyboard_arrow_left</i></button>
    <button class="mdui-fab mdui-color-red-900 mdui-ripple c-swipe-button-next"><i class="mdui-icon material-icons">keyboard_arrow_right</i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import axios from 'axios'

export default defineComponent({
  name: 'discover',

  setup() {
    interface T {
      imageUrl: string
      encodeId: string
      typeTitle: string
      url: string
    }

    interface B {
      imgSrc: string
      aHref: string
    }
    const banners: Array<B> = reactive([])

    const bIndex = ref(0)

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: string, three: string) => string = (id, title, url) => {
      if (id === '0') {
        return url
      } else if (title === '新碟首发') {
        return '/album?id=' + id
      } else {
        return '/song?id=' + id
      }
    }

    const handleBannerCallBack: (one: Array<T>) => void = _b => {
      for (let i = 0, j = _b.length; i < j; i++) {
        banners.push({
          imgSrc: _b[i].imageUrl + '?imageView&quality=89',
          aHref: handleHref(_b[i].encodeId, _b[i].typeTitle, _b[i].url)
        })
      }
    }

    const initSwipe: () => any = () => {
      console.log(1)
      // return Promise.reject()
    }

    axios
      .get('http://localhost:3000/banner?type=0')
      .then(res => {
        const _b = res.data.banners

        handleBannerCallBack(_b) // 初始化banner

        bIndex.value = _b.length

        return Promise.resolve()
      })
      .then(initSwipe())
      .catch(err => {
        console.error(err)
      })

    return {
      banners,
      bIndex
    }
  }
})
</script>

<style lang="less" scoped>
.c-swipe {
  left: 100px;
  width: 730px;
  padding-top: 270px;
  position: relative;
  overflow: hidden;

  .c-swipe-container {
    width: 100%;

    .c-swipe-link {
      position: absolute;
      left: 0px;
      top: 0px;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

      .c-swipe-img {
        display: block;
        width: 730px;
      }
    }
  }
  .c-swipe-button-prev {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  .c-swipe-button-next {
    position: absolute;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
