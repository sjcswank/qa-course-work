describe('Sign Up Page', () => {
  const EMAIL = 'test001@email.com'
  const INVALID_EMAIL = 'a@c'
  const PASSWORD = 'Test001'
  const INVALID_PASSWORD = 'Test'
  const NOT_MATCHED_PASSWORD = 'NotMatched'
  

  beforeEach('Navigate to Sign Up page and gather inputs', () => {

    cy.visit('http://127.0.0.1:5000/sign-up')
    cy.get('#email').as('emailInput')
    cy.get('#password1').as('passwordInput')
    cy.get('#password2').as('confirmPasswordInput')
    cy.contains('Submit').as('submitButton')
  })
  
  it('QACW-04: Should display "Passwords do no match." error alert.', function () {
    cy.wrap(this.emailInput).type(EMAIL)
    cy.wrap(this.passwordInput).type(PASSWORD)
    cy.wrap(this.confirmPasswordInput).type(NOT_MATCHED_PASSWORD)
    cy.wrap(this.submitButton).click()

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Passwords do not match.')
  })

  it('QACW-05: Should display "Password must be at least 7 characters long." error alert.', function () {
    cy.wrap(this.emailInput).type(EMAIL)
    cy.wrap(this.passwordInput).type(INVALID_PASSWORD)
    cy.wrap(this.confirmPasswordInput).type(INVALID_PASSWORD)
    cy.wrap(this.submitButton).click()

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Password must be at least 7 characters long.')
  })

  it('QACW-06: Should display "Email must be more than 3 characters long." error alert.', function () {
    cy.wrap(this.emailInput).type(INVALID_EMAIL)
    cy.wrap(this.passwordInput).type(PASSWORD)
    cy.wrap(this.confirmPasswordInput).type(PASSWORD)
    cy.wrap(this.submitButton).click()

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email must be more than 3 characters.')
  })

  it('QACW-01: Should navigate to Contats page', function () {
    cy.wrap(this.emailInput).type(EMAIL)
    cy.wrap(this.passwordInput).type(PASSWORD)
    cy.wrap(this.confirmPasswordInput).type(PASSWORD)
    cy.wrap(this.submitButton).click()

    cy.url().should('eq', 'http://127.0.0.1:5000/')
  })

  it('QACW-07: Should display "Email already in use." error alert.', function () {
    cy.wrap(this.emailInput).type(EMAIL)
    cy.wrap(this.passwordInput).type(PASSWORD)
    cy.wrap(this.confirmPasswordInput).type(PASSWORD)
    cy.wrap(this.submitButton).click()
    cy.get('#LogOut').click()

    cy.visit('http://127.0.0.1:5000/sign-up')
    cy.get('#email').type(EMAIL)
    cy.get('#password1').type(PASSWORD)
    cy.get('#password2').type(PASSWORD)
    cy.contains('Submit').click

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })

})