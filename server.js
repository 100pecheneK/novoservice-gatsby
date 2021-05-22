require('dotenv').config()
const express = require('express')
const sendMail = require('./service/sendMail')
const upload = require('./utils/configuredMulter')
const fs = require('fs')

const app = express()
app.use(express.json({ extended: false }))
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

function getQiwiRedirectURL({ successUrl, amount, clientEmail }) {
  const publickKey = process.env.QIWI_PUBLIC
  const successUrlProcessed = successUrl.replace(/\//g, '%2F')
  const url = `https://oplata.qiwi.com/create?publicKey=${publickKey}&amount=${amount}&successUrl=${successUrlProcessed}&email=${clientEmail}&customFields[paySourcesFilter]=qw,card`
  return url
}

app.post('/money', async (req, res) => {
  const recipient = 'mistermihail23@gmail.com'
  const subject = 'Subject'
  const text = 'Text'
  const html = '<h1>Text</h1>'
  const result = await sendMail(recipient, subject, text, html)
  return res.json(result)
})

app.post('/order', upload.array('images'), async (req, res) => {
  const { email, phone, id, data: jsonData } = req.body
  const data = JSON.parse(jsonData)
  const files = []
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i]
    const fileData = data[i]
    files.push({
      ...fileData,
      filename: fileData.name,
      path: file.path,
    })
  }
  const text =
    files
      .map(
        ({ filename, width, height, x, y }) =>
          `Имя: ${filename}, Ширина: ${width}, Высота: ${height}` +
          (x ? `, x: ${x}` : '') +
          (y ? `, y: ${y}` : '')
      )
      .join('.\n')
  const html = text
  const attachments = files.map(({ filename, path }) => ({
    filename,
    path,
  }))
  const result = await sendMail(email, 'Order', text, html, attachments)
  attachments.forEach(({ path }) =>
    fs.unlink(path, err => {
      if (err) {
        console.error(err)
        return
      }
    })
  )
  return res.json(attachments)
})

const port = process.env.PORT || 5000
app.listen(port)
