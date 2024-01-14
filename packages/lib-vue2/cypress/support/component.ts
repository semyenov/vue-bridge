/// <reference types="./component.d.ts" />

/**
 * Set up any app code that should run once per file for the
 * Vue 2 app. For example, the mount command for Cypress is different
 * because it imports a Vue 2-only version of Vue Test Utils.
 *
 * Common code should be imported from the root of the project.
 */

import '../../../../cypress/support/component.shared'

/**
 * Example usage of cy.mount can be found at https://on.cypress.io/component
 * We prefer to use JSX syntax which looks like this:
 *
 * cy.mount(() => <MyComponent myProp={someVariable}/>)
 */

import { mount } from 'cypress/vue2'

// import VueRouter from 'vue-router'

// import { router } from '../../src/router'

Cypress.Commands.add('mount', (component, options = {}) => {
  // Add the VueRouter plugin
  // Vue.use(VueRouter)

  // Use the router passed in via options,
  // or the default one if not provided
  // options.router = options.router || router

  return mount(component, options)
})
