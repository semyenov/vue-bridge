import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { vueBridge } from '@vue-bridge/vite-plugin'
import { defineConfig } from 'vite'

import { buildConfig, pluginsConfig, sharedConfig } from '../../vite.config.shared'

// This is the name of the global you library is accessible in the iife build (for CDN use)
// (window.SozdevLegacy)
const libraryGlobalName = 'SozdevLegacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginsConfig([
    vue(),
    vueJsx(),
    // @ts-expect-error Vue Bridge doesn't have a name value.
    vueBridge({
      vueVersion: '2',
      localizeDeps: true,
      useSwc: true,
      swcOptions: {
        env: {
          mode: 'usage',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          loose: true,
        },
      },
    }),
  ]),
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  build: buildConfig({
    name: libraryGlobalName,
  }),
  ...sharedConfig(),
})
