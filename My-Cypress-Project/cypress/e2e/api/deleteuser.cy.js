import deleteUserData from '../../fixtures/deleteUser.json'

describe('Testing the delete-user endpoint', () => {

    beforeEach('Set up test', () => {
        cy.request({
            method: 'POST', 
            url: deleteUserData.SIGN_UP_URL, 
            form: true, 
            body: {
                email: deleteUserData.EMAIL,
                password1: deleteUserData.PASSWORD,
                password2: deleteUserData.PASSWORD
            }
        })
    })

    afterEach('Clean up after test', () => {
        cy.request('POST', deleteUserData.DELETE_USER_URL, {
            userId: 1
        }).then((response) => {
            if (response.body.Status == 200)
                expect(response.body.userId).eq(1)
        })
    })

    it('Should delete the user', () => {
        cy.request({
            method: 'POST', 
            url: deleteUserData.DELETE_USER_URL, 
            body: {
                userId: 1
                }
        }).then((response) => {
            expect(response.body.Status).eq(200)
            expect(response.body.userId).eq(1)
        })
    })

    it('Should return no user to delete', () => {
        cy.request({
            method: 'POST', 
            url: deleteUserData.DELETE_USER_URL, 
            body: {
                userId: 2
                }
        }).then((response) => {
            expect(response.body.Status).eq(204)
            expect(response.body.userId).eq(null)
        })
    })

})