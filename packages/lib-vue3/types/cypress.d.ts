declare module '@cypress/watch-preprocessor' {
  function watch(): (file: Cypress.FileObject) => string | Promise<string>

  export default watch
}
