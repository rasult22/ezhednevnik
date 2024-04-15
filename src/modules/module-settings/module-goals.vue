<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import { useRouter } from 'vue-router'
import { usePB } from '@/composables/usePB'
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { useToast } from '@/components/ui/toast'
import useAppLoader from '@/features/app-loading/useAppLoader'

type GoalType = 'long' | 'middle' | 'short'
type Props = {
  type: GoalType
}
const props = defineProps<Props>()
const { type } = toRefs(props)
const { toast } = useToast()
const router = useRouter()
const { pb } = usePB()
const user = localStorage.getItem('user')
let goal_record = ref()
let text = ref('')
let generateAI = ref(true)
let AIisLoading = ref(false)
const { showLoading, hideLoading } = useAppLoader()
let unsubscribe = ref<() => void>()

const subscribeToRecord = async (id: string) => {
  unsubscribe.value = await pb.collection('general_goals').subscribe(id, function (e) {
    console.log(e.action, e.record, 'record')
    if (e.record.gpt_answer) {
      text.value = e.record.gpt_answer.msg
    }
  })
}

onBeforeUnmount(() => {
  unsubscribe.value?.()
})
onMounted(() => {
  showLoading()
  pb.collection('general_goals')
    .getFirstListItem(`user = "${user}" && type = "${type.value}"`)
    .then((data) => {
      goal_record.value = data
      goals.value = data.value
      text.value = data.gpt_answer?.msg || ''
      subscribeToRecord(data.id)
    })
    .catch((e) => {
      console.log('this chunk of code runs', e)
      const status = e.name.split(' ')[1]
      if (status === '404') {
        pb.collection('general_goals')
          .create({
            type: type.value,
            user: user,
            value: [
              {
                index: 1,
                value: ''
              },
              {
                index: 2,
                value: ''
              },
              {
                index: 3,
                value: ''
              },
              {
                index: 4,
                value: ''
              },
              {
                index: 5,
                value: ''
              }
            ]
          })
          .then((data) => {
            console.log(data)
            goal_record.value = data
            text.value = data.gpt_answer?.msg || ''
            goals.value = data.value
            subscribeToRecord(data.id)
          })
      }
    })
    .finally(() => {
      hideLoading()
    })
})

const goals = ref([
  {
    index: 1,
    value: ''
  },
  {
    index: 2,
    value: ''
  },
  {
    index: 3,
    value: ''
  },
  {
    index: 4,
    value: ''
  },
  {
    index: 5,
    value: ''
  }
])

const onSave = async () => {
  if (user && goal_record.value.id) {
    showLoading()
    if (generateAI) {
      AIisLoading.value = true
      await sendGptRequest()
      AIisLoading.value = false
    }
    pb.collection('general_goals')
      .update(goal_record.value.id, {
        type: type.value,
        value: goals.value,
        user: user
      })
      .then(() => {
        // done
        toast({
          title: 'Успешно сохранено!',
          duration: 1000
        })
      })
      .finally(() => {
        hideLoading()
      })
  }
}

const sendGptRequest = async () => {
  let goal_str = ''

  const strs = goals.value.map((goal) => {
    if (!goal.value) return ''
    return `\n ${goal.index}. ${goal.value}`
  })

  goal_str = strs.join('')

  return await pb.send('/custom/gpt-answer', {
    method: 'POST',
    body: {
      goal_id: goal_record.value.id,
      goal_str: goal_str,
      goal_type: type.value
    }
  })
}
</script>
<template>
  <div class="">
    <div v-if="AIisLoading" class="fixed z-50 top-0 w-full h-full flex items-center justify-center">
      <div class="bg-[#f1f1f1] text-black p-4 rounded-[16px] max-w-[80vw] text-center shadow-md">
        Подождите... <br />
        ИИ ассистент декомпозирует ваши цели на задачи, и генерирует вам советы...
      </div>
    </div>
    <!-- HEADER -->
    <div class="flex shadow-sm bg-[#141414] text-[#f1f1f1] p-4 justify-between">
      <div @click="() => router.back()"><img src="/arrow-left.svg" alt="" /></div>
      <div>
        <slot name="title"> Цели на 10 лет </slot>
      </div>
      <div class="opacity-0"><img src="/arrow-left.svg" alt="" /></div>
    </div>
    <div class="px-4">
      <div class="text-center text-[17px] leading-[20px] py-3 font-medium">
        <slot name="desc">
          Укажите масштабные, отдаленные цели, в которые сейчас, возможно, вам трудно поверить, но
          именно их вы хотели бы достичь за 10 лет.
        </slot>
      </div>
      <div class="space-y-2 pt-4">
        <div class="flex items-center space-x-2" v-for="(val, key) in goals" :key="val.index">
          <span class="font-medium">{{ val.index }}</span>
          <Input placeholder="Ваша великая цель" v-model:model-value="val.value" type="text" />
        </div>
      </div>
      <div class="pt-5 flex justify-center flex-wrap">
        <div class="w-full flex items-center space-x-2 text-[14px] underline mb-4">
          <input v-model="generateAI" type="checkbox" name="generate" id="generate" />
          <label for="generate">Сгенерировать план с помощью ИИ</label>
        </div>
        <Button @click="onSave">Сохранить</Button>
      </div>
    </div>
    <div class="px-4">
      <div
        v-if="text"
        class="p-4 active:scale-[0.99] active:opacity:[0.8] transition-all whitespace-pre-line"
      >
        <div class="text-[20px] font-medium py-4">Рекомендации от ИИ:</div>
        {{ text }}
      </div>
    </div>
  </div>
</template>
