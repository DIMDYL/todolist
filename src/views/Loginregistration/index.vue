<script setup>
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import loginComponents from './loginComponents.vue'
import registerComponents from './registerComponents.vue'
// pinia
const useUserStore_ = useUserStore()
//组件的状态
const { componentStatus } = storeToRefs(useUserStore_)
//切换组件的方法
const switchComponent_ = useUserStore_.switchComponent
// 要显示的组件
const currentComponent = computed(() => {
  return componentStatus.value.isLogin ? loginComponents : registerComponents
})
</script>
<template>
  <div class="Loginregistration">
    <div class="box BoxColor">
      <div class="Loginregistrationbox">
        <div class="top">
          <div
            data-v-58ecf930=""
            class="top animate__animated animate__bounce animate__rubberBand"
          >
            <h6 data-v-58ecf930="">My</h6>
            <h5 data-v-58ecf930="">ToDo</h5>
            <h1 data-v-58ecf930="">List</h1>
          </div>
        </div>
        <KeepAlive>
          <component :is="currentComponent"></component>
        </KeepAlive>
        <div class="bottom">
          <a class="forgotpassword">忘记密码</a>
          <a
            v-if="!componentStatus.isLogin"
            class="register"
            @click="switchComponent_(true)"
            >去登录</a
          >
          <a
            v-if="componentStatus.isLogin"
            class="login"
            @click="switchComponent_(false)"
            >去注册</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Loginregistration {
  width: 100%;
  height: 100%;
  padding: 17px;
  box-sizing: border-box;
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: #ff69b4;
    .Loginregistrationbox {
      width: 400px;
      .top {
        color: #ffd04b;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }

      .bottom {
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        a {
          cursor: pointer;
          color: #ffd04b;
          &:hover {
            color: white;
          }
        }
      }
    }
  }
}
/deep/ .el-form-item__label {
  color: #ff69b4 !important;
}
/deep/ .el-input__wrapper {
  background-color: #252527 !important;
}
/deep/ .el-input__inner {
  color: #ff69b4 !important;
}
/deep/ .el-form .el-form-item {
  position: relative;
  margin-bottom: 25px !important;

  i {
    position: absolute;
    top: 28px;
  }
}
</style>
