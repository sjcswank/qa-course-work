const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e : {
        setupNodeEvents(on, config) {
            on('task', {

            });
            
            return config;
        },
    },
});