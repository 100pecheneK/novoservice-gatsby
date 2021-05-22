require('dotenv').config()
const { createClient } = require('contentful')

/**
 *
 * @returns
 */
function getContentfulClient() {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })
}

/**
 * API
 * content_type: services
 * serviceName: photonovik
 * fields.serviceSettings.fields.email
 */
async function getSettingsFromContentful() {
  const client = getContentfulClient()
  const services = await client.getEntries({ content_type: 'services' })

  const { email } = services.items.find(
    item => item.fields.serviceName === 'photonovik'
  ).fields.serviceSettings.fields

  return { email }
}

async function getProductFromContentfulById(id) {
  const client = getContentfulClient()
  const product = await client.getEntry(id)
  return product
}

module.exports = getSettingsFromContentful
