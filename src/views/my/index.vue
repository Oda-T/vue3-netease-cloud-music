<template>
  <div id="my">
    <div class="my-card-container">
      <div class="my-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">歌单</h1>
      </div>
      <card v-for="item in cardList" :key="item.id" :item="item" @card-menu-click="handleEditDialog(item.id)" />
    </div>

    <div class="mdui-dialog">
      <div class="mdui-dialog-title">登录</div>
      <div class="mdui-dialog-content">
        <form>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">person</i>
            <label class="mdui-textfield-label">Email/Phone</label>
            <input class="mdui-textfield-input" type="text" required autocomplete="off" maxlength="60" />
            <div class="mdui-textfield-helper">输入邮箱或者手机号</div>
          </div>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">lock</i>
            <label class="mdui-textfield-label">Password</label>
            <input class="mdui-textfield-input" type="password" pattern="^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9]).*$" required autocomplete="off" maxlength="20" />
            <div class="mdui-textfield-error">密码至少 8 位，且包含数字大小写字母</div>
          </div>
        </form>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>登录</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import mdui from 'mdui'

import Card from '../../components/card.vue'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'
import { getToken } from '../../utils/auth'

export default defineComponent({
  name: 'My',
  components: {
    Card
  },
  setup() {
    const token = getToken()
    const router = useRouter()
    const store = useStore()
    const cardList: Array<cardInt> = reactive([])
    const showEidtDialog = ref(true)

    let userId = ''

    const handleEditDialog: (id: string) => void = id => {
      console.log(id.split('?id=')[1])
    }

    const getUserPlayList: (n?: number) => void = async (n = 0) => {
      cardList.length = 0

      const { playlist } = await request['httpGET']('GET_USER_PLAYLIST', { 'uid': userId, 'limit': 30, 'offset': n })

      for (let i = 0; i < playlist.length; i++) {
        cardList[i] = {
          id: '/playlist?id=' + playlist[i].id,
          name: playlist[i].name,
          artist: playlist[i].creator.nickname,
          picUrl: playlist[i].coverImgUrl
        }
      }
    }

    const getUserId: () => void = async () => {
      if (store.state.userId === '') {
        await store.dispatch('getUserId')
        userId = store.state.userId
        getUserPlayList()
      } else {
        userId = store.state.userId
        getUserPlayList()
      }
    }

    // 如果未登录，重定向到首页
    token ? getUserId() : router.replace({ name: 'discover' })

    onMounted(() => {
      mdui.mutation()
    })

    return {
      cardList,
      showEidtDialog,
      handleEditDialog
    }
  }
})
</script>
<style lang="less" scoped>
.my-card-container {
  width: 1333px;
  margin: 50px auto;
  .my-card-title {
    margin-left: 20px;
  }
}
</style>
