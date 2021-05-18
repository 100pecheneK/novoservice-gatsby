const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    // plugins: [new LoadablePlugin(), new BundleAnalyzerPlugin()],
    plugins: [new LoadablePlugin()],
    resolve: {
      alias: {
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@selectors': path.resolve(__dirname, 'src/selectors'),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { data: homePageLinks } = await graphql(`
    query HomePageLinks {
      allContentfulServices(sort: { fields: sort }) {
        nodes {
          id
          title
          link
          subtitle
          logoAlt
          logo {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  `)
  const { data: settings } = await graphql(`
    query Settings {
      contentfulSettings {
        welcomeTitle
      }
    }
  `)
  const { data: servicesDetails } = await graphql(`
    query AllServices {
      allContentfulServices {
        nodes {
          id
          link
          logoAlt
          mainH1
          mainH2
          mainShortAddres
          logo {
            gatsbyImageData
          }
          links {
            type
            text
            icon
            href
          }
          map {
            map
          }
          services: products {
            title
            subtitle
            subservices
            imageAlt: imageAltForSeo
            image {
              gatsbyImageData
            }
            vk
          }
          serviceContacts
          serviceWelcomeText
          serviceName
          sort
          subtitle
          timetable {
            timetable {
              day
              to {
                h
                m
              }
              from {
                h
                m
              }
            }
          }
          title
          layouts {
            id
            title
            layout {
              gatsbyImageData
              file {
                url
              }
            }
            background {
              file {
                url
              }
            }
            price
          }
        }
      }
    }
  `)

  actions.createPage({
    path: '/',
    component: path.resolve('./src/containers/pages/HomePage.tsx'),
    context: { siteInfo: homePageLinks, settings },
  })

  servicesDetails.allContentfulServices.nodes.forEach(pageData => {
    actions.createPage({
      path: pageData.link,
      component: path.resolve('./src/containers/pages/Page.tsx'),
      context: pageData,
    })
  })
}
