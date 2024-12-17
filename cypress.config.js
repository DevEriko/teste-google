const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.google.com', // URL base do site
    video: false, // Desativa a gravação de vídeo
    screenshotsFolder: "cypress/screenshots", // Pasta para screenshots
    videosFolder: "cypress/videos", // Pasta para videos
    chromeWebSecurity: false, // Desativa a segurança do navegador para testes em contextos cruzados
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
