/// <reference types="./component.d.ts" />

/**
 * Set up any app code that should run once per file for the
 * Vue 3 app. For example, the mount command for Cypress is different
 * because it imports a Vue 3-only version of Vue Test Utils.
 *
 * Common code should be imported from the root of the project.
 */

import '~~/cypress/support/component.shared'

/**
 * Example usage of cy.mount can be found at https://on.cypress.io/component
 * We prefer to use JSX syntax which looks like this:
 *
 * cy.mount(() => <MyComponent myProp={someVariable}/>)
 */

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
  }

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      app.use(options.router!)
    },
  })

  return mount(component, options)
})
