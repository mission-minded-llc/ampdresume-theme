const config = {
  e2e: {
    supportFile: "./cypress/support/e2e.js",
    baseUrl: "http://localhost:3000",
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    },
    chromeWebSecurity: false,
    specPattern: "./cypress/**/*.cy.js",
  },
};

export default config;
