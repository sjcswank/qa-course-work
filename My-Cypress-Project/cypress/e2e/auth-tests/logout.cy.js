import loginData from '../../fixtures/loginData.json';

describe('Logout Functionality', () => {

    beforeEach(() => {
        cy.delete_user(loginData.EMAIL).then(() => {
            cy.create_user(loginData.EMAIL, loginData.PASSWORD)
        }).then(() => {
            cy.login_user(loginData.EMAIL, loginData.PASSWORD)
        })
        cy.visit("http://127.0.0.1:5000/")
        cy.get('title').should('contain', 'Contacts')
    })

    afterEach(() => {
        cy.delete_user(loginData.EMAIL);
    })

    it('should log out successfully and redirect to login page', () => {
        cy.get('a[href="/logout"]').click();
        cy.url().should('include', '/login');
        cy.get('title').should('contain', 'Login')
    })
})