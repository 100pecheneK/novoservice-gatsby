require('dotenv').config()
const { createClient } = require('contentful')

/**
 * API
 * content_type: services
 * serviceName: photonovik
 * fields.serviceSettings.fields.email
 */
async function getSettingsFromContentful() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
  const res = await client.getEntries({ content_type: 'services' })

  const { email } = res.items.find(
    item => item.fields.serviceName === 'photonovik'
  ).fields.serviceSettings.fields

  return { email }
}

module.exports = getSettingsFromContentful
