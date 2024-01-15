/**
 * Add Vue-agnostic support code here.
 * For example: UnoCSS, Percy, Cypress browser-side plugins.
 */
import consola from 'consola'

export const logger = consola.withTag('shared')
logger.debug('Shared support code loaded')
