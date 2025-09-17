import data from '../../fixtures/signup.json'

describe('Sign Up Page', () => {
//Test Data
  const USERS = [
    {test: 'QACW-04', email: data.EMAIL, pass1: data.PASSWORD, pass2: data.NOT_MATCHED_PASSWORD, error: data.PASSWORD_MATCH_ERROR},
    {test: 'QACW-05', email: data.EMAIL, pass1: data.INVALID_PASSWORD, pass2: data.INVALID_PASSWORD, error: data.INVALID_PASSWORD_ERROR},
    {test: 'QACW-06', email: data.INVALID_EMAIL, pass1: data.PASSWORD, pass2: data.PASSWORD, error: data.INVALID_EMAIL_ERROR}
  ]

//Functions
  const create_user = (email, pass1, pass2) => {
    //cy.xpath no longer supported, used for example only
    cy.xpath(data.EMAIL_SELECTOR).type(email)
    cy.get(data.PASSWORD_INPUT_SELECTOR).type(pass1)
    cy.get(data.CONFIRM_PASSWORD_SELECTOR).type(pass2)
    cy.contains(data.SUBMIT_BUTTON_SELECTOR).click()
  }
  
  beforeEach('Set up for the test', () => {
    // 1. Kill any running server and delete previous test data
    cy.task('killSystemUnderTest').then(() => {
      return cy.task('forceDeleteTestData')
    }).then(() => {
      // 2. Start a brand new server
      return cy.task('startSystemUnderTest')
    }).then(() => {
      // 3. Navigate to the Sing Up page
      cy.visit(data.SIGN_UP_URL)
    });
  });

  afterEach('Clean up after the test', () => {
    // 1. Disconnect the browser
    cy.visit('/', { failOnStatusCode: false })
    // 2. Stop the server after each test completes
    cy.task('killSystemUnderTest').then(() => {
      // 3. Delete data after the server is stopped
      return cy.task('forceDeleteTestData')
    });
  });

  it('QACW-01: Should display "User Created!" alert on Contacts page', function () {
    create_user(data.EMAIL, data.PASSWORD, data.PASSWORD)
    cy.get('body > div.alert.alert-success.alert-dismissible.fade.show').should('contain', 'User Created!')
    cy.get('title').should('contain', 'Contacts')
  })

  it('QACW-07: Should display "Email already in use." error alert.', function () {
    create_user(data.EMAIL, data.PASSWORD, data.PASSWORD)
    cy.get('#logout').click()
    cy.visit(data.SIGN_UP_URL)
    create_user(data.EMAIL, data.PASSWORD, data.PASSWORD)
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