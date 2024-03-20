import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/index-page.vue'
import OnboardingPage from '@/pages/onboarding/index-page.vue'
import SettingsPage from '@/pages/settings/index-page.vue'
import LoginPage from '@/pages/(unauth)/login/index-page.vue'
import ShortTermGoals from '@/pages/settings/short-term-goals/index-page.vue'
import LongTermGoals from '@/pages/settings/long-term-goals/index-page.vue'
import MiddleTermGoals from '@/pages/settings/middle-term-goals/index-page.vue'

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
      path: '/settings/short-term-goals',
      name: 'short-term-goals',
      component: ShortTermGoals
    },
    {
      path: '/settings/middle-term-goals',
      name: 'middle-term-goals',
      component: MiddleTermGoals
    },
    {
      path: '/settings/long-term-goals',
      name: 'long-term-goals',
      component: LongTermGoals
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
