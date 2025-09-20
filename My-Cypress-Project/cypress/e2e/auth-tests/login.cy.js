
import loginData from '../../fixtures/loginData.json'

describe('Login Page Tests', () => {

    beforeEach(() => {
        cy.create_user(loginData.EMAIL, loginData.PASSWORD)
        cy.visit(loginData.LOGIN_URL)
        cy.get('title').should('contain', 'Login')
    })

    afterEach(() => {
        cy.get('body').then($body => {
            if ($body.find('#logout').length) {
                cy.get('#logout').click()
                cy.get('title').should('contain', 'Login')
            }
        })
        cy.delete_user(loginData.EMAIL)
    })

    it(`QACW-02: Submitting the form with valid data should display "Welcome back, ${loginData.EMAIL}!" alert on Contacts page`, () => {
        cy.submit_login(loginData.EMAIL, loginData.PASSWORD)
        cy.get('.alert.alert-success.show').should('contain', 'Welcome back, ' + loginData.EMAIL + '!')
        cy.get('title').should('contain', 'Contacts')
        cy.get('#logout').click()
        cy.get('title').should('contain', 'Login')
    })

    it(`QACW-09: Submitting the form with unregistered email should display "${loginData.INVALID_EMAIL_ERROR}" error alert.`, () => {
        cy.submit_login(loginData.UNREGISTERED_EMAIL, loginData.PASSWORD)
        cy.get('.alert.alert-danger.show').should('contain', loginData.INVALID_EMAIL_ERROR)
        cy.get('title').should('contain', 'Login')
    })

    it(`QACW-10: Submitting the form with incorrect password should display "${loginData.INCORRECT_PASSWORD_ERROR}" error alert.`, () => {
        cy.submit_login(loginData.EMAIL, loginData.INCORRECT_PASSWORD)
        cy.get('.alert.alert-danger.show').should('contain', loginData.INCORRECT_PASSWORD_ERROR)
        cy.get('title').should('contain', 'Login')
    })

    it(`QACW-11: Submitting the form with no data should display "${loginData.INVALID_EMAIL_ERROR}" error alert.`, () => {
        cy.get(loginData.SUBMIT_BUTTON_SELECTOR).click()
        cy.get('.alert.alert-danger.show').should('contain', loginData.INVALID_EMAIL_ERROR)
        cy.get('title').should('contain', 'Login')
    })
})