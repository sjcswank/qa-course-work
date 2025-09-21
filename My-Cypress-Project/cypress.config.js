
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
     async setupNodeEvents(on, config) {
      require("cypress-terminal-report/src/installLogsPrinter")(on, {
        printLogsToConsole: "always",
        printLogsToFile: "always",
        outputRoot: config.projectRoot + "/cypress/results",
        outputTarget: {
          "cypress-terminal-report.txt": "txt",
          "cypress-terminal-report.json": "json",
        },
      });

      on('task', {
        // Log a message to the terminal
        log(message) {
          console.log(message);
          return null;
        },
        // Log a table to the terminal
        table(message) {
          console.table(message);
          return null;
        }
      });

      return config;
    },
  },
});