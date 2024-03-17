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
export function createDaysInDB(user_id: string) {
  const date_strs = getDateStringsForYear(new Date().getFullYear())
  const records = date_strs.map((date_str) => {
    return {
      ...initData,
      user: user_id,
      date_str
    }
  })
  const { pb } = usePB()
  const promises = records.map((record) => {
    return pb.collection('diary_day').create(record, {
      requestKey: null // disable auto canceling same requests
    })
  })

  return Promise.all(promises)
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDateStringsForYear(year: number) {
  const isLeap = isLeapYear(year)
  const daysInFebruary = isLeap ? 29 : 28
  const daysInMonths = [31, daysInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  const dateStrings = []
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonths[month]; day++) {
      dateStrings.push(month + 1 + '/' + day + '/' + year)
    }
  }

  return dateStrings
}
