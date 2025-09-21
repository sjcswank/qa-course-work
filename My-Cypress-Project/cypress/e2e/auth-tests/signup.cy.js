import signUpData from '../../fixtures/signUpData.json'

describe('Sign Up Page Tests', () => {

// Shared Variables
  let createdUserEmail = ''

// Test Data
  const USERS = [
    {test: 'QACW-04: Submitting the form with unmatched passwords', email: signUpData.EMAIL, pass1: signUpData.PASSWORD, pass2: signUpData.NOT_MATCHED_PASSWORD, error: signUpData.PASSWORD_MATCH_ERROR},
    {test: 'QACW-05: Submitting the form with invalid passwords', email: signUpData.EMAIL, pass1: signUpData.INVALID_PASSWORD, pass2: signUpData.INVALID_PASSWORD, error: signUpData.INVALID_PASSWORD_ERROR},
    {test: 'QACW-06: Submitting the form with invalid email', email: signUpData.INVALID_EMAIL, pass1: signUpData.PASSWORD, pass2: signUpData.PASSWORD, error: signUpData.INVALID_EMAIL_ERROR}
  ]
  
  beforeEach('Set up for the test', function() {
    cy.delete_user(createdUserEmail).then(() => {
      cy.visit(signUpData.SIGN_UP_URL)
    })
  })

  afterEach('Clean up after the test', function() {
    cy.delete_user(createdUserEmail)
  })

  it(`QACW-01: Submitting the form with valid data should display "Welcome, ${signUpData.EMAIL}!" alert on Contacts page`, function () {
    cy.submit_sign_up(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    createdUserEmail = signUpData.EMAIL
    cy.get('.alert.alert-success.show').should('contain', 'Welcome, ' + signUpData.EMAIL + '!')
    cy.get('title').should('contain', 'Contacts')
  })

  it('QACW-07: Submitting the form with a valid registered email should display "Email already in use." error alert.', function () {
    cy.submit_sign_up(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    createdUserEmail = signUpData.EMAIL
    cy.get('#logout').click()
    cy.visit(signUpData.SIGN_UP_URL)
    cy.submit_sign_up(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    cy.get('.alert.alert-danger.show').should('contain', 'Email already in use.')
  })

  it('QACW-08: Submitting the form with no data should display "Email must be more than 3 characters." error alert.', function () {
    cy.get(signUpData.SUBMIT_BUTTON_SELECTOR).click()
    createdUserEmail = ''
    cy.get('.alert.alert-danger.show').should('contain', 'Email must be more than 3 characters.')
  })

  it.each(USERS)((user) => `${user.test} should display "${user.error}" error alert.`, function (user) {
    cy.submit_sign_up(user.email, user.pass1, user.pass2)
    createdUserEmail = user.email
    cy.get('.alert.alert-danger.show').should('contain', user.error)
  })
  
  // USERS.forEach(user => {
  //   it(`${user.test}: Should display "${user.error}" error alert.`, function () {
  //     cy.sign_up_user(user.email, user.pass1, user.pass2)
  //     cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  //   })
  // })

});