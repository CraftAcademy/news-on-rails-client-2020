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
      reponse: "fixture:sign_up.json"
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
    cy.get("#signup-message").should("contain", "Your registration was successful. Welcome to News on Rails!")
  })
})