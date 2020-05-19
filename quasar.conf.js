/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

module.exports = function (ctx) {
  const fs = require('fs')
  const et = require('elementtree');
  const git = require('git-utils');
  const { execSync } = require('child_process');

  const checkBranch = (params) => {
    const repo = git.open('.');
    const head = repo.getHead();
    if (head !== 'refs/heads/master') {
      console.warn('Please make builds only on master branch');
    }
  };
  const incrementVersion = (params) => {
    let ios = '1.0.0';
    let android = '10000';
    if (fs.existsSync('version.json')) {
      let content = fs.readFileSync('version.json');
      content = JSON.parse(content);
      ios = content.ios;
      android = content.android;
    }

    switch (true) {
      case ctx.target.ios:
        ios = ios.split('.');
        ios.push((parseInt(ios.pop()) + 1).toString());
        ios = ios.join('.');
        break;
      case ctx.target.android:
        android = (parseInt(android) + 1).toString();
        break;
      default:
        break;
    }

    console.log(`Increment version ios: ${ios}, android: ${android}`);
    fs.writeFileSync('version.json', JSON.stringify({
      ios: ios,
      android: android
    }));
  };
  const saveCurrentVersion = (params) => {
    if (!ctx.mode.cordova) { return; }

    const filePath = 'src-cordova/config.xml';
    const version = require('./version.json');
    const doc = et.parse(fs.readFileSync(filePath, 'utf-8'))
    const root = doc.getroot()

    root.set('android-versionCode', version.android);
    root.set('ios-CFBundleVersion', version.ios);

    const content = doc.write({ indent: 4 })
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Updated version ios: ${version.ios}, android: ${version.android}`);
  };
  const copyFirebaseConf = (params) => {
    if (ctx.mode.cordova) {
      let distDir = 'src-cordova/platforms/ios/Quasar App/Resources/GoogleService-Info.plist';
      let file = 'GoogleService-Info.plist';
      if (ctx.target.android) {
        file = 'google-services.json';
        distDir = 'src-cordova/platforms/android/app/google-services.json';
      }

      const exists = fs.existsSync(file)
      if (exists) {
        fs.copyFileSync(file, distDir);
      }
    }
  };
  const pushConfigChanges = (params) => {
    if (!ctx.mode.cordova) { return }
    execSync('git reset HEAD');
    execSync('git add src-cordova/config.xml');
    execSync('git add version.json');
    execSync("git commit -m 'Increment Build Number'");
    execSync("git push");
  };

    return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      !(ctx.mode.pwa || ctx.mode.spa) || 'firebase'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [],
      directives: [],

      // Quasar plugins
      plugins: []
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: ctx.mode.pwa || ctx.mode.spa,

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      afterDev: copyFirebaseConf,
      beforeBuild: (params) => {
        checkBranch(params);
        incrementVersion(params);
        saveCurrentVersion(params);
      },
      afterBuild: (params) => {
        copyFirebaseConf(params);
        pushConfigChanges(params);
      },

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          }
        })
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: 'all',

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Quasar App',
        short_name: 'Quasar App',
        description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'com.goldencomm.hackthon'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'gc-hackathon-2020'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
