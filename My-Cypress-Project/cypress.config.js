
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
     async setupNodeEvents(on, config) {

      return config;
    },
  },
});