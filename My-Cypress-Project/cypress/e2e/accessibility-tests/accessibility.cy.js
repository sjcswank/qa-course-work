import loginData from '../../fixtures/loginData.json'
import signUpData from '../../fixtures/signUpData.json'

describe('Accessibility Tests', () => {

  // Functions
  function checkA11y(
  scope = null, 
  options = {runOnly: {type: 'tag', values: ['wcag21a', 'wcag21aa', 'best-practice']}}, 
  violationCallback = cy.logAccessibilityViolations, 
  skipFailures = true) {
    cy.checkA11y(
      scope, 
      options, 
      violationCallback, 
      skipFailures
    )
  }

  it('should meet WCAG2.1A and WCAG2.1AA guidelines and accessibility best practices on the Login page', () => {
    cy.visit(loginData.LOGIN_URL);
    cy.injectAxe()
    // Initial check
    checkA11y()
    // Submit empty form and check
    cy.get(loginData.SUBMIT_BUTTON_SELECTOR).click()
    cy.injectAxe()
    checkA11y()
    // Submit form with unregistered email and check
    cy.submit_login(loginData.UNREGISTERED_EMAIL, loginData.PASSWORD)
    cy.injectAxe()
    checkA11y()
    // Submit form with incorrect password and check
    cy.submit_login(loginData.EMAIL, loginData.INCORRECT_PASSWORD)
    cy.injectAxe()
    checkA11y()
  })

  it('should meet WCAG2.1A and WCAG2.1AA guidelines and accessibility best practices on the Sign Up page', () => {
    cy.visit(signUpData.SIGN_UP_URL);
    cy.injectAxe()
    // Initial check
    checkA11y()
    // Submit empty form and check
    cy.get(signUpData.SUBMIT_BUTTON_SELECTOR).click()
    cy.injectAxe()
    checkA11y()
    // Submit form with invalid email and check
    cy.submit_sign_up(signUpData.INVALID_EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
    cy.injectAxe()
    checkA11y()
    // Submit form with mismatched passwords and check
    cy.submit_sign_up(signUpData.EMAIL, signUpData.PASSWORD, signUpData.NOT_MATCHED_PASSWORD)
    cy.injectAxe()
    checkA11y()
    // Submit form with invalid password and check
    cy.submit_sign_up(signUpData.EMAIL, signUpData.INVALID_PASSWORD, signUpData.INVALID_PASSWORD)
    cy.injectAxe()
    checkA11y()
    // Submit form with already registered email and check
    cy.create_user(signUpData.EMAIL, signUpData.PASSWORD)
    .then(() => {
      cy.submit_sign_up(signUpData.EMAIL, signUpData.PASSWORD, signUpData.PASSWORD)
      cy.injectAxe()
      checkA11y()
      // Clean up
      cy.delete_user(signUpData.EMAIL)
    })
  })
  
})