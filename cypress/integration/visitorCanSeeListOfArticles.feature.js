describe("Vistors can see list of Articles", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });
    cy.visit("/");
  });
  it("Visitors can see article one", () => {
    cy.get("#article-1").within(() => {
      cy.get("#title").should("contain", "Scrum Lord");
      cy.get("#lead").should("contain", "Lord of all coharts");
      cy.get("button").should("contain", "Read more").click();
    });
  });

  it("Visitors can see list article two", () => {
    cy.get("#article-2").within(() => {
      cy.get("#title").should("contain", "Happy Campers");
      cy.get("#lead").should("contain", "Happy campers is always a winner");
      cy.get("button").should("contain", "Read more").click();
    });
  });

  it("Visitors can see list article three", () => {
    cy.get("#article-4").within(() => {
      cy.get("#title").should("contain", "Bright Future");
      cy.get("#lead").should(
        "contain",
        "A good scrum lord will lead us to a bright future."
      );
      cy.get("button").should("contain", "Read more").click();
    });
  });
});