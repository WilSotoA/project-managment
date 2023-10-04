import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    }, 
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects/Index.vue'),
    }, 
    {
      path: '/projects/:projectId',
      name: 'projectsShow',
      component: () => import('../views/Projects/Show.vue'),
    }, 
  ]
})

router.beforeEach( async (to) => {
  const publicPages = ['/', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.authUser) {
    auth.returnUrl = to.fullPath
    return '/'
  }
})

export default router
