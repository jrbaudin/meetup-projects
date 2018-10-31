require('dotenv').config()
const request = require("superagent")

const urlName = 'ovik-dev'

request
  .get(`https://api.meetup.com/${urlName}/events`)
  .query({ key: process.env.MEETUP_API_KEY, sign: true, page: 20, "photo-host": "public", status: "upcoming,past"})
  .then(res => {
    const { body } = res
    const meetups = body && body.length > 0 ? body.map(meetup => ({
      name: meetup.name,
      link: meetup.link,
      attendance: meetup.attendance_count,
      date: meetup.local_date,
      time: meetup.local_time,
    })) : []
    console.log(meetups)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })