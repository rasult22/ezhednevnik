<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { usePB } from '@/composables/usePB'
import { createDays } from '@/modules/module-diary-day/initData'
import { signInWithApple, redirectURI } from '@/utils/oauth'
import { useRouter } from 'vue-router'
const { pb } = usePB()
const router = useRouter()

// 1. create account or sign in to existing
// 2. set token and user to the storage
// 3. create days for new account
// 4. create days for exisiting account if there's no current year days
// 5. set "days_created" to localstorage for future conditional logic.
// 6. reroute to /
const onAppleAuth = async () => {
  const results = await signInWithApple()
  if (results?.response) {
    const user = await pb
      .collection('users')
      .authWithOAuth2Code(
        'apple',
        results.response.authorizationCode,
        results.response.identityToken,
        redirectURI
      )
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', user.record.id)
    await createDays()
    localStorage.setItem('days_created', 'true')
    router.replace('/')
  }
}
</script>
<template>
  <header>
    <div class="wrapper font-Ubuntu">
      <nav class="bg-[#141414] text-[#f1f1f1] border-b border-gray-400 p-4 flex justify-between">
        <div>Ежедневник 20/80</div>
      </nav>
    </div>
  </header>
  <div class="font-Ubuntu py-4 px-4">
    <div class="text-[24px] leading-[28px] text-center font-medium max-w-[350px] mx-auto">
      Добро пожаловать в Ежедневник 20/80
    </div>
    <div class="text-[15px] leading-[18px] py-4 space-y-2 max-w-[380px] mx-auto">
      <p>
        Разработка этого приложения было вдохновлено проектом "Ежедневник Триллионера" Шамиля
        Аляутдинова.
      </p>
      <p>Желаем вам удачи в освоении исскуства сосредоточения на главном! 🙌</p>
    </div>
    <!-- <div class="flex justify-center pt-5">Для начала работы выберите способ авторизации:</div> -->
    <div class="flex flex-col space-y-2 py-4">
      <Button @click="onAppleAuth">
        <div class="flex items-center space-x-2">
          <img src="/apple.svg" alt="" />
          <span> Войти с помощью Apple </span>
        </div>
      </Button>
      <!-- <Button>Войти с помощью Google</Button> -->
    </div>
  </div>
</template>
