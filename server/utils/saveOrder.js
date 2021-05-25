const fs = require('fs')

function saveOrder(account, order) {
  fs.appendFileSync(`./usersWaitingForPay/${account}.txt`, order)
}

module.exports = saveOrder
