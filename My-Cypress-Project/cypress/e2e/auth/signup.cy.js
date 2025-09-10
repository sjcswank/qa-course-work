describe('QACW-01: Create new user', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5000/sign-up')
    const email = cy.get('#email')
    const password = cy.get('#password1')
    const confirmPassword = cy.get('#password2')
    const submit = cy.get('#submit')

    email.type('test002@email.com')
    password.type('Test002')
    confirmPassword.type('Test002')
    submit.click()

    cy.get('head > title').should('contain', 'Contacts')
  })
})

Cypress.stop()