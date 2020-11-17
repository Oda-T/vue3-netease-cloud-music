<template>
  <div id="my">
    <div class="my-card-container">
      <div class="my-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">创建的歌单</h1>
      </div>
      <card v-for="item in cardList" :key="item.id" :item="item">
        <i class="mdui-icon material-icons" mdui-dialog="{target: '#editDialog'}" @click="handleEditDialog(item)">rate_review</i>
      </card>
    </div>
    <div class="my-card-container">
      <div class="my-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">收藏的歌单</h1>
      </div>
      <card v-for="item in cardListSub" :key="item.id" :item="item" />
    </div>
    <!-- 编辑对话框 -->
    <div class="mdui-dialog" id="editDialog" ref="editDialog">
      <div class="mdui-dialog-title">修改歌单信息</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">hearing</i>
          <input class="mdui-textfield-input" type="text" required :disabled="disabled" autocomplete="off" maxlength="30" v-model="editName" />
          <div class="mdui-textfield-error">歌单名不能为空</div>
          <div class="mdui-textfield-helper">输入歌单名（用户"喜欢的音乐"歌单不可修改）</div>
        </div>

        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">font_download</i>
          <input class="mdui-textfield-input" type="text" autocomplete="off" maxlength="60" v-model="editDesc" />
          <div class="mdui-textfield-helper">输入描述</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <i class="mdui-icon material-icons">style</i>
          <input class="mdui-textfield-input" mdui-dialog-close type="text" autocomplete="off" v-model="editTags" mdui-dialog="{target: '#tagsDialog', modal:'true'}" @click="handleEditTagsPopup" />
          <div class="mdui-textfield-helper">选择标签，最多3个</div>
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" :disabled="!editName" mdui-dialog-confirm>确认修改</button>
      </div>
    </div>
    <!-- tags对话框 -->
    <div class="my-tags-dialog mdui-dialog" id="tagsDialog">
      <!-- 纸片 -->
      <div v-for="item in playListFull" :key="item.id" class="my-chip-item mdui-chip" :class="{ 'mdui-color-red-900': editTags.includes(item.name) }" @click="handleEditTags(item.name)">
        <span class="mdui-chip-title">{{ item.name }}</span>
      </div>
      <!-- btn -->
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog="{target: '#editDialog'}" mdui-dialog-confirm>确认</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import mdui from 'mdui'

import Card from '../../components/card.vue'
import { cardInt } from '../../type/card.type'

import request from '../../api/index'

export default defineComponent({
  name: 'My',
  components: {
    Card
  },
  setup() {
    const store = useStore()
    const cardList: Array<cardInt> = reactive([])
    const cardListSub: Array<cardInt> = reactive([])
    const editDialog = ref(null as unknown)

    const editName = ref('')
    const editDesc = ref('')
    const editTags = ref([] as Array<string>)
    const disabled = ref(false)

    const playListFull = computed(() => store.state.playListFull)

    let playlistId = ''
    // ***喜欢的音乐，没有修改权限
    let playlistIdFav = ''
    let userId = ''

    const handleEditDialog: (item: cardInt) => void = async item => {
      const { id, name, description, tags } = item
      playlistId = id.split('?id=')[1]
      playlistId === playlistIdFav ? (disabled.value = true) : (disabled.value = false)
      editName.value = name
      description && (editDesc.value = description)
      editTags.value = []
      tags && (editTags.value = editTags.value.concat(tags))
    }

    const getUserPlayList: (n?: number) => void = async (n = 0) => {
      cardList.length = 0
      cardListSub.length = 0
      const { playlist } = await request['httpGET']('GET_USER_PLAYLIST', { 'uid': userId, 'limit': 30, 'offset': n, 'timestamp': Date.now() })

      playlistIdFav = playlist[0].id.toString()

      for (let i = 0; i < playlist.length; i++) {
        if (playlist[i].subscribed) {
          cardListSub.push({
            id: '/playlist?id=' + playlist[i].id,
            name: playlist[i].name,
            artist: 'id=' + playlist[i].id,
            picUrl: playlist[i].coverImgUrl,
            description: playlist[i].description,
            tags: playlist[i].tags
          })
        } else {
          cardList.push({
            id: '/playlist?id=' + playlist[i].id,
            name: playlist[i].name,
            artist: 'id=' + playlist[i].id,
            picUrl: playlist[i].coverImgUrl,
            description: playlist[i].description,
            tags: playlist[i].tags
          })
        }
      }
    }

    const getUserId: () => void = async () => {
      if (!sessionStorage.userId) {
        await store.dispatch('getUserId')
      }
      userId = sessionStorage.userId
      getUserPlayList()
    }
    // tags弹框
    const handleEditTagsPopup: () => void = async () => {
      // 从sessionStorage读取getPlaylistFull
      if (sessionStorage.playListFull) {
        store.commit('setPlayListFull', JSON.parse(sessionStorage.playListFull))
      } else {
        await store.dispatch('getPlayListFull')
      }
    }

    // tags 选中
    const handleEditTags: (s: string) => void = s => {
      editTags.value.includes(s) ? editTags.value.splice(editTags.value.indexOf(s), 1) : editTags.value.push(s)

      if (editTags.value.length > 3) {
        editTags.value.shift()
      }
    }

    getUserId()

    onMounted(() => {
      mdui.mutation()

      const el = editDialog.value as HTMLElement
      // 点击修改歌单信息 mdui
      el.addEventListener('confirm.mdui.dialog', async () => {
        playlistId !== playlistIdFav && (await request['httpGET']('GET_PLAYLIST_NAME_UPDATE', { 'id': playlistId, 'name': editName.value, 'timestamp': Date.now() }))
        await request['httpGET']('GET_PLAYLIST_DESC_UPDATE', { 'id': playlistId, 'desc': editDesc.value, 'timestamp': Date.now() })
        await request['httpGET']('GET_PLAYLIST_TAGS_UPDATE', { 'id': playlistId, 'tags': editTags.value.join(';'), 'timestamp': Date.now() })

        getUserPlayList()
      })
    })

    return {
      disabled,
      cardList,
      cardListSub,
      handleEditDialog,
      handleEditTags,
      handleEditTagsPopup,
      editDialog,
      editName,
      editDesc,
      editTags,
      playListFull
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
.my-tags-dialog {
  padding: 0px 10px 0 15px;
  .my-chip-item {
    margin: 15px 10px 0px 10px;
  }
}
</style>
