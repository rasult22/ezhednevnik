import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/index-page.vue'
import OnboardingPage from '@/pages/onboarding/index-page.vue'
import SettingsPage from '@/pages/settings/index-page.vue'
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
      path: '/settings',
      name: 'settings',
      component: SettingsPage
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router
