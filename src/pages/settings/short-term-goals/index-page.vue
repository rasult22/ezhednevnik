<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import { useRouter } from 'vue-router'
import { usePB } from '@/composables/usePB'
import { onMounted, ref } from 'vue'

const router = useRouter()
const { pb } = usePB()
const user = localStorage.getItem('user')
let goal_record = ref()
onMounted(() => {
  pb.collection('general_goals')
    .getFirstListItem(`user = "${user}" && type = "short"`)
    .then((data) => {
      goal_record.value = data
      goals.value = data.value
      console.log(data)
    })
    .catch((e) => {
      const status = e.name.split(' ')[1]
      if (status === '404') {
        pb.collection('general_goals')
          .create({
            type: 'short',
            user: user,
            value: {
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
            }
          })
          .then((data) => {
            console.log(data)
            goal_record.value = data
            goals.value = data.value
          })
      }
    })
})

const goals = ref({
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

const onSave = () => {
  if (user && goal_record.value.id) {
    pb.collection('general_goals')
      .update(goal_record.value.id, {
        type: 'short',
        value: goals.value,
        user: user
      })
      .then(() => {
        // done
      })
  }
}
</script>
<template>
  <div class="">
    <!-- HEADER -->
    <div class="flex shadow-sm bg-[#141414] text-[#f1f1f1] p-4 justify-between">
      <div @click="() => router.back()"><img src="/arrow-left.svg" alt="" /></div>
      <div>Цели на текущий год</div>
      <div class="opacity-0"><img src="/arrow-left.svg" alt="" /></div>
    </div>

    <div class="px-4">
      <div class="text-center text-[17px] leading-[20px] py-3 font-medium">
        Цели на год конкретизируют ваши пятилетние и десятилетние рубежи
      </div>
      <div class="space-y-2 pt-4">
        <div class="flex items-center space-x-2" v-for="(g, i) in goals" :key="i">
          <span class="font-medium">{{ i }}</span>
          <Input placeholder="Ваша великая цель" v-model:model-value="goals[i].text" type="text" />
        </div>
      </div>
      <div class="pt-5 flex justify-center">
        <Button @click="onSave">Сохранить</Button>
      </div>
    </div>
  </div>
</template>
