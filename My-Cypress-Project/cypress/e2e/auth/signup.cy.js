import signUpData from '../../fixtures/signUp.json'
import deleteUserData from '../../fixtures/deleteUser.json'

describe('Testing the sign-up page', () => {
//Test Data
  const USERS = [
    {test: 'QACW-04', email: signUpData.EMAIL, pass1: signUpData.PASSWORD, pass2: signUpData.NOT_MATCHED_PASSWORD, error: signUpData.PASSWORD_MATCH_ERROR},
    {test: 'QACW-05', email: signUpData.EMAIL, pass1: signUpData.INVALID_PASSWORD, pass2: signUpData.INVALID_PASSWORD, error: signUpData.INVALID_PASSWORD_ERROR},
    {test: 'QACW-06', email: signUpData.INVALID_EMAIL, pass1: signUpData.PASSWORD, pass2: signUpData.PASSWORD, error: signUpData.INVALID_EMAIL_ERROR}
  ]

//Functions
  const create_user = (email, pass1, pass2) => {
    //cy.xpath no longer supported, used for example only
    cy.xpath(signUpData.EMAIL_SELECTOR).type(email)
    cy.get(signUpData.PASSWORD_INPUT_SELECTOR).type(pass1)
    cy.get(signUpData.CONFIRM_PASSWORD_SELECTOR).type(pass2)
    cy.contains(signUpData.SUBMIT_BUTTON_SELECTOR).click()
  }
  
  beforeEach('Set up for the test', () => {
    cy.request('POST', deleteUserData.DELETE_USER_URL, {
      userId: 1
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204])
    }).then(() => {
      cy.visit(signUpData.SIGN_UP_URL)
    });
  });

  afterEach('Clean up after the test', () => {
    cy.request('POST', deleteUserData.DELETE_USER_URL, {
      userId: 1
    }).then((response) => {
      if (response.body.Status == 200)
        expect(response.body.userId).eq(1)
    })
  });

  it('QACW-01: Should display "User Created!" alert on Contacts page', function () {
    create_user(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    cy.get('body > div.alert.alert-success.alert-dismissible.fade.show').should('contain', 'User Created!')
    cy.get('title').should('contain', 'Contacts')
  })

  it('QACW-07: Should display "Email already in use." error alert.', function () {
    create_user(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    cy.get('#logout').click()
    cy.visit(signUpData.SIGN_UP_URL)
    create_user(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })

  it.each(USERS)((user) => `${user.test}: Should display "${user.error}" error alert.`, function (user) {
    create_user(user.email, user.pass1, user.pass2)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  })

  // USERS.forEach(user => {
  //   it(`${user.test}: Should display "${user.error}" error alert.`, function () {
  //     create_user(user.email, user.pass1, user.pass2)
  //     cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  //   })
  // })

});