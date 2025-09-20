import signUpData from '../../fixtures/signUp.json'
import deleteUserData from '../../fixtures/deleteUser.json'
import authData from '../../fixtures/authData.json'

describe('Testing the sign-up page', () => {
// Shared Variables
  let createdUserEmail = ''
// Test Data
  const USERS = [
    {test: 'QACW-04', email: authData.EMAIL, pass1: authData.PASSWORD, pass2: signUpData.NOT_MATCHED_PASSWORD, error: signUpData.PASSWORD_MATCH_ERROR},
    {test: 'QACW-05', email: authData.EMAIL, pass1: authData.INVALID_PASSWORD, pass2: authData.INVALID_PASSWORD, error: signUpData.INVALID_PASSWORD_ERROR},
    {test: 'QACW-06', email: authData.INVALID_EMAIL, pass1: authData.PASSWORD, pass2: authData.PASSWORD, error: signUpData.INVALID_EMAIL_ERROR}
  ]
  
// Functions
const sign_up_user = (email, password1, password2) => {
  cy.get(signUpData.EMAIL_INPUT_SELECTOR).type(email)
  cy.get(signUpData.PASSWORD1_INPUT_SELECTOR).type(password1)
  cy.get(signUpData.PASSWORD2_INPUT_SELECTOR).type(password2)
  cy.get(signUpData.SUBMIT_BUTTON_SELECTOR).click()
}
  
  beforeEach('Set up for the test', function() {
    cy.delete_user(createdUserEmail).then(() => {
      cy.visit(signUpData.SIGN_UP_URL)
    })
  })

  afterEach('Clean up after the test', function() {
    cy.delete_user(createdUserEmail)
  })

  it(`QACW-01: Should display "Welcome, ${authData.EMAIL}!" alert on Contacts page`, function () {
    sign_up_user(authData.EMAIL, authData.PASSWORD, authData.PASSWORD)
    createdUserEmail = authData.EMAIL
    cy.get('.alert.alert-success.show').should('contain', 'Welcome, ' + authData.EMAIL + '!')
    cy.get('title').should('contain', 'Contacts')
  })

  it('QACW-07: Should display "Email already in use." error alert.', function () {
    sign_up_user(authData.EMAIL, authData.PASSWORD, authData.PASSWORD)
    createdUserEmail = authData.EMAIL
    cy.get('#logout').click()
    cy.visit(signUpData.SIGN_UP_URL)
    sign_up_user(authData.EMAIL, authData.PASSWORD, authData.PASSWORD)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })

  it.each(USERS)((user) => `${user.test}: Should display "${user.error}" error alert.`, function (user) {
    sign_up_user(user.email, user.pass1, user.pass2)
    createdUserEmail = user.email
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  })

  // USERS.forEach(user => {
  //   it(`${user.test}: Should display "${user.error}" error alert.`, function () {
  //     create_user(user.email, user.pass1, user.pass2)
  //     cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  //   })
  // })

});