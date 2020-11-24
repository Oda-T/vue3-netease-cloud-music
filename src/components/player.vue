<template>
  <div class="c-player mdui-shadow-24 mdui-color-red-900">
    <!-- 显示隐藏内容 -->

    <div class="c-player-hide" @mouseenter="hidebtnshow = !hidebtnshow" @mouseleave="hidebtnshow = !hidebtnshow">
      <img class="c-player-hide-avatar" :src="avatarL" />

      <transition name="fade">
        <div v-show="hidebtnshow" class="c-player-hide-btn">
          <button class="c-player-hide-btn-prev mdui-btn mdui-btn-icon mdui-ripple" @click="handlePlayPre"><i class="mdui-icon material-icons">fast_rewind</i></button>
          <button class="c-player-hide-btn-play mdui-btn mdui-btn-icon mdui-ripple" @click="togglePlayPause">
            <i class="mdui-icon material-icons">{{ circleOutline }}</i>
          </button>
          <button class="c-player-hide-btn-next mdui-btn mdui-btn-icon mdui-ripple" @click="handlePlayNext"><i class="mdui-icon material-icons">fast_forward</i></button>
          <span class="c-player-hide-time">{{ curTime }}/{{ totalTime }}</span>
        </div>
      </transition>
    </div>

    <!-- 播放进度条 -->
    <div class="c-player-range">
      <label class="c-player-range-slider mdui-slider">
        <input type="range" step="0.1" min="0" max="100" v-model.number="audioPlayRange" />
      </label>
    </div>
    <audio ref="audioPlayer" style="display: none" :src="songUrl" />

    <!-- 头部，包含标题、作者 -->
    <div class="c-player-detail">
      <div class="c-player-detail-detail">
        <div class="c-player-detail-title mdui-text-truncate">{{ title }}</div>
        <div class="c-player-detail-author mdui-text-truncate">{{ author }}</div>
      </div>

      <button class="c-player-detail-btn mdui-btn mdui-btn-icon mdui-ripple" mdui-menu="{target: '#example-attr',align:'left',position:'top'}">
        <i class="mdui-icon material-icons">more_vert</i>
      </button>
      <ul class="mdui-menu" id="example-attr">
        <li class="mdui-menu-item">
          <a class="mdui-ripple" @click="handlePlayList">播放列表</a>
        </li>
        <li class="mdui-menu-item">
          <a class="mdui-ripple" @click="handleLoop">单曲循环：{{ loop }}</a>
        </li>
        <li class="mdui-divider"></li>
        <li class="mdui-menu-item">
          <a class="mdui-ripple" @click="handleClear">清空播放列表</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import mdui from 'mdui'

import { handleDrTime } from '../utils/time'
import { getName } from '../utils/player'
import request from '../api/index'

export default defineComponent({
  name: 'Player',

  setup() {
    const store = useStore()
    const songList = computed(() => store.state.songList)
    const circleOutline = ref('play_arrow')
    const curTime = ref('00:00')
    const totalTime = ref('00:00')
    const audioPlayer = ref()
    let el: HTMLAudioElement
    const audioPlayRange = ref(0)

    let isPlay = false

    const hidebtnshow = ref(false)

    // 解构ids
    const songUrl = ref('')
    const song = reactive({
      title: '',
      author: '',
      avatarL: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'
    })

    const audioPlay: () => void = async () => {
      try {
        await el.play()
      } catch (err) {
        console.log(err)
      }
    }
    const audioPause: () => void = async () => {
      try {
        await el.pause()
      } catch (err) {
        console.log(err)
      }
    }

    const togglePlayPause: () => void = () => {
      isPlay ? audioPause() : audioPlay()
    }

    // flag
    const handlePlayFlag: () => void = () => {
      circleOutline.value = 'pause'
      isPlay = true
    }
    const handlePauseFlag: () => void = () => {
      circleOutline.value = 'play_arrow'
      isPlay = false
    }
    // next
    const handlePlayNext: () => void = () => {
      store.commit('pushHeadToLast')
    }
    // pre
    const handlePlayPre: () => void = () => {
      store.commit('pullLastToHead')
    }
    // 播放进行事件
    const handleTimeUpdateEvent: () => void = () => {
      if (isNaN(el.duration)) {
        totalTime.value = '00:00'
      } else {
        totalTime.value = handleDrTime(Math.round(el.duration * 1000))
      }
      curTime.value = handleDrTime(Math.round(el.currentTime * 1000))
      audioPlayRange.value = (el.currentTime / el.duration) * 100
      mdui.updateSliders()
    }
    // error
    const handleErrorEvent: (err: unknown) => void = err => {
      console.log(err)
    }

    // 加载元数据
    const handleCanPlayEvent: () => void = () => {
      el.addEventListener('loadeddata', () => {
        // 解绑事件
        el.removeEventListener('play', handlePlayFlag)
        el.removeEventListener('pause', handlePauseFlag)
        el.removeEventListener('waiting', handlePauseFlag)
        el.removeEventListener('playing', handlePlayFlag)
        el.removeEventListener('ended', handlePlayNext)
        el.removeEventListener('timeupdate', handleTimeUpdateEvent)
        el.removeEventListener('error', handleErrorEvent)
        // 绑定事件
        el.addEventListener('play', handlePlayFlag)
        el.addEventListener('pause', handlePauseFlag)
        el.addEventListener('waiting', handlePauseFlag)
        el.addEventListener('playing', handlePlayFlag)
        el.addEventListener('ended', handlePlayNext)
        el.addEventListener('timeupdate', handleTimeUpdateEvent)
        el.addEventListener('error', handleErrorEvent)

        audioPlayRange.value = 0
        mdui.updateSliders()
        // 播放
        audioPlay()
      })
    }

    // loop
    const handleLoop: () => void = () => {
      store.commit('toggleLoop')
    }
    // handlePlayList
    const handlePlayList: () => void = () => {
      mdui.snackbar({
        message: `${store.state.songList}`,
        position: 'bottom',
        timeout: 5000
      })
    }
    // 清空
    const handleClear: () => void = () => {
      store.commit('clearSongList')
    }

    onMounted(() => {
      mdui.mutation()

      el = audioPlayer.value
      handleCanPlayEvent()
    })

    // songList监听
    watch(
      songList,
      async val => {
        if (val && val.length) {
          // 获取音乐url
          const { data } = await request['httpGET']('SONG_URL', { id: val[0] })
          songUrl.value = data[0].url

          // 获取音乐详情
          const { songs } = await request['httpGET']('SONG_DETAIL', { ids: val[0] })
          song.title = songs[0].name
          song.author = getName(songs[0].ar)
          song.avatarL = songs[0].al.picUrl + '?param=280y280'
        }
      },
      { immediate: true, deep: true }
    )

    return {
      handleLoop,
      songList,
      circleOutline,
      curTime,
      totalTime,
      hidebtnshow,
      togglePlayPause,
      songUrl,
      audioPlayer,
      audioPlayRange,
      handlePlayNext,
      handlePlayPre,
      handlePlayList,
      handleClear,
      ...toRefs(song),
      loop: computed(() => store.state.loop)
    }
  }
})
</script>

<style lang="less" scoped>
.c-player {
  width: 240px;
  transition: all 0.5s;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 5001;
  .c-player-detail {
    height: 65px;
    display: flex;

    .c-player-detail-detail {
      width: 70px;
      margin-left: 10px;
      flex-grow: 1;
      .c-player-detail-title {
        margin-top: 12px;
        width: 100%;
        height: 15px;
        font-size: 80%;
      }
      .c-player-detail-author {
        margin-top: 15px;
        font-size: 60%;
        height: 15px;
        opacity: 0.7;
        width: 100%;
      }
    }
    .c-player-detail-btn {
      margin-top: 5px;
    }
  }
  .c-player-range {
    width: 100%;
    height: 2px;
    user-select: none;
    .c-player-range-slider {
      width: 100%;
      height: 100%;
    }
  }

  .c-player-hide {
    width: 240px;
    height: 240px;
    position: relative;

    .c-player-hide-avatar {
      width: 100%;
      height: 100%;
    }
    .c-player-hide-btn {
      position: absolute;
      width: 100%;
      height: 100%;
      line-height: 76px;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.4);

      .c-player-hide-btn-prev {
        position: absolute;
        width: 56px;
        height: 56px;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);

        i {
          font-size: 35px;
          line-height: 56px;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
        }
      }
      .c-player-hide-btn-play {
        position: absolute;
        width: 76px;
        height: 76px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        i {
          font-size: 60px;
          line-height: 76px;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
        }
      }
      .c-player-hide-btn-next {
        position: absolute;
        width: 56px;
        height: 56px;
        top: 50%;
        left: 75%;
        transform: translate(-50%, -50%);
        i {
          font-size: 35px;
          line-height: 56px;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
        }
      }
      .c-player-hide-time {
        position: absolute;
        bottom: 5px;
        right: 7px;
        font-feature-settings: 'tnum';
        font-size: 70%;
        line-height: 100%;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
