describe("Primary Nav Menu", () => {
  it("should open and close the menu", () => {
    cy.visit("/");

    // Open the menu
    cy.get("button[data-testid='nav-primary-menu-button']").click();
    cy.get("nav[data-testid='nav-primary-menu']").should("have.attr", "data-is-open", "true");

    // Close the menu
    cy.get("button[data-testid='nav-primary-menu-close-button']").click();
    cy.get("nav[data-testid='nav-primary-menu']").should("have.attr", "data-is-open", "false");
  });
});
