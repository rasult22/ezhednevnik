<script setup lang="ts">
import type { goal, limited_goal } from '@/types'
import { ref } from 'vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import Input from '@/components/ui/input/Input.vue'

let date = new Date()
let date_str = `${date.toLocaleDateString()}`
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

const mapNum = {
  first: 1,
  second: 2,
  third: 3
}
</script>
<template>
  <div class="">
    <div class="py-4 border-b">
      <div class="text-[17px] font-medium text-center mb-4">Главное на месяц</div>
      <div class="px-4 space-y-2">
        <div class="flex items-center space-x-2" v-for="(m, key) in month_goals" :key="key">
          <Checkbox
            :id="key + 'm'"
            :checked="m.done"
            @update:checked="(value) => (m.done = value)"
          />
          <label :for="key + 'm'" class="flex items-center text-[16px] font-medium">
            {{ mapNum[key] }}.
          </label>
          <Input
            placeholder="Введите название дела"
            :class="{ 'line-through': m.done }"
            v-model:model-value="m.text"
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="py-4 border-b">
      <div class="text-[17px] font-medium text-center mb-2">Планирование дня</div>
      <div class="text-[14px] text-gray-500 font-medium px-4 py-2">3 главных на сегодня</div>
      <div class="px-4 space-y-2">
        <div class="flex items-center space-x-2" v-for="(m, key) in _20_goals" :key="key">
          <Checkbox
            :id="key + '20'"
            :checked="m.done"
            @update:checked="(value) => (m.done = value)"
          />
          <label :for="key + '20'" class="flex items-center text-[16px] font-medium">
            {{ mapNum[key] }}.
          </label>
          <Input
            placeholder="Введите название дела"
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
            :id="index + '20'"
            :checked="m.done"
            @update:checked="(value) => (m.done = value)"
          />
          <label :for="index + '20'" class="flex items-center text-[16px] font-medium">
            {{ index + 1 }}.
          </label>
          <Input
            placeholder="Введите название дела"
            :class="{ 'line-through': m.done }"
            v-model:model-value="m.text"
            type="text"
          />
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
