import { createRouter, createWebHashHistory } from 'vue-router'
import index from '@/views/Index/index.vue'
import User from '@/views/User/index.vue'
import Content from '@/views/Content/index.vue'

const router = createRouter({
  history: createWebHashHistory('/'),
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
          component: Content,
          meta: { title: '首页' }
        }
      ]
    }
  ]
})
router.afterEach((to, next) => {
  // 获取目标路由的meta中的title信息 进行拼接，修改 页面title
  document.title = `${to.meta.title || ''} - Me And GEM `
  const contentContainer = document.querySelector('.main')
  if (contentContainer) {
    contentContainer.scrollTop = 0
  } else {
    // 如果没有找到特定容器，则尝试滚动整个窗口
    window.scrollTo(0, 0)
  }
  if (to.matched.length === 0) {
    // 重定向到默认路由
    next('/')
  } else {
    next()
  }
  next()
})
export default router
