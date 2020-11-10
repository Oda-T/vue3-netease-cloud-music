<template>
  <div id="my">
    <div class="my-card-container">
      <div class="my-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">歌单</h1>
      </div>
      <card v-for="item in cardList" :key="item.id" :item="item">
        <button class="mdui-btn mdui-btn-icon mdui-text-color-white" mdui-dialog="{target: '#editDialog'}" @click="handleEditDialog(item)">
          <i class="mdui-icon material-icons">explicit</i>
        </button>
      </card>
    </div>
    <!-- 编辑对话框 -->
    <div class="mdui-dialog" id="editDialog" ref="editDialog">
      <div class="mdui-dialog-title">修改歌单信息</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">person</i>
          <label class="mdui-textfield-label">歌单名</label>
          <input class="mdui-textfield-input" type="text" required autocomplete="off" maxlength="20" v-model="editName" />
          <div class="mdui-textfield-error">歌单名不能为空</div>
          <div class="mdui-textfield-helper">输入歌单名</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">lock</i>
          <label class="mdui-textfield-label">描述</label>
          <input class="mdui-textfield-input" type="text" autocomplete="off" maxlength="60" v-model="editDesc" />
          <div class="mdui-textfield-helper">输入描述</div>
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" :disabled="!editName" mdui-dialog-confirm>确认修改</button>
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
    const editDialog = ref(null as unknown)

    const editName = ref('')
    const editDesc = ref('')

    let playlistId = ''

    let userId = ''

    const handleEditDialog: (item: cardInt) => void = item => {
      playlistId = item.id.split('?id=')[1]
      editName.value = item.name
      item.description && (editDesc.value = item.description)
    }

    const getUserPlayList: (n?: number) => void = async (n = 0) => {
      cardList.length = 0

      const { playlist } = await request['httpGET']('GET_USER_PLAYLIST', { 'uid': userId, 'limit': 30, 'offset': n })

      for (let i = 0; i < playlist.length; i++) {
        cardList[i] = {
          id: '/playlist?id=' + playlist[i].id,
          name: playlist[i].name,
          artist: 'id=' + playlist[i].id,
          picUrl: playlist[i].coverImgUrl,
          description: playlist[i].description
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

      const el = editDialog.value as HTMLElement
      // 点击修改歌单信息 mdui
      // 有可能显示无权限，且中间件缓存会导致修改后的页面更新不及时
      el.addEventListener('confirm.mdui.dialog', async () => {
        await request['httpGET']('GET_PLAYLIST_DESC_UPDATE', { 'id': playlistId, 'desc': editDesc.value })

        await request['httpGET']('GET_PLAYLIST_NAME_UPDATE', { 'id': playlistId, 'name': editName.value })
      })
    })

    return {
      cardList,
      handleEditDialog,
      editDialog,
      editName,
      editDesc
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
