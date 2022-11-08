export default {
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------- [Runtime] Public
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    serverEnv: process.env.SERVER_ENV,
    frontendUrl: 'https://v2.slingshot.filecoin.io',
    backendUrl: (function () {
      const env = process.env.SERVER_ENV
      let uri = 'https://localhost:13000' // development
      switch (env) {
        case 'stable': uri = 'https://stable.slingshot.filecoin.io/api'; break
        case 'production': uri = 'https://slingshot.filecoin.io/api'; break
      } return uri
    }()),
    seo: {
      siteName: 'Dataset Explorer',
      siteUrl: ''
    }
  },
  // --------------------------------------------------------- [Runtime] Private
  privateRuntimeConfig: {},
  // /////////////////////////////////////////////////////////// Server & Render
  // ---------------------------------------------------------------------------
  server: {
    port: 28000,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost'
  },
  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },
  // /////////////////////////////////////////////////////// Headers of the Page
  // ---------------------------------------------------------------------------
  head: {
    title: 'Dataset Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
    ]
  },
  // ////////////////////////////////////////// Customize the progress-bar color
  // ---------------------------------------------------------------------------
  loading: {
    color: '#001FE6',
    height: '7px'
  },
  // /////////////////////////////////////////////////////////// Global CSS/SCSS
  // ---------------------------------------------------------------------------
  css: [
    '~/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss'
    ]
  },
  // /////////////////////////////////////////////////////// Nuxt.js Dev Modules
  // ---------------------------------------------------------------------------
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/moment-module#readme
    '@nuxtjs/moment'
  ],
  // /////////////////////////////////////////////////////////// Nuxt.js Modules
  // ---------------------------------------------------------------------------
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/agency-undone/au-nuxt-module-zero
    '@agency-undone/au-nuxt-module-zero',
    // Doc: https://sitemap.nuxtjs.org
    // '@nuxtjs/sitemap',
    // Doc: https://content.nuxtjs.org
    // '@nuxt/content'
    '~/modules/Pagination'
  ],
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ---------------------------------------------------------------------------
  zero: {
    core: {
      include: true,
      toaster: {
        display: 10,
        timeout: 5000
      }
    },
    filters: {
      include: true
    },
    pagination: {
      include: true
    }
  },
  // ///////////////////////////////////////////////////////// [Module] MomentJS
  // ---------------------- Doc: https://github.com/nuxt-community/moment-module
  moment: {
    timezone: true,
    defaultTimezone: 'UTC'
  },
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ------------------------------------------- Dox: https://sitemap.nuxtjs.org
  sitemap: {
    hostname: '/'
  },
  // //////////////////////////////////////////////////////////// [Module] Axios
  // -------------------------------------- See https://axios.nuxtjs.org/options
  axios: {
  },
  // /////////////////////////////////// Plugins to load before mounting the App
  // ---------------------------------------------------------------------------
  plugins: [
    '~/plugins/helpers'
  ],
  // /////////////////////////////////////////////////////// Router + Middleware
  // ---------------------------------------------------------------------------
  router: {},
  // /////////////////////////////////////////////////////// Build configuration
  // ------------------------------------------------ Extend webpack config here
  build: {
    // ---------------------------------------------------------- Hot Middleware
    hotMiddleware: {
      client: {
        overlay: false
      }
    },
    // -------------------------------------------------------------- Extensions
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      })
    }
  }
}
