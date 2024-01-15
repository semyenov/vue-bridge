import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import watch from '@cypress/watch-preprocessor'
import { defineConfig } from 'cypress'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  projectId: '4ajp7g',

  component: {
    indexHtmlFile: resolve(__dirname, '../../cypress/support/component-index.html'),
    supportFile: resolve(__dirname, './cypress/support/component.ts'),
    devServer: { bundler: 'vite', framework: 'vue', viteConfig: { configFile: '../vite.config.ts' } },
  },

  e2e: {
    setupNodeEvents(on, _config) {
      // implement node event listeners here
      on('file:preprocessor', watch())
    },
  },
})
