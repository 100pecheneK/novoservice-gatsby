require('dotenv').config()
const express = require('express')
const sendMail = require('./services/sendMail')
const upload = require('./utils/configuredMulter')
const fs = require('fs')
const cors = require('cors')
const generateHTMLFromFiles = require('./utils/generateHTMLFromFiles')
const { nanoid } = require('nanoid')
const { getProductFromContentfulById } = require('./services/contentful')
const getFiles = require('./utils/getFiles')
const { deleteOrder, getDataFromSave } = require('./utils/deleteOrder')
const { getSettingsFromContentful } = require('./services/contentful')
const generateHTMLFromOrder = require('./utils/generateHTMLFromOrder')
const saveOrder = require('./utils/saveOrder')

const app = express()
app.use(express.json({ extended: false }))
app.use(cors({ origin: '*' }))
app.get('/', (req, res) => {
  res.send('API RUNING!!!')
})

function getQiwiRedirectURL({ successUrl, amount, clientEmail, account }) {
  const publickKey = process.env.QIWI_PUBLIC
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  // ГГГГ-ММ-ДДTччмм
  const lifetime = new Date(year, month, day + 3)
    .toISOString()
    .split(':')
    .slice(0, -1)
    .join('')

  const url = `https://oplata.qiwi.com/create?publicKey=${publickKey}&amount=${amount}&successUrl=${successUrl}&email=${clientEmail}&account=${account}&customFields[paySourcesFilter]=qw,card&lifetime=${lifetime}`
  return encodeURI(url)
}
class PayError extends Error {}
function checkPayStatus(status) {
  const statuses = {
    ok: ['PAID'],
    error: ['REJECTED', 'EXPIRED'],
  }
  if (statuses.error.includes(status))
    throw new PayError('Счет отклонен или не оплачен')
  if (statuses.ok.includes(status)) return true
  throw new Error('Неизвестный статус')
}

app.post('/money', async (req, res) => {
  const { bill } = req.body
  const { email: recipient } = await getSettingsFromContentful()
  const account = bill.customer.account
  const order = JSON.parse(getDataFromSave(account).data)
  const htmlOrder = generateHTMLFromOrder(order, account, bill.billId)
  try {
    checkPayStatus(bill.status.value)
    const subject = 'Оплата'
    await sendMail(
      recipient,
      'BILL',
      `<pre>${JSON.stringify(req.body, null, 4)}</pre>`
    )
    await sendMail(
      order.email,
      subject,
      `<b>Ваш номер заказа: ${account}</b><br><b>Код оплаты: ${bill.billId}</b>`
    )
    const mailResult = await sendMail(
      recipient,
      subject,
      htmlOrder,
      order.attachments
    )
    deleteOrder(account)
    return res.json(mailResult)
  } catch (e) {
    if (e instanceof PayError) {
      const subject = 'Ошибка оплаты'
      const html = `<h2>${e.message}</h2>`
      deleteOrder(account)
      await sendMail(order.email, subject, html)
    }
    return res.status(500).send(e.message)
  }
})

app.post('/order', upload.array('images'), async (req, res) => {
  try {
    const account = nanoid()
    const { email, phone, name, id, data: jsonData, size } = req.body
    const {
      fields: { price: amount, title: productTitle },
    } = await getProductFromContentfulById(id)

    const uploadedFiles = req.files
    // ? mb send without stringify
    const data = JSON.parse(jsonData)
    const files = getFiles(uploadedFiles, data)
    const fielsInfoHtml = generateHTMLFromFiles(files)
    const attachments = files.map(({ filename, path }) => ({
      filename,
      path,
    }))
    const order = JSON.stringify({
      email,
      phone,
      name,
      size,
      productTitle,
      productId: id,
      fielsInfoHtml,
      attachments,
    })
    saveOrder(account, order)

    const qiwiRedirectURL = getQiwiRedirectURL({
      successUrl: 'https://novoservice.netlify.app/success',
      amount,
      clientEmail: email,
      account,
    })

    return res.json({ url: qiwiRedirectURL })
  } catch (e) {
    console.log(e)
    req.files.forEach(file =>
      fs.unlink(file.path, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    )
    return res.status(500).json({ error: e.message })
  }
})

const port = process.env.PORT || 5000
app.listen(port)
