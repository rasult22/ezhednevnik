module.exports = {
  getDiaryDays: (year, user_id) => {
    const days = getDateStringsForYear(year)
    return days.map((date_str) => {
      return {
        ...diary_day,
        user: user_id,
        date_str
      }
    })
  }
}
const diary_day = {
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
  ],
  user: '',
  date_str: '1/1/2024'
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDateStringsForYear(year_i) {
  let year = parseInt(year_i)
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
