<template>
  <div id="userSetting">
    <div class="mdui-tab" mdui-tab>
      <a href="#user-setting-tab1" class="mdui-ripple">基本设置</a>
      <a href="#user-setting-tab2" class="mdui-ripple">绑定设置</a>
      <a href="#user-setting-tab3" class="mdui-ripple">隐私设置</a>
    </div>
    <div id="user-setting-tab1" class="mdui-p-a-2">
      <div class="user-setting-tab-container">
        <!-- 昵称 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">昵称</label>
          <input class="mdui-textfield-input" required type="text" maxlength="30" v-model="userSettingName" />
          <div class="mdui-textfield-error">昵称不能为空</div>
        </div>
        <!-- 描述 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">介绍</label>
          <textarea class="mdui-textfield-input" maxlength="300" v-model="userSettingDesc" />
        </div>
        <!-- 性别 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">性别</label>
          <form class="user-setting-form">
            <label class="mdui-radio">
              <input type="radio" value="1" v-model="userSettingSex" />
              <i class="mdui-radio-icon"></i>
              男
            </label>
            <label class="mdui-radio">
              <input type="radio" value="2" v-model="userSettingSex" />
              <i class="mdui-radio-icon"></i>
              女
            </label>
            <label class="mdui-radio">
              <input type="radio" value="0" v-model="userSettingSex" />
              <i class="mdui-radio-icon"></i>
              保密
            </label>
          </form>
        </div>
        <!-- 生日 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">生日</label>
          <input class="mdui-textfield-input" required type="text" maxlength="30" v-model="userSettingBirthday" />
          <div class="mdui-textfield-error">生日不能为空</div>
          <div class="mdui-textfield-helper">例：1970年1月1日</div>
        </div>
        <!-- 省份 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">省份</label>
          <input class="mdui-textfield-input" type="text" disabled maxlength="30" v-model="userSettingProvince" />
        </div>
        <!-- 城市 -->
        <div class="mdui-textfield">
          <i class="mdui-icon material-icons">account_circle</i>
          <label class="mdui-textfield-label">城市</label>
          <input class="mdui-textfield-input" type="text" disabled maxlength="30" v-model="userSettingCity" />
        </div>
        <!-- 保存 -->
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red-900" @click="save">保存</button>
      </div>
    </div>
    <div id="user-setting-tab2" class="mdui-p-a-2">shopping content</div>
    <div id="user-setting-tab3" class="mdui-p-a-2">images content</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import mdui from 'mdui'
import request from '../../api/index'
import { handleTime, handleTimeStamp } from '../../utils/time'

export default defineComponent({
  name: 'UserSetting',
  setup() {
    let userId = ''
    const store = useStore()
    const userSettingName = ref('')
    const userSettingDesc = ref('')
    const userSettingBirthday = ref('')
    const userSettingProvince = ref('')
    const userSettingCity = ref('')
    const userSettingSex = ref(-1)

    const handleRouteQuery: () => void = async () => {
      const data = await request['httpGET']('GET_USER_DETAIL', { 'uid': userId, 'timestamp': Date.now() })

      userSettingName.value = data.profile.nickname
      userSettingDesc.value = data.profile.signature
      userSettingBirthday.value = handleTime(data.profile.birthday)
      userSettingProvince.value = data.profile.province
      userSettingCity.value = data.profile.city
      userSettingSex.value = data.profile.gender
    }

    const getUserId: () => void = async () => {
      if (store.state.userId === '') {
        await store.dispatch('getUserId')
        userId = store.state.userId
      } else {
        userId = store.state.userId
      }
      handleRouteQuery()
    }

    const save: () => void = async () => {
      await request['httpGET']('GET_USER_UPDATE', {
        'province': userSettingProvince.value,
        'city': userSettingCity.value,
        'signature': userSettingDesc.value,
        'gender': userSettingSex.value,
        'birthday': handleTimeStamp(userSettingBirthday.value),
        'nickname': userSettingName.value,
        'timestamp': Date.now()
      })
      location.reload()
    }

    getUserId()

    onMounted(() => {
      mdui.mutation()
    })
    return {
      userSettingName,
      userSettingDesc,
      userSettingSex,
      userSettingBirthday,
      userSettingProvince,
      userSettingCity,
      save
    }
  }
})
</script>
<style lang="less" scoped>
#userSetting {
  width: 1333px;
  margin: 50px auto;
}
.user-setting-tab-container {
  width: 800px;
}
.user-setting-form {
  width: calc(100% - 150px);
  margin-left: 150px;

  label {
    margin-right: 90px;
  }
}
</style>
