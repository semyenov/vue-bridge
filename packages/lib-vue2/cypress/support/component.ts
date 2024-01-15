/// <reference types="./component.d.ts" />
import '~~/cypress/support/component.shared'

import { mount } from 'cypress/vue2'

Cypress.Commands.add('mount', (component, options = {}) => {
  // Add the VueRouter plugin
  // Vue.use(VueRouter)

  // Use the router passed in via options,
  // or the default one if not provided
  // options.router = options.router || router

  return mount(component, options)
})
