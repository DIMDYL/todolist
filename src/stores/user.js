import { defineStore } from 'pinia'
import {
  loginRequest,
  signupRequest,
  queryUserRequest
} from '@/axios/userRequest.js'
import router from '@/router/index.js'
import { getTotalNumberRequest } from '@/axios/summaryRequest'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    componentStatus: {
      isLogin: true
    },

    userInfo: {
      id: null,
      token: null,
      // email,userName,createTime 数据更新时机: ①整个网站的页面加载时  ②登录/注册完 ③用户编辑信息后
      email: null,
      userName: null,
      createTime: null,
      totalSummaryNumber: null
    }
  }),
  actions: {
    switchComponent(target) {
      this.componentStatus.isLogin = target
    },
    //true: login false:signup
    async loginOrSignup(type, params) {
      let data = null
      if (type) {
        data = await loginRequest(params)
      } else {
        data = await signupRequest(params)
      }
      if (data != null) {
        Object.assign(this.userInfo, data.data)
        router.push('/')
      }
      //用户登录/注册完毕，更新一次
      this.queryUserInfo()
    },
    //更新用户数据
    async queryUserInfo() {
      let response = await queryUserRequest(this.userInfo.id)
      if (response != null) {
        Object.assign(this.userInfo, response.data)
      } else {
        // 默认值
      }
    },
    async queryTotalSummaryNumber() {
      let response = await getTotalNumberRequest(this.userInfo.id)
      this.userInfo.totalSummaryNumber =
        response != null ? response.data : '0-默认'
    },
    updateTotalSummaryNumber(val) {
      this.userInfo.totalSummaryNumber += val
    }
  },
  persist: true
})
