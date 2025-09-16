describe('Sign Up Page', () => {
//Sign Up page data
  const SIGN_UP_URL = 'http://127.0.0.1:5000/sign-up'
  const EMAIL_SELECTOR = '#email'
  const PASSWORD_INPUT_SELECTOR = '#password1'
  const CONFIRM_PASSWORD_SELECTOR = '#password2'
  const SUBMIT_BUTTON_SELECTOR = 'Submit'

//Test Data
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

//Functions
  const create_user = (email, pass1, pass2) => {
    cy.get('@emailInput').type(email)
    cy.get('@passwordInput').type(pass1)
    cy.get('@confirmPasswordInput').type(pass2)
    cy.contains(SUBMIT_BUTTON_SELECTOR).click()
  }
  
  
  beforeEach('Set up for the test', () => {
    // 1. Kill any running server and delete previous test data
    cy.task('killPythonProcess').then(() => {
      return cy.task('forceDeleteTestData');
    }).then(() => {
      // 2. Start a brand new server
      return cy.task('startSystemUnderTest');
    }).then(() => {
      // 3. Visit the page and alias elements
      cy.visit(SIGN_UP_URL);
      cy.get(EMAIL_SELECTOR).as('emailInput');
      cy.get(PASSWORD_INPUT_SELECTOR).as('passwordInput');
      cy.get(CONFIRM_PASSWORD_SELECTOR).as('confirmPasswordInput');
    });
  });

  afterEach('Clean up after the test', () => {
    // 1. Disconnect the browser
    cy.visit('/', { failOnStatusCode: false });
    // 2. Stop the server after each test completes
    cy.task('killPythonProcess').then(() => {
      // 3. Delete data after the server is stopped
      return cy.task('forceDeleteTestData');
    });
  });

  it('QACW-01: Should navigate to Contats page', function () {
    create_user(EMAIL, PASSWORD, PASSWORD)
    cy.get('title').should('contain', 'Contacts')
  })


  it('QACW-07: Should display "Email already in use." error alert.', function () {
    create_user(EMAIL, PASSWORD, PASSWORD)
    cy.get('#logout').click()
    cy.visit(SIGN_UP_URL)
    create_user(EMAIL, PASSWORD, PASSWORD)
    cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', 'Email already in use.')
  })

  USERS.forEach(user => {
    it(`${user.test}: Should display "${user.error}" error alert.`, function () {
      create_user(user.email, user.pass1, user.pass2)
      cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
    })
  })

  // it.each(USERS)((user) => `${user.test}: Should display "${user.error}" error alert.`, function (user) {
  //   create_user(user.email, user.pass1, user.pass2)
  //   cy.get('body > div.alert.alert-danger.alert-dismissible.fade.show').should('contain', user.error)
  // })

});