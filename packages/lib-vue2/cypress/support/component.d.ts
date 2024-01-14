/// <reference types="cypress" />

import type { mount } from 'cypress/vue2'

// import VueRouter from 'vue-router'

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1] // & { router?: VueRouter }

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: any, options?: OptionsParam): Chainable<any>
    }
  }
}
