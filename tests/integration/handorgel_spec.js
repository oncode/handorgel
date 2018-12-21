describe('Handorgel', () => {
  it('should load', () => {
    cy.visit('/')
    cy.contains('handorgel')
  })

  it('should autofocus', function() {
    expect(true).to.equal(false)
  })

  it('should open on click', function() {
    cy.get('.handorgel__header__button').first().click()
  })

})
