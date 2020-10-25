<template>
  <div class="c-playlist-comments">
    <div class="comments-item" v-for="item in commentsDetail" :key="item.id">
      <div class="mdui-typo">
        <hr />
      </div>
      <img class="comments-item-img" v-lazy="item.useravatar" :alt="item.username" />
      <span class="comments-item-user">{{ item.username }}</span>
      <span class="comments-item-time">{{ item.time }}</span>
      <p class="comments-item-comments">{{ item.content }}</p>
      <!-- 回复 -->
      <div v-if="item.replied.username" class="comments-item-beforereplay">
        <p class="beforereplay-user">{{ item.replied.username }}</p>
        <p class="beforereplay-comments">{{ item.replied.content }}</p>
      </div>
      <!-- 点赞 -->
      <i class="comments-item-replaybtn mdui-icon material-icons">textsms</i>
      <span class="comments-item-likecount">{{ item.likedcount }}</span>
      <i class="comments-item-like mdui-icon material-icons">thumb_up</i>
    </div>

    <div class="mdui-typo">
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Comments',
  props: {
    commentsDetail: Object
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.c-playlist-comments {
  width: 1100px;
  margin: 50px auto;
  .comments-item {
    width: 100%;
    overflow: hidden;
    .comments-item-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: 20px;
      margin-top: 10px;
      vertical-align: middle;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
    .comments-item-user {
      position: absolute;
      margin-left: 10px;
      margin-top: 16px;
      font-size: 12px;
    }
    .comments-item-time {
      float: right;
      margin-right: 20px;
      margin-top: 16px;
      font-size: 12px;
    }
    .comments-item-comments {
      font-size: 15px;
      margin: 0px 20px 3px 60px;
    }
    .comments-item-replaybtn {
      margin-right: 20px;
      font-size: 14px;
      line-height: 16px;
      float: right;
      position: relative;
      opacity: 0.7;
    }
    .comments-item-likecount {
      margin-right: 100px;
      font-size: 14px;
      line-height: 16px;
      float: right;
      opacity: 0.7;
    }
    .comments-item-like {
      margin-right: 10px;
      font-size: 14px;
      line-height: 16px;
      float: right;
      opacity: 0.7;
    }
    .comments-item-beforereplay {
      background-color: rgba(0, 0, 0, 0.12);
      margin: 8px 280px -10px 110px;
      overflow: hidden;
      .beforereplay-user {
        font-size: 12px;
        margin: 5px 0px 0px 8px;
      }
      .beforereplay-comments {
        font-size: 13px;
        margin: 8px 0px 8px 40px;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
