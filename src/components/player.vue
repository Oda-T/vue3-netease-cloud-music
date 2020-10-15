<template>
  <!-- mdui底栏改造 -->
  <div class="c-player mdui-shadow-24 mdui-color-red-900">
    <!-- 显示隐藏内容 -->
    <div class="c-player-hide" ref="cPlayerHide" @mouseenter="togglePlayerBtnShow" @mouseleave="togglePlayerBtnHide">
      <img class="c-player-hide-avatar" src="https://p1.music.126.net/cIR63lyPGgQ4mAyuOTg8lA==/109951165109878587.jpg?param=300y300" alt="" />

      <div class="c-player-hide-btn" ref="cPlayerHideBtn">
        <button class="c-player-hide-btn-prev mdui-btn mdui-btn-icon mdui-ripple"><i class="mdui-icon material-icons">fast_rewind</i></button>
        <button class="c-player-hide-btn-play mdui-btn mdui-btn-icon mdui-ripple" @click="handlePlay">
          <i class="mdui-icon material-icons">{{ circleOutline }}</i>
        </button>
        <button class="c-player-hide-btn-next mdui-btn mdui-btn-icon mdui-ripple"><i class="mdui-icon material-icons">fast_forward</i></button>
      </div>

      <button class="c-player-hide-list mdui-btn mdui-btn-icon mdui-ripple" mdui-menu="{target: '#example-attr'}"><i class="mdui-icon material-icons">more_vert</i></button>
      <ul class="mdui-menu" id="example-attr">
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">Refresh</a>
        </li>
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">loop</a>
        </li>
        <li class="mdui-divider"></li>
        <li class="mdui-menu-item">
          <a href="javascript:;" class="mdui-ripple">Sign out</a>
        </li>
      </ul>

      <span class="c-player-hide-time">{{ curTime }}/{{ totalTime }}</span>
    </div>
    <!-- 播放进度条 -->
    <div class="c-player-range">
      <label class="c-player-range-slider mdui-slider">
        <input type="range" step="0.1" min="0" max="100" />
      </label>
    </div>

    <!-- 头部，包含头像、标题、作者 -->
    <div class="c-player-detail">
      <div class="c-player-detail-avatar" ref="cDetailAvatar" @mouseenter="toggleAvatarBtnShow" @mouseleave="toggleAvatarBtnHide">
        <img src="https://p1.music.126.net/cIR63lyPGgQ4mAyuOTg8lA==/109951165109878587.jpg?param=56y56" />
        <button class="c-player-detail-avatar-play mdui-btn mdui-btn-icon mdui-ripple" ref="cDetailAvatarBtn" @click="handlePlay">
          <i class="mdui-icon material-icons">{{ circleOutline }}</i>
        </button>
      </div>

      <div class="c-player-detail-detail">
        <div class="c-player-detail-title mdui-text-truncate">TitleTitleTitleTitleTitleTitleTitleTitleTitle</div>
        <div class="c-player-detail-author mdui-text-truncate">AuthorAuthor</div>
      </div>

      <div class="c-player-detail-btn">
        <button class="c-player-detail-arrow-up mdui-btn mdui-btn-icon mdui-ripple" @click="toggleAvatarShowHide"><i class="mdui-icon material-icons">keyboard_arrow_up</i></button>
        <button class="c-player-detail-favorite mdui-btn mdui-btn-icon mdui-ripple">
          <i class="mdui-icon material-icons">check</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Player',
  setup() {
    const circleOutline = ref('play_arrow')

    const curTime = ref('00:00')
    const totalTime = ref('00:00')

    let avatarShow = false
    let isPlay = false

    const cPlayerHide = ref(null)
    const cPlayerHideBtn = ref(null)
    const cDetailAvatar = ref(null)
    const cDetailAvatarBtn = ref(null)

    let timer: number
    let timerBtn: number

    const toggleAvatarShowHide: () => void = () => {
      if (!avatarShow) {
        cPlayerHide.value.style.height = '300px'
        cDetailAvatar.value.style.width = '0px'
        avatarShow = true
      } else {
        cPlayerHide.value.style.height = '0px'
        cDetailAvatar.value.style.width = '56px'
        avatarShow = false
      }
    }

    const togglePlayerBtnShow: () => void = () => {
      clearTimeout(timer)

      cPlayerHideBtn.value.style.display = 'block'
      setTimeout(() => {
        cPlayerHideBtn.value.style.opacity = '1'
      }, 10)
    }
    const togglePlayerBtnHide: () => void = () => {
      cPlayerHideBtn.value.style.opacity = '0'
      timer = setTimeout(() => {
        cPlayerHideBtn.value.style.display = 'none'
      }, 500)
    }

    const toggleAvatarBtnShow: () => void = () => {
      clearTimeout(timerBtn)

      cDetailAvatarBtn.value.style.display = 'block'
      setTimeout(() => {
        cDetailAvatarBtn.value.style.opacity = '1'
      }, 10)
    }
    const toggleAvatarBtnHide: () => void = () => {
      cDetailAvatarBtn.value.style.opacity = '0'
      timerBtn = setTimeout(() => {
        cDetailAvatarBtn.value.style.display = 'none'
      }, 500)
    }

    const handlePlay: () => void = () => {
      if (isPlay) {
        circleOutline.value = 'play_arrow'
        isPlay = false
      } else {
        circleOutline.value = 'pause'
        isPlay = true
      }
    }

    return {
      circleOutline,
      curTime,
      totalTime,
      cPlayerHide,
      cPlayerHideBtn,
      cDetailAvatar,
      cDetailAvatarBtn,
      toggleAvatarShowHide,
      togglePlayerBtnShow,
      togglePlayerBtnHide,
      toggleAvatarBtnShow,
      toggleAvatarBtnHide,
      handlePlay
    }
  }
})
</script>

<style lang="less" scoped>
.c-player {
  width: 300px;
  z-index: 1000;
  position: fixed;
  right: 0px;
  bottom: 0px;
  .c-player-detail {
    height: 80px;
    margin: 0 10px;
    display: flex;
    .c-player-detail-avatar {
      margin-top: 11px;
      width: 56px;
      height: 56px;
      transition: width 0.5s;
      position: relative;
      overflow: hidden;
      .c-player-detail-avatar-play {
        position: absolute;
        width: 56px;
        height: 56px;
        border-radius: 0;
        left: 0px;
        top: 0px;
        display: none;
        opacity: 0;
      }
    }

    .c-player-detail-detail {
      width: 170px;
      margin: 0 10px;
      flex-grow: 1;
      .c-player-detail-title {
        margin-top: 15px;
        width: 100%;
        font-size: 110%;
      }
      .c-player-detail-author {
        margin-top: 13px;
        font-size: 80%;
        opacity: 0.7;
        width: 100%;
      }
    }

    .c-player-detail-btn {
      width: 36px;
      .c-player-detail-arrow-up {
        margin-top: 4px;
        width: 100%;
      }
      .c-player-detail-favorite {
        margin-top: 0px;
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
    width: 300px;
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
      width: 300px;
      height: 300px;
      line-height: 76px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.5s;
      display: none;
      opacity: 0;
      .c-player-hide-btn-prev {
        position: absolute;
        width: 56px;
        height: 56px;
        top: 50%;
        left: 30%;
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
        left: 70%;
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
      bottom: 2px;
      left: 7px;
      font-feature-settings: 'tnum';
    }
  }
}
</style>
