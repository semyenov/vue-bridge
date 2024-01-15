import '~~/cypress/support/component.shared'

import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'index',
          component,
        },
      ],
    })

    // Add router plugin
    options.global.plugins.push({
      install: app => app.use(options.router!),
    })
  }

  return mount(component, options)
})
