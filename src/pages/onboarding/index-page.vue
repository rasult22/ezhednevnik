<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { usePB } from '@/composables/usePB'
const { pb } = usePB()
const onAppleAuth = () => {
  pb.collection('users').authWithOAuth2Code('apple', 'CODE', 'codeVerifier', 'redirectUrl')
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
    <div class="flex justify-center pt-5">Для начала работы выберите метод авторизации:</div>
    <div class="flex flex-col space-y-2 py-4">
      <Button @click="onAppleAuth">Войти с помощью Apple</Button>
      <Button>Войти с помощью Google</Button>
    </div>
  </div>
</template>
