describe('Sign Up Page', () => {
  
  const SIGN_UP_URL = 'http://127.0.0.1:5000/sign-up'

  const EMAIL = 'test001@email.com'
  const INVALID_EMAIL = 'a@c'
  const PASSWORD = 'Test001'
  const INVALID_PASSWORD = 'Test'
  const NOT_MATCHED_PASSWORD = 'NotMatched'

  const USERS = [
    {test: 'QACW-04', email: EMAIL, pass1: PASSWORD, pass2: NOT_MATCHED_PASSWORD, error: 'Passwords do not match.'},
    {test: 'QACW-05', email: EMAIL, pass1: INVALID_PASSWORD, pass2: INVALID_PASSWORD, error: 'Password must be at least 7 characters long.'},
    {test: 'QACW-06', email: INVALID_EMAIL, pass1: PASSWORD, pass2: PASSWORD, error: 'Email must be more than 3 characters.'}
  ]

  const create_user = (email, pass1, pass2) => {
    cy.get('@emailInput').type(email)
    cy.get('@passwordInput').type(pass1)
    cy.get('@confirmPasswordInput').type(pass2)
    cy.get('@submitButton').click()
  }
  
  // TODO: create clean up finction to end the sys under test, delete saved data from previous tests, and restart sys under test.

  beforeEach('Navigate to Sign Up page and gather inputs', () => {
    cy.visit(SIGN_UP_URL)
    cy.get('#email').as('emailInput')
    cy.get('#password1').as('passwordInput')
    cy.get('#password2').as('confirmPasswordInput')
    cy.contains('Submit').as('submitButton')
  })
  

  it.each(USERS)((user) => `${user.test}: Should display "${user.error}" error alert.`, function (user) {
    create_user(user.email, user.pass1, user.pass2)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  })


  it('QACW-01: Should navigate to Contats page', function () {
    create_user(EMAIL, PASSWORD, PASSWORD)
    cy.get('title').should('contain', 'Contacts')
  })


  it('QACW-07: Should display "Email already in use." error alert.', function () {
    // User created in previous test. Un-comment once clean up function has been created.
    // create_user(EMAIL, PASSWORD, PASSWORD)
    // cy.get('#logout').click()
    // cy.visit(SIGN_UP_URL)
    create_user(EMAIL, PASSWORD, PASSWORD)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })

})