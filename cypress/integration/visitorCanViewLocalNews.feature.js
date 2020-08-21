const stubLocation = require("../support/stubLocation");

describe("visitors can veiw articles ", () => {
  context('based on sweden location', () => {
    before(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles?latitude=60&longitude=18",
        response: "fixture:sweden_articles.json"
      })
      cy.visit("/", stubLocation({
        latitude: 60, 
        longitude: 18,
      }));

    })
   
    it('Visitors can see which different version of local news', () => {
      cy.get("#current-position").should('contain', "Local News From Sweden")
    })

    it("Visitors can see article one", () => {
      cy.get("#article-1").within(() => {
        cy.get("#title").should("contain", "Scrum God");
        cy.get("#lead").should("contain", "God of all coharts");
      });
    });

    it("Visitors can see list article two", () => {
      cy.get("#article-2").within(() => {
        cy.get("#title").should("contain", "Sad Campers");
        cy.get("#lead").should("contain", "Sad campers is always a losers");
      });
    });
  })
})