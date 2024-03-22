<script setup lang="ts">
import type { diary_day, goal, limited_goal, user } from '@/types'
import { onMounted, ref, watch } from 'vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import Input from '@/components/ui/input/Input.vue'
import { usePB } from '@/composables/usePB'
import { useDebounceFn } from '@vueuse/core'
import { useDiaryStore } from '@/stores/diary'
import { useQuery } from '@tanstack/vue-query'
import { useQueryClient } from '@tanstack/vue-query'
import { createDays } from './initData'
const queryClient = useQueryClient()
const { pb } = usePB()
const diaryStore = useDiaryStore()
let current_day = ref<diary_day>()

const { data, isLoading, isError, error, status, isFetching } = useQuery({
  queryKey: ['current_date'],
  queryFn: async () => {
    console.log('do request ' + diaryStore.current_date)
    const result = await pb
      .collection('diary_day')
      .getFirstListItem(`date_str ~ "${diaryStore.current_date}"`)
    return result
  }
})

watch([data, error, isError], () => {
  if (data.value) {
    current_day.value = JSON.parse(JSON.stringify(data.value)) as diary_day
    gratitude.value = current_day.value.gratitudes
    money.value = current_day.value.money
    month_goals.value = current_day.value.month_goals
    _20_goals.value = current_day.value['20_goals']
    _80_goals.value = current_day.value['80_goals']
  }
  if (isError.value) {
    if (error.value?.name) {
      const err_status = error.value.name.split(' ')
      if (err_status[1] && err_status[1] === '404') {
        createDays()
        // Это значит что запись не существуюет:
        // 2 варианта:
        // 1. Это баг!
        // 2. Это новый год!
        // Во втором случае надо вызвать создание дней для нового года
      }
    }
  }
})

let money = ref('')
let gratitude = ref({
  1: {
    text: ''
  },
  2: {
    text: ''
  },
  3: {
    text: ''
  },
  4: {
    text: ''
  },
  5: {
    text: ''
  }
})

let month_goals = ref<limited_goal>({
  first: {
    text: '',
    done: false
  },
  second: {
    text: '',
    done: false
  },
  third: {
    text: '',
    done: false
  }
})
let _20_goals = ref<limited_goal>({
  first: {
    text: '',
    done: false
  },
  second: {
    text: '',
    done: false
  },
  third: {
    text: '',
    done: false
  }
})
let _80_goals = ref<goal[]>([
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  },
  {
    text: '',
    done: false
  }
])

const saveDataToServer = useDebounceFn(async () => {
  if (current_day.value) {
    const body = {
      '20_goals': _20_goals.value,
      '80_goals': _80_goals.value,
      money: money.value,
      date: diaryStore.current_date,
      month_goals: month_goals.value,
      gratitudes: gratitude.value
    }
    const id = current_day.value.id
    console.log(body)

    await pb.collection('diary_day').update(id, body)
  }
}, 2000)
const onInputBlur = (e: FocusEvent) => {
  saveDataToServer()
}

const mapNum = {
  first: 1,
  second: 2,
  third: 3
}
</script>
<template>
  <div class="relative">
    <div
      class="fixed top-0 z-10 bg-white bg-opacity-[0.4] transition-opacity flex items-center justify-center w-full h-full"
      v-if="isFetching"
    >
      Загрузка...
    </div>
    <div class="py-4 border-b">
      <div class="text-[17px] font-medium text-center mb-4 font-Virgil">Главное на месяц</div>
      <div class="px-4 space-y-2">
        <div class="flex items-center space-x-2" v-for="(m, key) in month_goals" :key="key">
          <Checkbox
            :id="key + 'm'"
            :checked="m.done"
            @update:checked="
              (value) => {
                m.done = value
                saveDataToServer()
              }
            "
          />
          <label :for="key + 'm'" class="flex items-center text-[16px] font-medium font-Virgil">
            {{ mapNum[key] }}.
          </label>
          <Input
            @blur="onInputBlur"
            placeholder="Введите название дела"
            class="font-Virgil"
            :class="{ 'line-through': m.done }"
            v-model:model-value="m.text"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="py-4 border-b">
      <div class="text-[17px] font-medium text-center mb-2 font-Virgil">Планирование дня</div>
      <div class="text-[14px] text-gray-500 font-medium px-4 py-2">3 главных на сегодня</div>
      <div class="px-4 space-y-2">
        <div class="flex items-center space-x-2" v-for="(m, key) in _20_goals" :key="key">
          <Checkbox
            :id="key + '20'"
            :checked="m.done"
            @update:checked="
              (value) => {
                m.done = value
                saveDataToServer()
              }
            "
          />
          <label :for="key + '20'" class="flex items-center text-[16px] font-medium font-Virgil">
            {{ mapNum[key] }}.
          </label>
          <Input
            @blur="onInputBlur"
            placeholder="Введите название дела"
            class="font-Virgil"
            :class="{ 'line-through': m.done }"
            v-model:model-value="m.text"
            type="text"
          />
        </div>
      </div>
      <div class="text-[14px] text-gray-500 font-medium px-4 py-2">Второстепенные</div>
      <div class="px-4 space-y-2">
        <div class="flex items-center space-x-2" v-for="(m, index) in _80_goals" :key="index">
          <Checkbox
            :id="index + '80'"
            :checked="m.done"
            @update:checked="
              (value) => {
                m.done = value
                saveDataToServer()
              }
            "
          />
          <label :for="index + '80'" class="font-Virgil flex items-center text-[16px] font-medium">
            {{ index + 1 }}.
          </label>
          <Input
            @blur="onInputBlur"
            placeholder="Введите название дела"
            class="font-Virgil"
            :class="{ 'line-through': m.done }"
            v-model:model-value="m.text"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="py-4 font-Virgil">
      <div class="text-[17px] font-medium text-center mb-2 mx-auto max-w-[80%]">
        5 пунктов того, за что вы благодарны Богу
      </div>
      <div class="space-y-2 px-4 pt-2">
        <div class="flex space-x-2" v-for="(g, i) in gratitude" :key="i">
          <label :for="i + 'lol'" class="flex items-center text-[16px] font-medium">
            {{ i }}.
          </label>
          <Input
            @blur="onInputBlur"
            placeholder="За что вы благодарны?"
            v-model:model-value="g.text"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="px-4 font-Virgil">
      <div class="text-[17px] font-medium mb-2 mx-auto">
        Мое ежемесячное суммарное денежное вознаграждение (прибыль):
      </div>
      <div class="flex items-center space-x-2 pt-2 pb-4">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12.5" r="9" stroke="black" stroke-width="1.8" />
          <path
            d="M10.459 10.4411C10.459 9.84702 10.916 9.47489 11.5362 9.40307V11.4988C11.471 11.4857 11.4122 11.4661 11.3534 11.4465C10.7593 11.2507 10.459 10.9112 10.459 10.4411ZM13.7233 14.515C13.7233 15.1548 13.2337 15.5792 12.5417 15.6379V13.3855C12.5874 13.3986 12.6331 13.4116 12.6722 13.4182C13.4034 13.6206 13.7233 13.9796 13.7233 14.515ZM12.5547 17.8772L12.5482 17.0481C14.337 16.8783 15.473 15.8925 15.473 14.3387C15.473 12.7588 14.4088 12.0929 13.0966 11.8121L12.5417 11.6946V9.41613C13.2337 9.52712 13.6189 10.0494 13.6385 10.5717H15.3098C15.2837 9.21374 14.2195 8.18222 12.5678 8.00595V7.15723H11.5101V7.99942C9.9302 8.14305 8.68976 9.01136 8.68976 10.5782C8.68976 12.0602 9.76046 12.8175 10.9748 13.0852L11.5362 13.2093V15.6379C10.7006 15.5269 10.2632 15.0242 10.2305 14.4236H8.52002C8.53308 15.6314 9.34263 16.9045 11.5036 17.0611L11.4971 17.8772H12.5547Z"
            fill="black"
          />
        </svg>
        <Input
          @blur="onInputBlur"
          placeholder="Введите сумму"
          v-model:model-value="money"
          type="text"
        />
      </div>
    </div>
  </div>
</template>
