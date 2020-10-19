export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-image-uploader-2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:3000/',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  tailwindcss: {
    config: {
      theme: {
        extend: {
          future: {
            removeDeprecatedGapUtilities: true,
            purgeLayersByDefault: true,
            defaultLineHeights: true,
            standardFontWeights: true,
          },
          fontFamily: { body: ['Noto Sans', 'sans-serif'] },
          colors: {
            appBg: '#F0F1F2',
            appBlue: ' #2f80ed',
            appBox: '#000FF3',
            appImageBox: '#f6f8fb',
            borderColor1: '#97bef4',
          },
          spacing: {
            uploaderHeight: '650px',
            uploaderWidth: '600px',
            imageBoxHeight: '350px',
            imageBoxWidth: '400px',
            showImageBoxWidth: '500px',
            showImageBoxHeight: '500px',

            smallUploaderHeight: '350px',
            smallUploaderWidth: '300px',
            smallImageBoxHeight: '150px',
            smallImageBoxWidth: '250px',
            smallShowImageBoxWidth: '100px',
            smallShowImageBoxHeight: '100px',
            mediumUploaderHeight: '450px',
            mediumUploaderWidth: '400px',
            mediumImageBoxHeight: '250px',
            mediumImageBoxWidth: '350px',
            mediumShowImageBoxWidth: '200px',
            mediumShowImageBoxHeight: '200px',
          },
          boxShadow: {
            // shadowApp1: '0px 4px 12px 0px #2f80ed',
          },
          borderRadius: {
            '12px': '12px',
          },
        },
      },
      variants: {},
      plugins: [],
    },
  },
}
