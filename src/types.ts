export type goal = {
  text: string
  done: boolean
}
export type limited_goal = {
  first: goal
  second: goal
  third: goal
}
export type diary_day = {
  id: string
  collectionId: string
  collectionName: 'diary_day'
  created: string
  updated: string
  date: string
  month_goals: limited_goal
  '20_goals': limited_goal
  '80_goals': goal[]
  gratitudes: {
    1: {
      text: string
    }
    2: {
      text: string
    }
    3: {
      text: string
    }
    4: {
      text: string
    }
    5: {
      text: string
    }
  }
  money: string
  user: string
}

export type user = {
  id: string
  collectionId: string
  collectionName: 'users'
  username: string
  verified: boolean
  emailVisibility: boolean
  email: string
  created: string
  updated: string
  name: string
  avatar?: string
}
