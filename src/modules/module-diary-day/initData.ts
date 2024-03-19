// https://github.com/pocketbase/pocketbase/discussions/1411
import { usePB } from '@/composables/usePB'
export let initData = {
  money: '',
  gratitudes: {
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
  },
  date_str: '', // generate for 3 month towards
  month_goals: {
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
  },
  '20_goals': {
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
  },
  '80_goals': [
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
  ]
}

export type Record = {
  month_goals: any
  '20_goals': any
  '80_goals': any
  gratitudes: any
  money: string
  user: string
  date_str: string
}

export const createTestDay = async (user_id: string) => {
  const { pb } = usePB()
  return await pb.collection('diary_day').create({
    ...initData,
    user: user_id,
    date_str: '3/18/2024'
  })
}
