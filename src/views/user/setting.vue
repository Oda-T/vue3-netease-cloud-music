<template>
  <div id="userSetting" class="g-card-container">
    <div class="mdui-tab" mdui-tab>
      <a href="#user-setting-tab1" class="mdui-ripple">基本设置</a>
      <a href="#user-setting-tab2" class="mdui-ripple">修改密码</a>
      <a href="#user-setting-tab3" class="mdui-ripple" @click="getUserBinding">用户绑定信息</a>
      <a href="#user-setting-tab4" class="mdui-ripple" @click="getUserRecording">用户播放记录</a>
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
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-m-a-5 mdui-color-red-900" @click="save">保存</button>
      </div>
    </div>
    <div id="user-setting-tab2" class="mdui-p-a-2">
      <div class="user-setting-tab-container">
        <!-- 修改密码 -->
        <form>
          <div class="mdui-textfield">
            <i class="mdui-icon material-icons">account_circle</i>
            <label class="mdui-textfield-label">输入手机号</label>
            <input class="mdui-textfield-input" type="text" pattern="^1[0-9]{10}$" required autocomplete="off" maxlength="11" v-model="userSettingPhone" />
            <div class="mdui-textfield-error">手机号格式有误</div>
          </div>
          <div class="mdui-textfield">
            <i class="mdui-icon material-icons">account_circle</i>
            <label class="mdui-textfield-label">修改密码</label>
            <input class="mdui-textfield-input" type="password" pattern="^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9]).*$" required autocomplete="off" maxlength="20" v-model="userSettingPassword" />
            <div class="mdui-textfield-error">密码至少 8 位，且包含数字大小写字母</div>
          </div>
          <div class="mdui-textfield">
            <i class="mdui-icon material-icons">account_circle</i>
            <label class="mdui-textfield-label">输入验证码</label>
            <input class="mdui-textfield-input" type="text" maxlength="8" required autocomplete="off" v-model="userSettingCaptcha" />
            <div class="mdui-textfield-error">验证码不能为空</div>
          </div>
        </form>
        <!-- 发送验证码 -->
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red-900 mdui-m-a-5" :disabled="!canSendCaptcha" @click="sendCaptcha">发送验证码</button>
        <!-- 提交修改 -->
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red-900" :disabled="!canSendPassword" @click="sendNewPassword">提交修改</button>
      </div>
    </div>
    <div id="user-setting-tab3" class="mdui-p-a-2">
      <div class="user-setting-tab-container mdui-typo">
        <div v-for="item in binding" :key="item.id">
          <p>{{ item.tokenJsonStr }}</p>
          <p>{{ item.id }}</p>
          <p>{{ handleTime(item.refreshTime) }}</p>
          <p>{{ item.userId }}</p>
          <div class="mdui-typo">
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div id="user-setting-tab4" class="mdui-p-a-2">
      <div>{{ record }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import mdui from 'mdui'
import request from '../../api/index'

import { handleTime, handleTimeStamp } from '../../utils/time'
import { passwordValidate, phoneValidate } from '../../validator/layout'

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
    const userSettingPhone = ref('')
    const userSettingPassword = ref('')
    const userSettingCaptcha = ref('')

    const canSendCaptcha = ref(false)
    const canSendPassword = ref(false)

    const binding = ref([])
    const record = ref([])

    const handleRouteQuery: () => void = async () => {
      const data = await request['httpGET']('GET_USER_DETAIL', { 'uid': userId })

      userSettingName.value = data.profile.nickname
      userSettingDesc.value = data.profile.signature
      userSettingBirthday.value = handleTime(data.profile.birthday)
      userSettingProvince.value = data.profile.province
      userSettingCity.value = data.profile.city
      userSettingSex.value = data.profile.gender
    }

    const getUserId: () => void = async () => {
      if (!sessionStorage.userId) {
        await store.dispatch('getUserId')
      }
      userId = sessionStorage.userId
      handleRouteQuery()
    }

    const save: () => void = async () => {
      const data = await request['httpGET']('GET_USER_UPDATE', {
        'province': userSettingProvince.value,
        'city': userSettingCity.value,
        'signature': userSettingDesc.value,
        'gender': userSettingSex.value,
        'birthday': handleTimeStamp(userSettingBirthday.value),
        'nickname': userSettingName.value
      })
      // 修改失败，原因未知
      if (data.code === 200 && data.full !== false) {
        mdui.snackbar({
          message: '修改成功',
          position: 'right-bottom',
          timeout: 800,
          onClosed: () => {
            location.reload()
          }
        })
      } else {
        mdui.snackbar({
          message: '修改失败',
          position: 'right-bottom',
          timeout: 800,
          onClosed: () => {
            location.reload()
          }
        })
      }
    }
    const sendCaptcha: () => void = async () => {
      const data = await request['httpGET']('GET_CAPTCHA_SENT', { 'phone': userSettingPhone.value })

      if (data.code === 200) {
        mdui.snackbar({
          message: '验证码发送成功',
          position: 'right-bottom',
          timeout: 1000
        })
      } else {
        mdui.snackbar({
          message: '验证码发送失败，请稍后重试',
          position: 'right-bottom',
          timeout: 1000
        })
      }
    }

    const sendNewPassword: () => void = async () => {
      const data = await request['httpPOST']('POST_REGISTER_CELLPHONE', {
        'phone': userSettingPhone.value,
        'password': userSettingPassword.value,
        'captcha': userSettingCaptcha.value
      })

      if (data.code === 200) {
        mdui.snackbar({
          message: '修改成功',
          position: 'right-bottom',
          timeout: 800,
          onClosed: async () => {
            await request['httpGET']('GET_LOGOUT')
            sessionStorage.login = ''
            location.reload()
          }
        })
      } else {
        mdui.snackbar({
          message: '修改失败',
          position: 'right-bottom',
          timeout: 800,
          onClosed: async () => {
            await request['httpGET']('GET_LOGOUT')
            sessionStorage.login = ''
            location.reload()
          }
        })
      }
    }

    const getUserBinding: () => void = async () => {
      const { bindings } = await request['httpGET']('GET_USER_BINDING', { 'uid': userId })
      binding.value = bindings
    }

    // 播放记录
    const getUserRecording: () => void = async () => {
      const data = await request['httpGET']('GET_USER_RECORD', { 'uid': userId, 'type': 1 })
      record.value = data.weekData
    }

    getUserId()

    watch(
      [userSettingPhone, userSettingPassword, userSettingCaptcha],
      ([phone, password, captcha]) => {
        canSendCaptcha.value = phoneValidate.test(phone.toString())

        captcha && (canSendPassword.value = phoneValidate.test(phone.toString()) && passwordValidate.test(password.toString()))
      },
      { immediate: true }
    )

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
      userSettingPhone,
      userSettingPassword,
      userSettingCaptcha,
      save,
      sendCaptcha,
      sendNewPassword,
      canSendCaptcha,
      canSendPassword,
      getUserBinding,
      getUserRecording,
      binding,
      record,
      handleTime
    }
  }
})
</script>
<style lang="less" scoped>
#userSetting {
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
