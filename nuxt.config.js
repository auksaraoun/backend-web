import colors from 'vuetify/es5/util/colors'
import redirectSSL from 'redirect-ssl'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - AdminWeb',
    title: 'AdminWeb',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
  ],

  axios: {
    proxy: true,
    credentials: true
  },

  proxy: {
    '/api': { target: process.env.API_URL }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/logout',
      home: false,
      callback: false,
    },
    autoFetch: true,
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: '/api',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
          },
          logout: {
            url: '/logout',
            method: 'get',
          },
          user: {
            url: '/user',
            method: 'get',
          },
        }
      },
    },
  },

  router: {
    middleware: ['auth']
  },

  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.APP_ENV === 'production'
    }),
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
  },
  server: {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    timing: process.env.SERVER_TIMING
  }
}
