const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'nu56tf',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://practicetestautomation.com",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
    experimentalPromptCommand: true,
  },
});
