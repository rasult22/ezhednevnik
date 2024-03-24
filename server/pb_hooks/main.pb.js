/// <reference path="../pb_data/types.d.ts" />

routerAdd('POST', '/custom/delete-account', (c) => {
  const user = c.get('authRecord')

  if (!user) {
    return c.json(401, {
      msg: 'User is not authenticated'
    })
  }

  const diary_dayRecords = $app
    .dao()
    .findRecordsByFilter('diary_day', `user = "${user.id}"`, '-created')

  diary_dayRecords.forEach((r, index) => {
    $app.dao().deleteRecord(r)
  })
  const diary_years_created = $app
    .dao()
    .findRecordsByFilter('diary_years_created', `user = "${user.id}"`, '-created')

  diary_years_created.forEach((r, index) => {
    $app.dao().deleteRecord(r)
  })

  const general_goals = $app
    .dao()
    .findRecordsByFilter('general_goals', `user = "${user.id}"`, '-created')

  general_goals.forEach((r, index) => {
    $app.dao().deleteRecord(r)
  })

  const userRecord = $app.dao().findRecordById('users', user.id)
  $app.dao().deleteRecord(userRecord)

  return c.json(200, {
    message: 'Account deleted'
  })
})

routerAdd('POST', '/custom/create-days', (c) => {
  const shared = require(`${__hooks}/shared.js`)
  const user = c.get('authRecord')
  const requestData = $apis.requestInfo(c).data

  if (!user) {
    return c.string(401, 'Unauthorized')
  }

  if (!requestData.year) {
    return c.string(400, '??')
  }

  // fetch current user years that is specific to request year
  const year_exist = $app
    .dao()
    .findRecordsByFilter(
      'diary_years_created',
      `year = '${requestData.year}' && user = '${user.id}'`
    )
  const year_taken_by_user = year_exist.length > 0

  if (year_taken_by_user) {
    return c.json(400, { msg: 'This year is already generated' })
  }
  const days = shared.getDiaryDays(requestData.year, user.id)

  // create 365 days in the collection
  days.forEach((d, index) => {
    const collection = $app.dao().findCollectionByNameOrId('diary_day')
    const record = new Record(collection, d)
    $app.dao().saveRecord(record)
  })
  // add current year record, for future validation (year_taken_by_user)
  const yearCollection = $app.dao().findCollectionByNameOrId('diary_years_created')
  const yearRecord = new Record(yearCollection, {
    year: requestData.year,
    user: user.id
  })
  $app.dao().saveRecord(yearRecord)

  return c.json(200, {
    msg: '365 days created for ' + requestData.year,
    message: c.get('authRecord'),
    r: requestData,
    year_exist,
    user,
    year_taken_by_user
  })
})

routerAdd('POST', '/custom/gpt-answer', (c) => {
  const goal_id = $apis.requestInfo(c).data.goal_id
  const goal_str = $apis.requestInfo(c).data.goal_str
  const goal_type = $apis.requestInfo(c).data.goal_type
  const user = c.get('authRecord')

  if (!user) {
    return c.json(401, {
      msg: 'User is not authenticated'
    })
  }

  if (!goal_id || !goal_str) {
    return c.json(400, 'Incorrect payload')
  }

  const promt_10 = `Ты декомпозитор целей. 
  Пользователь отправит тебе 5 целей, которые нужно достичь за 10 лет.
  Мы исходим из долгосрочных целей к краткосрочным.
  Используй принцип парето 20/80. Где 20% усилий дают 80% результата.
  Нужно определить эти 20% процентов задач для каждой цели и отбросить другие задачи.
  Необходима конкретика, план, roadmap, пошаговое описание. Необходимо дать пользователю ценность.
  Чем ближе цель по времени, тем больше деталей и конкретики (что нужно делать/как и т.д)
  Нужно разбить цели до несколько частей.
  1. Чего нужно достичь за 5 лет, чтобы достичь целей за 10 лет?
  2. Чего нужно достичь за текущий год, чтобы достичь целей за 5 лет?
  3. Теперь тут нужно разбить 5 летние цели на задачи на каждый год вплоть до 5 лет. Нужно расписать что нужно делать каждый год, чтобы достичь 5-летних целей
  
  Вот цели на 10 лет, которые пользователь нам прислал:
  ${goal_str}
  `
  const promt_5 = `Ты декомпозитор целей. 
  Пользователь отправит тебе 5 целей, которые нужно достичь за 5 лет.
  Мы исходим из долгосрочных целей к краткосрочным.
  Используй принцип парето 20/80. Где 20% усилий дают 80% результата.
  Нужно определить эти 20% процентов задач для каждой цели и отбросить другие задачи.
  Необходима конкретика, план, roadmap, пошаговое описание. Необходимо дать пользователю ценность.
  Чем ближе цель по времени, тем больше деталей и конкретики (что нужно делать/как и т.д)
  Нужно разбить цели до несколько частей.
  1. Чего нужно достичь 4, 3, 2 года, чтобы достичь целей за 5 лет?
  2. Чего нужно достичь за текущий год, чтобы достичь целей за 5 лет?

  Будь конкретнее со своими выводами и размышлениями.
  
  Вот цели на 5 лет, которые пользователь нам прислал:
  ${goal_str}
  `
  const promt_1 = `Ты декомпозитор целей. 
  Пользователь отправит тебе 5 целей, которые нужно достичь за этот год.
  Мы исходим из долгосрочных целей к краткосрочным.
  Используй принцип парето 20/80. Где 20% усилий дают 80% результата.
  Нужно определить эти 20% процентов задач для каждой цели и отбросить другие задачи.
  Необходима конкретика, план, roadmap, пошаговое описание. Необходимо дать пользователю ценность.
  Чем ближе цель по времени, тем больше деталей и конкретики (что нужно делать/как и т.д)
  Нужно разбить цели до несколько частей.
  1. Разбей по месяцам, цели и задачи.
  2. Выяви 20% самых важных дел и сделай них акцент.
  3. Дай 10 советов по их достижению (только самые важные советы, которые дают 80% результата) 

  Вот цели на этот год, которые пользователь нам прислал:
  ${goal_str}
  `

  const res = $http.send({
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: goal_type === 'long' ? promt_10 : goal_type === 'middle' ? promt_5 : promt_1
        }
      ],
      temperature: 0.7
    })
  })
  const parsed = res.json
  const goalRecord = $app.dao().findRecordById('general_goals', goal_id)
  goalRecord.set('gpt_answer', { msg: parsed.choices[0].message.content })
  $app.dao().saveRecord(goalRecord)

  c.json(200, {
    res
  })
})
