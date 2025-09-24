const apiClient = {
    fetchUserData : async (userId) => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if (userId == 1) {
                    resolve({id: 1, name: 'John Doe'})
                } else if (userId == 2) {
                    reject(new Error('User not found.'))
                } else {
                    reject(new Error('Network request failed.'))
                }
            }, 50);
        });
    }
};

module.exports = apiClient;