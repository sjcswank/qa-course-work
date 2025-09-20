import authData from '../../fixtures/authData.json'
import deleteUserData from '../../fixtures/deleteUser.json'

describe('Testing the delete-user endpoint', () => {

    it('Should delete the user', () => {
        cy.create_user(authData.EMAIL, authData.PASSWORD)
        cy.request({
            method: 'POST', 
            url: deleteUserData.DELETE_USER_URL, 
            body: {
                email: authData.EMAIL
                }
        }).then((response) => {
            expect(response.body.Status).eq(200)
            expect(response.body.email).eq(authData.EMAIL)
        })
    })

    it('Should return no user to delete', () => {
        cy.request({
            method: 'POST', 
            url: deleteUserData.DELETE_USER_URL, 
            body: {
                email: deleteUserData.INCORRECT_EMAIL
                }
        }).then((response) => {
            expect(response.body.Status).eq(204)
            expect(response.body.email).eq(null)
        })
    })

})