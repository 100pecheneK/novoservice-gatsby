const getSettingsFromContentful = require('../utils/contentful')
const sendOAuthMail = require('../utils/sendOAuthMail')

async function sendMail(recipient, subject, text, html) {
  const { email } = await getSettingsFromContentful()

  const options = {
    from: `Фотоновик <${email}>`,
    to: recipient,
    subject,
    text,
    html,
  }

  const result = await sendOAuthMail(email, options)
  return result
}

module.exports = sendMail
