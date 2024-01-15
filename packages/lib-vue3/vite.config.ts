import path from 'node:path'
import url from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { vueBridge } from '@vue-bridge/vite-plugin'
import { defineConfig } from 'vite'

import { buildConfig, pluginsConfig, sharedConfig } from '../../vite.config.shared'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// This is the name of the global you library is accessible in the iife build (for CDN use)
// (window.Sozdev)
const libraryGlobalName = 'Sozdev'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginsConfig([
    vue(),
    vueJsx(),
    // @ts-expect-error Vue Bridge doesn't have a name value.
    vueBridge({
      vueVersion: '3',
      localizeDeps: true,
      useSwc: true,
      swcOptions: {
        env: { mode: 'usage' },
        jsc: {
          loose: true,
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
      },
    }),
  ]),

  build: buildConfig({ name: libraryGlobalName }),

  ...sharedConfig({
    resolve: {
      alias: {
        '~~': path.resolve(__dirname, '../..'),
        '~': path.resolve(__dirname, './src'),

        '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
      },
    },
  }),
})
