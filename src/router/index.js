import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/Index/index.vue'
import User from '@/views/User/index.vue'
import Article from '@/views/Article/index.vue'
import ToDoList_Limit from '@/views/ToDoList/Limit/index.vue'
import ToDoList_Common from '@/views/ToDoList/Common/index.vue'

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
router.afterEach((to) => {
  // 获取目标路由的meta中的title信息 进行拼接，修改 页面title
  document.title = `${to.meta.title || ''} - My Todo List `
  const contentContainer = document.querySelector('.main')
  if (contentContainer) {
    contentContainer.scrollTop = 0
  } else {
    // 如果没有找到特定容器，则尝试滚动整个窗口
    window.scrollTo(0, 0)
  }
})
export default router
