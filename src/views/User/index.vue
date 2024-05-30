<script setup>
import { reactive, ref, watch } from 'vue'
import userInfo from './userInfo.vue'
import userPanel from './userPanel.vue'
import { sendIdentifyingCodeRequest, editRequest } from '@/axios/userRequest.js'
import { useUserStore } from '@/stores/user'

//-----------------------------------全局属性
const useUserStore_ = useUserStore() //user的store
let fileTag = ref() //文件标签
let showedImageUrl = ref(useUserStore_.userInfo.image) //展示图片
let isEdit = ref(false) //用户编辑dialog 开关
let sendButton = ref()
let countDown = ref()
let isDisabled = ref(false)
//①用户信息提示
let isErrorForFilledInfo = reactive({
  image: false,
  nickName: false,
  email: false,
  identifyingCode: false,
  password: false
})
//①编辑的用户信息
let editForm = reactive({
  image: useUserStore_.userInfo.image,
  userName: useUserStore_.userInfo.userName,
  email: useUserStore_.userInfo.email,
  identifyingCode: ''
})
// 二、-----------------------------本地方法

//弹出选择文件窗口
let popFileWindow = () => {
  //  弹出文件选择框
  fileTag.value.addEventListener('change', () => {
    editForm.image = fileTag.value.files[0]
  })
  fileTag.value.click()
}
//改变编辑的状态
let changeStatusForEdit = (val) => {
  isEdit.value = val
}
//编辑用户信息
let edit = async () => {
  if (checkInfoIeagl()) {
    // ①封装数据
    let formData = new FormData()
    formData.append('id', useUserStore_.userInfo.id)
    formData.append('userName', editForm.userName)
    formData.append(
      'image',
      editForm.image instanceof File ? editForm.image : null
    )
    formData.append('email', editForm.email)
    formData.append('identifyingCode', editForm.identifyingCode)
    //②发送请求
    const data = await editRequest(formData)
    //③处理响应 & 编辑成功
    if (data != null) {
      //更新用户信息
      useUserStore_.updateUserInfo()
      //关闭编辑窗口
      changeStatusForEdit(false)
    }
  }
}
//检测输入编辑的数据合法性
let checkInfoIeagl = () => {
  let bool = true

  if (editForm.image === '') {
    bool = false //验证失败
    isErrorForFilledInfo.image = true
    setTimeout(() => {
      isErrorForFilledInfo.image = false
    }, 1000)
  } else {
    isErrorForFilledInfo.image = false
  }
  if (editForm.userName === '') {
    bool = false //验证失败
    isErrorForFilledInfo.nickName = true
    setTimeout(() => {
      isErrorForFilledInfo.nickName = false
    }, 1000)
  } else {
    isErrorForFilledInfo.nickName = false
  }
  if (editForm.email === '') {
    bool = false //验证失败
    isErrorForFilledInfo.email = true
    setTimeout(() => {
      isErrorForFilledInfo.email = false
    }, 1000)
  } else {
    isErrorForFilledInfo.email = false
  }
  if (editForm.identifyingCode === '') {
    bool = false //验证失败
    isErrorForFilledInfo.identifyingCode = true
    setTimeout(() => {
      isErrorForFilledInfo.identifyingCode = false
    }, 1000)
  } else {
    isErrorForFilledInfo.identifyingCode = false
  }
  if (editForm.password === '') {
    bool = false //验证失败
    isErrorForFilledInfo.password = true
    setTimeout(() => {
      isErrorForFilledInfo.password = false
    }, 1000)
  } else {
    isErrorForFilledInfo.password = false
  }

  return bool
}
let sendidentifylingCode = async () => {
  //按钮禁止点击状态，并显式动画效果
  startCountDown(6)
  //发送验证码
  sendIdentifyingCodeRequest({
    email: editForm.email,
    type: 2
  })
}
let startCountDown = (second) => {
  isDisabled.value = true
  countDown.value = second
  sendButton.value.disabled = true
  //动画效果
  let countDownInterval = setInterval(() => {
    countDown.value--
  }, 1000)
  //结束动作
  setTimeout(() => {
    sendButton.value.disabled = false
    isDisabled.value = false
    clearInterval(countDownInterval)
  }, second * 1000)
}
// 三、监听
watch(
  //当选择图片后，显式图片
  () => editForm.image,
  (newVal) => {
    if (newVal != '' && newVal != null) {
      showedImageUrl.value =
        newVal instanceof File ? URL.createObjectURL(newVal) : newVal
    }
  }
)
</script>
<template>
  <div class="user">
    <el-dialog v-model="isEdit" class="dialog" @open="clearEditForm">
      <template #header>
        <h3>编辑用户信息</h3>
      </template>
      <div class="dialog-form">
        <div class="input-box">
          <div>
            <i>头像</i>
            <div class="img" style="margin-left: 40px">
              <el-avatar
                style="position: absolute"
                :size="100"
                :src="showedImageUrl"
              ></el-avatar>
              <div class="img-cover" @click="popFileWindow"></div>
              <input type="file" ref="fileTag" class="BoxColor" />
            </div>
          </div>
          <i v-if="isErrorForFilledInfo.image" style="top: 100px">请添加头像</i>
        </div>
        <div class="input-box">
          <div>
            <i>昵称</i>
            <input
              placeholder="请输入昵称"
              class="BoxColor"
              v-model="editForm.userName"
            />
          </div>
          <i v-if="isErrorForFilledInfo.nickName">请填写昵称</i>
        </div>
        <div class="input-box">
          <div>
            <i>邮箱</i
            ><input
              placeholder="请输入邮箱"
              class="BoxColor"
              v-model="editForm.email"
            />
            <button
              @click="sendidentifylingCode"
              ref="sendButton"
              style="width: 50px; text-align: center"
            >
              {{ isDisabled ? countDown : '发送' }}
            </button>
          </div>
          <i v-if="isErrorForFilledInfo.email">请填写邮箱</i>
        </div>
        <div class="input-box">
          <div>
            <i>验证码</i
            ><input
              placeholder="请输入验证码"
              class="BoxColor"
              v-model="editForm.identifyingCode"
            />
          </div>
          <i v-if="isErrorForFilledInfo.identifyingCode">请填写验证码</i>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="changeStatusForEdit(false)">取消</el-button>
          <el-button type="primary" @click="edit"> 修改 </el-button>
        </div>
      </template>
    </el-dialog>
    <userInfo></userInfo>
    <userPanel @displayEditDialog="changeStatusForEdit"></userPanel>
  </div>
</template>
<style lang="less" scoped>
.user {
  width: 100%;
  padding: 17px;
}

/deep/ .dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px !important;
  height: 500px !important;
  background-color: #252527;
}
/deep/.el-dialog__body {
  width: 100%;
  flex: 1 0 0;
}
.dialog-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 40px 50px 0 50px;
  row-gap: 20px;
  width: 100%;
  height: 100%;
}
.input-box {
  position: relative;
  display: flex;
  flex-direction: column;
}
.input-box > i {
  position: absolute;
  top: 29px;
  left: 70px;
  color: red;
}
.input-box > div {
  display: flex;
  column-gap: 10px;
  width: 100%;
}
.input-box > div i:nth-child(1) {
  width: 60px;
  color: rgb(255, 105, 180);
}
.input-box input {
  box-sizing: border-box;
  padding: 0 0 0 10px;
  flex: 1 0 0;
  height: 30px;
  border: 1px solid rgb(220, 223, 230);
}
.img {
  position: relative;
  box-sizing: content-box;
  width: 100px;
  height: 100px;
  border: 2px dotted rgb(206, 206, 206, 0.6);
  border-radius: 50%;
}
.img-cover {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.img-cover:hover {
  cursor: pointer;
  background-color: rgba(1, 1, 1, 0.5);
}
input[type='file'] {
  opacity: 0;
}
input:focus {
  caret-color: rgb(255, 105, 180);
  border-color: rgb(64, 158, 255);
}
</style>
