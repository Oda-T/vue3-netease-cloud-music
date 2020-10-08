<template>
  <!-- mdui底栏改造 -->
  <div class="mdui-bottom-nav mdui-shadow-24 mdui-color-red-900 c-player">
    <div class="c-player-detail">
      <!-- 头部，包含头像、标题、作者 -->
      <img class="c-player-detail-avatar" src="" />
      <div class="c-player-detail-title mdui-text-truncate">TitleTitleTitleTitleTitleTitleTitleTitleTitle</div>
      <div class="c-player-detail-author mdui-text-truncate">AuthorAuthor</div>
      <i class="c-player-detail-favorite material-icons">favorite_border</i>
    </div>
    <div class="c-player-range">
      <div class="c-player-range-current">{{ curTime }}</div>
      <div class="c-player-range-slider">
        <i class="mdui-icon material-icons icon-random">wrap_text</i>
        <i class="mdui-icon material-icons icon-rewind">fast_rewind</i>
        <i class="mdui-icon material-icons icon-play">{{ circleOutline }}</i>
        <i class="mdui-icon material-icons icon-forward">fast_forward</i>
        <i class="mdui-icon material-icons icon-autorenew">autorenew</i>
        <label class="mdui-slider c-player-range-slider-inner">
          <input type="range" step="0.1" min="0" max="100" value="0" />
        </label>
      </div>
      <div class="c-player-range-total">{{ totalTime }}</div>
    </div>

    <div class="c-player-btn">
      <i class="mdui-icon material-icons icon-playlist">subject</i>
      <i class="mdui-icon material-icons icon-volume">volume_down</i>

      <label class="mdui-slider c-player-btn-slider">
        <input type="range" step="0.1" min="0" max="100" value="50" />
      </label>

      <i class="mdui-icon material-icons icon-zoom">zoom_out_map</i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Player',
  setup() {
    const circleOutline = ref('play_circle_outline')

    const curTime = ref('00:00')
    const totalTime = ref('00:00')

    return {
      circleOutline,
      curTime,
      totalTime
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

@media (min-width: 1024px) {
  .c-player {
    min-width: 1024px;
    .c-player-detail {
      width: 300px !important;
    }
    .c-player-btn {
      width: 300px !important;
    }
  }
}

.c-player {
  min-width: 375px;
  height: @bottomHeight;
  z-index: 1000;
  .c-player-detail {
    width: 0px;
    height: 100%;
    position: relative;
    overflow: hidden;
    .c-player-detail-avatar {
      position: absolute;
      left: 0;
      top: 12px;
      width: 56px;
      height: 56px;
    }
    .c-player-detail-title {
      position: absolute;
      left: 68px;
      top: 18px;
      width: 200px;
      font-size: 110%;
    }
    .c-player-detail-author {
      position: absolute;
      left: 68px;
      top: 48px;
      font-size: 80%;
      opacity: 0.7;
      width: 200px;
    }
    .c-player-detail-favorite {
      position: absolute;
      font-size: 16px;
      left: 280px;
      top: 16px;
    }
  }
  .c-player-range {
    flex-grow: 20;
    overflow: hidden;
    min-width: 375px;
    display: flex;
    user-select: none;
    .c-player-range-slider {
      width: 100%;
      height: 100%;
      position: relative;
      .icon-random {
        position: absolute;
        cursor: pointer;
        left: 40%;
        transform: translateX(-400%);
        top: 22px;
        font-size: 18px;
      }
      .icon-rewind {
        position: absolute;
        cursor: pointer;
        left: 45%;
        transform: translateX(-175%);
        top: 16px;
        font-size: 28px;
      }
      .icon-play {
        position: absolute;
        cursor: pointer;
        left: 50%;
        transform: translateX(-50%);
        top: 5px;
        font-size: 48px;
      }
      .icon-forward {
        position: absolute;
        cursor: pointer;
        left: 55%;
        transform: translateX(75%);
        top: 16px;
        font-size: 28px;
      }
      .icon-autorenew {
        position: absolute;
        cursor: pointer;
        left: 60%;
        transform: translateX(300%);
        top: 22px;
        font-size: 18px;
      }
      .c-player-range-slider-inner {
        position: absolute;
        height: 32px;
        left: 0px;
        bottom: 0px;
      }
    }
    .c-player-range-current {
      width: 8%;
      min-width: 45px;
      line-height: 130px;
      font-feature-settings: 'tnum';
      text-align: right;
      padding-right: 15px;
    }
    .c-player-range-total {
      width: 8%;
      min-width: 45px;
      line-height: 130px;
      font-feature-settings: 'tnum';
      text-align: left;
      padding-left: 15px;
    }
  }
  .c-player-btn {
    height: 56px;
    width: 0px;
    overflow: hidden;
    position: relative;
    .icon-playlist {
      position: absolute;
      left: 67px;
      top: 32px;
      cursor: pointer;
    }
    .icon-volume {
      position: absolute;
      left: 110px;
      top: 31px;
      cursor: pointer;
    }
    .c-player-btn-slider {
      position: absolute;
      left: 150px;
      top: 25px;
      width: 100px;
    }
    .icon-zoom {
      position: absolute;
      left: 275px;
      top: 31px;
      cursor: pointer;
    }
  }
}
</style>
