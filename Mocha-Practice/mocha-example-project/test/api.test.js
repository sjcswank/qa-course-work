const apiClient = require('../api');
const { expect } = require('chai');

describe('API Client Tests', () => {
    it('should fetch user data for a valid user id', async () => {
        const user = await apiClient.fetchUserData(1);
        expect(user).to.deep.equal({id: 1, name: 'John Doe'});
    });

    it('should throw an error for a user that does not exist', async () =>{
        try {
            await apiClient.fetchUserData(2);
        } catch (err) {
            expect(err.message).to.equal('User not found.');
        }
    });

    it('should throw an error for any other API issue', async ()    => {
        try {
            await apiClient.fetchUserData(999);
        } catch (err) {
            expect(err.message).to.equal('Network request failed.')
        }
    });
});