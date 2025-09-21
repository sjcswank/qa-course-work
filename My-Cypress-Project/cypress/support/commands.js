// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import signUpData from '../fixtures/signUp.json'
import deleteUserData from '../fixtures/deleteUser.json'
import loginData from '../fixtures/loginData.json'

Cypress.Commands.add('logAccessibilityViolations', (violations) => {
    // Log the number of violations found
    cy.task(
        'log',
        `${violations.length} accessibility violation${
            violations.length === 1 ? '' : 's'
        } detected`
    )
    // Iterate through the array of violation objects
    violations.forEach((violation) => {
        // Log the rule that failed
        cy.task('log', `\nRule: ${violation.id}`)
        // Log a link to the rule documentation for more info
        cy.task('log', `Documentation: ${violation.helpUrl}`)
        // Log the failing nodes for this rule
        cy.task('log', `Failing nodes:`)
        violation.nodes.forEach((node) => {
            cy.task('log', `  - ${node.target}`)
        })
    })
})

Cypress.Commands.add('create_user', (email, password) => { 
    cy.request({
        method: 'POST', 
        url: signUpData.SIGN_UP_URL, 
        form: true, 
        body: {
            email: email,
            password1: password,
            password2: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('delete_user', (email) => {
    cy.request({method: 'POST', 
        url: deleteUserData.DELETE_USER_URL, 
        form: false,
        body: {
            email: email
        }
    }).then((response) => {
        expect(response.body.Status).to.be.oneOf([200, 204])
        if (response.body.Status == 200)
            expect(response.body.email).eq(email)
    })
})

Cypress.Commands.add('login_user', (email, password) => {
    cy.request({
        method: 'POST', 
        url: loginData.LOGIN_URL, 
        form: true, 
        body: {
            email: email,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('submit_sign_up', (email, password1, password2) => {
  cy.get(signUpData.EMAIL_INPUT_SELECTOR).type(email)
  cy.get(signUpData.PASSWORD1_INPUT_SELECTOR).type(password1)
  cy.get(signUpData.PASSWORD2_INPUT_SELECTOR).type(password2)
  cy.get(signUpData.SUBMIT_BUTTON_SELECTOR).click()
})

Cypress.Commands.add('submit_login', (email, password) => { 
    cy.get(loginData.EMAIL_INPUT_SELECTOR).type(email)
    cy.get(loginData.PASSWORD_INPUT_SELECTOR).type(password)
    cy.get(loginData.SUBMIT_BUTTON_SELECTOR).click()
 })

