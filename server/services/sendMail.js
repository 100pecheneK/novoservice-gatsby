const { getSettingsFromContentful } = require('./contentful')
const sendOAuthMail = require('../utils/sendOAuthMail')

async function sendMail(recipient, subject, html, attachments = []) {
  const { email } = await getSettingsFromContentful()

  const options = {
    from: `Фотоновик <${email}>`,
    to: recipient,
    subject,
    html,
    attachments,
    // generateTextFromHTML: true,
  }

  const result = await sendOAuthMail(email, { options })
  return result
}

module.exports = sendMail
