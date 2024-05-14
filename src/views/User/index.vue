<script setup>
import { reactive, ref, watch } from 'vue'
import userInfo from './userInfo.vue'
import userPanel from './userPanel.vue'
import { userStore } from '@/stores/userStore.js'
import { storeToRefs } from 'pinia'

let userStore_ = userStore()
let { changeStatusForEdit } = userStore_
let { isEdit } = storeToRefs(userStore_)

//一、本地属性

//      全局属性
let fileTag = ref() //文件标签

let showedImageUrl = ref('') //展示图片

//      普通属性

let editForm = reactive({
  //①编辑的用户信息
  image: '',
  nickName: '',
  email: '',
  password: '',
  checkingNumber: ''
})
let isErrorForFilledInfo = reactive({
  //①用户信息提示
  image: false,
  nickName: false,
  email: false,
  checkingNumber: false,
  password: false
})
// 二、本地方法

let popFileWindow = () => {
  //  弹出文件选择框
  fileTag.value.addEventListener('change', () => {
    editForm.image = fileTag.value.files[0]
  })
  fileTag.value.click()
}

let clearEditForm = () => {
  Object.assign(editForm, {
    image: '', //如果 showedImageUrl存在，那么表示存在图片
    nickName: '',
    email: '',
    password: '',
    checkingNumber: ''
  })
}
let edit = () => {
  if (checkInfoIeagl()) {
    console.log('修改')
  }
}
let checkInfoIeagl = () => {
  function image() {
    isErrorForFilledInfo.image = false
  }
  function nickName() {
    isErrorForFilledInfo.nickName = false
  }
  function email() {
    isErrorForFilledInfo.email = false
  }
  function checkingNumber() {
    isErrorForFilledInfo.checkingNumber = false
  }
  function password() {
    isErrorForFilledInfo.password = false
  }
  let bool = true

  if (editForm.image === '') {
    bool = false //验证失败
    ;(isErrorForFilledInfo.image = true), clearTimeout(image)
    setTimeout(image, 1000)
  } else {
    isErrorForFilledInfo.image = false
  }

  if (editForm.nickName === '') {
    bool = false //验证失败
    ;(isErrorForFilledInfo.nickName = true), clearTimeout(nickName)
    setTimeout(nickName, 1000)
  } else {
    isErrorForFilledInfo.nickName = false
  }
  if (editForm.email === '') {
    bool = false //验证失败
    ;(isErrorForFilledInfo.email = true), clearTimeout(email)
    setTimeout(email, 1000)
  } else {
    isErrorForFilledInfo.email = false
  }
  if (editForm.checkingNumber === '') {
    bool = false //验证失败
    ;(isErrorForFilledInfo.checkingNumber = true), clearTimeout(checkingNumber)
    setTimeout(checkingNumber, 1000)
  } else {
    isErrorForFilledInfo.checkingNumber = false
  }
  if (editForm.password === '') {
    bool = false //验证失败
    ;(isErrorForFilledInfo.password = true), clearTimeout(password)
    setTimeout(password, 1000)
  } else {
    isErrorForFilledInfo.password = false
  }

  return bool
}
// 三、监听
watch(
  //当选择图片后，显式图片
  () => editForm.image,
  (newVal) => {
    if (newVal != '' && newVal != null) {
      showedImageUrl.value = URL.createObjectURL(newVal)
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
            <i>头像：</i>
            <div class="img" style="margin-left: 40px">
              <el-avatar
                style="position: absolute"
                :size="100"
                :src="showedImageUrl"
              ></el-avatar>
              <div class="img-cover" @click="popFileWindow"></div>
              <input type="file" ref="fileTag" />
            </div>
          </div>
          <i v-if="isErrorForFilledInfo.image" style="top: 100px">请添加头像</i>
        </div>
        <div class="input-box">
          <div>
            <i>昵称：</i>
            <input placeholder="请输入昵称" v-model="editForm.nickName" />
          </div>
          <i v-if="isErrorForFilledInfo.nickName">请填写昵称</i>
        </div>
        <div class="input-box">
          <div>
            <i>邮箱：</i
            ><input placeholder="请输入邮箱" v-model="editForm.email" />
            <el-button type="info" class="gainCheckNumber"
              >获取验证码</el-button
            >
          </div>
          <i v-if="isErrorForFilledInfo.email">请填写邮箱</i>
        </div>
        <div class="input-box">
          <div>
            <i>验证码：</i
            ><input
              placeholder="请输入验证码"
              v-model="editForm.checkingNumber"
            />
          </div>
          <i v-if="isErrorForFilledInfo.checkingNumber">请填写验证码</i>
        </div>
        <div class="input-box">
          <div>
            <i>密码：</i
            ><input placeholder="请输入邮箱" v-model="editForm.password" />
          </div>
          <i v-if="isErrorForFilledInfo.password">请填写密码</i>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="changeStatusForEdit(!isEdit)">取消</el-button>
          <el-button type="primary" @click="edit"> 修改 </el-button>
        </div>
      </template>
    </el-dialog>
    <userInfo></userInfo>
    <userPanel></userPanel>
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
}
.input-box input {
  box-sizing: border-box;
  padding: 0 0 0 10px;
  flex: 0 0 200px;
  height: 30px;
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
.gainCheckNumber {
  height: 100%;
  padding: 0 1px;
}
</style>
