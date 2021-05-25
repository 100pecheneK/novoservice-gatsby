const fs = require('fs')

function getDataFromSave(account) {
  const accountFilePath = `./usersWaitingForPay/${account}.txt`
  return { data: fs.readFileSync(accountFilePath, 'utf-8'), accountFilePath }
}

function deleteOrder(account) {
  const { data, accountFilePath } = getDataFromSave(account)
  const parsedData = JSON.parse(data)
  parsedData.attachments.forEach(({ path }) =>
    fs.unlink(path, err => {
      if (err) {
        console.error(err)
        return
      }
    })
  )
  fs.unlink(accountFilePath, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports = { deleteOrder, getDataFromSave }
