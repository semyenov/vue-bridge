import Counter from '~/components/Counter/Counter'

describe('<Counter />', () => {
  it('renders', () => {
    cy.mount(() => <Counter max={10} min={0} />)
      .get('.counter-buttons')
      .children()
      .as('buttons')

    cy.get('.counter-display')
      .as('display')

    cy.get('@buttons')
      .eq(0)
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()

    cy.get('@buttons')
      .eq(1)
      .click()
      .click()

    cy.get('@display')
      .should('have.text', '4')
  })
})
