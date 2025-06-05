describe("Primary Nav Menu", () => {
  it(`should visit 'default' theme`, () => {
    cy.visit("/");
    cy.get("button[data-testid='nav-primary-menu-button']").click();
    cy.get("nav[data-testid='nav-primary-menu']").should("have.attr", "data-is-open", "true");
    cy.get(`a[href='/theme/default']`).click();
    cy.url().should("include", `/theme/default`);
  });
});
