describe('Sign Up Page', () => {
  
  const SIGN_UP_URL = 'http://127.0.0.1:5000/sign-up'

  const EMAIL = 'test001@email.com'
  const INVALID_EMAIL = 'a@c'
  const PASSWORD = 'Test001'
  const INVALID_PASSWORD = 'Test'
  const NOT_MATCHED_PASSWORD = 'NotMatched'
  

  beforeEach('Navigate to Sign Up page and gather inputs', () => {

    cy.visit(SIGN_UP_URL)
    cy.get('#email').as('emailInput')
    cy.get('#password1').as('passwordInput')
    cy.get('#password2').as('confirmPasswordInput')
    cy.contains('Submit').as('submitButton')
  })
  

   const USERS = [
    {test: 'QACW-04', email: EMAIL, pass1: PASSWORD, pass2: NOT_MATCHED_PASSWORD, error: 'Passwords do not match.'},
    {test: 'QACW-05', email: EMAIL, pass1: INVALID_PASSWORD, pass2: INVALID_PASSWORD, error: 'Password must be at least 7 characters long.'},
    {test: 'QACW-06', email: INVALID_EMAIL, pass1: PASSWORD, pass2: PASSWORD, error: 'Email must be more than 3 characters.'}
  ]

  it.each(USERS)((user) => `${user.test}: Should display "${user.error}" error alert.`, function (user) {
    cy.get('@emailInput').type(user.email)
    cy.get('@passwordInput').type(user.pass1)
    cy.get('@confirmPasswordInput').type(user.pass2)
    cy.get('@submitButton').click()

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  })


    it('QACW-07: Should display "Email already in use." error alert.', function () {
    cy.get('@emailInput').type(EMAIL)
    cy.get('@passwordInput').type(PASSWORD)
    cy.get('@confirmPasswordInput').type(PASSWORD)
    cy.get('@submitButton').click()
    cy.get('#logout').click()

    cy.visit(SIGN_UP_URL)
    cy.get('#email').type(EMAIL)
    cy.get('#password1').type(PASSWORD)
    cy.get('#password2').type(PASSWORD)
    cy.contains('Submit').click()

    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })


  it('QACW-01: Should navigate to Contats page', function () {
    cy.get('@emailInput').type(EMAIL)
    cy.get('@passwordInput').type(PASSWORD)
    cy.get('@confirmPasswordInput').type(PASSWORD)
    cy.get('@submitButton').click()

    cy.get('title').should('contain', 'Contacts')
  })

})