<script setup lang="ts">
import { usePB } from '@/composables/usePB'
import useAppLoader from '@/features/app-loading/useAppLoader'
import { useRouter } from 'vue-router'
const { pb } = usePB()
const router = useRouter()
const { showLoading, hideLoading } = useAppLoader()
const onLogout = () => {
  const sure = confirm('Вы действительно хотите выйти из аккаунта?')
  if (sure) {
    pb.authStore.clear()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('days_created')
    router.replace('/onboarding')
  }
}
const onDelete = () => {
  const sure = confirm('Вы действительно хотите удалить аккаунт и все данные?')
  if (sure) {
    showLoading()
    pb.send('/custom/delete-account', {
      method: 'POST'
    })
      .then(() => {
        pb.authStore.clear()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('days_created')
        router.replace('/onboarding')
      })
      .finally(() => {
        hideLoading()
      })
  }
}
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="flex shadow-sm bg-[#141414] text-[#f1f1f1] p-4 justify-between">
      <div @click="() => router.back()"><img src="/arrow-left.svg" alt="" /></div>
      <div>Настройки</div>
      <div class="opacity-0"><img src="/arrow-left.svg" alt="" /></div>
    </div>
    <div class="px-4 text-[14px] py-2 text-[#9F9F9F]">Управление целями</div>
    <div>
      <div
        @click="() => router.push('/settings/long-term-goals')"
        class="flex items-center py-3 px-4 border-b shadow-sm active:opacity-[0.8] active:scale-[0.98] transition-all"
      >
        <div>Цели на 10 лет</div>
        <div class="ml-auto pl-2"><img src="/arrow-right-black.svg" alt="" /></div>
      </div>
      <div
        class="flex items-center py-3 px-4 border-b shadow-sm active:opacity-[0.8] active:scale-[0.98] transition-all"
      >
        <div @click="() => router.push('/settings/middle-term-goals')">
          <div>Цели на 5 лет</div>
          <div class="text-[12px] text-[#9F9F9F]">
            Чего вам нужно достичь за 5 лет, чтобы достичь целей на 10 лет?
          </div>
        </div>
        <div class="ml-auto pl-2"><img src="/arrow-right-black.svg" alt="" /></div>
      </div>
      <div
        @click="() => router.push('/settings/short-term-goals')"
        class="flex items-center py-3 px-4 border-b shadow-sm active:opacity-[0.8] active:scale-[0.98] transition-all"
      >
        <div>
          <div>Цели на этот год</div>
          <div class="text-[12px] text-[#9F9F9F]">
            Чего вам нужно достичь за этот год, чтобы приблизиться к 5-летним целям?
          </div>
        </div>
        <div class="ml-auto pl-2"><img src="/arrow-right-black.svg" alt="" /></div>
      </div>
      <div class="px-4 text-[14px] mt-4 pt-2 text-[#9F9F9F]">Управление аккаунтом</div>
      <div
        @click="onDelete"
        class="flex items-center py-3 px-4 border-b shadow-sm active:opacity-[0.8] active:scale-[0.98] transition-all"
      >
        <div>
          <div>Удалить аккаунт</div>
          <div class="text-[12px] text-[#9F9F9F]">Удалить аккаунт со всеми моими данными</div>
        </div>
      </div>
      <div
        @click="onLogout"
        class="flex items-center py-3 px-4 border-b shadow-sm active:opacity-[0.8] active:scale-[0.98] transition-all"
      >
        <div>
          <div>Выйти</div>
          <div class="text-[12px] text-[#9F9F9F]">Выйти из текущего аккаунта</div>
        </div>
      </div>
    </div>
  </div>
</template>
