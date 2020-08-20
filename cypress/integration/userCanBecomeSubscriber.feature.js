describe("user can become subscriber", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login_response.json",
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login_response.json",
    });

    cy.visit("/");
    cy.get("#header-login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("registered@mail.com");
      cy.get("#password").type("password");
      cy.get("#login-submit").click();
    });


  });


  context("successfully", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/subscriptions",
        response: {
          paid: true,
          message: "Successful payment, you are now a subscriber",
        },
      });
    })

    it("by clicking on subscribe button", () => {
      cy.get("#become-subscriber").click();
      cy.get('form[id="payment-form"]')
        .should("exist")
        .within(() => {
          cy.wait(1000);
          cy.get('iframe[name^="__privateStripeFrame5"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type("4242424242424242", { delay: 50 });
          });
          cy.get('iframe[name^="__privateStripeFrame6"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type("1222", { delay: 10 });
          });

          cy.get('iframe[name^="__privateStripeFrame7"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find('input[name="cvc"]').type("999", { delay: 10 });
          });
        });

      cy.get("#submit-payment").click();

      cy.get("#response-message").should(
        "contain",
        "Successful payment, you are now a subscriber"
      );
      cy.get("#back-to-root-path").click();
      cy.url().should("eq", "http://localhost:3001/");
    });
  });

  context("unsuccessfully", () => {
    before(()=>{
      cy.server();
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/subscriptions",
        response: {
          message: "Something went wrong!",
        },
        status: 422
      });
    })
    it("with declined card ", () => {
      cy.get("#become-subscriber").click();
      cy.get('form[id="payment-form"]')
        .should("exist")
        .within(() => {
          cy.wait(1000);
          cy.get('iframe[name^="__privateStripeFrame5"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type("4000000000000002", { delay: 50 });
          });
          cy.get('iframe[name^="__privateStripeFrame6"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type("1222", { delay: 10 });
          });

          cy.get('iframe[name^="__privateStripeFrame7"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body).find('input[name="cvc"]').type("999", { delay: 10 });
          });
        });

      cy.get("#submit-payment").click();
      cy.get("#response-message").should(
        "contain",
        "Something went wrong!"
      );
    });
  });
});
