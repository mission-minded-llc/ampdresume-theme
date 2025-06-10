describe("Homepage", () => {
  it("should load the homepage", () => {
    cy.visit(Cypress.env("BASE_URL") || "/");
    cy.contains("h1", "Amp'd Resume Themes").should("be.visible");
  });
});
