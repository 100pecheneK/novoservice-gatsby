require('dotenv').config()
const express = require('express')
const sendMail = require('./service/sendMail')

const app = express()

app.get('/', (req, res) => {
  res.send('API RUNING!!!')
})

app.post('/sendMail', async (req, res) => {
  try {
    const recipient = 'mistermihail23@gmail.com'
    const subject = 'Subject'
    const text = 'Text'
    const html = '<h1>Text</h1>'
    const result = await sendMail(recipient, subject, text, html)
    return res.json(result)
  } catch (e) {
    return res.json({ message: e.message })
  }
})

const port = process.env.PORT || 5000
app.listen(port)
