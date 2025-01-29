/* eslint-disable no-undef */
describe("Check if create profile page renders the correct components", () => {
  

  beforeEach(() => {
    cy.visit("http://localhost:5173/cadastro");
  });

  it("should dsteps 1 and 2 works", () => {
    cy.get("input[type=\"text\"]").type("Testee Cypress");
    cy.get("input[type=\"email\"]").type("tester@test.com");
    cy.get("input[type=\"tel\"]").type("12354785");
    cy.get("button[type=\"submit\"]").click();
    cy.get("input[type=\"password\"]").type("@DNCReact22#");
    cy.get("button[type=\"submit\"]").should("be.visible");
  });
});

