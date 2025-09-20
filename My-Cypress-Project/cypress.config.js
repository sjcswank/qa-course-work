
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

      return config;
    },
  },
});