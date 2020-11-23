<template>
  <!-- mdui底栏改造 -->
  <div class="c-player mdui-shadow-24 mdui-color-red-900" :style="{ width: cPlayerWidth, overflow: cPlayerOverflow }">
    <!-- 显示隐藏内容 -->

    <div class="c-player-hide" :style="{ height: cPlayerHideHeight }" @mouseenter="hidebtnshow = !hidebtnshow" @mouseleave="hidebtnshow = !hidebtnshow">
      <img class="c-player-hide-avatar" :src="avatarL" />

      <transition name="fade">
        <div v-show="hidebtnshow" class="c-player-hide-btn">
          <button class="c-player-hide-btn-prev mdui-btn mdui-btn-icon mdui-ripple"><i class="mdui-icon material-icons">fast_rewind</i></button>
          <button class="c-player-hide-btn-play mdui-btn mdui-btn-icon mdui-ripple" @click="togglePlayPause">
            <i class="mdui-icon material-icons">{{ circleOutline }}</i>
          </button>
          <button class="c-player-hide-btn-next mdui-btn mdui-btn-icon mdui-ripple"><i class="mdui-icon material-icons">fast_forward</i></button>
        </div>
      </transition>

      <button class="c-player-hide-list mdui-btn mdui-btn-icon mdui-ripple" mdui-menu="{target: '#example-attr',align:'right',position:'bottom'}">
        <i class="mdui-icon material-icons">more_vert</i>
      </button>
      <ul class="mdui-menu" id="example-attr">
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">PlayList</a>
        </li>
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">Loop</a>
        </li>
        <li class="mdui-divider"></li>
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">Clear</a>
        </li>
      </ul>

      <span class="c-player-hide-time">{{ curTime }}/{{ totalTime }}</span>
    </div>

    <!-- 播放进度条 -->
    <div class="c-player-range">
      <label class="c-player-range-slider mdui-slider">
        <input type="range" step="0.1" min="0" max="100" v-model="audioPlayRange" />
      </label>
    </div>
    <audio ref="audioPlayer" style="display: none" :src="songUrl" />

    <!-- 头部，包含头像、标题、作者 -->
    <div class="c-player-detail">
      <div class="c-player-detail-avatar" :style="{ width: cDetailAvatarWidth }" @mouseenter="avatarplayshow = !avatarplayshow" @mouseleave="avatarplayshow = !avatarplayshow">
        <img :src="avatarS" />
        <transition name="fade">
          <button v-show="avatarplayshow" class="c-player-detail-avatar-play mdui-btn mdui-btn-icon mdui-ripple" @click="togglePlayPause">
            <i class="mdui-icon material-icons">{{ circleOutline }}</i>
          </button>
        </transition>
      </div>

      <div class="c-player-detail-detail">
        <div class="c-player-detail-title mdui-text-truncate">{{ title }}</div>
        <div class="c-player-detail-author mdui-text-truncate">{{ author }}</div>
      </div>

      <div class="c-player-detail-btn">
        <button class="c-player-detail-arrow-up mdui-btn mdui-btn-icon mdui-ripple" @click="toggleAvatarShowHide"><i class="mdui-icon material-icons">keyboard_arrow_up</i></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch, PropType, onMounted } from 'vue'
import mdui from 'mdui'

import { handleDrTime } from '../utils/time'
import request from '../api/index'

export default defineComponent({
  name: 'Player',
  props: {
    songList: Array as PropType<Array<string>>
  },
  setup(props) {
    const circleOutline = ref('play_arrow')

    const curTime = ref('00:00')
    const totalTime = ref('00:00')
    const audioPlayer = ref()
    let el: HTMLAudioElement
    const audioPlayRange = ref(0)

    let avatarShow = false
    let isPlay = false

    const cPlayerWidth = ref('')
    const cPlayerOverflow = ref('')
    const cPlayerHideHeight = ref('')
    const hidebtnshow = ref(false)
    const avatarplayshow = ref(false)
    const cDetailAvatarWidth = ref('')

    // 解构ids
    const songUrl = ref('')
    const song = reactive({
      title: '',
      author: '',
      avatarL: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg',
      avatarS: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'
    })

    const togglePlayerWidth: (val?: Array<string>) => void = val => {
      if (val && val.length) {
        cPlayerWidth.value = '240px'
        cPlayerOverflow.value = 'visible'
      } else {
        setTimeout(() => {
          cPlayerOverflow.value = 'hidden'
        }, 450)
        cPlayerWidth.value = '0px'
      }
    }

    const toggleAvatarShowHide: () => void = () => {
      if (!avatarShow) {
        cPlayerHideHeight.value = '240px'
        cDetailAvatarWidth.value = '0px'
        avatarShow = true
      } else {
        cPlayerHideHeight.value = '0px'
        cDetailAvatarWidth.value = '50px'
        avatarShow = false
      }
    }

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

    // 播放暂停事件
    const handlePlayPauseEvent: () => void = () => {
      el.addEventListener('pause', () => {
        circleOutline.value = 'play_arrow'
        isPlay = false
      })

      el.addEventListener('play', () => {
        circleOutline.value = 'pause'
        isPlay = true
      })
    }

    // waiting end 事件
    const handleWaitingEndEvent: () => void = () => {
      el.addEventListener('waiting', () => {
        circleOutline.value = 'play_arrow'
        isPlay = false
      })
      el.addEventListener('ended', () => {
        circleOutline.value = 'play_arrow'
        isPlay = false
      })
    }

    // 播放进行事件
    const handleTimeUpdateEvent: () => void = () => {
      el.addEventListener('timeupdate', () => {
        curTime.value = handleDrTime(Math.round(el.currentTime * 1000))
        audioPlayRange.value = (el.currentTime / el.duration) * 100
        mdui.updateSliders()
      })
    }

    // error
    const handleErrorEvent: () => void = () => {
      el.addEventListener('error', err => {
        console.log(err)
      })
    }

    // canplay
    const handleCanPlayEvent: () => void = () => {
      el.addEventListener('canplay', () => {
        handlePlayPauseEvent()
        handleWaitingEndEvent()
        handleTimeUpdateEvent()
        handleErrorEvent()

        audioPlay()
      })
    }

    onMounted(() => {
      mdui.mutation()

      el = audioPlayer.value
    })
    // songList监听
    watch(
      () => {
        return props.songList
      },
      async val => {
        togglePlayerWidth(val)
        if (val && val.length) {
          // 获取音乐url
          const { data } = await request['httpGET']('SONG_URL', { id: val[0] })
          songUrl.value = data[0].url
          handleCanPlayEvent()

          // 获取音乐详情
          const { songs } = await request['httpGET']('SONG_DETAIL', { ids: val[0] })
          song.title = songs[0].name
          song.author = songs[0].ar
          song.avatarL = songs[0].al.picUrl + '?param=280y280'
          song.avatarS = songs[0].al.picUrl + '?param=56y56'
          totalTime.value = handleDrTime(songs[0].dt)
        }
      },
      { immediate: true, deep: true }
    )

    return {
      circleOutline,
      curTime,
      totalTime,
      cPlayerWidth,
      cPlayerOverflow,
      cPlayerHideHeight,
      cDetailAvatarWidth,
      hidebtnshow,
      avatarplayshow,
      toggleAvatarShowHide,
      togglePlayPause,
      songUrl,
      audioPlayer,
      audioPlayRange,
      ...toRefs(song)
    }
  }
})
</script>

<style lang="less" scoped>
.c-player {
  transition: width 0.5s;
  overflow: hidden;
  z-index: 1000;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 5001;
  .c-player-detail {
    height: 65px;
    display: flex;
    .c-player-detail-avatar {
      width: 50px;
      height: 50px;
      margin-left: 5px;
      margin-top: 7.5px;
      transition: width 0.5s;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .c-player-detail-avatar-play {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 0;
        left: 0px;
        top: 0px;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .c-player-detail-detail {
      width: 70px;
      margin-left: 5px;
      flex-grow: 1;
      .c-player-detail-title {
        margin-top: 12px;
        width: 100%;
        font-size: 80%;
      }
      .c-player-detail-author {
        margin-top: 15px;
        font-size: 60%;
        opacity: 0.7;
        width: 100%;
      }
    }

    .c-player-detail-btn {
      width: 36px;
      .c-player-detail-arrow-up {
        margin-top: 15px;
        width: 100%;
      }
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
    height: 0px;
    transition: height 0.5s;
    overflow: hidden;
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
    }
    .c-player-hide-list {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .c-player-hide-time {
      position: absolute;
      bottom: 5px;
      left: 7px;
      font-feature-settings: 'tnum';
      font-size: 90%;
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
