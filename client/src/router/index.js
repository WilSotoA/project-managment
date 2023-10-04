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
    {
      path: '/projects/create',
      name: 'createProject',
      component: () => import('../views/Projects/CreateProject.vue'),
    }, 
    {
      path: '/projects/:id/edit',
      name: 'editProject',
      component: () => import('../views/Projects/EditProject.vue'),
    },
    {
      path: '/tasks/create/:projectId',
      name: 'createTask',
      component: () => import('../views/Tasks/CreateTask.vue'),
    }, 
    {
      path: '/tasks/:id/edit',
      name: 'editTask',
      component: () => import('../views/Tasks/EditTask.vue'),
    }
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
