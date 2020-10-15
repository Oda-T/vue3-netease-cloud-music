<template>
  <div class="c-swipe">
    <!-- swipe -->
    <div class="c-swipe-lf mdui-shadow-2">
      <div class="c-swipe-container">
        <router-link class="c-swipe-link" v-for="item in banners" :key="item.id" :to="item.aHref">
          <img class="c-swipe-img" :src="item.imgSrc" alt="#" />
        </router-link>
      </div>
      <div class="c-swipe-pagination">
        <span class="c-swipe-pagination-inner" v-for="(item, index) in banners" :key="item.id" @click="handleSwipe(index)"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'

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

    const curIndex = ref(0)

    let swipeNode: NodeListOf<HTMLElement>

    let paginationNode: NodeListOf<HTMLElement>

    // 根据图片类型不同，路由跳转到不同界面
    const handleHref: (one: string, two: string, three: string) => string = (id, title, url) => {
      if (id == '0') {
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
          bgSrc: _b[i].imageUrl + '?imageView&blur=40x20',
          imgSrc: _b[i].imageUrl + '?imageView&quality=89',
          aHref: handleHref(_b[i].encodeId, _b[i].typeTitle, _b[i].url)
        })
      }
    }

    // swipe点击切换动作
    const handleSwipe: (index: number) => void = index => {
      curIndex.value = index

      swipeNode.forEach(i => {
        i.style.opacity = '0'
      })
      paginationNode.forEach(i => {
        i.style.backgroundColor = '#ffffff'
      })

      swipeNode[index].style.opacity = '1'
      paginationNode[index].style.backgroundColor = '#b71c1c'
    }

    // 初始化swipe
    const initSwipe: () => void = () => {
      swipeNode = document.querySelectorAll('.c-swipe-link')
      paginationNode = document.querySelectorAll('.c-swipe-pagination-inner')

      handleSwipe(0)
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
      handleSwipe
    }
  }
})
</script>

<style lang="less" scoped>
.c-swipe {
  width: 730px;
  height: 271px;
  position: relative;
  clear: both;
  margin: 0 auto;
  .c-swipe-lf {
    float: left;
    width: 100%;
    height: 100%;
    position: relative;

    .c-swipe-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;

      .c-swipe-link {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

        .c-swipe-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .c-swipe-pagination {
      position: absolute;
      display: inline-block;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      .c-swipe-pagination-inner {
        display: inline-block;
        cursor: pointer;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ffffff;
        margin: 0 10px;
      }
    }
  }
}
</style>
