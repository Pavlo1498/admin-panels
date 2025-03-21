import { fileURLToPath } from 'node:url';

import { defineConfig } from '#q-app/wrappers';

const setAliasPath = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(() => {
  return {
    boot: ['axios'],
    css: ['app.scss'],
    extras: [
      'roboto-font',
      'material-icons'
    ],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },

      vueRouterMode: 'history',
      extendViteConf(viteConf) {
        Object.assign(viteConf.resolve.alias, {
          helpers: setAliasPath('./src/helpers')
        });
      },
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true
            }
          },
          { server: false }
        ]
      ]
    },
    devServer: {
      open: true
    },
    framework: {
      config: {},
      plugins: [
        'Notify'
      ]
    },
    animations: [],
    ssr: {
      prodPort: 3000,

      middlewares: [
        'render'
      ],
      pwa: false
    },
    pwa: {
      workboxMode: 'GenerateSW'
    },
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'admin-panels'
      }
    },
    bex: {
      extraScripts: []
    }
  };
});
