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

Cypress.Commands.add('login', (email, password) => { 
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
 })

