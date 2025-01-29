/* eslint-disable no-undef */
describe("Login Flow Correct Credentials", () => {
  

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should login with valid credentials", () => {
    cy.get("input[type=\"email\"]").type("teste22@dnc.com.br");
    cy.get("input[type=\"password\"]").type("@DNCReact22#");
    cy.get("button[type=\"submit\"]").click();
    cy.url().should("include", "/home");
    cy.get("header").should("be.visible");
    cy.wait(2000);
  });
});


describe("Login Flow Invalid Credentials", () => {
  

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login form", () => {
    cy.get("form").should("be.visible");
  });

  it("should login with invalid credentials", () => {
    cy.get("input[type=\"email\"]").type("tesddte22@dnc.com.br");
    cy.get("input[type=\"password\"]").type("@DNCReasct22#");
    cy.get("button[type=\"submit\"]").click();
    cy.contains("Email e/ou senha invalidos").should("be.visible");
    cy.wait(2000);
  });
});