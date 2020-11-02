<template>
  <div>
    <div class="c-playlist-comments-title mdui-typo">
      <h2>评论</h2>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">说点什么</label>
        <input class="mdui-textfield-input" type="email" />
      </div>
    </div>
    <!-- 热门 -->
    <div class="c-playlist-hot" v-if="hotCommentsDetail.length !== 0">热门评论</div>
    <div class="c-playlist-comments" v-if="hotCommentsDetail.length !== 0">
      <div class="comments-item" v-for="item in hotCommentsDetail" :key="item.id">
        <div class="mdui-typo">
          <hr />
        </div>
        <img class="comments-item-img" v-lazy="item.useravatar" :alt="item.username" />
        <span class="comments-item-user">{{ item.username }}</span>
        <span class="comments-item-time">{{ handleTime(item.time) }}</span>
        <p class="comments-item-comments">{{ item.content }}</p>
        <!-- 回复 -->
        <div v-if="item.replied.username" class="comments-item-beforereplay">
          <p v-if="item.replied.content" class="beforereplay-user">{{ item.replied.username }}</p>
          <p v-if="item.replied.content" class="beforereplay-comments">{{ item.replied.content }}</p>
          <p v-else class="beforereplay-comments">该评论已删除</p>
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
    <!-- 最新 -->
    <div class="c-playlist-new">最新评论</div>
    <div class="c-playlist-comments">
      <div class="comments-item" v-for="item in commentsDetail" :key="item.id">
        <div class="mdui-typo">
          <hr />
        </div>
        <img class="comments-item-img" v-lazy="item.useravatar" :alt="item.username" />
        <span class="comments-item-user">{{ item.username }}</span>
        <span class="comments-item-time">{{ handleTime(item.time) }}</span>
        <p class="comments-item-comments">{{ item.content }}</p>
        <!-- 回复 -->
        <div v-if="item.replied.username" class="comments-item-beforereplay">
          <p v-if="item.replied.content" class="beforereplay-user">{{ item.replied.username }}</p>
          <p v-if="item.replied.content" class="beforereplay-comments">{{ item.replied.content }}</p>
          <p v-else class="beforereplay-comments">该评论已删除</p>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Comments',
  props: {
    commentsDetail: Object,
    hotCommentsDetail: Object
  },
  setup() {
    const handleTime: (d: number) => string = d => {
      const _d = new Date(d)
      return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
    }
    return {
      handleTime
    }
  }
})
</script>

<style lang="less" scoped>
.c-playlist-comments-title {
  width: 1400px;
  margin: 100px auto 80px auto;
}
.c-playlist-hot {
  width: 1100px;
  margin: 50px auto;
}

.c-playlist-new {
  width: 1100px;
  margin: 50px auto;
}

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
      line-height: 30px;
      margin: 0px 200px 0px 60px;
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
        margin: 5px 0px 5px 8px;
        color: rgba(0, 0, 0, 0.7);
        line-height: 23px;
      }
    }
  }
}
</style>
