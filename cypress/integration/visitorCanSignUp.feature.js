describe("user can Sign up", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    })

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:signup_response.json" 
    })
    cy.visit("/")
  })

  it("by registrating with valid credentials", () => {
    cy.get("#header-signup").click();
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("registered@mail.com");
      cy.get("#password").type("password");
      cy.get("#password-confirmation").type("password")
      cy.get("#signup-submit").click();
    });
    cy.get("#welcome").should("contain", "Hey registered@mail.com, have a great read!")
  })
})