import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/Index/index.vue'
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
          component: import('@/views/User/index.vue'),
          meta: { title: '用户中心' }
        },
        {
          path: '/',
          component: import('@/views/Content/index.vue'),
          meta: { title: '首页' }
        }
      ]
    }
  ]
})
router.afterEach((to) => {
  // 获取目标路由的meta中的title信息 进行拼接，修改 页面title
  document.title = `${to.meta.title || ''} - Me And GEM `
  const contentContainer = document.querySelector('.main')
  if (contentContainer) {
    contentContainer.scrollTop = 0
  } else {
    // 如果没有找到特定容器，则尝试滚动整个窗口
    window.scrollTo(0, 0)
  }
})
export default router
