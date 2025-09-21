import loginData from '../../fixtures/loginData.json'

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
  
})