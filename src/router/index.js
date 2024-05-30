import { createRouter, createWebHistory } from 'vue-router'
import { verifyUser } from '@/axios/userRequest.js'
import index from '@/views/Index/index.vue'
import User from '@/views/User/index.vue'
import Article from '@/views/Article/index.vue'
import ToDoList_Limit from '@/views/ToDoList/Limit/index.vue'
import ToDoList_Common from '@/views/ToDoList/Common/index.vue'
import { ElMessage } from 'element-plus'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: index,
      meta: { title: '首页' },
      children: [
        {
          path: '/user',
          component: User,
          meta: { title: '用户中心' }
        },
        {
          path: '/',
          component: Article,
          meta: { title: '首页' }
        },
        {
          path: '/login',
          component: () => import('@/views/Loginregistration/index.vue'),
          meta: { title: '登录' }
        },
        {
          path: '/todolist',
          children: [
            {
              path: 'limit',
              component: ToDoList_Limit,
              meta: { title: '定时任务' }
            },
            {
              path: 'common',
              component: ToDoList_Common,
              meta: { title: '普通任务' }
            }
          ]
        }
      ]
    }
  ]
})
// 导航前
router.beforeEach(async (to) => {
  if (to.fullPath === '/login') return true

  //①获取token
  let userInfo = JSON.parse(localStorage.getItem('userStore'))
  if (userInfo === null || userInfo.userInfo.token == null) {
    ElMessage({
      type: 'error',
      message: '请登录'
    })
    return '/login'
  }
  //②验证token
  let data = await verifyUser()
  if (data == null) {
    return '/login'
  }
  return true
})
export default router
