require('dotenv').config()
const express = require('express')
const sendMail = require('./service/sendMail')
const upload = require('./utils/configuredMulter')
const fs = require('fs')
const cors = require('cors')
const getFilesInfoInHTML = require('./utils/getFilesInfoInHTML')

const app = express()
app.use(express.json({ extended: false }))
app.use(cors({ origin: '*' }))
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
  const url = `https://oplata.qiwi.com/create?publicKey=${publickKey}&amount=${amount}&successUrl=${successUrl}&email=${clientEmail}&customFields[paySourcesFilter]=qw,card&lifetime=`
  return encodeURI(url)
}

app.get('/money', async (req, res) => {
  const qiwiRedirectURL = getQiwiRedirectURL({
    successUrl: 'http://localhost',
    amount: 1,
    clientEmail: 'mistermihail23@gmail.com',
  })
  return res.json({ url: qiwiRedirectURL })
})

app.post('/money', async (req, res) => {
  const recipient = 'mistermihail23@gmail.com'
  const subject = 'Оплата'
  const html = `<pre>${JSON.stringify(req.body, null, 4)}</pre>`
  const result = await sendMail(recipient, subject, html)
  return res.json(result)
})

app.post('/order', upload.array('images'), async (req, res) => {
  try {
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

    const html = getFilesInfoInHTML(files)
    const attachments = files.map(({ filename, path }) => ({
      filename,
      path,
    }))
    const result = await sendMail(email, 'Order', html, attachments)
    attachments.forEach(({ path }) =>
      fs.unlink(path, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    )
    const redirectUrl = 'ссылка на оплату'
    return res.json(result)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

const port = process.env.PORT || 5000
app.listen(port)
