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
