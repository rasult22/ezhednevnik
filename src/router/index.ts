import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/index-page.vue'
import LoginPage from '@/pages/(unauth)/login/index-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'main',
      component: LoginPage
    }
  ]
})

export default router
